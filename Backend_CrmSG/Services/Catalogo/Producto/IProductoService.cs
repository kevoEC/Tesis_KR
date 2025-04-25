using Backend_CrmSG.Models.Catalogos.Producto;
using ProductoModel = Backend_CrmSG.Models.Catalogos.Producto.Producto;

namespace Backend_CrmSG.Services.Producto
{
    public interface IProductoService
    {
        Task<IEnumerable<ProductoModel>> GetAllProductosAsync();
        Task<ProductoModel> GetProductoByIdAsync(int id);
        Task<IEnumerable<ConfiguracionesProducto>> GetConfiguracionesByProductoIdAsync(int idProducto);
    }
}
