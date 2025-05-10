using System.ComponentModel.DataAnnotations;

namespace Backend_CrmSG.Models.Entidades
{
    public class Beneficiario
    {
        [Key]
        public int IdBeneficiario { get; set; }

        public int IdSolicitudInversion { get; set; }
        public int IdTipoDocumento { get; set; }

        [Required]
        public string? Nombre { get; set; }

        [Required]
        public string? NumeroDocumento { get; set; }

        [Required]
        public decimal PorcentajeBeneficio { get; set; }

        public string? Telefono { get; set; }
        public string? CorreoElectronico { get; set; }
        public string? Direccion { get; set; }

        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaModificacion { get; set; }

        public int IdUsuarioCreacion { get; set; }
        public int IdUsuarioPropietario { get; set; }
        public int? IdUsuarioModificacion { get; set; }
    }
}
