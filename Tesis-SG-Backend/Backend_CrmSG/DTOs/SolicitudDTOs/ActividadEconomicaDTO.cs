namespace Backend_CrmSG.DTOs.SolicitudDTOs
{
    public class ActividadEconomicaDTO
    {
        public int? IdActividadEconomicaPrincipal { get; set; }
        public string? NombreActividadEconomicaPrincipal { get; set; }

        public int? IdActividadEconomicaLugarTrabajo { get; set; }
        public string? NombreActividadEconomicaLugarTrabajo { get; set; }

        public string? LugarTrabajo { get; set; }
        public string? CorreoTrabajo { get; set; }
        public string? OtraActividadEconomica { get; set; }
        public string? Cargo { get; set; }
        public int? Antiguedad { get; set; }
        public string? TelefonoTrabajo { get; set; }
        public DateTime? FechaInicioActividad { get; set; }
        public string? DireccionTrabajo { get; set; }
        public string? ReferenciaDireccionTrabajo { get; set; }
        public bool? EsPEP { get; set; }
    }

}
