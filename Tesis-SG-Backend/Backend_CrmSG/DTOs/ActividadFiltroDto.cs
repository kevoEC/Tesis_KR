namespace Backend_CrmSG.DTOs
{
    public class ActividadFiltroDto
    {
        public int? IdProspecto { get; set; }
        public bool? Estado { get; set; }
        public bool SoloMisRegistros { get; set; } = false;
        public int? IdUsuario { get; set; }
        public string? Busqueda { get; set; }
    }
}
