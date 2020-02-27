using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using Server.Api.Persistence.MongoDb.Types;

namespace Server.Api.Persistence.MongoDb
{
    public interface IMongoRepository<TEntity> where TEntity : IIdentifiable
    {
        Task<TEntity> GetAsync(Guid id);
        Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> predicate);
        Task<IEnumerable<TEntity>> FindAsync(Expression<Func<TEntity, bool>> predicate);

        Task<PagedResult<TEntity>> FindAsync<TQuery>(FilterDefinition<TEntity> filter,
            Expression<Func<TEntity, object>> orderPredicate,
            TQuery query) where TQuery : PagedQueryBase;

        Task<PagedResult<TEntity>> BrowseAsync<TQuery>(Expression<Func<TEntity, bool>> predicate,
            Expression<Func<TEntity, object>> orderPredicate,
            Expression<Func<TEntity, object>> thenByPredicate,
            TQuery query) where TQuery : PagedQueryBase;

        Task AddAsync(TEntity entity);
        Task UpdateAsync(FilterDefinition<TEntity> filterDefinition, UpdateDefinition<TEntity> updateDefinition);
        Task DeleteAsync(Guid id);
        Task DeleteAsync(Expression<Func<TEntity, bool>> predicate);
        Task<bool> ExistsAsync(Expression<Func<TEntity, bool>> predicate);
    }

    public class MongoRepository<TEntity> : IMongoRepository<TEntity> where TEntity : IIdentifiable
    {
        public MongoRepository(IMongoDatabase database, string collectionName)
        {
            Collection = database.GetCollection<TEntity>(collectionName);
        }

        protected IMongoCollection<TEntity> Collection { get; }

        public async Task<TEntity> GetAsync(Guid id)
        {
            return await GetAsync(e => e.Id == id);
        }

        public async Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await Collection.Find(predicate).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<TEntity>> FindAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await Collection.Find(predicate).ToListAsync();
        }

        public async Task<PagedResult<TEntity>> FindAsync<TQuery>(FilterDefinition<TEntity> filter,
            Expression<Func<TEntity, object>> orderPredicate,
            TQuery query) where TQuery : PagedQueryBase
        {
            return await Collection.Find(filter).SortByDescending(orderPredicate).PaginateAsync(query);
        }

        public async Task<PagedResult<TEntity>> BrowseAsync<TQuery>(Expression<Func<TEntity, bool>> predicate,
            Expression<Func<TEntity, object>> orderPredicate,
            Expression<Func<TEntity, object>> thenByPredicate,
            TQuery query) where TQuery : PagedQueryBase
        {
            return await Collection.AsQueryable().Where(predicate).OrderByDescending(orderPredicate)
                .ThenBy(thenByPredicate).PaginateAsync(query);
        }

        public async Task AddAsync(TEntity entity)
        {
            await Collection.InsertOneAsync(entity);
        }

        public async Task UpdateAsync(FilterDefinition<TEntity> filterDefinition,
            UpdateDefinition<TEntity> updateDefinition)
        {
            await Collection.UpdateOneAsync(filterDefinition, updateDefinition);
        }

        public async Task DeleteAsync(Guid id)
        {
            await Collection.DeleteOneAsync(e => e.Id == id);
        }

        public async Task DeleteAsync(Expression<Func<TEntity, bool>> predicate)
        {
            await Collection.DeleteManyAsync(predicate);
        }

        public async Task<bool> ExistsAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await Collection.Find(predicate).AnyAsync();
        }
    }
}