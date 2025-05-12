// Models/Catalogos/TipoDocumentoCatalogo.cs
using System.ComponentModel.DataAnnotations;

namespace Backend_CrmSG.Models.Catalogos
{
    public class TipoDocumentoCatalogo
    {
        [Key]
        public int IdTipoDocumento { get; set; }
        public string? NombreTipoDocumento { get; set; }
    }
}
