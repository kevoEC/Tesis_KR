using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend_CrmSG.Models.Catalogos;
using Backend_CrmSG.Services.Catalogos;
using Backend_CrmSG.Models;

namespace Backend_CrmSG.Controllers.Catalogos
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrigenClienteController : ControllerBase
    {
        private readonly IOrigenClienteService _origenClienteService;

        public OrigenClienteController(IOrigenClienteService origenClienteService)
        {
            _origenClienteService = origenClienteService;
        }

        // GET: api/OrigenCliente
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrigenCliente>>> Get()
        {
            var origenes = await _origenClienteService.GetAllAsync();
            return Ok(origenes);
        }

        // GET: api/OrigenCliente/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrigenCliente>> Get(int id)
        {
            var origenCliente = await _origenClienteService.GetByIdAsync(id);
            if (origenCliente == null)
                return NotFound();
            return Ok(origenCliente);
        }

        // POST: api/OrigenCliente
        [HttpPost]
        public async Task<ActionResult<OrigenCliente>> Post([FromBody] OrigenCliente origenCliente)
        {
            await _origenClienteService.AddAsync(origenCliente);
            return CreatedAtAction(nameof(Get), new { id = origenCliente.IdOrigenCliente }, origenCliente);
        }

        // PUT: api/OrigenCliente/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] OrigenCliente origenCliente)
        {
            if (id != origenCliente.IdOrigenCliente)
                return BadRequest();
            await _origenClienteService.UpdateAsync(origenCliente);
            return NoContent();
        }

        // DELETE: api/OrigenCliente/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _origenClienteService.DeleteAsync(id);
            return NoContent();
        }
    }
}
