using Backend_CrmSG.DTOs;
using Backend_CrmSG.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class SolicitudInversionController : ControllerBase
{
    private readonly ISolicitudInversionService _service;

    public SolicitudInversionController(ISolicitudInversionService service)
    {
        _service = service;
    }

    [HttpPost("filtradas")]
    public async Task<IActionResult> ObtenerFiltradas([FromBody] SolicitudInversionFiltroDto filtro)
    {
        var result = await _service.ObtenerFiltradasAsync(filtro);
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var data = await _service.GetAllAsync();
        return Ok(data);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var item = await _service.GetByIdAsync(id);
        return item == null ? NotFound() : Ok(item);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] SolicitudInversion solicitud)
    {
        try
        {
            await _service.AddAsync(solicitud);

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

        await _service.UpdateAsync(solicitud);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeleteAsync(id);
        return NoContent();
    }
}
