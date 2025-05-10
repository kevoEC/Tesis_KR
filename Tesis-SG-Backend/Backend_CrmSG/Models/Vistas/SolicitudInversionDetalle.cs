namespace Backend_CrmSG.Models.Vistas
{
    public class SolicitudInversionDetalle
    {
        public int IdSolicitudInversion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public string? JSONDocument { get; set; }

        public int? IdProspecto { get; set; }
        public string? NombreCompletoProspecto { get; set; }

        public int? IdCliente { get; set; }
        public string? NombreCompletoCliente { get; set; }

        public int? IdUsuarioPropietario { get; set; }
        public string? NombrePropietario { get; set; }

        public int? IdUsuarioModificacion { get; set; }
        public string? NombreModificacion { get; set; }
    }
}
