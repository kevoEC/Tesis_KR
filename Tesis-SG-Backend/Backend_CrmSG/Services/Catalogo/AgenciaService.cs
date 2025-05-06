using System.Collections.Generic;
using System.Threading.Tasks;
using Backend_CrmSG.Models.Catalogos;
using Backend_CrmSG.Repositories;  // Asegúrate que esta ruta coincida con la ubicación de IRepository<T>

namespace Backend_CrmSG.Services.Catalogos
{
    public class AgenciaService : IAgenciaService
    {
        private readonly IRepository<Agencia> _repository;

        public AgenciaService(IRepository<Agencia> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Agencia>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Agencia> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task AddAsync(Agencia agencia)
        {
            await _repository.AddAsync(agencia);
        }

        public async Task UpdateAsync(Agencia agencia)
        {
            await _repository.UpdateAsync(agencia);
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
