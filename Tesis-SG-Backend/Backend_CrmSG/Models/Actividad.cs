using System.ComponentModel.DataAnnotations;

namespace Backend_CrmSG.Models
{
    public class Actividad
    {
        [Key]
        public int IdActividad { get; set; }
        public int? IdTipoActividad { get; set; }
        public string? Asunto { get; set; }
        public string? Descripcion { get; set; }
        public TimeSpan? Duracion { get; set; }
        public DateTime? Vencimiento { get; set; }
        public int? IdPrioridad { get; set; }
        public bool Estado { get; set; }
        public int? IdProspecto { get; set; }

        public int? IdUsuarioPropietario { get; set; }
        public DateTime? FechaCreacion { get; set; }
    }
}
