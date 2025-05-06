using System;
using System.ComponentModel.DataAnnotations;

namespace Backend_CrmSG.Models.Seguridad
{
    public class Rol
    {
        [Key]
        public int IdRol { get; set; }

        public string Nombre { get; set; }

        // Campos de auditoría que se observan en la tabla
        public DateTime? FechaCreacion { get; set; }
        public int? IdUsuarioCreacion { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public int? IdUsuarioModificacion { get; set; }
    }
}
