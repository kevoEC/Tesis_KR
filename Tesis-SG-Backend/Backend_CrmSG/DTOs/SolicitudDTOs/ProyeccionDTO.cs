namespace Backend_CrmSG.DTOs.SolicitudDTOs
{
    public class ProyeccionDTO
    {
        public int? IdAsesorComercial { get; set; }
        public string? NombreAsesorComercial { get; set; }

        public int? IdProyeccionSeleccionada { get; set; }
        public string? ProyeccionNombre { get; set; }

        public int? IdJustificativoTransaccion { get; set; }
        public string? NombreJustificativoTransaccion { get; set; }

        public string? OrigenFondos { get; set; }

        public bool? EnviarProyeccion { get; set; }

        public bool? ClienteAcepta { get; set; }
    }

}
