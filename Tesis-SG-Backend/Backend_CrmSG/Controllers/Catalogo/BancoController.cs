// Controllers/Catalogos/BancoController.cs
using Microsoft.AspNetCore.Mvc;
using Backend_CrmSG.Models.Catalogos;
using Backend_CrmSG.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace Backend_CrmSG.Controllers.Catalogos
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BancoController : ControllerBase
    {
        private readonly IRepository<Banco> _repo;

        public BancoController(IRepository<Banco> repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> Get()
        {
            var bancos = await _repo.GetAllAsync();

            // Solo retornamos IdBanco y BancoNombre
            var lista = bancos.Select(b => new { b.IdBanco, b.BancoNombre });
            return Ok(lista);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Banco>> Get(int id)
        {
            var banco = await _repo.GetByIdAsync(id);
            if (banco == null)
                return NotFound();
            return Ok(banco);
        }

        [HttpPost]
        public async Task<ActionResult<Banco>> Post([FromBody] Banco banco)
        {
            await _repo.AddAsync(banco);
            return CreatedAtAction(nameof(Get), new { id = banco.IdBanco }, banco);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Banco banco)
        {
            if (id != banco.IdBanco)
                return BadRequest();
            await _repo.UpdateAsync(banco);
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
