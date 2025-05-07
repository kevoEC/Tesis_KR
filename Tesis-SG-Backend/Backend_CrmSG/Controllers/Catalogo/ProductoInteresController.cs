using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend_CrmSG.Models.Catalogos;
using Backend_CrmSG.Repositories;

namespace Backend_CrmSG.Controllers.Catalogos
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoInteresController : ControllerBase
    {
        private readonly IRepository<ProductoInteres> _repository;

        public ProductoInteresController(IRepository<ProductoInteres> repository)
        {
            _repository = repository;
        }

        // GET: api/ProductoInteres
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductoInteres>>> Get()
        {
            var productos = await _repository.GetAllAsync();
            return Ok(productos);
        }

        // GET: api/ProductoInteres/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductoInteres>> Get(int id)
        {
            var producto = await _repository.GetByIdAsync(id);
            if (producto == null)
                return NotFound();
            return Ok(producto);
        }

        // POST: api/ProductoInteres
        [HttpPost]
        public async Task<ActionResult<ProductoInteres>> Post([FromBody] ProductoInteres productoInteres)
        {
            await _repository.AddAsync(productoInteres);
            return CreatedAtAction(nameof(Get), new { id = productoInteres.IdProductoInteres }, productoInteres);
        }

        // PUT: api/ProductoInteres/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] ProductoInteres productoInteres)
        {
            if (id != productoInteres.IdProductoInteres)
                return BadRequest();
            await _repository.UpdateAsync(productoInteres);
            return NoContent();
        }

        // DELETE: api/ProductoInteres/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _repository.DeleteAsync(id);
            return NoContent();
        }
    }
}
