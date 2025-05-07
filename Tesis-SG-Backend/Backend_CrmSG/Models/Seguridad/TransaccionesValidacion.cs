using System;

namespace Backend_CrmSG.Models.Seguridad
{
    public class TransaccionesValidacion
    {
        public int IdTransaccion { get; set; }
        public int IdUsuario { get; set; }
        public int IdTipoTransaccion { get; set; }

        public string HashValidacion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime Expiracion { get; set; }
        public string Operacion { get; set; }
        public bool Exitoso { get; set; }
        public string? Detalle { get; set; }

        // Relaciones
        public Usuario Usuario { get; set; }
        public TipoTransaccion TipoTransaccion { get; set; }
    }
}
