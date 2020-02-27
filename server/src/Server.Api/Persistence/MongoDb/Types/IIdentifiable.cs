using System;

namespace Server.Api.Persistence.MongoDb.Types
{
    public interface IIdentifiable
    {
        Guid Id { get; }
    }
}