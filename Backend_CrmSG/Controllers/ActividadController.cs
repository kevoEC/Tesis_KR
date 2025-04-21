using Backend_CrmSG.Data;
using Backend_CrmSG.DTOs;
using Backend_CrmSG.Models;
using Backend_CrmSG.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace TesisBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActividadController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IActividadService _actividadService;

        public ActividadController(AppDbContext context, IActividadService actividadService)
        {
            _context = context;
            _actividadService = actividadService;
        }

        // POST: api/actividad/filtradas
        [HttpPost("filtradas")]
        public async Task<IActionResult> ObtenerFiltradas([FromBody] ActividadFiltroDto filtro)
        {
            var result = await _actividadService.ObtenerFiltradasAsync(filtro);
            return Ok(result);
        }

        // GET: api/Actividad
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Actividad>>> Get()
        {
            return await _context.Actividad.ToListAsync();
        }

        // GET: api/Actividad/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Actividad>> Get(int id)
        {
            var actividad = await _context.Actividad.FindAsync(id);
            if (actividad == null)
            {
                return NotFound();
            }
            return actividad;
        }

        // POST: api/Actividad
        [HttpPost]
        public async Task<ActionResult<Actividad>> Post(Actividad actividad)
        {
            _context.Actividad.Add(actividad);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = actividad.IdActividad }, actividad);
        }

        // PUT: api/Actividad/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Actividad actividad)
        {
            if (id != actividad.IdActividad)
            {
                return BadRequest();
            }

            _context.Entry(actividad).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActividadExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        // DELETE: api/Actividad/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var actividad = await _context.Actividad.FindAsync(id);
            if (actividad == null)
            {
                return NotFound();
            }

            _context.Actividad.Remove(actividad);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool ActividadExists(int id)
        {
            return _context.Actividad.Any(e => e.IdActividad == id);
        }
    }
}
