using System.ComponentModel.DataAnnotations;

namespace Backend_CrmSG.Models.Seguridad
{
    public class Menu
    {
        [Key]
        public int IdMenu { get; set; }

        // Nombre del menú (por ejemplo, "Dashboard", "Ventas", etc.)
        public string? Nombre { get; set; }

        // URL o ruta asociada al menú
        public string? Url { get; set; }

        // Icono o imagen (opcional)
        public string? Icono { get; set; }

        // Orden de aparición en la vista
        public int Orden { get; set; }

        // Estado del menú (activo/inactivo)
        public bool Estado { get; set; }
    }
}
