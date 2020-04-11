using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Api.Persistence;

namespace Server.Api.Controllers
{
    [ApiController]
    public class StationsController : ControllerBase
    {
        private readonly IStudiesRepository _repository;

        public StationsController(IStudiesRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("/api/study/{id}/stations")]
        public async Task<IActionResult> GetStudyStations(Guid id)
        {
            if (id == Guid.Empty) return BadRequest("Id cannot be empty");
            var stations = await _repository.GetStationsAsync(id);
            return Ok(stations);
        }
    }
}