// Models/Catalogos/JustificativoTransaccion.cs
using System.ComponentModel.DataAnnotations;

namespace Backend_CrmSG.Models.Catalogos
{
    public class JustificativoTransaccion
    {
        [Key]
        public int IdJustificativoTransaccion { get; set; }
        public string? Nombre { get; set; }
    }
}
