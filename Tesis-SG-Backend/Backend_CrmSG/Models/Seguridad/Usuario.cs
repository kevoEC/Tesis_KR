using System.ComponentModel.DataAnnotations;

public class Usuario
{
    [Key]
    public int IdUsuario { get; set; }

    public string? PrimerNombre { get; set; }
    public string? SegundoNombre { get; set; }
    public string? PrimerApellido { get; set; }
    public string? SegundoApellido { get; set; }

    public string Email { get; set; } = null!;
    public string? Contraseña { get; set; }
    public string Identificacion { get; set; } = null!;
    public string? Telefono { get; set; }

    public bool EsActivo { get; set; }
    public bool ValidacionCorreo { get; set; }
    public bool ValidacionTelefono { get; set; }
    public bool AceptoTerminosCondiciones { get; set; }

    public int? IdUsuarioCreacion { get; set; }
    public DateTime? FechaCreacion { get; set; }
    public int? IdUsuarioModificacion { get; set; }
    public DateTime? FechaModificacion { get; set; }
}
