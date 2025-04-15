using Backend_CrmSG.Models;
using Backend_CrmSG.Repositories;
using Backend_CrmSG.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TesisBackend.Services
{
    public class ActividadService : IActividadService
    {
        private readonly IRepository<Actividad> _actividadRepository;

        public ActividadService(IRepository<Actividad> actividadRepository)
        {
            _actividadRepository = actividadRepository;
        }

        public async Task<IEnumerable<Actividad>> GetAllActividadesAsync()
        {
            return await _actividadRepository.GetAllAsync();
        }

        public async Task<Actividad> GetActividadByIdAsync(int id)
        {
            return await _actividadRepository.GetByIdAsync(id);
        }

        public async Task AddActividadAsync(Actividad actividad)
        {
            // Aquí puedes agregar validaciones o lógica de negocio extra
            await _actividadRepository.AddAsync(actividad);
        }

        public async Task UpdateActividadAsync(Actividad actividad)
        {
            await _actividadRepository.UpdateAsync(actividad);
        }

        public async Task DeleteActividadAsync(int id)
        {
            await _actividadRepository.DeleteAsync(id);
        }
    }
}
