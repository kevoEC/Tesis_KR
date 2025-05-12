// Models/Catalogos/Provincia.cs
using System.ComponentModel.DataAnnotations;

namespace Backend_CrmSG.Models.Catalogos
{
    public class Provincia
    {
        [Key]
        public int IdProvincia { get; set; }
        public string? Nombre { get; set; }
        public string? CodigoProvincia { get; set; }
        public string? CodigoPadre { get; set; }
        public int IdPais { get; set; }
    }
}
