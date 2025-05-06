using Backend_CrmSG.DTOs;
using Backend_CrmSG.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend_CrmSG.Services
{
    public interface IProspectoService
    {
        Task<IEnumerable<Prospecto>> GetAllProspectosAsync();
        Task<Prospecto> GetProspectoByIdAsync(int id);
        Task AddProspectoAsync(Prospecto prospecto);
        Task UpdateProspectoAsync(Prospecto prospecto);
        Task DeleteProspectoAsync(int id);
        Task<IEnumerable<Prospecto>> ObtenerProspectosFiltradosAsync(ProspectoFiltroDto filtro);

    }
}
