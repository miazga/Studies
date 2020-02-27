using System;
using System.Linq;
using System.Security.Authentication;
using Autofac;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using Server.Api.IoC;
using Server.Api.Persistence.MongoDb.Types;

namespace Server.Api.Persistence.MongoDb
{
    public static class Extensions
    {
        public static void AddMongo(this ContainerBuilder builder)
        {
            builder.Register(context =>
            {
                var configuration = context.Resolve<IConfiguration>();
                var options = configuration.GetOptions<MongoDbSettings>(nameof(MongoDbSettings));

                return options;
            }).SingleInstance();

            builder.Register(context =>
            {
                var options = context.Resolve<MongoDbSettings>();

                var settings = MongoClientSettings.FromUrl(
                    new MongoUrl(options.ConnectionString)
                );
                settings.SslSettings =
                    new SslSettings {EnabledSslProtocols = SslProtocols.Tls12};
                return new MongoClient(settings);
            }).SingleInstance();

            builder.Register(context =>
            {
                var options = context.Resolve<MongoDbSettings>();
                var client = context.Resolve<MongoClient>();
                return client.GetDatabase(options.Database);
            }).InstancePerLifetimeScope();

            builder.RegisterType<MongoDbInitializer>()
                .As<IMongoDbInitializer>()
                .InstancePerLifetimeScope();
        }

        public static void AddMongoRepository<TEntity>(this ContainerBuilder builder, string collectionName)
            where TEntity : IIdentifiable
        {
            builder.Register(ctx => new MongoRepository<TEntity>(ctx.Resolve<IMongoDatabase>(), collectionName))
                .As<IMongoRepository<TEntity>>()
                .InstancePerLifetimeScope();
        }


        public static IServiceCollection AddInitializers(this IServiceCollection services, params Type[] initializers)
        {
            return initializers == null
                ? services
                : services.AddTransient<IStartupInitializer, StartupInitializer>(c =>
                {
                    var startupInitializer = new StartupInitializer();
                    var validInitializers = initializers.Where(t => typeof(IMongoDbInitializer).IsAssignableFrom(t));
                    foreach (var initializer in validInitializers)
                        startupInitializer.AddInitializer(c.GetService(initializer) as IMongoDbInitializer);

                    return startupInitializer;
                });
        }
    }
}