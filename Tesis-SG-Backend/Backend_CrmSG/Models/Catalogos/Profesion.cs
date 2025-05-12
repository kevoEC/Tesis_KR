// Models/Catalogos/Profesion.cs
using System.ComponentModel.DataAnnotations;

namespace Backend_CrmSG.Models.Catalogos
{
    public class Profesion
    {
        [Key]
        public int IdProfesion { get; set; }
        public string? Nombre { get; set; }
    }
}
