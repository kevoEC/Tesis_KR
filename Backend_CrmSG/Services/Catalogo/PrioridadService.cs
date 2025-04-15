using System.Collections.Generic;
using System.Threading.Tasks;
using Backend_CrmSG.Models.Catalogos;
using Backend_CrmSG.Repositories; // Asegúrate que esta ruta coincide con la ubicación de IRepository<T>

namespace Backend_CrmSG.Services.Catalogos
{
    public class PrioridadService : IPrioridadService
    {
        private readonly IRepository<Prioridad> _repository;

        public PrioridadService(IRepository<Prioridad> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Prioridad>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Prioridad> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task AddAsync(Prioridad prioridad)
        {
            await _repository.AddAsync(prioridad);
        }

        public async Task UpdateAsync(Prioridad prioridad)
        {
            await _repository.UpdateAsync(prioridad);
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
