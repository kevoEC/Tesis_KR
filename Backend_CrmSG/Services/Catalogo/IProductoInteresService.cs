using System.Collections.Generic;
using System.Threading.Tasks;
using Backend_CrmSG.Models.Catalogos;

namespace Backend_CrmSG.Services.Catalogos
{
    public interface IProductoInteresService
    {
        Task<IEnumerable<ProductoInteres>> GetAllAsync();
        Task<ProductoInteres> GetByIdAsync(int id);
        Task AddAsync(ProductoInteres productoInteres);
        Task UpdateAsync(ProductoInteres productoInteres);
        Task DeleteAsync(int id);
    }
}
