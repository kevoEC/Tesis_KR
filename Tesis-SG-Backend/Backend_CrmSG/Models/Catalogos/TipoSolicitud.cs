using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend_CrmSG.Models.Catalogos
{
    [Table("TipoDeSolicitud")]
    public class TipoSolicitud
    {
        [Key]
        public int IdTipoDeSolicitud { get; set; }

        public string NombreTipoDeSolicitud { get; set; } = null!;

        public DateTime? FechaCreación { get; set; }
        public DateTime? FechaModificacion { get; set; }
    }
}
