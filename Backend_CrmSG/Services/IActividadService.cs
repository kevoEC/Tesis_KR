using Backend_CrmSG.DTOs;
using Backend_CrmSG.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend_CrmSG.Services
{
    public interface IActividadService
    {
        Task<IEnumerable<Actividad>> ObtenerFiltradasAsync(ActividadFiltroDto filtro);
        Task<IEnumerable<Actividad>> GetAllActividadesAsync();
        Task<Actividad> GetActividadByIdAsync(int id);
        Task AddActividadAsync(Actividad actividad);
        Task UpdateActividadAsync(Actividad actividad);
        Task DeleteActividadAsync(int id);
    }
}
