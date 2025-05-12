namespace Backend_CrmSG.DTOs.SolicitudDTOs
{
    public class FinalizacionDTO
    {
        public string? NumeroContrato { get; set; }

        public int? IdContinuarSolicitud { get; set; }
        public string? NombreContinuarSolicitud { get; set; }

        public string? MotivoFinalizacion { get; set; }
        public string? ObservacionFinalizacion { get; set; }

        public bool? Confirmar { get; set; }
    }

}
