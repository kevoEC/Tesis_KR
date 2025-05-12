// Models/Catalogos/Pais.cs
using System.ComponentModel.DataAnnotations;

namespace Backend_CrmSG.Models.Catalogos
{
    public class Pais
    {
        [Key]
        public int IdPais { get; set; }
        public string? Nombre { get; set; }
    }
}
