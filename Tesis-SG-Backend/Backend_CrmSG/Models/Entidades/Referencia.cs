using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend_CrmSG.Models.Entidades
{
    public class Referencia
    {
        [Key]
        public int IdReferencia { get; set; }

        [Required]
        public int IdSolicitudInversion { get; set; }

        [Required]
        public int IdTipoReferencia { get; set; }

        [Required]
        [MaxLength(150)]
        public string? Nombre { get; set; }

        [MaxLength(250)]
        public string? Direccion { get; set; }

        [MaxLength(20)]
        public string? TelefonoCelular { get; set; }

        [MaxLength(20)]
        public string? TelefonoFijo { get; set; }

        [Required]
        public DateTime FechaCreacion { get; set; }

        public DateTime? FechaModificacion { get; set; }

        [Required]
        public int IdUsuarioPropietario { get; set; }

        public int? IdUsuarioModificacion { get; set; }
    }
}
