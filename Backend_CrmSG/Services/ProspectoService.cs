using Backend_CrmSG.Models;
using Backend_CrmSG.Repositories;
using Backend_CrmSG.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TesisBackend.Services
{
    public class ProspectoService : IProspectoService
    {
        private readonly IRepository<Prospecto> _prospectoRepository;

        public ProspectoService(IRepository<Prospecto> prospectoRepository)
        {
            _prospectoRepository = prospectoRepository;
        }

        public async Task<IEnumerable<Prospecto>> GetAllProspectosAsync()
        {
            return await _prospectoRepository.GetAllAsync();
        }

        public async Task<Prospecto> GetProspectoByIdAsync(int id)
        {
            return await _prospectoRepository.GetByIdAsync(id);
        }

        public async Task AddProspectoAsync(Prospecto prospecto)
        {
            // Aquí puedes agregar validaciones de negocio antes de agregar el prospecto
            await _prospectoRepository.AddAsync(prospecto);
        }

        public async Task UpdateProspectoAsync(Prospecto prospecto)
        {
            await _prospectoRepository.UpdateAsync(prospecto);
        }

        public async Task DeleteProspectoAsync(int id)
        {
            await _prospectoRepository.DeleteAsync(id);
        }
    }
}
