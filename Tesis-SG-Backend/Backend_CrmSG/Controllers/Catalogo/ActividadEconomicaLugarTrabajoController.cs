// Controllers/Catalogos/ActividadEconomicaLugarTrabajoController.cs
using Microsoft.AspNetCore.Mvc;
using Backend_CrmSG.Models.Catalogos;
using Backend_CrmSG.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace Backend_CrmSG.Controllers.Catalogos
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ActividadEconomicaLugarTrabajoController : ControllerBase
    {
        private readonly IRepository<ActividadEconomicaLugarTrabajo> _repo;

        public ActividadEconomicaLugarTrabajoController(IRepository<ActividadEconomicaLugarTrabajo> repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActividadEconomicaLugarTrabajo>>> Get()
        {
            var lista = await _repo.GetAllAsync();
            return Ok(lista);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ActividadEconomicaLugarTrabajo>> Get(int id)
        {
            var item = await _repo.GetByIdAsync(id);
            if (item == null)
                return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public async Task<ActionResult<ActividadEconomicaLugarTrabajo>> Post([FromBody] ActividadEconomicaLugarTrabajo item)
        {
            await _repo.AddAsync(item);
            return CreatedAtAction(nameof(Get), new { id = item.IdActividadEconomicaLugarTrabajo }, item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] ActividadEconomicaLugarTrabajo item)
        {
            if (id != item.IdActividadEconomicaLugarTrabajo)
                return BadRequest();
            await _repo.UpdateAsync(item);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _repo.DeleteAsync(id);
            return NoContent();
        }
    }
}
