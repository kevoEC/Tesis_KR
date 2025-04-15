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
    public class MenuController : ControllerBase
    {
        private readonly IMenuService _menuService;

        public MenuController(IMenuService menuService)
        {
            _menuService = menuService;
        }

        // GET: api/Menu
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            IEnumerable<Menu> menus = await _menuService.GetAllAsync();
            return Ok(menus);
        }

        // GET: api/Menu/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            Menu menu = await _menuService.GetByIdAsync(id);
            if (menu == null)
                return NotFound();
            return Ok(menu);
        }

        // POST: api/Menu
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Menu menu)
        {
            await _menuService.AddAsync(menu);
            return CreatedAtAction(nameof(GetById), new { id = menu.IdMenu }, menu);
        }

        // PUT: api/Menu/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Menu menu)
        {
            if (id != menu.IdMenu)
                return BadRequest("El ID del menú no coincide.");
            await _menuService.UpdateAsync(menu);
            return NoContent();
        }

        // DELETE: api/Menu/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _menuService.DeleteAsync(id);
            return NoContent();
        }

        // Opcional: Endpoint para obtener menús según rol
        // GET: api/Menu/rol/Admin
        [HttpGet("rol/{rol}")]
        public async Task<IActionResult> GetMenusByRole(string rol)
        {
            var menus = await _menuService.GetMenusByRoleAsync(rol);
            return Ok(menus);
        }
    }
}
