using Server.Api.Persistence.MongoDb.Types;

namespace Server.Api.Models.Queries
{
    public class ResultsQuery : PagedQueryBase, IQuery<PagedResult<Study>>
    {
        public uint StationId { get; set; }
    }
}