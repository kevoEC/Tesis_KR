using System.ComponentModel.DataAnnotations;

namespace Backend_CrmSG.Models.Catalogos.Producto
{
    public class Producto
    {
        [Key]
        public int IdProducto { get; set; }

        [StringLength(64)]  // en vez de 128
        public string? ProductoNombre { get; set; }

        [StringLength(64)]  // en vez de 128
        public string? NombreComercial { get; set; }

        [StringLength(32)]  // en vez de 16
        public string? ProductoCodigo { get; set; }

        [StringLength(8)]  // en vez de 16
        public string? Iniciales { get; set; }

        public string? Descripcion { get; set; }

        public int IdFormaPago { get; set; } // FK hacia tabla FormaPago

        public short Periocidad { get; set; }

        public decimal? MontoMinimoIncremento { get; set; }

        public decimal? Penalidad { get; set; }

        public int IdUsuarioCreacion { get; set; }

        public DateTime FechaCreacion { get; set; }

        public int? IdUsuarioModificacion { get; set; }

        public DateTime? FechaModificacion { get; set; }
    }
}

