using System.Collections.Generic;
using System.Threading.Tasks;
using Backend_CrmSG.Models.Seguridad;

namespace Backend_CrmSG.Services.Seguridad
{
    public interface IPermisoService
    {
        Task<IEnumerable<Permiso>> GetAllAsync();
        Task<Permiso> GetByIdAsync(int id);
        Task AddAsync(Permiso permiso);
        Task UpdateAsync(Permiso permiso);
        Task DeleteAsync(int id);
    }
}
