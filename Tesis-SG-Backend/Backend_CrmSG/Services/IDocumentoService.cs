using Backend_CrmSG.DTOs;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Backend_CrmSG.Services
{
    public interface IDocumentoService
    {
        Task<List<DocumentoAdjuntoDto>> ObtenerDocumentosPorEntidadAsync(string tipoEntidad, int idEntidad);
        Task<bool> EliminarDocumentosPorMotivoAsync(int idMotivo, int? idTarea = null, int? idSolicitudInversion = null, int? idInversion = null);
        Task<bool> CrearDocumentoAsync(DocumentoCargaDto dto);
        Task<bool> ActualizarDocumentoAsync(int idDocumento, DocumentoCargaDto dto);
        Task<bool> DesactivarDocumentoAsync(int idDocumento);
    }
}
