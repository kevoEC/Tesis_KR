namespace Backend_CrmSG.DTOs.SolicitudDTOs
{
    public class DatosGeneralesDTO
    {
        public int? IdGenero { get; set; }
        public string? NombreGenero { get; set; }

        public int? IdEstadoCivil { get; set; }
        public string? NombreEstadoCivil { get; set; }

        public int? IdNivelAcademico { get; set; }
        public string? NombreNivelAcademico { get; set; }

        public int? NumeroCargasFamiliares { get; set; }

        public int? IdNacionalidad { get; set; }
        public string? NombreNacionalidad { get; set; }

        public int? IdProfesion { get; set; }
        public string? NombreProfesion { get; set; }

        public int? IdEtnia { get; set; }
        public string? NombreEtnia { get; set; }

        public DateTime? FechaNacimiento { get; set; } // ← nuevo campo agregado
    }
}
