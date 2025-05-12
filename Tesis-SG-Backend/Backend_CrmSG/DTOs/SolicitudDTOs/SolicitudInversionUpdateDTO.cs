namespace Backend_CrmSG.DTOs.SolicitudDTOs
{
    public class SolicitudInversionUpdateDTO
    {
        public int IdSolicitudInversion { get; set; }
        public int IdUsuarioPropietario { get; set; }
        public int IdProspecto { get; set; }
        public int? IdCliente { get; set; }

        public IdentificacionUpdateDTO? Identificacion { get; set; }
        public ProyeccionUpdateDTO? Proyeccion { get; set; }
        public DatosGeneralesUpdateDTO? DatosGenerales { get; set; }
        public ActividadEconomicaUpdateDTO? ActividadEconomica { get; set; }
        public DatosEconomicosUpdateDTO? DatosEconomicos { get; set; }
        public ContactoUbicacionUpdateDTO? ContactoUbicacion { get; set; }
        public BancoUpdateDTO? Banco { get; set; }
        public FinalizacionUpdateDTO? Finalizacion { get; set; }
        public AdjuntosUpdateDTO? Adjuntos { get; set; }
    }

    public class IdentificacionUpdateDTO
    {
        public int TipoSolicitud { get; set; }
        public int TipoCliente { get; set; }
        public int TipoDocumento { get; set; }
        public string? NumeroDocumento { get; set; }
        public string? Nombres { get; set; }
        public string? ApellidoPaterno { get; set; }
        public string? ApellidoMaterno { get; set; }
        public bool Validar { get; set; }
        public string? Equifax { get; set; }
        public string? ObsEquifax { get; set; }
        public string? ListasControl { get; set; }
        public string? ObsListasControl { get; set; }
        public int? Continuar { get; set; }
    }

    public class ProyeccionUpdateDTO
    {
        public int? IdAsesorComercial { get; set; }
        public int? IdProyeccionSeleccionada { get; set; }
        public int? IdJustificativoTransaccion { get; set; }
        public string? OrigenFondos { get; set; }
        public bool? EnviarProyeccion { get; set; }
        public bool? ClienteAcepta { get; set; }
    }

    public class DatosGeneralesUpdateDTO
    {
        public DateTime? FechaNacimiento { get; set; }
        public int? IdGenero { get; set; }
        public int? IdEstadoCivil { get; set; }
        public int? IdNivelAcademico { get; set; }
        public int? NumeroCargasFamiliares { get; set; }
        public int? IdNacionalidad { get; set; }
        public int? IdProfesion { get; set; }
        public int? IdEtnia { get; set; }
    }

    public class ActividadEconomicaUpdateDTO
    {
        public int? IdActividadEconomicaPrincipal { get; set; }
        public int? IdActividadEconomicaLugarTrabajo { get; set; }
        public string? LugarTrabajo { get; set; }
        public string? CorreoTrabajo { get; set; }
        public string? OtraActividadEconomica { get; set; }
        public string? Cargo { get; set; }
        public int? Antiguedad { get; set; }
        public string? TelefonoTrabajo { get; set; }
        public DateTime? FechaInicioActividad { get; set; }
        public string? DireccionTrabajo { get; set; }
        public string? ReferenciaDireccionTrabajo { get; set; }
        public bool? EsPEP { get; set; }
    }

    public class DatosEconomicosUpdateDTO
    {
        public decimal? TotalIngresosMensuales { get; set; }
        public decimal? TotalEgresosMensuales { get; set; }
        public decimal? TotalActivos { get; set; }
        public decimal? TotalPasivos { get; set; }
        public decimal? ActivosMuebles { get; set; }
        public decimal? ActivosInmuebles { get; set; }
        public decimal? ActivosTitulosValor { get; set; }
        public decimal? IngresosFijos { get; set; }
        public decimal? IngresosVariables { get; set; }
        public string? OrigenIngresoVariable { get; set; }
        public decimal? PatrimonioNeto { get; set; }
    }

    public class ContactoUbicacionUpdateDTO
    {
        public string? CorreoElectronico { get; set; }
        public string? OtroTelefono { get; set; }
        public string? TelefonoCelular { get; set; }
        public string? TelefonoFijo { get; set; }
        public int? IdTipoVia { get; set; }
        public string? CallePrincipal { get; set; }
        public string? NumeroDomicilio { get; set; }
        public string? CalleSecundaria { get; set; }
        public string? ReferenciaDomicilio { get; set; }
        public string? SectorBarrio { get; set; }
        public int? TiempoResidencia { get; set; }
        public int? IdPaisResidencia { get; set; }
        public int? IdProvinciaResidencia { get; set; }
        public int? IdCiudadResidencia { get; set; }
        public bool? ResidenteOtroPais { get; set; }
        public bool? ContribuyenteEEUU { get; set; }
        public string? NumeroIdentificacionOtroPais { get; set; }
        public string? NumeroIdentificacionEEUU { get; set; }
    }

    public class BancoUpdateDTO
    {
        public int? IdBanco { get; set; }
        public int? IdTipoCuenta { get; set; }
        public string? NumeroCuenta { get; set; }
    }

    public class FinalizacionUpdateDTO
    {
        public string? NumeroContrato { get; set; }
        public int? IdContinuarSolicitud { get; set; }
        public string? MotivoFinalizacion { get; set; }
        public string? ObservacionFinalizacion { get; set; }
        public bool? Confirmar { get; set; }
    }

    public class AdjuntosUpdateDTO
    {
        public int? IdModoFirma { get; set; }
        public bool? VerDocumentosRequeridos { get; set; }
        public bool? ConfirmaCargaDocumentosCorrectos { get; set; }
    }
}
