using System;
using System.Collections.Immutable;
using System.Linq;
using System.Linq.Expressions;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using Server.Api.Models;
using Server.Api.Models.Queries;
using Server.Api.Persistence.MongoDb;
using Server.Api.Persistence.MongoDb.Types;

namespace Server.Api.Persistence
{
    public interface IStudiesRepository
    {
        Task<PagedResult<Study>> SearchAsync(StudiesQuery query);
        Task AddAsync(Study entity);
        Task<Study> UpdateAsync(Guid id, State state, string name);
        Task<Study> AddResultAsync(Guid id, Result result);
        Task<PagedResult<Result>> GetResultsAsync(Guid studyId, ResultsQuery query);
        Task<ImmutableHashSet<uint>> GetStationsAsync(Guid studyId);
        Task<ImmutableHashSet<uint>> GetStationSensorsAsync(Guid studyId, uint stationId);
    }

    public class StudiesRepository : IStudiesRepository
    {
        public StudiesRepository(IMongoDatabase database, string collectionName)
        {
            Collection = database.GetCollection<Study>(collectionName);
        }

        protected IMongoCollection<Study> Collection { get; }

        public async Task<PagedResult<Study>> SearchAsync(StudiesQuery query)
        {
            Regex searchRegex;
            if (string.IsNullOrWhiteSpace(query.Search))
            {
                searchRegex = new Regex(".");
            }
            else
            {
                var keywords = query.Search.Split(' ');
                var regexFilter = string.Join("(.*?)", keywords);
                searchRegex = new Regex(regexFilter, RegexOptions.IgnoreCase | RegexOptions.IgnorePatternWhitespace);
            }

            var filter = Builders<Study>.Filter.Regex(study => study.Name,
                new BsonRegularExpression(searchRegex));

            var projection = Builders<Study>.Projection.Exclude(x => x.Results);

            Expression<Func<Study, object>> orderPredicate = x => x.Created;

            return await Collection.Find(filter).Project<Study>(projection).SortByDescending(orderPredicate)
                .PaginateAsync(query);
        }

        public Task AddAsync(Study entity)
        {
            return Collection.InsertOneAsync(entity);
        }

        public async Task<Study> AddResultAsync(Guid id, Result result)
        {
            var filterDefinition = Builders<Study>.Filter.Eq(x => x.Id, id);
            var updateDefinition = Builders<Study>.Update.Push(x => x.Results, result);

            return await Collection.FindOneAndUpdateAsync(filterDefinition, updateDefinition);
        }

        public async Task<PagedResult<Result>> GetResultsAsync(Guid studyId, ResultsQuery query)
        {
            var filter = Builders<Study>.Filter.Eq(x => x.Id, studyId);
            var result = await Collection.Find(filter).Project(x => x.Results).FirstOrDefaultAsync();

            if (query.StationId != 0 && query.SensorId != 0)
                return result.Where(x => x.StationId == query.StationId && x.SensorId == query.SensorId)
                    .OrderByDescending(x => x.Created)
                    .Paginate(query);

            if (query.StationId != 0)
                return result.Where(x => x.StationId == query.StationId).OrderByDescending(x => x.Created)
                    .Paginate(query);
            return result.OrderByDescending(x => x.Created).Paginate(query);
        }

        public async Task<ImmutableHashSet<uint>> GetStationsAsync(Guid studyId)
        {
            var filter = Builders<Study>.Filter.Eq(x => x.Id, studyId);
            var result = await Collection.Find(filter).Project(x => x.Results).FirstOrDefaultAsync();
            return result.Select(x => x.StationId).OrderBy(x => x).ToImmutableHashSet();
        }

        public async Task<ImmutableHashSet<uint>> GetStationSensorsAsync(Guid studyId, uint stationId)
        {
            var filter = Builders<Study>.Filter.Eq(x => x.Id, studyId);
            var result = await Collection.Find(filter).Project(x => x.Results).FirstOrDefaultAsync();
            return result.Where(x => x.StationId == stationId).Select(x => x.SensorId).OrderBy(x => x)
                .ToImmutableHashSet();
        }

        public async Task<Study> UpdateAsync(Guid id, State state, string name)
        {
            var filterDefinition = Builders<Study>.Filter.Eq(x => x.Id, id);
            var updateDefinition = Builders<Study>.Update.Set(x => x.Name, name).Set(x => x.State, state);

            return await Collection.FindOneAndUpdateAsync(filterDefinition, updateDefinition);
        }
    }
}