namespace Backend_CrmSG.Models.Vistas
{
    public class ProspectoDetalle
    {
        public int? IdProspecto { get; set; }
        public string? Nombres { get; set; }
        public string? ApellidoPaterno { get; set; }
        public string? ApellidoMaterno { get; set; }

        public int? IdTipoIdentificacion { get; set; }
        public string? TipoIdentificacion { get; set; }

        public int? IdOrigenCliente { get; set; }
        public string? NombreOrigen { get; set; }

        public int? IdProductoInteres { get; set; }
        public string? ProductoInteres { get; set; }

        public string? TelefonoCelular { get; set; }
        public string? CorreoElectronico { get; set; }

        public int? IdAgencia { get; set; }
        public string? Agencia { get; set; }

        public bool? Estado { get; set; }
        public bool EsCliente { get; set; }

        public DateTime? FechaCreacion { get; set; }
        public DateTime? FechaModificacion { get; set; }

        public int? IdUsuarioCreacion { get; set; }
        public string? UsuarioCreacion { get; set; }

        public int? IdUsuarioModificacion { get; set; }
        public string? UsuarioModificacion { get; set; }

        public int? IdUsuarioPropietario { get; set; }
        public string? UsuarioPropietario { get; set; }
    }
}
