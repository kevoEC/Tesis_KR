namespace Backend_CrmSG.DTOs
{
    public class SolicitudInversionFiltroDto
    {
        public string? Identificacion { get; set; }
        public int? IdTipoSolicitud { get; set; }
        public int? IdTipoCliente { get; set; }
        public bool SoloMisRegistros { get; set; } = false;
        public int? IdUsuario { get; set; }
        public string? Busqueda { get; set; }
    }

}
