using System.Collections.Generic;
using System.Threading.Tasks;
using Backend_CrmSG.Models.Catalogos;

namespace Backend_CrmSG.Services.Catalogos
{
    public interface ITipoIdentificacionService
    {
        Task<IEnumerable<TipoIdentificacion>> GetAllAsync();
        Task<TipoIdentificacion> GetByIdAsync(int id);
        Task AddAsync(TipoIdentificacion tipoIdentificacion);
        Task UpdateAsync(TipoIdentificacion tipoIdentificacion);
        Task DeleteAsync(int id);
    }
}
