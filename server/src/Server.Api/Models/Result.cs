using System;

namespace Server.Api.Models
{
    public class Result
    {
        public uint StationId { get; set; }
        public DateTime Created { get; set; }
        public uint SensorId { get; set; }
        public decimal Value { get; set; }
    }
}