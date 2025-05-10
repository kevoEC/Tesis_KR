namespace Backend_CrmSG.DTOs.SolicitudDTOs
{
    public class SolicitudInversionCreateDTO
    {
        public int IdUsuarioPropietario { get; set; }
        public int IdProspecto { get; set; }
        public int? IdCliente { get; set; }

        public IdentificacionCreateDTO? Identificacion { get; set; }
    }

    public class IdentificacionCreateDTO
    {
        public int TipoSolicitud { get; set; }
        public int TipoCliente { get; set; }
        public int TipoDocumento { get; set; }
        public string? NumeroDocumento { get; set; }
        public string? Nombres { get; set; }
        public string? ApellidoPaterno { get; set; }
        public string? ApellidoMaterno { get; set; }
        public bool Validar { get; set; }
        public string? Equifax { get; set; }
        public string? ObsEquifax { get; set; }
        public string? ListasControl { get; set; }
        public string? ObsListasControl { get; set; }
        public int? Continuar { get; set; }
    }
}
