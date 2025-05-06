using System.ComponentModel.DataAnnotations;

public class Documento
{
    [Key]
    public int IdDocumento { get; set; }

    public int? IdTipoDocumento { get; set; }
    public string? DocumentoNombre { get; set; }
    public byte[]? Archivo { get; set; } // 👈 cambiado de Documento → Archivo

    public int? IdTarea { get; set; }
    public int? IdSolicitudInversion { get; set; }
    public int? IdInversion { get; set; }

    public bool Activo { get; set; } = true;
    public string? Observaciones { get; set; }

    public DateTime FechaCreacion { get; set; }
}
