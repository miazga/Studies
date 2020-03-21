namespace Server.Api.MessageBus
{
    public class RabbitMqSettings
    {
        public string Host { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int StartTimeoutInMilliSeconds { get; set; }
        public ushort PrefetchCount { get; set; }
    }
}