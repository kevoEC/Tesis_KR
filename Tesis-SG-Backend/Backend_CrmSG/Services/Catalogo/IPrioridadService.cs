using System.Collections.Generic;
using System.Threading.Tasks;
using Backend_CrmSG.Models.Catalogos;

namespace Backend_CrmSG.Services.Catalogos
{
    public interface IPrioridadService
    {
        Task<IEnumerable<Prioridad>> GetAllAsync();
        Task<Prioridad> GetByIdAsync(int id);
        Task AddAsync(Prioridad prioridad);
        Task UpdateAsync(Prioridad prioridad);
        Task DeleteAsync(int id);
    }
}
