using System.ComponentModel.DataAnnotations;

namespace Backend_CrmSG.Models.Catalogos
{
    public class TipoCliente
    {
        [Key]
        public int IdTipoCliente { get; set; }

        [Required]
        public string? NombreTipoCliente { get; set; }

        public DateTime? FechaCreación { get; set; }
        public DateTime? FechaModificacion { get; set; }
    }
}
