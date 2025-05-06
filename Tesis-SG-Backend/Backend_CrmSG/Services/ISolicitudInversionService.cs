using Backend_CrmSG.DTOs;
using Backend_CrmSG.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface ISolicitudInversionService
{
    Task<IEnumerable<SolicitudInversion>> ObtenerFiltradasAsync(SolicitudInversionFiltroDto filtro);
    Task<IEnumerable<SolicitudInversion>> GetAllAsync();
    Task<SolicitudInversion> GetByIdAsync(int id);
    Task AddAsync(SolicitudInversion solicitud);
    Task UpdateAsync(SolicitudInversion solicitud);
    Task DeleteAsync(int id);
}
