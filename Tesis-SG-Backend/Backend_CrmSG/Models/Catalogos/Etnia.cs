// Models/Catalogos/Etnia.cs
using System.ComponentModel.DataAnnotations;

namespace Backend_CrmSG.Models.Catalogos
{
    public class Etnia
    {
        [Key]
        public int IdEtnia { get; set; }
        public string? Nombre { get; set; }
    }
}
