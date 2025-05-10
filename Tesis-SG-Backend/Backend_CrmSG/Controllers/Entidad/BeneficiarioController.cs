using Backend_CrmSG.Models.Entidades;
using Backend_CrmSG.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Backend_CrmSG.Controllers.Entidad
{
    [Route("api/[controller]")]
    [ApiController]
    public class BeneficiarioController : ControllerBase
    {
        private readonly IRepository<Beneficiario> _beneficiarioRepository;

        public BeneficiarioController(IRepository<Beneficiario> beneficiarioRepository)
        {
            _beneficiarioRepository = beneficiarioRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _beneficiarioRepository.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var result = await _beneficiarioRepository.GetByIdAsync(id);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Beneficiario beneficiario)
        {
            await _beneficiarioRepository.AddAsync(beneficiario);
            return CreatedAtAction(nameof(Get), new { id = beneficiario.IdBeneficiario }, beneficiario);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Beneficiario beneficiario)
        {
            if (id != beneficiario.IdBeneficiario)
                return BadRequest();
            await _beneficiarioRepository.UpdateAsync(beneficiario);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _beneficiarioRepository.DeleteAsync(id);
            return NoContent();
        }

        [HttpGet("por-solicitud/{idSolicitud}")]
        public async Task<IActionResult> GetPorSolicitud(int idSolicitud)
        {
            var resultado = await _beneficiarioRepository.GetByPropertyAsync("IdSolicitudInversion", idSolicitud);
            return Ok(resultado);
        }
    }
}
