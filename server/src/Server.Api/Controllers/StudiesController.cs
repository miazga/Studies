using System;
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
    [Route("[controller]")]
    public class StudiesController : ControllerBase
    {
        private readonly ILogger<StudiesController> _logger;
        private readonly IStudiesRepository _studiesRepository;

        public StudiesController(ILogger<StudiesController> logger, IStudiesRepository studiesRepository)
        {
            _logger = logger;
            _studiesRepository = studiesRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] StudiesQuery query)
        {
            var result = await _studiesRepository.SearchAsync(query);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Add(AddStudyCommand command)
        {
            if (string.IsNullOrWhiteSpace(command.Name)) return BadRequest(command);
            var study = new Study
            {
                Id = Guid.NewGuid(),
                Name = command.Name,
                Created = DateTime.Now,
                State = State.Enabled
            };
            await _studiesRepository.Add(study);
            return Accepted();
        }
    }
}