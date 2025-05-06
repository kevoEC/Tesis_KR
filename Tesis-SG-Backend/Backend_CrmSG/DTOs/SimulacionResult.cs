using System;
using System.Collections.Generic;

namespace Backend_CrmSG.DTOs
{
    public class SimulacionResult
    {
        public DateTime FechaInicio { get; set; }
        public DateTime? FechaIncremento { get; set; }

        public decimal TotalAporteAdicional { get; set; }
        public decimal TotalRentaPeriodo { get; set; }
        public decimal TotalCosteOperativo { get; set; }
        public decimal TotalRentabilidad { get; set; }
        public decimal RendimientoCapital { get; set; }
        public decimal ValorProyectadoLiquidar { get; set; }

        public List<CronogramaCuotaDto> Cronograma { get; set; } = new();
    }
}
