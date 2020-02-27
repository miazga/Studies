using System;

namespace Server.Api.Models.Commands
{
    public class AddResultCommand
    {
        public Guid Id { get; set; }
        public uint StationId { get; set; }
        public uint SensorId { get; set; }
        public decimal Value { get; set; }
        public uint Timestamp { get; set; }
    }
}