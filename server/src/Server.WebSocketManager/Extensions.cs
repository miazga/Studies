using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace Server.WebSocketManager
{
    public static class Extendsions
    {
        public static IServiceCollection AddWebSocketManager(this IServiceCollection services)
        {
            services.AddTransient<ConnectionManager>();

            var exportedTypes = Assembly.GetEntryAssembly()?.ExportedTypes;
            if (exportedTypes != null)
                foreach (var type in exportedTypes)
                    if (type.GetTypeInfo().BaseType == typeof(Handler))
                        services.AddSingleton(type);

            return services;
        }

        public static IApplicationBuilder MapWebSocketManager(this IApplicationBuilder app,
            PathString path,
            Handler handler)
        {
            return app.Map(path, _app => _app.UseMiddleware<Middleware>(handler));
        }
    }
}