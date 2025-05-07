using Microsoft.AspNetCore.Mvc;
using Backend_CrmSG.Repositories;
using Backend_CrmSG.Models;
using Microsoft.AspNetCore.Authorization;

namespace Backend_CrmSG.Controllers.Catalogos
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrigenClienteController : ControllerBase
    {
        private readonly IRepository<OrigenCliente> _origenClienteRepository;

        public OrigenClienteController(IRepository<OrigenCliente> origenClienteRepository)
        {
            _origenClienteRepository = origenClienteRepository;
        }

        // GET: api/OrigenCliente
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrigenCliente>>> Get()
        {
            var origenes = await _origenClienteRepository.GetAllAsync();
            return Ok(origenes);
        }

        // GET: api/OrigenCliente/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrigenCliente>> Get(int id)
        {
            var origenCliente = await _origenClienteRepository.GetByIdAsync(id);
            if (origenCliente == null)
                return NotFound();
            return Ok(origenCliente);
        }

        // POST: api/OrigenCliente
        [HttpPost]
        public async Task<ActionResult<OrigenCliente>> Post([FromBody] OrigenCliente origenCliente)
        {
            await _origenClienteRepository.AddAsync(origenCliente);
            return CreatedAtAction(nameof(Get), new { id = origenCliente.IdOrigenCliente }, origenCliente);
        }

        // PUT: api/OrigenCliente/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] OrigenCliente origenCliente)
        {
            if (id != origenCliente.IdOrigenCliente)
                return BadRequest();
            await _origenClienteRepository.UpdateAsync(origenCliente);
            return NoContent();
        }

        // DELETE: api/OrigenCliente/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _origenClienteRepository.DeleteAsync(id);
            return NoContent();
        }
    }
}
