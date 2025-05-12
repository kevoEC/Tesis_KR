// Models/Catalogos/ActividadEconomicaPrincipal.cs
using System.ComponentModel.DataAnnotations;

namespace Backend_CrmSG.Models.Catalogos
{
    public class ActividadEconomicaPrincipal
    {
        [Key]
        public int IdActividadEconomicaPrincipal { get; set; }
        public string? Nombre { get; set; }
    }
}
