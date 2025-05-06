using System.Collections.Generic;
using System.Threading.Tasks;
using Backend_CrmSG.Models.Seguridad;
using Backend_CrmSG.Repositories;

namespace Backend_CrmSG.Services.Seguridad
{
    public class RolService : IRolService
    {
        private readonly IRepository<Rol> _rolRepository;

        public RolService(IRepository<Rol> rolRepository)
        {
            _rolRepository = rolRepository;
        }

        public async Task<IEnumerable<Rol>> GetAllAsync()
        {
            return await _rolRepository.GetAllAsync();
        }

        public async Task<Rol> GetByIdAsync(int id)
        {
            return await _rolRepository.GetByIdAsync(id);
        }

        public async Task AddAsync(Rol rol)
        {
            await _rolRepository.AddAsync(rol);
        }

        public async Task UpdateAsync(Rol rol)
        {
            await _rolRepository.UpdateAsync(rol);
        }

        public async Task DeleteAsync(int id)
        {
            await _rolRepository.DeleteAsync(id);
        }
    }
}
