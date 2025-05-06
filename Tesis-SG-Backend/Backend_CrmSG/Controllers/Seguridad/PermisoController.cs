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
    public class PermisoController : ControllerBase
    {
        private readonly IPermisoService _permisoService;

        public PermisoController(IPermisoService permisoService)
        {
            _permisoService = permisoService;
        }

        // GET: api/Permiso
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            IEnumerable<Permiso> permisos = await _permisoService.GetAllAsync();
            return Ok(permisos);
        }

        // GET: api/Permiso/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            Permiso permiso = await _permisoService.GetByIdAsync(id);
            if (permiso == null)
                return NotFound();
            return Ok(permiso);
        }

        // POST: api/Permiso
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Permiso permiso)
        {
            await _permisoService.AddAsync(permiso);
            return CreatedAtAction(nameof(GetById), new { id = permiso.IdPermiso }, permiso);
        }

        // PUT: api/Permiso/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Permiso permiso)
        {
            if (id != permiso.IdPermiso)
                return BadRequest("El ID del permiso no coincide.");
            await _permisoService.UpdateAsync(permiso);
            return NoContent();
        }

        // DELETE: api/Permiso/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _permisoService.DeleteAsync(id);
            return NoContent();
        }
    }
}
