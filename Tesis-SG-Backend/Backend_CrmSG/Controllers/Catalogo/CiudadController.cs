// Controllers/Catalogos/CiudadController.cs
using Microsoft.AspNetCore.Mvc;
using Backend_CrmSG.Repositories;
using Microsoft.AspNetCore.Authorization;
using Backend_CrmSG.Models.Catalogos;

namespace Backend_CrmSG.Controllers.Catalogos
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CiudadController : ControllerBase
    {
        private readonly IRepository<Ciudad> _repo;

        public CiudadController(IRepository<Ciudad> repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ciudad>>> Get()
        {
            var lista = await _repo.GetAllAsync();
            return Ok(lista);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Ciudad>> Get(int id)
        {
            var item = await _repo.GetByIdAsync(id);
            if (item == null)
                return NotFound();
            return Ok(item);
        }

        [HttpGet("por-provincia/{idProvincia}")]
        public async Task<ActionResult<IEnumerable<Ciudad>>> GetPorProvincia(int idProvincia)
        {
            var lista = await _repo.GetByPropertyAsync(nameof(Ciudad.IdProvincia), idProvincia);
            return Ok(lista);
        }

        [HttpPost]
        public async Task<ActionResult<Ciudad>> Post([FromBody] Ciudad item)
        {
            await _repo.AddAsync(item);
            return CreatedAtAction(nameof(Get), new { id = item.IdCiudad }, item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Ciudad item)
        {
            if (id != item.IdCiudad)
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
