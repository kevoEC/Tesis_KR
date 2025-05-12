namespace Backend_CrmSG.Models.Vistas
{
    public class ReferenciaDetalle
    {
        public int IdReferencia { get; set; }

        public int IdSolicitudInversion { get; set; }

        public int IdTipoReferencia { get; set; }
        public string? NombreTipoReferencia { get; set; }

        public string? NombreReferencia { get; set; }
        public string? Direccion { get; set; }
        public string? TelefonoCelular { get; set; }
        public string? TelefonoFijo { get; set; }

        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaModificacion { get; set; }

        public int IdUsuarioCreacion { get; set; }
        public string? NombreCreacion { get; set; }

        public int IdUsuarioPropietario { get; set; }
        public string? NombrePropietario { get; set; }

        public int? IdUsuarioModificacion { get; set; }
        public string? NombreModificacion { get; set; }
    }
}
