using System;
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
        Task AddResultAsync(Guid id, Result result);
    }

    public class StudiesRepository : IStudiesRepository
    {
        private readonly IMongoRepository<Study> _repository;

        public StudiesRepository(IMongoRepository<Study> repository)
        {
            _repository = repository;
        }

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


//            if (!string.IsNullOrWhiteSpace(query.Merchant))
//                filter &= Builders<Study>.Filter.Eq(x => x.Merchant, query.Merchant);
//            
//            if (!string.IsNullOrWhiteSpace(query.ShipsFrom))
//                filter &= Builders<Study>.Filter.Eq(x => x.ShipsFrom, query.ShipsFrom);

            Expression<Func<Study, object>> orderPredicate = x => x.Created;

            return await _repository.FindAsync(filter, orderPredicate, query);
        }

        public Task AddAsync(Study entity)
        {
            return _repository.AddAsync(entity);
        }

        public async Task AddResultAsync(Guid id, Result result)
        {
            var filterDefinition = Builders<Study>.Filter.Eq(x => x.Id, id);
            var updateDefinition = Builders<Study>.Update.Push(x => x.Results, result);

            await _repository.UpdateAsync(filterDefinition, updateDefinition);
        }
    }
}