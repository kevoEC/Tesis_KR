namespace Backend_CrmSG.DTOs.Seguridad
{
    public class RegistroParcialDTO
    {
        public required string Email { get; set; }
        public required string Identificacion { get; set; }
        public bool TerminosAceptados { get; set; }

        public required string PrimerNombre { get; set; }
        public string? SegundoNombre { get; set; }
        public required string PrimerApellido { get; set; }
        public string? SegundoApellido { get; set; }

        public required string Contraseña { get; set; }
    }


}
