using System.Collections.Generic;

namespace Server.Api.Persistence.MongoDb
{
    public interface IStartupInitializer : IMongoDbInitializer
    {
        void AddInitializer(IMongoDbInitializer initializer);
    }

    public class StartupInitializer : IStartupInitializer
    {
        private readonly ISet<IMongoDbInitializer> _initializers = new HashSet<IMongoDbInitializer>();

        public void AddInitializer(IMongoDbInitializer initializer)
        {
            _initializers.Add(initializer);
        }

        public void Initialize()
        {
            foreach (var dbInitializer in _initializers) dbInitializer.Initialize();
        }
    }
}