using System.ComponentModel.DataAnnotations;

namespace Backend_CrmSG.Models.Catalogos
{
    public class TipoIdentificacion
    {
        [Key]
        public int IdTipoIdentificacion { get; set; }
        public string? Tipo { get; set; }
    }
}
