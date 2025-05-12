// Models/Catalogos/Banco.cs
using System.ComponentModel.DataAnnotations;

namespace Backend_CrmSG.Models.Catalogos
{
    public class Banco
    {
        [Key]
        public int IdBanco { get; set; }
        public int? IdTipoBanco { get; set; }
        public string? BancoNombre { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public int? IdUsuarioCreacion { get; set; }
        public int? IdUsuarioModificacion { get; set; }
        public string? CodigoBanco { get; set; }
    }
}
