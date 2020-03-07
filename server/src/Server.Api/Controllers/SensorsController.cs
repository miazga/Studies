using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Api.Persistence;

namespace Server.Api.Controllers
{
    [ApiController]
    public class SensorsController : ControllerBase
    {
        private readonly IStudiesRepository _repository;

        public SensorsController(IStudiesRepository repository)
        {
            _repository = repository;
        }
        
        [HttpGet("/api/study/{id}/station/{stationId}/sensors")]
        public async Task<IActionResult> GetStudyStationSensors(Guid id, uint stationId)
        {
            if (id == Guid.Empty) return BadRequest("Id cannot be empty");
            if (stationId <= 0) return BadRequest("StationId cannot be negative");
            var stations = await _repository.GetStationSensorsAsync(id, stationId);
            return Ok(stations);
        }
    }
}