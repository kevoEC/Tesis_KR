namespace Backend_CrmSG.DTOs.SolicitudDTOs
{
    public class AdjuntosDTO
    {
        public int? IdModoFirma { get; set; }
        public string? NombreModoFirma { get; set; }

        public bool? VerDocumentosRequeridos { get; set; }
        public bool? ConfirmaCargaDocumentosCorrectos { get; set; }
    }

}
