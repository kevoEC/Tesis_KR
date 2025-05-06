using System.ComponentModel.DataAnnotations;

namespace Backend_CrmSG.Models.Catalogos
{
    public class Agencia
    {
        [Key]
        public int IdAgencia { get; set; }
        public string? Ciudad { get; set; }
    }
}
