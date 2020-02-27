namespace Server.Api.Persistence.MongoDb.Types
{
    public abstract class PagedQueryBase : IPagedQuery
    {
        public int Page { get; set; }
        public int Results { get; set; }
    }
}