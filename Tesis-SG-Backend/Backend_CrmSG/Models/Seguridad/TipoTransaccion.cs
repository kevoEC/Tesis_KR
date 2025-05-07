using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Backend_CrmSG.Models.Seguridad
{
    public class TipoTransaccion
    {
        [Key]
        public int IdTipoTransaccion { get; set; }

        public string Nombre { get; set; }
        public string? Descripcion { get; set; }

        // Navegación opcional
        public ICollection<TransaccionesValidacion> Transacciones { get; set; }
    }
}
