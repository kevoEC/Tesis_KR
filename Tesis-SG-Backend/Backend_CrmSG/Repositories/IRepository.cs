using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend_CrmSG.Repositories
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetByPropertyAsync(string propertyName, object value);
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(int id);
        Task AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(int id);
    }
}
