namespace Backend_CrmSG.DTOs
{
    public class ProyeccionUpdateDto
    {
        public int IdUsuario { get; set; }             // 👈 Usuario que hace la edición
        public int IdProyeccionAnterior { get; set; }  // 👈 ID de la proyección que vamos a desactivar
        public int IdProducto { get; set; }
        public decimal Capital { get; set; }
        public decimal? AporteAdicional { get; set; }
        public short Plazo { get; set; }
        public DateTime FechaInicial { get; set; }

        public int IdOrigenCapital { get; set; }
        public int? IdOrigenIncremento { get; set; }

        public int? IdSolicitudInversion { get; set; }

        public decimal? CosteOperativo { get; set; }
        public decimal? CosteNotarizacion { get; set; }
    }
}
