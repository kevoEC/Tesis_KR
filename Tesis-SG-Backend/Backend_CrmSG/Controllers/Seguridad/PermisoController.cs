using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend_CrmSG.Models.Seguridad;
using Backend_CrmSG.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace Backend_CrmSG.Controllers.Seguridad
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PermisoController : ControllerBase
    {
        private readonly IRepository<Permiso> _permisoRepository;

        public PermisoController(IRepository<Permiso> permisoRepository)
        {
            _permisoRepository = permisoRepository;
        }

        // GET: api/Permiso
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var permisos = await _permisoRepository.GetAllAsync();
            return Ok(permisos);
        }

        // GET: api/Permiso/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var permiso = await _permisoRepository.GetByIdAsync(id);
            if (permiso == null)
                return NotFound();
            return Ok(permiso);
        }

        // POST: api/Permiso
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Permiso permiso)
        {
            await _permisoRepository.AddAsync(permiso);
            return CreatedAtAction(nameof(GetById), new { id = permiso.IdPermiso }, permiso);
        }

        // PUT: api/Permiso/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Permiso permiso)
        {
            if (id != permiso.IdPermiso)
                return BadRequest("El ID del permiso no coincide.");
            await _permisoRepository.UpdateAsync(permiso);
            return NoContent();
        }

        // DELETE: api/Permiso/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _permisoRepository.DeleteAsync(id);
            return NoContent();
        }
    }
}
