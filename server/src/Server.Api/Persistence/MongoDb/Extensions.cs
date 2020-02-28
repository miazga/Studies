using System.Security.Authentication;
using Autofac;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using Server.Api.IoC;

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
        }

        public static void AddStudiesRepository(this ContainerBuilder builder)
        {
            builder.Register(ctx => new StudiesRepository(ctx.Resolve<IMongoDatabase>(), "Studies"))
                .As<IStudiesRepository>()
                .InstancePerLifetimeScope();
        }
    }
}