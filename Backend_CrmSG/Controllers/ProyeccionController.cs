using Backend_CrmSG.Data;
using Backend_CrmSG.DTOs;
using Backend_CrmSG.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace Backend_CrmSG.Controllers.Catalogo.Producto
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // O quita esto temporalmente si aún no tienes autenticación
    public class ProyeccionController : ControllerBase
    {
        private readonly ProyeccionService _proyeccionService;
        private readonly AppDbContext _context;

        public ProyeccionController(ProyeccionService proyeccionService, AppDbContext context)
        {
            _proyeccionService = proyeccionService;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CrearProyeccion([FromBody] ProyeccionCreateDto dto)
        {
            try
            {
                int idUsuario = 3;

                int idProyeccion = await _proyeccionService.CrearProyeccionAsync(dto, idUsuario);

                return Ok(new
                {
                    success = true,
                    message = "Proyección creada correctamente.",
                    idProyeccion = idProyeccion
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = ex.Message,
                    inner = ex.InnerException?.Message
                });
            }
        }

        [HttpGet("{id}/cronograma")]
        public async Task<IActionResult> ObtenerCronograma(int id)
        {
            try
            {
                var cronogramaEntity = await _context.CronogramaProyeccion
                    .Where(c => c.IdProyeccion == id && c.EsActivo)
                    .FirstOrDefaultAsync();

                if (cronogramaEntity == null)
                    return NotFound(new { success = false, message = "Cronograma no encontrado." });

                var cronograma = JsonSerializer.Deserialize<List<CronogramaCuotaDto>>(cronogramaEntity.PeriodosJson);

                return Ok(new
                {
                    success = true,
                    idProyeccion = id,
                    cronograma = cronograma
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = ex.Message
                });
            }
        }


    }
}
