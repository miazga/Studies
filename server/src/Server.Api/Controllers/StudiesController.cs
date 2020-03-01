using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Server.Api.Handlers;
using Server.Api.Models;
using Server.Api.Models.Commands;
using Server.Api.Models.Queries;
using Server.Api.Persistence;

namespace Server.Api.Controllers
{
    [ApiController]
    [Route("/api")]
    public class StudiesController : ControllerBase
    {
        private readonly ILogger<StudiesController> _logger;
        private readonly IStudiesRepository _studiesRepository;
        private readonly StudyResultsWebSocketHandler _studyResultsWebSocketHandler;

        public StudiesController(ILogger<StudiesController> logger, IStudiesRepository studiesRepository,
            StudyResultsWebSocketHandler studyResultsWebSocketHandler)
        {
            _logger = logger;
            _studiesRepository = studiesRepository;
            _studyResultsWebSocketHandler = studyResultsWebSocketHandler;
        }

        [HttpGet("studies")]
        public async Task<IActionResult> Get([FromQuery] StudiesQuery query)
        {
            var result = await _studiesRepository.SearchAsync(query);
            return Ok(result);
        }

        [HttpPost("study")]
        public async Task<IActionResult> AddStudy(AddStudyCommand command)
        {
            if (string.IsNullOrEmpty(command.Name)) return BadRequest("Name cannot be empty");

            var study = new Study
            {
                Id = Guid.NewGuid(),
                Name = command.Name,
                Created = DateTime.Now,
                State = State.Enabled,
                Results = new List<Result>()
            };
            await _studiesRepository.AddAsync(study);
            return Accepted();
        }

        [HttpPut("study/{id}")]
        public async Task<IActionResult> UpdateStudy(Guid id, UpdateStudyCommand command)
        {
            if (id == Guid.Empty) return BadRequest("Id cannot be empty");
            if (command.State == 0) return BadRequest("State cannot be empty");
            if (string.IsNullOrEmpty(command.Name)) return BadRequest("Name cannot be empty");

            var study = await _studiesRepository.UpdateAsync(id, command.State, command.Name);
            if (study == null) return BadRequest("Cannot find Study with given Id");
            return Accepted();
        }

        [HttpGet("study/{id}/results")]
        public async Task<IActionResult> GetStudyResults(Guid id, [FromQuery] ResultsQuery query)
        {
            if (id == Guid.Empty) return BadRequest("Id cannot be empty");
            var results = await _studiesRepository.GetResultsAsync(id, query);
            return Ok(results);
        }

        [HttpPut("study/{id}/result")]
        public async Task<IActionResult> AddStudyResult(Guid id, [FromBody] AddResultCommand command)
        {
            if (command == null || id == Guid.Empty || command.StationId == 0 || command.SensorId == 0 ||
                command.Timestamp == 0)
                return BadRequest(command);

            var result = new Result
            {
                StationId = command.StationId,
                SensorId = command.SensorId,
                Value = command.Value,
                Created = DateTimeOffset.FromUnixTimeSeconds(command.Timestamp).DateTime
            };

            var study = await _studiesRepository.AddResultAsync(id, result);

            if (study == null) return BadRequest("Cannot find Study with given Id");

            await _studyResultsWebSocketHandler.SendMessageToAllAsync(id.ToString(), result);

            return Accepted();
        }
    }
}