namespace Backend_CrmSG.DTOs
{
    public class DocumentoCargaDto
    {
        public int IdTipoDocumento { get; set; }
        public int? IdTarea { get; set; }
        public int? IdSolicitudInversion { get; set; }
        public int? IdInversion { get; set; }
        public string DocumentoNombre { get; set; } = string.Empty;
        public string Base64Contenido { get; set; } = string.Empty;
        public string? Observaciones { get; set; }
    }
}
