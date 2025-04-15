using System.Collections.Generic;
using System.Threading.Tasks;
using Backend_CrmSG.Models.Catalogos;
using Backend_CrmSG.Repositories;  // Asegúrate de que la ruta coincide con la ubicación de IRepository<T>

namespace Backend_CrmSG.Services.Catalogos
{
    public class TipoActividadService : ITipoActividadService
    {
        private readonly IRepository<TipoActividad> _repository;

        public TipoActividadService(IRepository<TipoActividad> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<TipoActividad>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<TipoActividad> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task AddAsync(TipoActividad tipoActividad)
        {
            await _repository.AddAsync(tipoActividad);
        }

        public async Task UpdateAsync(TipoActividad tipoActividad)
        {
            await _repository.UpdateAsync(tipoActividad);
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
