using System.Collections.Generic;
using System.Threading.Tasks;
using Backend_CrmSG.Models.Catalogos;
using Backend_CrmSG.Repositories;

namespace Backend_CrmSG.Services.Catalogos
{
    public class ProductoInteresService : IProductoInteresService
    {
        private readonly IRepository<ProductoInteres> _repository;

        public ProductoInteresService(IRepository<ProductoInteres> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<ProductoInteres>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<ProductoInteres> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task AddAsync(ProductoInteres productoInteres)
        {
            await _repository.AddAsync(productoInteres);
        }

        public async Task UpdateAsync(ProductoInteres productoInteres)
        {
            await _repository.UpdateAsync(productoInteres);
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
