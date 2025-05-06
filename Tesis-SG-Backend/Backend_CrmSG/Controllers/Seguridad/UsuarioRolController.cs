using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend_CrmSG.Models.Seguridad;
using Backend_CrmSG.Services.Seguridad;

namespace Backend_CrmSG.Controllers.Seguridad
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsuarioRolController : ControllerBase
    {
        private readonly IUsuarioRolService _usuarioRolService;

        public UsuarioRolController(IUsuarioRolService usuarioRolService)
        {
            _usuarioRolService = usuarioRolService;
        }

        // GET: api/UsuarioRol
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            IEnumerable<UsuarioRol> usuarioRoles = await _usuarioRolService.GetAllAsync();
            return Ok(usuarioRoles);
        }

        // GET: api/UsuarioRol/usuario/5
        [HttpGet("usuario/{idUsuario}")]
        public async Task<IActionResult> GetByUsuario(int idUsuario)
        {
            var lista = await _usuarioRolService.GetByUsuarioIdAsync(idUsuario);
            return Ok(lista);
        }

        // GET: api/UsuarioRol/rol/3
        [HttpGet("rol/{idRol}")]
        public async Task<IActionResult> GetByRol(int idRol)
        {
            var lista = await _usuarioRolService.GetByRolIdAsync(idRol);
            return Ok(lista);
        }

        // POST: api/UsuarioRol
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UsuarioRol usuarioRol)
        {
            await _usuarioRolService.AddAsync(usuarioRol);
            return Ok(new { message = "Rol asignado al usuario correctamente." });
        }

        // PUT: api/UsuarioRol
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] UsuarioRol usuarioRol)
        {
            await _usuarioRolService.UpdateAsync(usuarioRol);
            return Ok(new { message = "La relación usuario-rol se actualizó correctamente." });
        }

        // DELETE: api/UsuarioRol/{idUsuario}/{idRol}
        [HttpDelete("{idUsuario}/{idRol}")]
        public async Task<IActionResult> Delete(int idUsuario, int idRol)
        {
            await _usuarioRolService.DeleteAsync(idUsuario, idRol);
            return Ok(new { message = "La relación usuario-rol se eliminó correctamente." });
        }
    }
}
