using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Api.Models;
using Server.Api.Models.Commands;
using Server.Api.Models.Queries;
using Server.Api.Persistence;

namespace Server.Api.Controllers
{
    [ApiController]
    public class StudiesController : ControllerBase
    {
        private readonly IStudiesRepository _repository;

        public StudiesController(IStudiesRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("/api/studies")]
        public async Task<IActionResult> Get([FromQuery] StudiesQuery query)
        {
            var result = await _repository.SearchAsync(query);
            return Ok(result);
        }

        [HttpPost("/api/study")]
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
            await _repository.AddAsync(study);
            return Accepted();
        }

        [HttpPut("/api/study/{id}")]
        public async Task<IActionResult> UpdateStudy(Guid id, UpdateStudyCommand command)
        {
            if (id == Guid.Empty) return BadRequest("Id cannot be empty");
            if (command.State == 0) return BadRequest("State cannot be empty");
            if (string.IsNullOrEmpty(command.Name)) return BadRequest("Name cannot be empty");

            var study = await _repository.UpdateAsync(id, command.State, command.Name);
            if (study == null) return BadRequest("Cannot find Study with given Id");
            return Accepted();
        }
    }
}