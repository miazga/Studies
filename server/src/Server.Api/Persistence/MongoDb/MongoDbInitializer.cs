using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;

namespace Server.Api.Persistence.MongoDb
{
    public interface IMongoDbInitializer
    {
        void Initialize();
    }

    public class MongoDbInitializer : IMongoDbInitializer
    {
        private static bool _initialized;
        private readonly IMongoDatabase _database;

        public MongoDbInitializer(IMongoDatabase database,
            MongoDbSettings options)
        {
            _database = database;
        }

        public void Initialize()
        {
            if (_initialized) return;
            RegisterConventions();
            _initialized = true;
        }

        private void RegisterConventions()
        {
            BsonSerializer.RegisterSerializer(typeof(decimal), new DecimalSerializer(BsonType.Decimal128));
            BsonSerializer.RegisterSerializer(typeof(decimal?),
                new NullableSerializer<decimal>(new DecimalSerializer(BsonType.Decimal128)));
            ConventionRegistry.Register("Conventions", new MongoDbConventions(), x => true);
        }

        private class MongoDbConventions : IConventionPack
        {
            public IEnumerable<IConvention> Conventions => new List<IConvention>
            {
                new IgnoreExtraElementsConvention(true),
                new EnumRepresentationConvention(BsonType.String),
                new CamelCaseElementNameConvention()
            };
        }
    }
}