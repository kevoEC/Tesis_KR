using Backend_CrmSG.Models.Entidades;
using Backend_CrmSG.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Backend_CrmSG.Controllers.Entidad
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActividadController : ControllerBase
    {
        private readonly IRepository<Actividad> _actividadRepository;

        public ActividadController(IRepository<Actividad> actividadRepository)
        {
            _actividadRepository = actividadRepository;
        }

        // GET: api/Actividad
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _actividadRepository.GetAllAsync();
            return Ok(result);
        }

        // GET: api/Actividad/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var result = await _actividadRepository.GetByIdAsync(id);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        // POST: api/Actividad
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Actividad actividad)
        {
            await _actividadRepository.AddAsync(actividad);
            return CreatedAtAction(nameof(Get), new { id = actividad.IdActividad }, actividad);
        }

        // PUT: api/Actividad/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Actividad actividad)
        {
            if (id != actividad.IdActividad)
                return BadRequest();

            await _actividadRepository.UpdateAsync(actividad);
            return NoContent();
        }

        // DELETE: api/Actividad/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _actividadRepository.DeleteAsync(id);
            return NoContent();
        }

        [HttpGet("por-prospecto/{idProspecto}")]
        public async Task<IActionResult> GetPorProspecto(int idProspecto)
        {
            var actividades = await _actividadRepository.GetByPropertyAsync("IdProspecto", idProspecto);
            return Ok(actividades);
        }

    }
}
