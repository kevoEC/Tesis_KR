namespace Backend_CrmSG.DTOs
{
    public class CronogramaCuotaDto
    {
        public int Periodo { get; set; }

        public DateTime FechaInicial { get; set; }
        public DateTime FechaVencimiento { get; set; }

        public decimal Capital { get; set; }
        public decimal CapitalOperacion { get; set; }

        public decimal AporteMensual { get; set; }
        public decimal AporteAdicional { get; set; }

        public decimal AporteOperacion { get; set; }
        public decimal AporteOperacionAdicional { get; set; }

        public decimal MontoOperacion { get; set; }

        public decimal Tasa { get; set; }

        public decimal Rentabilidad { get; set; }
        public decimal RentaPeriodo { get; set; }
        public decimal RentaAcumulada { get; set; }
        public decimal RentaAcumuladaNoPagada { get; set; }
        public decimal RentaPendientePagar { get; set; }

        public decimal CostoOperativo { get; set; }
        public decimal CostoNotarizacion { get; set; }

        public decimal CapitalRenta { get; set; }
        public decimal CapitalFinal { get; set; }

        public decimal MontoPagar { get; set; }

        public bool PagaRenta { get; set; }
        public bool UltimaCuota { get; set; }
    }
}
