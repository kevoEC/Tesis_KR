using Microsoft.AspNetCore.Mvc;
using Backend_CrmSG.Repositories;
using Backend_CrmSG.Models.Vistas;

namespace Backend_CrmSG.Controllers.Vistas
{
    [Route("api/vista")]
    [ApiController]
    public class VistaEntidadController : ControllerBase
    {
        private readonly IServiceProvider _serviceProvider;

        public VistaEntidadController(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        [HttpGet("{entidad}/filtrar")]
        public async Task<IActionResult> FiltrarVista([FromRoute] string entidad, [FromQuery] string por, [FromQuery] int id)
        {
            // Mapear nombres de vistas a sus modelos
            var mapa = new Dictionary<string, Type>(StringComparer.OrdinalIgnoreCase)
            {
                { "actividad", typeof(Models.Vistas.ActividadDetalle) },
                // Agrega aquí otras vistas como:
                // { "solicitud", typeof(SolicitudInversionDetalle) }
            };

            if (!mapa.TryGetValue(entidad, out var tipoEntidad))
            {
                return BadRequest(new { success = false, message = $"Vista '{entidad}' no está registrada en el controlador." });
            }

            // Obtener el repositorio dinámicamente
            var repoType = typeof(IRepository<>).MakeGenericType(tipoEntidad);
            dynamic? repo = _serviceProvider.GetService(repoType);

            if (repo == null)
                return StatusCode(500, new { success = false, message = $"No se pudo resolver el repositorio para {tipoEntidad.Name}." });

            // Ejecutar GetByPropertyAsync dinámicamente
            var method = repoType.GetMethod("GetByPropertyAsync");
            if (method == null)
                return StatusCode(500, new { success = false, message = "Método GetByPropertyAsync no disponible." });

            var task = (Task)method.Invoke(repo, new object[] { por, id })!;
            await task.ConfigureAwait(false);

            var resultProperty = task.GetType().GetProperty("Result");
            var result = resultProperty?.GetValue(task);

            return Ok(result);
        }

        [HttpGet("{entidad}")]
        public async Task<IActionResult> GetTodos(string entidad)
        {
            var mapa = new Dictionary<string, Type>(StringComparer.OrdinalIgnoreCase)
    {
        { "actividad", typeof(ActividadDetalle) },
        { "prospecto", typeof(ProspectoDetalle) },
        // Agrega más vistas aquí si lo deseas
    };

            if (!mapa.TryGetValue(entidad, out var tipoEntidad))
            {
                return BadRequest(new
                {
                    success = false,
                    message = $"Entidad '{entidad}' no está registrada. Las disponibles son: {string.Join(", ", mapa.Keys)}"
                });
            }


            var repoType = typeof(IRepository<>).MakeGenericType(tipoEntidad);
            dynamic? repo = _serviceProvider.GetService(repoType);

            if (repo == null)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = $"No se pudo resolver el repositorio para '{tipoEntidad.Name}'",
                    tipo = tipoEntidad.FullName
                });
            }


            IEnumerable<object> resultados = await repo.GetAllAsync();
            return Ok(resultados);
        }

    }
}
