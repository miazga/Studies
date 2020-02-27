using System;
using Microsoft.AspNetCore.Mvc;

namespace Server.Api.Models.Commands
{
    public class AddResultCommand
    {
        public uint StationId { get; set; }
        public uint SensorId { get; set; }
        public decimal Value { get; set; }
        public uint Timestamp { get; set; }
    }
}