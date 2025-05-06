using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend_CrmSG.Models.Catalogos;
using Backend_CrmSG.Services.Catalogos;

namespace Backend_CrmSG.Controllers.Catalogos
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoInteresController : ControllerBase
    {
        private readonly IProductoInteresService _productoInteresService;

        public ProductoInteresController(IProductoInteresService productoInteresService)
        {
            _productoInteresService = productoInteresService;
        }

        // GET: api/ProductoInteres
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductoInteres>>> Get()
        {
            var productos = await _productoInteresService.GetAllAsync();
            return Ok(productos);
        }

        // GET: api/ProductoInteres/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductoInteres>> Get(int id)
        {
            var producto = await _productoInteresService.GetByIdAsync(id);
            if (producto == null)
                return NotFound();
            return Ok(producto);
        }

        // POST: api/ProductoInteres
        [HttpPost]
        public async Task<ActionResult<ProductoInteres>> Post([FromBody] ProductoInteres productoInteres)
        {
            await _productoInteresService.AddAsync(productoInteres);
            return CreatedAtAction(nameof(Get), new { id = productoInteres.IdProductoInteres }, productoInteres);
        }

        // PUT: api/ProductoInteres/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] ProductoInteres productoInteres)
        {
            if (id != productoInteres.IdProductoInteres)
                return BadRequest();
            await _productoInteresService.UpdateAsync(productoInteres);
            return NoContent();
        }

        // DELETE: api/ProductoInteres/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _productoInteresService.DeleteAsync(id);
            return NoContent();
        }
    }
}
