using Backend_CrmSG.Data;
using Backend_CrmSG.DTOs;
using Backend_CrmSG.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace Backend_CrmSG.Services
{
    public class ProyeccionService
    {
        private readonly AppDbContext _context;
        private readonly SimuladorProyeccionService _simulador;

        public ProyeccionService(AppDbContext context, SimuladorProyeccionService simulador)
        {
            _context = context;
            _simulador = simulador;
        }

        public async Task<int> CrearProyeccionAsync(ProyeccionCreateDto dto, int idUsuario)
        {
            // 1. Obtener producto
            var producto = await _context.Producto.FindAsync(dto.IdProducto);
            if (producto == null)
                throw new Exception("Producto no encontrado");

            // 2. Obtener configuración válida
            var configuracion = await _context.ConfiguracionesProducto
                .Where(c =>
                    c.IdProducto == dto.IdProducto &&
                    c.Plazo == dto.Plazo &&
                    c.IdOrigen == dto.IdOrigenCapital &&
                    dto.Capital >= c.MontoMinimo &&
                    dto.Capital <= c.MontoMaximo)
                .FirstOrDefaultAsync();

            if (configuracion == null)
                throw new Exception("No hay configuración válida para los datos ingresados.");

            // 3. Crear la entidad base de Proyección
            var proyeccion = new Proyeccion
            {
                IdProducto = dto.IdProducto,
                Capital = dto.Capital,
                AporteAdicional = dto.AporteAdicional ?? 0,
                Plazo = dto.Plazo,
                FechaInicial = dto.FechaInicial,
                Tasa = configuracion.Taza,
                CosteOperativo = dto.CosteOperativo,
                CosteNotarizacion = dto.CosteNotarizacion ?? 0,
                IdConfiguracionesProducto = configuracion.IdConfiguraciones,
                IdOrigenCapital = dto.IdOrigenCapital,
                IdOrigenIncremento = dto.IdOrigenIncremento,
                IdSolicitudInversion = dto.IdSolicitudInversion,
                IdUsuarioCreacion = idUsuario,
                FechaCreacion = DateTime.Now,
                ProyeccionNombre = $"{producto.ProductoNombre} - ${dto.Capital} ({dto.Plazo} meses)"
            };

            _context.Proyeccion.Add(proyeccion);
            await _context.SaveChangesAsync(); // Se necesita el IdProyeccion generado

            // 4. Calcular cronograma
            var simulacion = _simulador.ObtenerSimulacion(new SimulacionRequest
            {
                Capital = dto.Capital,
                Plazo = dto.Plazo,
                FechaInicial = dto.FechaInicial,
                Tasa = configuracion.Taza,
                AporteAdicional = dto.AporteAdicional ?? 0,
                CosteOperativo = dto.CosteOperativo ?? 0,
                CosteNotarizacion = dto.CosteNotarizacion ?? 0,
                IdOrigenCapital = dto.IdOrigenCapital,               // 👈 Añadido aquí
                Periodicidad = producto.Periocidad, // 👈 Si es null, se usa 0
            });

            // 5. Guardar cronograma JSON en SP
            var json = JsonSerializer.Serialize(simulacion.Cronograma);
            await _context.Database.ExecuteSqlRawAsync(
                "EXEC sp_GuardarCronogramaProyeccion @p0, @p1",
                parameters: new object[] { proyeccion.IdProyeccion, json }
            );

            // 6. Actualizar totales en la proyección
            proyeccion.TotalRentabilidad = simulacion.TotalRentabilidad;
            proyeccion.TotalCosteOperativo = simulacion.TotalCosteOperativo;
            proyeccion.TotalRentaPeriodo = simulacion.TotalRentaPeriodo;
            proyeccion.RendimientosMasCapital = simulacion.RendimientoCapital;
            proyeccion.ValorProyectadoLiquidar = simulacion.ValorProyectadoLiquidar;
            proyeccion.TotalAporteAdicional = simulacion.TotalAporteAdicional;
            proyeccion.FechaIncremento = simulacion.FechaIncremento;
            proyeccion.FechaVencimiento = simulacion.FechaInicio.AddMonths(dto.Plazo);

            _context.Proyeccion.Update(proyeccion);
            await _context.SaveChangesAsync();

            return proyeccion.IdProyeccion;
        }

        public async Task<int> ActualizarProyeccionAsync(ProyeccionUpdateDto dto)
        {
            // 1. Buscar la proyección anterior (solo para saber ID)
            var proyeccionAnterior = await _context.Proyeccion
                .FirstOrDefaultAsync(p => p.IdProyeccion == dto.IdProyeccionAnterior);

            if (proyeccionAnterior == null)
                throw new Exception("La proyección anterior no fue encontrada.");

            // 2. Buscar el cronograma anterior y desactivarlo
            var cronogramaAnterior = await _context.CronogramaProyeccion
                .FirstOrDefaultAsync(c => c.IdProyeccion == dto.IdProyeccionAnterior && c.EsActivo);

            if (cronogramaAnterior == null)
                throw new Exception("No se encontró cronograma activo asociado a la proyección anterior.");

            cronogramaAnterior.EsActivo = false;
            _context.CronogramaProyeccion.Update(cronogramaAnterior);

            // 3. Buscar el producto
            var producto = await _context.Producto.FindAsync(dto.IdProducto);
            if (producto == null)
                throw new Exception("Producto no encontrado.");

            // 4. Buscar la configuración válida
            var configuracion = await _context.ConfiguracionesProducto
                .Where(c =>
                    c.IdProducto == dto.IdProducto &&
                    c.Plazo == dto.Plazo &&
                    c.IdOrigen == dto.IdOrigenCapital &&
                    dto.Capital >= c.MontoMinimo &&
                    dto.Capital <= c.MontoMaximo)
                .FirstOrDefaultAsync();

            if (configuracion == null)
                throw new Exception("No hay configuración válida para los datos ingresados.");

            // 5. Crear nueva proyección
            var nuevaProyeccion = new Proyeccion
            {
                IdProducto = dto.IdProducto,
                Capital = dto.Capital,
                AporteAdicional = dto.AporteAdicional ?? 0,
                Plazo = dto.Plazo,
                FechaInicial = dto.FechaInicial,
                Tasa = configuracion.Taza,
                CosteOperativo = dto.CosteOperativo,
                CosteNotarizacion = dto.CosteNotarizacion ?? 0,
                IdConfiguracionesProducto = configuracion.IdConfiguraciones,
                IdOrigenCapital = dto.IdOrigenCapital,
                IdOrigenIncremento = dto.IdOrigenIncremento,
                IdSolicitudInversion = dto.IdSolicitudInversion,
                IdUsuarioCreacion = dto.IdUsuario,
                FechaCreacion = DateTime.Now,
                ProyeccionNombre = $"{producto.ProductoNombre} - ${dto.Capital} ({dto.Plazo} meses)"
            };

            _context.Proyeccion.Add(nuevaProyeccion);
            await _context.SaveChangesAsync();

            // 6. Simular nuevo cronograma
            var simulacion = _simulador.ObtenerSimulacion(new SimulacionRequest
            {
                Capital = dto.Capital,
                Plazo = dto.Plazo,
                FechaInicial = dto.FechaInicial,
                Tasa = configuracion.Taza,
                AporteAdicional = dto.AporteAdicional ?? 0,
                CosteOperativo = dto.CosteOperativo ?? 0,
                CosteNotarizacion = dto.CosteNotarizacion ?? 0,
                IdOrigenCapital = dto.IdOrigenCapital,
                Periodicidad = producto.Periocidad
            });

            // 7. Crear nuevo cronograma
            var nuevoCronograma = new CronogramaProyeccion
            {
                IdProyeccion = nuevaProyeccion.IdProyeccion,
                PeriodosJson = JsonSerializer.Serialize(simulacion.Cronograma),
                FechaCreacion = DateTime.Now,
                EsActivo = true,
                Version = cronogramaAnterior.Version + 1
            };

            _context.CronogramaProyeccion.Add(nuevoCronograma);
            await _context.SaveChangesAsync();

            // 8. Actualizar totales de nueva proyección
            nuevaProyeccion.TotalRentabilidad = simulacion.TotalRentabilidad;
            nuevaProyeccion.TotalCosteOperativo = simulacion.TotalCosteOperativo;
            nuevaProyeccion.TotalRentaPeriodo = simulacion.TotalRentaPeriodo;
            nuevaProyeccion.RendimientosMasCapital = simulacion.RendimientoCapital;
            nuevaProyeccion.ValorProyectadoLiquidar = simulacion.ValorProyectadoLiquidar;
            nuevaProyeccion.TotalAporteAdicional = simulacion.TotalAporteAdicional;
            nuevaProyeccion.FechaIncremento = simulacion.FechaIncremento;
            nuevaProyeccion.FechaVencimiento = simulacion.FechaInicio.AddMonths(dto.Plazo);

            _context.Proyeccion.Update(nuevaProyeccion);
            await _context.SaveChangesAsync();

            return nuevaProyeccion.IdProyeccion;
        }

    }
}
