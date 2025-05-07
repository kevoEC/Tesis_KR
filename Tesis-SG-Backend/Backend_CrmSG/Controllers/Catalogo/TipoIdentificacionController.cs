using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend_CrmSG.Models.Catalogos;
using Backend_CrmSG.Repositories;

namespace Backend_CrmSG.Controllers.Catalogos
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoIdentificacionController : ControllerBase
    {
        private readonly IRepository<TipoIdentificacion> _repository;

        public TipoIdentificacionController(IRepository<TipoIdentificacion> repository)
        {
            _repository = repository;
        }

        // GET: api/TipoIdentificacion
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoIdentificacion>>> Get()
        {
            var tipos = await _repository.GetAllAsync();
            return Ok(tipos);
        }

        // GET: api/TipoIdentificacion/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TipoIdentificacion>> Get(int id)
        {
            var tipo = await _repository.GetByIdAsync(id);
            if (tipo == null)
                return NotFound();
            return Ok(tipo);
        }

        // POST: api/TipoIdentificacion
        [HttpPost]
        public async Task<ActionResult<TipoIdentificacion>> Post([FromBody] TipoIdentificacion tipoIdentificacion)
        {
            await _repository.AddAsync(tipoIdentificacion);
            return CreatedAtAction(nameof(Get), new { id = tipoIdentificacion.IdTipoIdentificacion }, tipoIdentificacion);
        }

        // PUT: api/TipoIdentificacion/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] TipoIdentificacion tipoIdentificacion)
        {
            if (id != tipoIdentificacion.IdTipoIdentificacion)
                return BadRequest();
            await _repository.UpdateAsync(tipoIdentificacion);
            return NoContent();
        }

        // DELETE: api/TipoIdentificacion/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _repository.DeleteAsync(id);
            return NoContent();
        }
    }
}
