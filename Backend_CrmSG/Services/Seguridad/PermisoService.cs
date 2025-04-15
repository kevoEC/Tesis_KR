using System.Collections.Generic;
using System.Threading.Tasks;
using Backend_CrmSG.Models.Seguridad;
using Backend_CrmSG.Repositories;

namespace Backend_CrmSG.Services.Seguridad
{
    public class PermisoService : IPermisoService
    {
        private readonly IRepository<Permiso> _permisoRepository;

        public PermisoService(IRepository<Permiso> permisoRepository)
        {
            _permisoRepository = permisoRepository;
        }

        public async Task<IEnumerable<Permiso>> GetAllAsync()
        {
            return await _permisoRepository.GetAllAsync();
        }

        public async Task<Permiso> GetByIdAsync(int id)
        {
            return await _permisoRepository.GetByIdAsync(id);
        }

        public async Task AddAsync(Permiso permiso)
        {
            await _permisoRepository.AddAsync(permiso);
        }

        public async Task UpdateAsync(Permiso permiso)
        {
            await _permisoRepository.UpdateAsync(permiso);
        }

        public async Task DeleteAsync(int id)
        {
            await _permisoRepository.DeleteAsync(id);
        }
    }
}
