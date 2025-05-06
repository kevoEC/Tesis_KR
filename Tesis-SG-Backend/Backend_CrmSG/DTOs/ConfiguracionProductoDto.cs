namespace Backend_CrmSG.DTOs
{
    public class ConfiguracionProductoDto
    {
        public int IdConfiguraciones { get; set; }
        public decimal MontoMinimo { get; set; }
        public decimal MontoMaximo { get; set; }
        public short Plazo { get; set; }
        public decimal Taza { get; set; }
        public int IdOrigen { get; set; }
        public decimal? CosteOperativoEEUU { get; set; }
        public int IdTipoTasa { get; set; }
        public int IdProducto { get; set; }
        public string? NombreOrigen { get; set; }
        public string? NombreTipoTasa { get; set; }
    }
}
