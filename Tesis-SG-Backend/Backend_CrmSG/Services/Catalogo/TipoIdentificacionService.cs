using System.Collections.Generic;
using System.Threading.Tasks;
using Backend_CrmSG.Models.Catalogos;
using Backend_CrmSG.Repositories;

namespace Backend_CrmSG.Services.Catalogos
{
    public class TipoIdentificacionService : ITipoIdentificacionService
    {
        private readonly IRepository<TipoIdentificacion> _repository;

        public TipoIdentificacionService(IRepository<TipoIdentificacion> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<TipoIdentificacion>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<TipoIdentificacion> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task AddAsync(TipoIdentificacion tipoIdentificacion)
        {
            await _repository.AddAsync(tipoIdentificacion);
        }

        public async Task UpdateAsync(TipoIdentificacion tipoIdentificacion)
        {
            await _repository.UpdateAsync(tipoIdentificacion);
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
