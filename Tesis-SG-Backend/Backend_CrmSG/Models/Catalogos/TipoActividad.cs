using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend_CrmSG.Models.Catalogos
{
    public class TipoActividad
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdTipoActividad { get; set; }

        // Si "Descripcion" es opcional, asegúrate de que se permita nulo.
        public string? Descripcion { get; set; }
    }
}
