using System.Collections.Generic;
using System.Threading.Tasks;
using Backend_CrmSG.Models.Seguridad;
using Backend_CrmSG.Repositories;

namespace Backend_CrmSG.Services.Seguridad
{
    public class MenuService : IMenuService
    {
        private readonly IRepository<Menu> _menuRepository;

        public MenuService(IRepository<Menu> menuRepository)
        {
            _menuRepository = menuRepository;
        }

        public async Task<IEnumerable<Menu>> GetAllAsync()
        {
            return await _menuRepository.GetAllAsync();
        }

        public async Task<Menu> GetByIdAsync(int id)
        {
            return await _menuRepository.GetByIdAsync(id);
        }

        public async Task AddAsync(Menu menu)
        {
            await _menuRepository.AddAsync(menu);
        }

        public async Task UpdateAsync(Menu menu)
        {
            await _menuRepository.UpdateAsync(menu);
        }

        public async Task DeleteAsync(int id)
        {
            await _menuRepository.DeleteAsync(id);
        }

        // Implementación de método opcional para obtener menús por rol.
        // Aquí se puede personalizar la consulta según la lógica de negocio.
        public async Task<IEnumerable<Menu>> GetMenusByRoleAsync(string rol)
        {
            // Por ejemplo, se podría tener lógica para filtrar menús permitidos para un rol.
            // En este ejemplo, devolvemos todos los menús como placeholder.
            return await _menuRepository.GetAllAsync();
        }
    }
}
