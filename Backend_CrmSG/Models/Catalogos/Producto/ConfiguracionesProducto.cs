using System.ComponentModel.DataAnnotations;

namespace Backend_CrmSG.Models.Catalogos.Producto
{
    public class ConfiguracionesProducto
    {
        [Key]
        public int IdConfiguraciones { get; set; }

        public decimal MontoMinimo { get; set; }
        public decimal MontoMaximo { get; set; }
        public short Plazo { get; set; }
        public decimal Taza { get; set; }

        public int IdOrigen { get; set; }
        public int IdTipoTasa { get; set; }
        public int IdProducto { get; set; }

        public decimal? CosteOperativoEEUU { get; set; }

        public int IdUsuarioCreacion { get; set; }
        public DateTime FechaCreacion { get; set; }

        public int? IdUsuarioModificacion { get; set; }
        public DateTime? FechaModificacion { get; set; }
    }
}
