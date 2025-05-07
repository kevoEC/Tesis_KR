using Microsoft.AspNetCore.Mvc;
using Backend_CrmSG.Models.Catalogos;
using Backend_CrmSG.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace Backend_CrmSG.Controllers.Catalogos
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PrioridadController : ControllerBase
    {
        private readonly IRepository<Prioridad> _prioridadRepository;

        public PrioridadController(IRepository<Prioridad> prioridadRepository)
        {
            _prioridadRepository = prioridadRepository;
        }

        // GET: api/Prioridad
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Prioridad>>> Get()
        {
            var prioridades = await _prioridadRepository.GetAllAsync();
            return Ok(prioridades);
        }

        // GET: api/Prioridad/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Prioridad>> Get(int id)
        {
            var prioridad = await _prioridadRepository.GetByIdAsync(id);
            if (prioridad == null)
                return NotFound();
            return Ok(prioridad);
        }

        // POST: api/Prioridad
        [HttpPost]
        public async Task<ActionResult<Prioridad>> Post([FromBody] Prioridad prioridad)
        {
            await _prioridadRepository.AddAsync(prioridad);
            return CreatedAtAction(nameof(Get), new { id = prioridad.IdPrioridad }, prioridad);
        }

        // PUT: api/Prioridad/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Prioridad prioridad)
        {
            if (id != prioridad.IdPrioridad)
                return BadRequest();
            await _prioridadRepository.UpdateAsync(prioridad);
            return NoContent();
        }

        // DELETE: api/Prioridad/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _prioridadRepository.DeleteAsync(id);
            return NoContent();
        }
    }
}
