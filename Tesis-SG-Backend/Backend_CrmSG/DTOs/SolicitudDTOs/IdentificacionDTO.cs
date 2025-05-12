namespace Backend_CrmSG.DTOs.Solicitudes
{
    public class IdentificacionDTO
    {
        // Catálogos (IDs + texto visual)
        public int IdTipoSolicitud { get; set; }
        public string? NombreTipoSolicitud { get; set; }

        public int IdTipoCliente { get; set; }
        public string? NombreTipoCliente { get; set; }

        public int IdTipoDocumento { get; set; }
        public string? NombreTipoDocumento { get; set; }

        // Datos de la persona
        public string NumeroDocumento { get; set; } = null!;
        public string Nombres { get; set; } = null!;
        public string ApellidoPaterno { get; set; } = null!;
        public string ApellidoMaterno { get; set; } = null!;

        // Validación
        public bool Validar { get; set; }

        // Equifax
        public string? Equifax { get; set; }          // Paso, No Paso, Error
        public string? ObsEquifax { get; set; }

        // LDS
        public string? ListasControl { get; set; }    // Paso, No Paso, Error
        public string? ObsListasControl { get; set; }

        // Acción final
        public string? Continuar { get; set; }        // Continuar, Rechazar, etc.
    }
}
