// Controllers/Catalogos/ActividadEconomicaPrincipalController.cs
using Microsoft.AspNetCore.Mvc;
using Backend_CrmSG.Models.Catalogos;
using Backend_CrmSG.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace Backend_CrmSG.Controllers.Catalogos
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ActividadEconomicaPrincipalController : ControllerBase
    {
        private readonly IRepository<ActividadEconomicaPrincipal> _repo;

        public ActividadEconomicaPrincipalController(IRepository<ActividadEconomicaPrincipal> repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActividadEconomicaPrincipal>>> Get()
        {
            var lista = await _repo.GetAllAsync();
            return Ok(lista);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ActividadEconomicaPrincipal>> Get(int id)
        {
            var item = await _repo.GetByIdAsync(id);
            if (item == null)
                return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public async Task<ActionResult<ActividadEconomicaPrincipal>> Post([FromBody] ActividadEconomicaPrincipal item)
        {
            await _repo.AddAsync(item);
            return CreatedAtAction(nameof(Get), new { id = item.IdActividadEconomicaPrincipal }, item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] ActividadEconomicaPrincipal item)
        {
            if (id != item.IdActividadEconomicaPrincipal)
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
