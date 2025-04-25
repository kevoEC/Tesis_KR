using Backend_CrmSG.Models;
using Backend_CrmSG.Models.Catalogos.Producto;
using Backend_CrmSG.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProductoModel = Backend_CrmSG.Models.Catalogos.Producto.Producto;


namespace Backend_CrmSG.Services.Producto
{
    public class ProductoService : IProductoService
    {
        private readonly IRepository<ProductoModel> _productoRepository;
        private readonly IRepository<ConfiguracionesProducto> _configuracionesRepository;

        public ProductoService(
            IRepository<ProductoModel> productoRepository,
            IRepository<ConfiguracionesProducto> configuracionesRepository)
        {
            _productoRepository = productoRepository;
            _configuracionesRepository = configuracionesRepository;
        }

        public async Task<IEnumerable<ProductoModel>> GetAllProductosAsync()
        {
            return await _productoRepository.GetAllAsync();
        }

        public async Task<ProductoModel> GetProductoByIdAsync(int id)
        {
            return await _productoRepository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<ConfiguracionesProducto>> GetConfiguracionesByProductoIdAsync(int idProducto)
        {
            var all = await _configuracionesRepository.GetAllAsync();
            return all.Where(c => c.IdProducto == idProducto);
        }
    }
}
