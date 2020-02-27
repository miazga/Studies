using Server.Api.Persistence.MongoDb.Types;

namespace Server.Api.Models.Queries
{
    public class StudiesQuery : PagedQueryBase, IQuery<PagedResult<Study>>
    {
        public string Search { get; set; }
    }
}