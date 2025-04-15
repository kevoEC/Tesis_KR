using System.ComponentModel.DataAnnotations;

namespace Backend_CrmSG.Models.Seguridad
{
    public class Permiso
    {
        [Key]
        public int IdPermiso { get; set; }

        // Nombre o clave del permiso (por ejemplo, "VerDashboard", "EditarUsuario", etc.)
        public string Nombre { get; set; }

        // Descripción opcional del permiso
        public string? Descripcion { get; set; }

        // Estado del permiso (activo/inactivo)
        public bool Estado { get; set; }
    }
}
