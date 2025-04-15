using System.ComponentModel.DataAnnotations;

namespace Backend_CrmSG.Models.Catalogos
{
    public class ProductoInteres
    {
        // Este campo es la clave primaria; si está configurada como identidad en la base de datos,
        // no es necesario que el cliente la envíe en la creación.
        [Key]
        public int IdProductoInteres { get; set; }
        public string? Nombre { get; set; }
    }
}
