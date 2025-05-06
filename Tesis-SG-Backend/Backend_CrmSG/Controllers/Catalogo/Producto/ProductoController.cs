using Backend_CrmSG.Services;
using Backend_CrmSG.Services.Producto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Backend_CrmSG.Controllers.Producto
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ProductoController : ControllerBase
    {
        private readonly IProductoService _productoService;
        private readonly IConfiguracionProductoService _configuracionProductoService;

        public ProductoController(IProductoService productoService, IConfiguracionProductoService configuracionProductoService)
        {
            _productoService = productoService;
            _configuracionProductoService = configuracionProductoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var productos = await _productoService.GetAllProductosAsync();
            return Ok(productos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var producto = await _productoService.GetProductoByIdAsync(id);
            if (producto == null)
                return NotFound();

            return Ok(producto);
        }

        [HttpGet("{id}/configuraciones")]
        public async Task<IActionResult> GetConfiguraciones(int id)
        {
            var configuraciones = await _productoService.GetConfiguracionesByProductoIdAsync(id);
            return Ok(configuraciones);
        }

        [HttpGet("{id}/detalle")]
        public async Task<IActionResult> GetProductoConConfiguraciones(int id)
        {
            var producto = await _productoService.GetProductoByIdAsync(id);
            if (producto == null)
                return NotFound();

            var configuraciones = await _configuracionProductoService.GetConfiguracionesByProductoAsync(id);

            var result = new ProductoConConfiguracionesDto
            {
                Producto = producto,
                Configuraciones = configuraciones
            };

            return Ok(result);
        }

    }
}
