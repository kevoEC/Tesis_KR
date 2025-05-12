// Models/Catalogos/ContinuarSolicitud.cs
using System.ComponentModel.DataAnnotations;

namespace Backend_CrmSG.Models.Catalogos
{
    public class ContinuarSolicitud
    {
        [Key]
        public int IdContinuarSolicitud { get; set; }
        public string? Nombre { get; set; }
    }
}
