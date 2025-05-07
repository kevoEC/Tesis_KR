using Backend_CrmSG.Models;
using Backend_CrmSG.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Backend_CrmSG.Controllers.Entidad
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProspectoController : ControllerBase
    {
        private readonly IRepository<Prospecto> _prospectoRepository;

        public ProspectoController(IRepository<Prospecto> prospectoRepository)
        {
            _prospectoRepository = prospectoRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _prospectoRepository.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var result = await _prospectoRepository.GetByIdAsync(id);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Prospecto prospecto)
        {
            await _prospectoRepository.AddAsync(prospecto);
            return CreatedAtAction(nameof(Get), new { id = prospecto.IdProspecto }, prospecto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Prospecto prospecto)
        {
            if (id != prospecto.IdProspecto)
                return BadRequest();
            await _prospectoRepository.UpdateAsync(prospecto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _prospectoRepository.DeleteAsync(id);
            return NoContent();
        }
    }
}
