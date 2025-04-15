using System.Collections.Generic;
using System.Threading.Tasks;
using Backend_CrmSG.Models;
using Backend_CrmSG.Repositories; // Asegúrate de que esta ruta coincide con la ubicación de IRepository<T>

namespace Backend_CrmSG.Services.Catalogos
{
    public class OrigenClienteService : IOrigenClienteService
    {
        private readonly IRepository<OrigenCliente> _repository;

        public OrigenClienteService(IRepository<OrigenCliente> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<OrigenCliente>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<OrigenCliente> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task AddAsync(OrigenCliente origenCliente)
        {
            await _repository.AddAsync(origenCliente);
        }

        public async Task UpdateAsync(OrigenCliente origenCliente)
        {
            await _repository.UpdateAsync(origenCliente);
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
