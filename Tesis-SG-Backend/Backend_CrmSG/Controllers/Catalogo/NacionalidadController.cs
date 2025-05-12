// Controllers/Catalogos/NacionalidadController.cs
using Microsoft.AspNetCore.Mvc;
using Backend_CrmSG.Repositories;
using Microsoft.AspNetCore.Authorization;
using Backend_CrmSG.Models.Catalogos;

namespace Backend_CrmSG.Controllers.Catalogo
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class NacionalidadController : ControllerBase
    {
        private readonly IRepository<Nacionalidad> _repo;

        public NacionalidadController(IRepository<Nacionalidad> repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Nacionalidad>>> Get()
        {
            var lista = await _repo.GetAllAsync();
            return Ok(lista);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Nacionalidad>> Get(int id)
        {
            var item = await _repo.GetByIdAsync(id);
            if (item == null)
                return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public async Task<ActionResult<Nacionalidad>> Post([FromBody] Nacionalidad item)
        {
            await _repo.AddAsync(item);
            return CreatedAtAction(nameof(Get), new { id = item.IdNacionalidad }, item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Nacionalidad item)
        {
            if (id != item.IdNacionalidad)
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
