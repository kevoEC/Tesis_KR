using System.ComponentModel.DataAnnotations;

namespace Backend_CrmSG.Models.Catalogos
{
    public class Nacionalidad
    {
        [Key]
        public int IdNacionalidad { get; set; }
        public string? Nombre { get; set; }
    }
}
