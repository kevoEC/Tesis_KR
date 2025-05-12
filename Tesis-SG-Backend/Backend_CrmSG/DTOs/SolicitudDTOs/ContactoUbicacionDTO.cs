namespace Backend_CrmSG.DTOs.SolicitudDTOs
{
    public class ContactoUbicacionDTO
    {
        // Contacto
        public string? CorreoElectronico { get; set; }
        public string? OtroTelefono { get; set; }
        public string? TelefonoCelular { get; set; }
        public string? TelefonoFijo { get; set; }

        // Ubicación
        public int? IdTipoVia { get; set; }
        public string? NombreTipoVia { get; set; }

        public string? CallePrincipal { get; set; }
        public string? NumeroDomicilio { get; set; }
        public string? CalleSecundaria { get; set; }
        public string? ReferenciaDomicilio { get; set; }
        public string? SectorBarrio { get; set; }
        public int? TiempoResidencia { get; set; }

        public int? IdPaisResidencia { get; set; }
        public string? NombrePaisResidencia { get; set; }

        public int? IdProvinciaResidencia { get; set; }
        public string? NombreProvinciaResidencia { get; set; }

        public int? IdCiudadResidencia { get; set; }
        public string? NombreCiudadResidencia { get; set; }

        public bool? ResidenteOtroPais { get; set; }
        public bool? ContribuyenteEEUU { get; set; }
        public string? NumeroIdentificacionOtroPais { get; set; }
        public string? NumeroIdentificacionEEUU { get; set; }
    }

}
