using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend_CrmSG.Models.Seguridad
{
    public class UsuarioRol
    {
        public int IdUsuario { get; set; }
        public int IdRol { get; set; }

        // Puedes agregar otros campos opcionales si es necesario, por ejemplo, FechaAsignacion.
    }
}
