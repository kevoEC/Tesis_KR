namespace Backend_CrmSG.DTOs
{
    public class ProyeccionDetalleDto
    {
        public int IdProyeccion { get; set; }
        public string ProyeccionNombre { get; set; } = string.Empty;
        public int IdProducto { get; set; }
        public decimal Capital { get; set; }
        public decimal? AporteAdicional { get; set; }
        public short Plazo { get; set; }
        public DateTime FechaInicial { get; set; }
        public DateTime? FechaVencimiento { get; set; }
        public decimal Tasa { get; set; }
        public decimal? CosteOperativo { get; set; }
        public decimal? CosteNotarizacion { get; set; }
        public decimal? TotalRentabilidad { get; set; }
        public decimal? TotalCosteOperativo { get; set; }
        public decimal? TotalRentaPeriodo { get; set; }
        public decimal? RendimientosMasCapital { get; set; }
        public decimal? ValorProyectadoLiquidar { get; set; }
        public decimal? TotalAporteAdicional { get; set; }
        public DateTime? FechaIncremento { get; set; }
    }
}
