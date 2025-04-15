using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend_CrmSG.Models.Seguridad;
using Backend_CrmSG.Services.Seguridad;
using Microsoft.AspNetCore.Authorization;

namespace Backend_CrmSG.Controllers.Seguridad
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RolController : ControllerBase
    {
        private readonly IRolService _rolService;

        public RolController(IRolService rolService)
        {
            _rolService = rolService;
        }

        // GET: api/Rol
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            IEnumerable<Rol> roles = await _rolService.GetAllAsync();
            return Ok(roles);
        }

        // GET: api/Rol/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            Rol rol = await _rolService.GetByIdAsync(id);
            if (rol == null)
                return NotFound();
            return Ok(rol);
        }

        // POST: api/Rol
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Rol rol)
        {
            await _rolService.AddAsync(rol);
            return CreatedAtAction(nameof(GetById), new { id = rol.IdRol }, rol);
        }

        // PUT: api/Rol/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Rol rol)
        {
            if (id != rol.IdRol)
                return BadRequest("El ID del rol no coincide.");
            await _rolService.UpdateAsync(rol);
            return NoContent();
        }

        // DELETE: api/Rol/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _rolService.DeleteAsync(id);
            return NoContent();
        }
    }
}
