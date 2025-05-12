using System.ComponentModel.DataAnnotations;

namespace Backend_CrmSG.Models.Catalogos
{
    public class Genero
    {
        [Key]
        public int IdGenero { get; set; }
        public string? Nombre { get; set; }
    }
}
