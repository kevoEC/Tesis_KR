namespace Backend_CrmSG.Models.Vistas
{
    public class ProyeccionDetalle
    {
        public int IdProyeccion { get; set; }
        public string? ProyeccionNombre { get; set; }
        public DateTime FechaInicial { get; set; }
        public DateTime FechaVencimiento { get; set; }
        public decimal Tasa { get; set; }
        public decimal Capital { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int? IdSolicitudInversion { get; set; }

        // Nuevos campos calculados desde joins
        public string? NombreUsuarioCreacion { get; set; }
        public string? NombreUsuarioModificacion { get; set; }
    }
}
