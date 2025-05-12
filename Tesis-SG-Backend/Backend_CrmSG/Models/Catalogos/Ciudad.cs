// Models/Catalogos/Ciudad.cs
using System.ComponentModel.DataAnnotations;

namespace Backend_CrmSG.Models.Catalogos
{
    public class Ciudad
    {
        [Key]
        public int IdCiudad { get; set; }
        public string? Nombre { get; set; }
        public string? CodigoCiudad { get; set; }
        public string? CodigoPadre { get; set; }
        public int IdProvincia { get; set; }
    }
}
