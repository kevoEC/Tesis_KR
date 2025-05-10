using System.Text.Json;
using Backend_CrmSG.Models.Vistas;
using Backend_CrmSG.DTOs.SolicitudDTOs;

namespace Backend_CrmSG.Helpers
{
    public static class SolicitudMapper
    {
        public static SolicitudIdentificacionDTO MapearIdentificacion(SolicitudInversionDetalle vista)
        {
            var dto = new SolicitudIdentificacionDTO
            {
                IdSolicitudInversion = vista.IdSolicitudInversion,
                FechaCreacion = vista.FechaCreacion,
                FechaModificacion = vista.FechaModificacion,
                IdProspecto = vista.IdProspecto,
                NombreCompletoProspecto = vista.NombreCompletoProspecto,
                IdCliente = vista.IdCliente,
                NombreCompletoCliente = vista.NombreCompletoCliente,
                IdUsuarioPropietario = vista.IdUsuarioPropietario,
                NombrePropietario = vista.NombrePropietario,
                IdUsuarioModificacion = vista.IdUsuarioModificacion,
                NombreModificacion = vista.NombreModificacion
            };

            if (!string.IsNullOrWhiteSpace(vista.JSONDocument))
            {
                try
                {
                    var datosJson = JsonSerializer.Deserialize<SolicitudIdentificacionDTO>(vista.JSONDocument!);
                    if (datosJson != null)
                    {
                        dto.TipoSolicitud = datosJson.TipoSolicitud;
                        dto.TipoCliente = datosJson.TipoCliente;
                        dto.TipoDocumento = datosJson.TipoDocumento;
                        dto.NumeroDocumento = datosJson.NumeroDocumento;
                        dto.Nombres = datosJson.Nombres;
                        dto.ApellidoPaterno = datosJson.ApellidoPaterno;
                        dto.ApellidoMaterno = datosJson.ApellidoMaterno;
                        dto.Validar = datosJson.Validar;
                        dto.Equifax = datosJson.Equifax;
                        dto.ObsEquifax = datosJson.ObsEquifax;
                        dto.ListasControl = datosJson.ListasControl;
                        dto.ObsListasControl = datosJson.ObsListasControl;
                        dto.Continuar = datosJson.Continuar;
                    }
                }
                catch
                {
                    // Log opcional
                }
            }

            return dto;
        }
    }
}
