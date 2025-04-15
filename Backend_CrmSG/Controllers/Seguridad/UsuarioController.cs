using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Backend_CrmSG.Models.Seguridad;
using Backend_CrmSG.DTOs;
using Backend_CrmSG.Services.Seguridad;

namespace Backend_CrmSG.Controllers.Seguridad
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;
        private readonly IJwtService _jwtService;
        public UsuarioController(IUsuarioService usuarioService, IJwtService jwtService)
        {
            _usuarioService = usuarioService;
            _jwtService = jwtService;
        }

        // POST: api/Usuario/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            var user = await _usuarioService.AuthenticateAsync(loginRequest.Email, loginRequest.Contraseña);
            if (user == null)
                return Unauthorized("Credenciales inválidas o usuario inactivo.");

            // Obtener roles del usuario; aquí deberás implementar la lógica real, en este ejemplo se retorna un mock
            var roles = await _usuarioService.GetRolesByUserIdAsync(user.IdUsuario);

            // Generar el token JWT
            var token = _jwtService.GenerateToken(user, roles);

            return Ok(new
            {
                IdUsuario = user.IdUsuario,
                Nombre = $"{user.PrimerApellido} {user.SegundoApellido} {user.PrimerNombre} {user.SegundoNombre}",
                Email = user.Email,
                Token = token
            });
        }


        // GET: api/Usuario/roles/5
        [HttpGet("roles/{idUsuario}")]
        public async Task<IActionResult> GetRoles(int idUsuario)
        {
            var roles = await _usuarioService.GetRolesByUserIdAsync(idUsuario);
            return Ok(roles);
        }

        // GET: api/Usuario/menus/5
        [HttpGet("menus/{idUsuario}")]
        public async Task<IActionResult> GetMenus(int idUsuario)
        {
            var menus = await _usuarioService.GetMenusByUserIdAsync(idUsuario);
            return Ok(menus);
        }

        // CRUD Básico (Opcional)
        // GET: api/Usuario
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var usuarios = await _usuarioService.GetAllAsync();
            return Ok(usuarios);
        }

        // GET: api/Usuario/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var usuario = await _usuarioService.GetByIdAsync(id);
            if (usuario == null) return NotFound();
            return Ok(usuario);
        }

        // POST: api/Usuario
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Usuario usuario)
        {
            await _usuarioService.AddAsync(usuario);
            return CreatedAtAction(nameof(GetById), new { id = usuario.IdUsuario }, usuario);
        }

        // PUT: api/Usuario/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Usuario usuario)
        {
            if (id != usuario.IdUsuario)
                return BadRequest("El ID no coincide.");

            await _usuarioService.UpdateAsync(usuario);
            return NoContent();
        }

        // DELETE: api/Usuario/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _usuarioService.DeleteAsync(id);
            return NoContent();
        }
    }
}
