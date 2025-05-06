namespace Backend_CrmSG.DTOs
{
    public class ProspectoFiltroDto
    {
        public bool SoloMisRegistros { get; set; } = false;
        public int? IdUsuario { get; set; }
        public bool? Estado { get; set; }
        public string? Busqueda { get; set; }
    }
}
