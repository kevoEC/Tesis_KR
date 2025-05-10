using Backend_CrmSG.DTOs.Solicitudes;

namespace Backend_CrmSG.DTOs.SolicitudDTOs
{
    public class SolicitudInversionDTO
    {
        public IdentificacionDTO? Identificacion { get; set; }
        public ProyeccionDTO? Proyeccion { get; set; }
        public DatosGeneralesDTO? DatosGenerales { get; set; }
        public ActividadEconomicaDTO? ActividadEconomica { get; set; }
        public DatosEconomicosDTO? DatosEconomicos { get; set; }
        public ContactoUbicacionDTO? ContactoUbicacion { get; set; }
        public BancoDTO? Banco { get; set; }
        public FinalizacionDTO? Finalizacion { get; set; }
        public AdjuntosDTO? Adjuntos { get; set; }
    }

}
