using Backend_CrmSG.Models.Entidades;
using Backend_CrmSG.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend_CrmSG.Controllers.Entidad
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SolicitudInversionController : ControllerBase
    {
        private readonly IRepository<SolicitudInversion> _repository;

        public SolicitudInversionController(IRepository<SolicitudInversion> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await _repository.GetAllAsync();
            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _repository.GetByIdAsync(id);
            return item == null ? NotFound() : Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] SolicitudInversion solicitud)
        {
            try
            {
                await _repository.AddAsync(solicitud);

                return Ok(new
                {
                    success = true,
                    message = "Solicitud creada correctamente."
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Ocurrió un error en el servidor. Intenta nuevamente.",
                    details = ex.Message,
                    inner = ex.InnerException?.Message,
                    stack = ex.InnerException?.StackTrace
                });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] SolicitudInversion solicitud)
        {
            if (id != solicitud.IdSolicitudInversion)
                return BadRequest();

            await _repository.UpdateAsync(solicitud);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _repository.DeleteAsync(id);
            return NoContent();
        }

        [HttpGet("por-prospecto/{idProspecto}")]
        [HttpGet("filtrar")]
        public async Task<IActionResult> FiltrarPorId([FromQuery] string por, [FromQuery] int id)
        {
            // Validar parámetro 'por'
            string? propertyName = por.ToLower() switch
            {
                "prospecto" => "IdProspecto",
                "cliente" => "IdCliente",
                _ => null
            };

            if (propertyName == null)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Parámetro 'por' inválido. Debe ser 'prospecto' o 'cliente'."
                });
            }

            var resultados = await _repository.GetByPropertyAsync(propertyName, id);
            return Ok(resultados);
        }

    }
}
