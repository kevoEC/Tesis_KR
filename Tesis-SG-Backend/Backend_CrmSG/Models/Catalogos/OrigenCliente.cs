using System.ComponentModel.DataAnnotations;

namespace Backend_CrmSG.Models
{
    public class OrigenCliente
    {
        [Key]
        public int IdOrigenCliente { get; set; }

        [StringLength(100)]
        public string? NombreOrigen { get; set; }
    }
}
