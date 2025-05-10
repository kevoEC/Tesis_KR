namespace Backend_CrmSG.Models.Vistas
{
    public class BeneficiarioDetalle
    {
        public int IdBeneficiario { get; set; }
        public int IdSolicitudInversion { get; set; }

        public int IdTipoDocumento { get; set; }
        public string? NombreTipoDocumento { get; set; }

        public string? Nombre { get; set; }
        public string? NumeroDocumento { get; set; }
        public decimal PorcentajeBeneficio { get; set; }
        public string? Telefono { get; set; }
        public string? CorreoElectronico { get; set; }
        public string? Direccion { get; set; }

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
