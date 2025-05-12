using Backend_CrmSG.Models.Catalogos;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend_CrmSG.Models.Entidades
{
    public class Prospecto
    {
        [Key]
        public int IdProspecto { get; set; }

        [StringLength(64)]
        public string? Nombres { get; set; }

        [StringLength(64)]
        public string? ApellidoPaterno { get; set; }

        [StringLength(64)]
        public string? ApellidoMaterno { get; set; }

        // FK a TipoIdentificacion
        public int? IdTipoIdentificacion { get; set; }
        [ForeignKey("IdTipoIdentificacion")]
        public TipoIdentificacion? TipoIdentificacion { get; set; }

        // FK a OrigenCliente
        public int? IdOrigenCliente { get; set; }
        [ForeignKey("IdOrigenCliente")]
        public OrigenCliente? OrigenCliente { get; set; }

        [ForeignKey("IdProductoInteres")]
        public int? IdProductoInteres { get; set; }

        // Otros campos...
        [StringLength(16)]
        public string? TelefonoCelular { get; set; }

        [StringLength(128)]
        public string? CorreoElectronico { get; set; }

        // FK a Agencia
        public int? IdAgencia { get; set; }
        [ForeignKey("IdAgencia")]
        public Agencia? Agencia { get; set; }

        // Campos de seguimiento
        public DateTime? FechaCreacion { get; set; }
        public DateTime? FechaModificacion { get; set; }

        public bool? Estado { get; set; }
        public bool? EsCliente { get; set; }
        public int? IdUsuarioPropietario { get; set; }

    }
}
