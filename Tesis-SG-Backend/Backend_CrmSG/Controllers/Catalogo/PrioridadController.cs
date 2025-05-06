using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend_CrmSG.Models.Catalogos;
using Backend_CrmSG.Services.Catalogos;

namespace Backend_CrmSG.Controllers.Catalogos
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrioridadController : ControllerBase
    {
        private readonly IPrioridadService _prioridadService;

        public PrioridadController(IPrioridadService prioridadService)
        {
            _prioridadService = prioridadService;
        }

        // GET: api/Prioridad
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Prioridad>>> Get()
        {
            var prioridades = await _prioridadService.GetAllAsync();
            return Ok(prioridades);
        }

        // GET: api/Prioridad/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Prioridad>> Get(int id)
        {
            var prioridad = await _prioridadService.GetByIdAsync(id);
            if (prioridad == null)
                return NotFound();
            return Ok(prioridad);
        }

        // POST: api/Prioridad
        [HttpPost]
        public async Task<ActionResult<Prioridad>> Post([FromBody] Prioridad prioridad)
        {
            await _prioridadService.AddAsync(prioridad);
            return CreatedAtAction(nameof(Get), new { id = prioridad.IdPrioridad }, prioridad);
        }

        // PUT: api/Prioridad/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Prioridad prioridad)
        {
            if (id != prioridad.IdPrioridad)
                return BadRequest();
            await _prioridadService.UpdateAsync(prioridad);
            return NoContent();
        }

        // DELETE: api/Prioridad/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _prioridadService.DeleteAsync(id);
            return NoContent();
        }
    }
}
