﻿using Backend_CrmSG.Models.Entidades;
using Backend_CrmSG.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Backend_CrmSG.Models.Vistas;
using Backend_CrmSG.DTOs.SolicitudDTOs;


namespace Backend_CrmSG.Controllers.Entidad
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SolicitudInversionController : ControllerBase
    {
        private readonly IRepository<SolicitudInversion> _repository;
        private readonly IRepository<SolicitudInversionDetalle> _vistaRepository;

        public SolicitudInversionController(IRepository<SolicitudInversion> repository, IRepository<SolicitudInversionDetalle> vistaRepository)
        {
            _repository = repository;
            _vistaRepository = vistaRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await _repository.GetAllAsync();
            return Ok(data);
        }

        [HttpGet("detalle")]
        public async Task<IActionResult> GetTodasConDetalle()
        {
            try
            {
                var vistas = await _vistaRepository.GetAllAsync();
                var dtos = vistas.Select(SolicitudMapper.MapearDesdeVista).ToList();
                return Ok(new { success = true, data = dtos });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "Ocurrió un error al obtener todas las solicitudes detalladas.",
                    details = ex.Message
                });
            }
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _repository.GetByIdAsync(id);
            return item == null ? NotFound() : Ok(item);
        }
        [HttpPost("estructura")]
        public async Task<IActionResult> CreateDesdeDTO([FromBody] SolicitudInversionCreateDTO dto)
        {
            try
            {
                var solicitud = SolicitudMapper.MapearParaCrear(dto);

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
                    message = "Error al crear la solicitud.",
                    details = ex.Message
                });
            }
        }

        [HttpPut("estructura/{id}")]
        public async Task<IActionResult> UpdateDesdeDTO(int id, [FromBody] SolicitudInversionUpdateDTO dto)
        {
            var existing = await _repository.GetByIdAsync(id);
            if (existing == null)
                return NotFound();

            var updatedEntity = SolicitudMapper.MapearParaActualizar(id, dto);

            await _repository.UpdateAsync(updatedEntity);

            return Ok(new { success = true, message = "Solicitud actualizada correctamente." });
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
        [HttpGet("detalle/{id}")]
        public async Task<IActionResult> GetDetalleById(int id)
        {
            try
            {
                var vistas = await _vistaRepository.GetByPropertyAsync("IdSolicitudInversion", id);
                var vista = vistas.FirstOrDefault();
                if (vista == null)
                    return NotFound(new { success = false, message = "Solicitud no encontrada" });

                var dto = SolicitudMapper.MapearDesdeVista(vista);
                return Ok(new { success = true, data = dto });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "Ocurrió un error al obtener la solicitud.",
                    details = ex.Message
                });
            }
        
        }





    }
}
