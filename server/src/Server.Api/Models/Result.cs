using System;

namespace Server.Api.Models
{
    public class Result
    {
        public Station Station { get; set; }
        public DateTime DateTime { get; set; }
        public Sensor Sensor { get; set; }
        public decimal Value { get; set; }
    }
}