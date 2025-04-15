using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend_CrmSG.Models.Catalogos;
using Backend_CrmSG.Services.Catalogos;

namespace Backend_CrmSG.Controllers.Catalogos
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgenciaController : ControllerBase
    {
        private readonly IAgenciaService _agenciaService;

        public AgenciaController(IAgenciaService agenciaService)
        {
            _agenciaService = agenciaService;
        }

        // GET: api/Agencia
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Agencia>>> Get()
        {
            var agencias = await _agenciaService.GetAllAsync();
            return Ok(agencias);
        }

        // GET: api/Agencia/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Agencia>> Get(int id)
        {
            var agencia = await _agenciaService.GetByIdAsync(id);
            if (agencia == null)
                return NotFound();
            return Ok(agencia);
        }

        // POST: api/Agencia
        [HttpPost]
        public async Task<ActionResult<Agencia>> Post([FromBody] Agencia agencia)
        {
            await _agenciaService.AddAsync(agencia);
            return CreatedAtAction(nameof(Get), new { id = agencia.IdAgencia }, agencia);
        }

        // PUT: api/Agencia/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Agencia agencia)
        {
            if (id != agencia.IdAgencia)
                return BadRequest();
            await _agenciaService.UpdateAsync(agencia);
            return NoContent();
        }

        // DELETE: api/Agencia/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _agenciaService.DeleteAsync(id);
            return NoContent();
        }
    }
}
