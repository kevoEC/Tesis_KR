namespace Backend_CrmSG.DTOs
{
    public class ProyeccionCreateDto
    {
        public int IdProducto { get; set; }
        public decimal Capital { get; set; }
        public decimal? AporteAdicional { get; set; }
        public short Plazo { get; set; }
        public DateTime FechaInicial { get; set; }

        public int IdOrigenCapital { get; set; }
        public int? IdOrigenIncremento { get; set; }

        public int? IdSolicitudInversion { get; set; } // Opcional, solo si la proyección nace de una solicitud existente

        // Opcionales si deseas personalizar la proyección
        public decimal? CosteOperativo { get; set; }
        public decimal? CosteNotarizacion { get; set; }
    }
}
