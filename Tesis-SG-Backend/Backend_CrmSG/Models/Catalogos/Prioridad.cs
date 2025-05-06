using System.ComponentModel.DataAnnotations;

namespace Backend_CrmSG.Models.Catalogos
{
    public class Prioridad
    {
        [Key]
        public int IdPrioridad { get; set; }
        public string? Categoria { get; set; }
    }
}
