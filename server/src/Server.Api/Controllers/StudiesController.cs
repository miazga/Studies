﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Server.Api.Models;
using Server.Api.Models.Commands;
using Server.Api.Models.Queries;
using Server.Api.Persistence;

namespace Server.Api.Controllers
{
    [ApiController]
    public class StudiesController : ControllerBase
    {
        private readonly ILogger<StudiesController> _logger;
        private readonly IStudiesRepository _studiesRepository;

        public StudiesController(ILogger<StudiesController> logger, IStudiesRepository studiesRepository)
        {
            _logger = logger;
            _studiesRepository = studiesRepository;
        }

        [HttpGet("/api/studies")]
        public async Task<IActionResult> Get([FromQuery] StudiesQuery query)
        {
            var result = await _studiesRepository.SearchAsync(query);
            return Ok(result);
        }

        [HttpPost("/api/study")]
        public async Task<IActionResult> AddStudy(AddStudyCommand command)
        {
            if (string.IsNullOrWhiteSpace(command.Name)) return BadRequest(command);

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
        
        [HttpPut("/api/study/{id}")]
        public async Task<IActionResult> UpdateStudy(Guid id, UpdateStudyCommand command)
        {
            if (id == Guid.Empty) return BadRequest("Id cannot be empty");
            if (command.State == 0) return BadRequest("State cannot be empty");
            if (string.IsNullOrEmpty(command.Name)) return BadRequest("Name cannot be empty");

            await _studiesRepository.UpdateAsync(id, command.State, command.Name);
            return Accepted();
        }
        [HttpPut("/api/study/{id}/result")]
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
                DateTime = DateTimeOffset.FromUnixTimeSeconds(command.Timestamp).DateTime
            };

            await _studiesRepository.AddResultAsync(id, result);
            return Accepted();
        }
    }
}