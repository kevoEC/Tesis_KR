using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend_CrmSG.Models.Catalogos;
using Backend_CrmSG.Services.Catalogos;

namespace Backend_CrmSG.Controllers.Catalogos
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoIdentificacionController : ControllerBase
    {
        private readonly ITipoIdentificacionService _tipoIdentificacionService;

        public TipoIdentificacionController(ITipoIdentificacionService tipoIdentificacionService)
        {
            _tipoIdentificacionService = tipoIdentificacionService;
        }

        // GET: api/TipoIdentificacion
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoIdentificacion>>> Get()
        {
            var tipos = await _tipoIdentificacionService.GetAllAsync();
            return Ok(tipos);
        }

        // GET: api/TipoIdentificacion/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TipoIdentificacion>> Get(int id)
        {
            var tipo = await _tipoIdentificacionService.GetByIdAsync(id);
            if (tipo == null)
                return NotFound();
            return Ok(tipo);
        }

        // POST: api/TipoIdentificacion
        [HttpPost]
        public async Task<ActionResult<TipoIdentificacion>> Post([FromBody] TipoIdentificacion tipoIdentificacion)
        {
            await _tipoIdentificacionService.AddAsync(tipoIdentificacion);
            return CreatedAtAction(nameof(Get), new { id = tipoIdentificacion.IdTipoIdentificacion }, tipoIdentificacion);
        }

        // PUT: api/TipoIdentificacion/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] TipoIdentificacion tipoIdentificacion)
        {
            if (id != tipoIdentificacion.IdTipoIdentificacion)
                return BadRequest();
            await _tipoIdentificacionService.UpdateAsync(tipoIdentificacion);
            return NoContent();
        }

        // DELETE: api/TipoIdentificacion/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _tipoIdentificacionService.DeleteAsync(id);
            return NoContent();
        }
    }
}
