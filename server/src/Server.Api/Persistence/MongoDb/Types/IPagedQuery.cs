namespace Server.Api.Persistence.MongoDb.Types
{
    public interface IPagedQuery : IQuery
    {
        int Page { get; }
        int Results { get; }
    }
}