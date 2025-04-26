using Backend_CrmSG.DTOs;

namespace Backend_CrmSG.Services
{
    public class SimuladorProyeccionService
    {
        public SimulacionResult ObtenerSimulacion(SimulacionRequest request)
        {
            var cronogramalist = new List<CronogramaCuotaDto>();

            decimal capital = request.Capital;
            DateTime fechaInicio = request.FechaInicial;
            short plazo = request.Plazo;
            decimal tasa = request.Tasa;
            decimal aporteAdicional = request.AporteAdicional;
            decimal costeNotarizacion = request.CosteNotarizacion;
            bool origenEsLocal = request.IdOrigenCapital == 1;
            int periodicidad = request.Periodicidad;

            decimal totalRentabilidad = 0;
            decimal totalCosteOperativo = 0;
            decimal totalRentaPeriodo = 0;
            decimal totalAporteAdicional = 0;
            DateTime? fechaIncremento = null;

            decimal rentabilidadAcumuladaParaCoste = 0;
            decimal rentaAcumuladaReal = 0;

            int periodosDesdeInicio = origenEsLocal ? -1 : 0;

            for (int i = 0; i < plazo; i++)
            {
                var cuota = new CronogramaCuotaDto
                {
                    Periodo = i + 1,
                    FechaInicial = fechaInicio.AddMonths(i),
                    FechaVencimiento = fechaInicio.AddMonths(i + 1),
                    Tasa = tasa,
                    Capital = capital,
                    AporteMensual = 0,
                    AporteAdicional = (i == 0) ? aporteAdicional : 0,
                    UltimaCuota = (i + 1 == plazo)
                };

                cuota.AporteOperacion = cuota.AporteMensual;
                cuota.AporteOperacionAdicional = cuota.AporteAdicional;
                cuota.CapitalOperacion = cuota.Capital;
                cuota.MontoOperacion = cuota.CapitalOperacion + cuota.AporteOperacion + cuota.AporteOperacionAdicional;

                // RENTABILIDAD
                if (origenEsLocal && cuota.Periodo == 1)
                {
                    cuota.Rentabilidad = 0;
                }
                else
                {
                    cuota.Rentabilidad = decimal.Round(cuota.MontoOperacion * cuota.Tasa / 100, 2);
                }

                cuota.CostoNotarizacion = cuota.UltimaCuota ? costeNotarizacion : 0;

                rentabilidadAcumuladaParaCoste += cuota.Rentabilidad;

                // ¿Toca pagar renta en este período?
                bool tocaPagar = false;
                if (periodicidad == 0)
                {
                    tocaPagar = cuota.UltimaCuota;
                }
                else
                {
                    int ajusteLocal = origenEsLocal ? 1 : 0;

                    if ((periodosDesdeInicio + ajusteLocal) > 0 &&
                        ((periodosDesdeInicio + ajusteLocal) % periodicidad == 0 || cuota.UltimaCuota))
                    {
                        tocaPagar = true;
                    }
                }

                cuota.PagaRenta = tocaPagar;

                // COSTE OPERATIVO
                if (tocaPagar)
                {
                    cuota.CostoOperativo = decimal.Round(rentabilidadAcumuladaParaCoste * 0.05m, 2);
                }
                else
                {
                    cuota.CostoOperativo = 0;
                }

                // RENTA DEL PERIODO
                if (tocaPagar)
                {
                    cuota.RentaPeriodo = Math.Max(rentabilidadAcumuladaParaCoste - cuota.CostoOperativo, 0);
                    rentabilidadAcumuladaParaCoste = 0;
                }
                else
                {
                    cuota.RentaPeriodo = cuota.Rentabilidad;
                }

                // RENTA ACUMULADA
                rentaAcumuladaReal += cuota.RentaPeriodo;
                cuota.RentaAcumulada = rentaAcumuladaReal;

                // CAPITAL + RENTA
                cuota.CapitalRenta = cuota.Capital + cuota.Rentabilidad;

                // MONTO A PAGAR
                if (tocaPagar)
                {
                    if (cuota.UltimaCuota)
                    {
                        if (periodicidad == 0)
                        {
                            cuota.MontoPagar = cuota.CapitalRenta - cuota.CostoOperativo;
                        }
                        else
                        {
                            cuota.MontoPagar = cuota.Capital + cuota.RentaPeriodo;
                        }
                    }
                    else
                    {
                        cuota.MontoPagar = cuota.RentaPeriodo;
                    }
                }
                else
                {
                    cuota.MontoPagar = 0;
                }

                // CAPITAL FINAL
                if (periodicidad == 0)
                {
                    // En renta fija el capital crece
                    cuota.CapitalFinal = cuota.UltimaCuota ? 0 : cuota.Capital + cuota.RentaPeriodo;
                }
                else
                {
                    cuota.CapitalFinal = cuota.UltimaCuota ? 0 : cuota.Capital;
                }

                // Registrar incremento si aplica
                if (cuota.AporteAdicional > 0 && fechaIncremento == null)
                    fechaIncremento = cuota.FechaInicial;

                cronogramalist.Add(cuota);

                totalRentabilidad += cuota.Rentabilidad;
                totalCosteOperativo += cuota.CostoOperativo;
                totalRentaPeriodo += cuota.RentaPeriodo;
                totalAporteAdicional += cuota.AporteAdicional;

                capital = cuota.CapitalFinal;
                periodosDesdeInicio++;
            }

            return new SimulacionResult
            {
                FechaInicio = request.FechaInicial,
                FechaIncremento = fechaIncremento,
                TotalAporteAdicional = totalAporteAdicional,
                TotalRentaPeriodo = totalRentaPeriodo,
                TotalCosteOperativo = totalCosteOperativo,
                TotalRentabilidad = totalRentabilidad,
                RendimientoCapital = cronogramalist.Last().CapitalRenta,
                ValorProyectadoLiquidar = cronogramalist.Last().MontoPagar,
                Cronograma = cronogramalist
            };
        }
    }
}
