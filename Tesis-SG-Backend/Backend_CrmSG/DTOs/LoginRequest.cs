namespace Backend_CrmSG.DTOs
{
    public class LoginRequest
    {
        public string Email { get; set; }
        public string Contraseña { get; set; }
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
        public string Email { get; set; }
        public string NombreCompleto { get; set; }
        public string Identificacion { get; set; }
    }

    public class PermisoDto
    {
        public int Menu { get; set; }
        public string Nombre { get; set; }
        public string Ruta { get; set; }
        public string Icono { get; set; }
        public int Permiso { get; set; }
    }

}
