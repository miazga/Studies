using System;
using System.Collections.Generic;
using Server.Api.Persistence.MongoDb.Types;

namespace Server.Api.Models
{
    public class Study : IIdentifiable
    {
        public string Name { get; set; }
        public IEnumerable<Result> Results { get; set; }
        public DateTime Created { get; set; }
        public State State { get; set; }
        public Guid Id { get; set; }
    }
}