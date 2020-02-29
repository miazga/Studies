using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using Server.Api.Persistence.MongoDb.Types;

namespace Server.Api.Persistence.MongoDb
{
    public static class Pagination
    {
        public static async Task<PagedResult<T>> PaginateAsync<T>(this IFindFluent<T, T> findFluent,
            PagedQueryBase query)
        {
            return await findFluent.PaginateAsync(query.Page, query.Results);
        }

        public static async Task<PagedResult<T>> PaginateAsync<T>(this IFindFluent<T, T> findFluent,
            int page = 0, int resultsPerPage = 20)
        {
            if (page < 0) page = 0;

            if (resultsPerPage <= 0) resultsPerPage = 20;

            var isEmpty = await findFluent.AnyAsync() == false;

            if (isEmpty) return PagedResult<T>.Empty;

            var totalResults = await findFluent.CountDocumentsAsync();
            var totalPages = (int) Math.Ceiling((decimal) totalResults / resultsPerPage);
            var data = await findFluent.Limit(page, resultsPerPage).ToListAsync();

            return PagedResult<T>.Create(data, page, resultsPerPage, totalPages, totalResults);
        }

        public static IFindFluent<T, T> Limit<T>(this IFindFluent<T, T> findFluent, PagedQueryBase query)
        {
            return findFluent.Limit(query.Page, query.Results);
        }

        public static IFindFluent<T, T> Limit<T>(this IFindFluent<T, T> findFluent,
            int page = 0, int resultsPerPage = 20)
        {
            if (page < 0) page = 0;
            if (resultsPerPage <= 0) resultsPerPage = 20;
            var skip = page  * resultsPerPage;
            var data = findFluent.Skip(skip)
                .Limit(resultsPerPage);

            return data;
        }

        public static async Task<PagedResult<T>> PaginateAsync<T>(this IMongoQueryable<T> collection,
            PagedQueryBase query)
        {
            return await collection.PaginateAsync(query.Page, query.Results);
        }

        public static async Task<PagedResult<T>> PaginateAsync<T>(this IMongoQueryable<T> collection,
            int page = 0, int resultsPerPage = 20)
        {
            if (page < 0) page = 0;

            if (resultsPerPage <= 0) resultsPerPage = 20;

            var isEmpty = await collection.AnyAsync() == false;

            if (isEmpty) return PagedResult<T>.Empty;

            var totalResults = await collection.CountAsync();
            var totalPages = (int) Math.Ceiling((decimal) totalResults / resultsPerPage);
            var data = await collection.Limit(page, resultsPerPage).ToListAsync();

            return PagedResult<T>.Create(data, page, resultsPerPage, totalPages, totalResults);
        }

        public static IMongoQueryable<T> Limit<T>(this IMongoQueryable<T> collection, PagedQueryBase query)
        {
            return collection.Limit(query.Page, query.Results);
        }

        public static IMongoQueryable<T> Limit<T>(this IMongoQueryable<T> collection,
            int page = 0, int resultsPerPage = 20)
        {
            if (page < 0) page = 0;
            if (resultsPerPage <= 0) resultsPerPage = 20;
            var skip = page  * resultsPerPage;
            var data = collection.Skip(skip)
                .Take(resultsPerPage);

            return data;
        }

        public static PagedResult<T> Paginate<T>(this IEnumerable<T> collection,
            PagedQueryBase query)
        {
            return collection.Paginate(query.Page, query.Results);
        }

        public static PagedResult<T> Paginate<T>(this IEnumerable<T> collection,
            int page = 1, int resultsPerPage = 20)
        {
            if (page < 0) page = 0;

            if (resultsPerPage <= 0) resultsPerPage = 20;

            var count = collection.Count();

            if (count == 0) return PagedResult<T>.Empty;

            var totalPages = (int) Math.Ceiling((decimal) count / resultsPerPage);
            var data = collection.Limit(page, resultsPerPage).ToList();

            return PagedResult<T>.Create(data, page, resultsPerPage, totalPages, count);
        }

        public static IEnumerable<T> Limit<T>(this IEnumerable<T> collection, PagedQueryBase query)
        {
            return collection.Limit(query.Page, query.Results);
        }

        public static IEnumerable<T> Limit<T>(this IEnumerable<T> collection,
            int page = 0, int resultsPerPage = 20)
        {
            if (page < 0) page = 0;
            if (resultsPerPage <= 0) resultsPerPage = 20;
            var skip = (page ) * resultsPerPage;
            var data = collection.Skip(skip)
                .Take(resultsPerPage);

            return data;
        }
    }
}