namespace Backend_CrmSG.DTOs
{
    public class LoginRequest
    {
        public required string Email { get; set; }
        public required string Contraseña { get; set; }
    }

    public class LoginResultDto
    {
        public UsuarioDto? Usuario { get; set; }
        public List<string> Roles { get; set; } = new();
        public List<PermisoDto> Permisos { get; set; } = new();
    }

    public class UsuarioDto
    {
        public int Id { get; set; }
        public required string Email { get; set; }
        public required string NombreCompleto { get; set; }
        public required string Identificacion { get; set; }
    }

    public class PermisoDto
    {
        public int Menu { get; set; }
        public required string Nombre { get; set; }
        public required string Ruta { get; set; }
        public required string Icono { get; set; }
        public required int Permiso { get; set; }
    }

}
