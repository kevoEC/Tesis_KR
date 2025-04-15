using System.Collections.Generic;
using System.Threading.Tasks;
using Backend_CrmSG.Models.Catalogos;

namespace Backend_CrmSG.Services.Catalogos
{
    public interface ITipoActividadService
    {
        Task<IEnumerable<TipoActividad>> GetAllAsync();
        Task<TipoActividad> GetByIdAsync(int id);
        Task AddAsync(TipoActividad tipoActividad);
        Task UpdateAsync(TipoActividad tipoActividad);
        Task DeleteAsync(int id);
    }
}
