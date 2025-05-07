using Backend_CrmSG.DTOs;
using Backend_CrmSG.Services.Validaciones;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend_CrmSG.Controllers.Validacion
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Puedes comentar esto si estás en pruebas locales
    public class ValidacionController : ControllerBase
    {
        private readonly IValidacionService _validacionService;

        public ValidacionController(IValidacionService validacionService)
        {
            _validacionService = validacionService;
        }

        [HttpPost("equifax")]
        public async Task<IActionResult> ValidarEquifax([FromBody] EquifaxRequestDto dto)
        {
            try
            {
                var resultado = await _validacionService.ValidarEquifaxAsync(dto);
                return Ok(new
                {
                    success = true,
                    resultado
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Error en la validación Equifax",
                    details = ex.Message
                });
            }
        }

        [HttpPost("lds")]
        public async Task<IActionResult> ValidarLds([FromBody] LdsRequestDto dto)
        {
            try
            {
                var resultado = await _validacionService.ValidarLdsAsync(dto);
                return Ok(new
                {
                    success = true,
                    resultado
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Error en la validación LDS",
                    details = ex.Message
                });
            }
        }
    }
}
