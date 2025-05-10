namespace Backend_CrmSG.Models.Vistas
{
    public class ActividadDetalle
    {
        public int IdActividad { get; set; }
        public string? Asunto { get; set; }
        public string? Descripcion { get; set; }
        public TimeSpan? Duracion { get; set; }
        public DateTime? Vencimiento { get; set; }
        public bool Estado { get; set; }

        public int? IdTipoActividad { get; set; }
        public string? NombreTipoActividad { get; set; }

        public int? IdPrioridad { get; set; }
        public string? NombrePrioridad { get; set; }

        public int? IdProspecto { get; set; }
        public string? NombreCompletoProspecto { get; set; }

        public int? IdUsuarioPropietario { get; set; }
        public string? NombreCompletoPropietario { get; set; }

        public int? IdUsuarioCreacion { get; set; }
        public string? NombreCompletoCreacion { get; set; }

        public int? IdUsuarioModificacion { get; set; }
        public string? NombreCompletoModificacion { get; set; }

        public DateTime? FechaCreacion { get; set; }
        public DateTime? FechaModificacion { get; set; }
    }
}
