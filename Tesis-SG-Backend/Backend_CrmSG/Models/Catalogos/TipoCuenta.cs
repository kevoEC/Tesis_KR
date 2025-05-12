// Models/Catalogos/TipoCuenta.cs
using System.ComponentModel.DataAnnotations;

namespace Backend_CrmSG.Models.Catalogos
{
    public class TipoCuenta
    {
        [Key]
        public int IdTipoCuenta { get; set; }
        public string? Nombre { get; set; }
    }
}
