namespace Backend_CrmSG.DTOs.SolicitudDTOs
{
    public class BancoDTO
    {
        public int? IdBanco { get; set; }
        public string? BancoNombre { get; set; }

        public int? IdTipoCuenta { get; set; }
        public string? NombreTipoCuenta { get; set; }

        public string? NumeroCuenta { get; set; }
    }

}
