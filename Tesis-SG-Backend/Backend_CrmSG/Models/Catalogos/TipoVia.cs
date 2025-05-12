// Models/Catalogos/TipoVia.cs
using System.ComponentModel.DataAnnotations;

namespace Backend_CrmSG.Models.Catalogos
{
    public class TipoVia
    {
        [Key]
        public int IdTipoVia { get; set; }
        public string? Nombre { get; set; }
    }
}
