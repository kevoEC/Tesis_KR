using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend_CrmSG.Models.Catalogos;
using Backend_CrmSG.Services.Catalogos;

namespace Backend_CrmSG.Controllers.Catalogos
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoActividadController : ControllerBase
    {
        private readonly ITipoActividadService _tipoActividadService;

        public TipoActividadController(ITipoActividadService tipoActividadService)
        {
            _tipoActividadService = tipoActividadService;
        }

        // GET: api/TipoActividad
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoActividad>>> Get()
        {
            var tipos = await _tipoActividadService.GetAllAsync();
            return Ok(tipos);
        }

        // GET: api/TipoActividad/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TipoActividad>> Get(int id)
        {
            var tipo = await _tipoActividadService.GetByIdAsync(id);
            if (tipo == null)
                return NotFound();
            return Ok(tipo);
        }

        // POST: api/TipoActividad
        [HttpPost]
        public async Task<ActionResult<TipoActividad>> Post([FromBody] TipoActividad tipoActividad)
        {
            await _tipoActividadService.AddAsync(tipoActividad);
            return CreatedAtAction(nameof(Get), new { id = tipoActividad.IdTipoActividad }, tipoActividad);
        }

        // PUT: api/TipoActividad/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] TipoActividad tipoActividad)
        {
            if (id != tipoActividad.IdTipoActividad)
                return BadRequest();
            await _tipoActividadService.UpdateAsync(tipoActividad);
            return NoContent();
        }

        // DELETE: api/TipoActividad/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _tipoActividadService.DeleteAsync(id);
            return NoContent();
        }
    }
}
