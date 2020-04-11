using System;
using System.Threading.Tasks;
using MassTransit;
using Microsoft.AspNetCore.Mvc;
using Server.Api.Consumers;
using Server.Api.Models;
using Server.Api.Models.Commands;
using Server.Api.Models.Queries;
using Server.Api.Persistence;

namespace Server.Api.Controllers
{
    [ApiController]
    public class ResultsController : ControllerBase
    {
        private readonly IBus _bus;
        private readonly IStudiesRepository _repository;

        public ResultsController(IStudiesRepository repository, IBus bus)
        {
            _repository = repository;
            _bus = bus;
        }

        [HttpGet("/api/study/{id}/results")]
        public async Task<IActionResult> GetStudyResults(Guid id, [FromQuery] ResultsQuery query)
        {
            if (id == Guid.Empty) return BadRequest("Id cannot be empty");
            var results = await _repository.GetResultsAsync(id, query);
            return Ok(results);
        }

        [HttpPut("/api/study/{id}/result")]
        public async Task<IActionResult> AddStudyResult(Guid id, [FromBody] AddResultCommand command)
        {
            if (command == null)
                return BadRequest("Id cannot be empty");
            if (id == Guid.Empty) return BadRequest("Id cannot be empty");
            if (command.StationId == 0) return BadRequest("StationId cannot be empty");
            if (command.SensorId == 0) return BadRequest("SensorId cannot be empty");
            if (command.Timestamp == 0) return BadRequest("Timestamp cannot be empty");

            var result = new Result
            {
                StationId = command.StationId,
                SensorId = command.SensorId,
                Value = command.Value,
                Created = DateTimeOffset.FromUnixTimeSeconds(command.Timestamp).DateTime
            };

            await _bus.Publish(new AddResultMessage(id, result));

            return Accepted();
        }
    }
}