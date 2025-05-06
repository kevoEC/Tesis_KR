using Backend_CrmSG.DTOs;
using Backend_CrmSG.Models;
using Backend_CrmSG.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace TesisBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProspectoController : ControllerBase
    {
        private readonly IProspectoService _prospectoService;

        public ProspectoController(IProspectoService prospectoService)
        {
            _prospectoService = prospectoService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var prospectos = await _prospectoService.GetAllProspectosAsync();
            return Ok(prospectos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var prospecto = await _prospectoService.GetProspectoByIdAsync(id);
            if (prospecto == null)
                return NotFound();
            return Ok(prospecto);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Prospecto prospecto)
        {
            await _prospectoService.AddProspectoAsync(prospecto);
            return CreatedAtAction(nameof(Get), new { id = prospecto.IdProspecto }, prospecto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Prospecto prospecto)
        {
            if (id != prospecto.IdProspecto)
                return BadRequest();
            await _prospectoService.UpdateProspectoAsync(prospecto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _prospectoService.DeleteProspectoAsync(id);
            return NoContent();
        }

        [HttpPost("filtrados")]
        public async Task<IActionResult> ObtenerFiltrados([FromBody] ProspectoFiltroDto filtro)
        {
            var result = await _prospectoService.ObtenerProspectosFiltradosAsync(filtro);
            return Ok(result);
        }

    }
}
