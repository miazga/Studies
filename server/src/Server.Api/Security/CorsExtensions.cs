using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Server.Api.Security
{
    public static class CorsExtensions
    {
        public static IServiceCollection AddCorsDefinitions(this IServiceCollection services)
        {
            services.AddCors(options => options.AddPolicy("DevCorsPolicy", 
                builder =>
                {
                    builder.AllowAnyMethod()
                        .AllowAnyHeader()
                        .WithOrigins("http://192.168.8.113:19006")
                        .AllowCredentials();
                }));
            
            services.AddCors(options => options.AddPolicy("ProdCorsPolicy", 
                builder =>
                {
                    builder.AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowAnyOrigin();
                }));

            return services;
        }

        public static IApplicationBuilder UseDevelopmentCors(this IApplicationBuilder builder)
        {
            return builder.UseCors("DevCorsPolicy");
        }
        
        public static IApplicationBuilder UseProductionCors(this IApplicationBuilder builder)
        {
            return builder.UseCors("ProdCorsPolicy");
        }
        
    }
}