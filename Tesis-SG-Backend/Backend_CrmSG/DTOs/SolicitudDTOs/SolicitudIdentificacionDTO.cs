namespace Backend_CrmSG.DTOs.SolicitudDTOs
{
    public class SolicitudIdentificacionDTO
    {
        public int IdSolicitudInversion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public DateTime? FechaModificacion { get; set; }

        public int? IdProspecto { get; set; }
        public string? NombreCompletoProspecto { get; set; }

        public int? IdCliente { get; set; }
        public string? NombreCompletoCliente { get; set; }

        public int? IdUsuarioPropietario { get; set; }
        public string? NombrePropietario { get; set; }

        public int? IdUsuarioModificacion { get; set; }
        public string? NombreModificacion { get; set; }

        // 🔽 Campos internos del JSON
        //IDENTIFICACION
        public int? TipoSolicitud { get; set; }
        public int? TipoCliente { get; set; }
        public int? TipoDocumento { get; set; }
        public string? NumeroDocumento { get; set; }
        public string? Nombres { get; set; }
        public string? ApellidoPaterno { get; set; }
        public string? ApellidoMaterno { get; set; }
        public bool? Validar { get; set; }
        public string? Equifax { get; set; }
        public string? ObsEquifax { get; set; }
        public string? ListasControl { get; set; }
        public string? ObsListasControl { get; set; }
        public string? Continuar { get; set; }
    }

}
