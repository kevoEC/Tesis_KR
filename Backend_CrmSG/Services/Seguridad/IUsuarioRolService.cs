using System.Collections.Generic;
using System.Threading.Tasks;
using Backend_CrmSG.Models.Seguridad;

namespace Backend_CrmSG.Services.Seguridad
{
    public interface IUsuarioRolService
    {
        Task<IEnumerable<UsuarioRol>> GetAllAsync();
        Task<UsuarioRol> GetByIdAsync(int idUsuario, int idRol);
        Task AddAsync(UsuarioRol usuarioRol);
        Task UpdateAsync(UsuarioRol usuarioRol);
        Task DeleteAsync(int idUsuario, int idRol);
        Task<IEnumerable<UsuarioRol>> GetByUsuarioIdAsync(int idUsuario);
        Task<IEnumerable<UsuarioRol>> GetByRolIdAsync(int idRol);
    }
}
