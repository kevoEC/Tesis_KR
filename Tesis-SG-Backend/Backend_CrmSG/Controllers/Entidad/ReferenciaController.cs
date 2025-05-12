using Backend_CrmSG.Models.Entidades;
using Backend_CrmSG.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Backend_CrmSG.Controllers.Entidad
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReferenciaController : ControllerBase
    {
        private readonly IRepository<Referencia> _referenciaRepository;

        public ReferenciaController(IRepository<Referencia> referenciaRepository)
        {
            _referenciaRepository = referenciaRepository;
        }

        // GET: api/Referencia
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _referenciaRepository.GetAllAsync();
            return Ok(result);
        }

        // GET: api/Referencia/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var result = await _referenciaRepository.GetByIdAsync(id);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        // POST: api/Referencia
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Referencia referencia)
        {
            await _referenciaRepository.AddAsync(referencia);
            return CreatedAtAction(nameof(Get), new { id = referencia.IdReferencia }, referencia);
        }

        // PUT: api/Referencia/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Referencia referencia)
        {
            if (id != referencia.IdReferencia)
                return BadRequest();

            await _referenciaRepository.UpdateAsync(referencia);
            return NoContent();
        }

        // DELETE: api/Referencia/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _referenciaRepository.DeleteAsync(id);
            return NoContent();
        }

        // GET: api/Referencia/por-solicitud/5
        [HttpGet("por-solicitud/{idSolicitudInversion}")]
        public async Task<IActionResult> GetPorSolicitud(int idSolicitudInversion)
        {
            var referencias = await _referenciaRepository.GetByPropertyAsync("IdSolicitudInversion", idSolicitudInversion);
            return Ok(referencias);
        }
    }
}
