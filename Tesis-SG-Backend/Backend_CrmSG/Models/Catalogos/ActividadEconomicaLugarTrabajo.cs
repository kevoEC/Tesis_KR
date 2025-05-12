// Models/Catalogos/ActividadEconomicaLugarTrabajo.cs
using System.ComponentModel.DataAnnotations;

namespace Backend_CrmSG.Models.Catalogos
{
    public class ActividadEconomicaLugarTrabajo
    {
        [Key]
        public int IdActividadEconomicaLugarTrabajo { get; set; }
        public string? Nombre { get; set; }
    }
}
