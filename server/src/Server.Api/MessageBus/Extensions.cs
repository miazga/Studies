using System;
using System.Reflection;
using Autofac;
using MassTransit;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Server.Api.IoC;

namespace Server.Api.MessageBus
{
    public static class Extensions
    {
        public static void AddRabbitMq(this ContainerBuilder builder, IConfiguration configuration)
        {
            builder.AddMassTransit(x =>
            {
                x.AddConsumers(Assembly.GetExecutingAssembly());

                var busSettings = configuration.GetOptions<RabbitMqSettings>(nameof(RabbitMqSettings));

                x.AddBus(context => Bus.Factory.CreateUsingRabbitMq(cfg =>
                {
                    cfg.Host(busSettings.Host, h =>
                    {
                        h.Username(busSettings.Username);
                        h.Password(busSettings.Password);
                    });
                    cfg.PrefetchCount = 1;
                    cfg.ConfigureEndpoints(context);
                }));
            });
        }

        public static void UseRabbitMq(this IApplicationBuilder builder, IConfiguration configuration)
        {
            var busControl = builder.ApplicationServices.GetService<IBusControl>();
            var busSettings = configuration.GetOptions<RabbitMqSettings>(nameof(RabbitMqSettings));

            busControl.Start(TimeSpan.FromMilliseconds(busSettings.StartTimeoutInMilliSeconds));
        }
    }
}