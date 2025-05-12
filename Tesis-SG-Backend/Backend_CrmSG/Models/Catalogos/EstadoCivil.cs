// Models/Catalogos/EstadoCivil.cs
using System.ComponentModel.DataAnnotations;

namespace Backend_CrmSG.Models.Catalogos
{
    public class EstadoCivil
    {
        [Key]
        public int IdEstadoCivil { get; set; }
        public string? Nombre { get; set; }
    }
}
