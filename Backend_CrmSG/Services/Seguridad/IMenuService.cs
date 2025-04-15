using System.Collections.Generic;
using System.Threading.Tasks;
using Backend_CrmSG.Models.Seguridad;

namespace Backend_CrmSG.Services.Seguridad
{
    public interface IMenuService
    {
        Task<IEnumerable<Menu>> GetAllAsync();
        Task<Menu> GetByIdAsync(int id);
        Task AddAsync(Menu menu);
        Task UpdateAsync(Menu menu);
        Task DeleteAsync(int id);

        // Opcional: Obtener menús por rol o usuario, según la lógica de negocio
        Task<IEnumerable<Menu>> GetMenusByRoleAsync(string rol);
    }
}
