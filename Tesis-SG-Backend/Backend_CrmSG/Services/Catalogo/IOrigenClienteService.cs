using System.Collections.Generic;
using System.Threading.Tasks;
using Backend_CrmSG.Models;

namespace Backend_CrmSG.Services.Catalogos
{
    public interface IOrigenClienteService
    {
        Task<IEnumerable<OrigenCliente>> GetAllAsync();
        Task<OrigenCliente> GetByIdAsync(int id);
        Task AddAsync(OrigenCliente origenCliente);
        Task UpdateAsync(OrigenCliente origenCliente);
        Task DeleteAsync(int id);
    }
}
