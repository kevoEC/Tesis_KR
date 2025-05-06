using System.Collections.Generic;
using System.Threading.Tasks;
using Backend_CrmSG.Models.Catalogos;

namespace Backend_CrmSG.Services.Catalogos
{
    public interface IAgenciaService
    {
        Task<IEnumerable<Agencia>> GetAllAsync();
        Task<Agencia> GetByIdAsync(int id);
        Task AddAsync(Agencia agencia);
        Task UpdateAsync(Agencia agencia);
        Task DeleteAsync(int id);
    }
}
