using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend_CrmSG.Models.Seguridad;
using Backend_CrmSG.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Backend_CrmSG.Services.Seguridad
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IRepository<Usuario> _usuarioRepository;
        // Si en el futuro necesitas acceder a UsuarioRol, Rol, Permiso, Menu, etc., 
        // puedes inyectar sus respectivos repositorios aquí.
        // private readonly IRepository<UsuarioRol> _usuarioRolRepository;
        // private readonly IRepository<Rol> _rolRepository;
        // private readonly IRepository<Permiso> _permisoRepository;
        // private readonly IRepository<Menu> _menuRepository;

        public UsuarioService(IRepository<Usuario> usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        // ========== Autenticación ==========
        public async Task<Usuario?> AuthenticateAsync(string email, string password)
        {
            var user = await _usuarioRepository
                .GetAllAsync()
                .ContinueWith(t => t.Result.FirstOrDefault(u =>
                     u.Email == email && u.Contraseña == password && u.EsActivo == true));

            return user;
        }


        // ========== Roles ==========
        public async Task<IEnumerable<string>> GetRolesByUserIdAsync(int idUsuario)
        {
            // Aquí deberías consultar la tabla UsuarioRol para obtener los roles asignados al usuario
            // y luego obtener el nombre de cada rol. Por simplicidad, se retorna un listado mock.
            return await Task.FromResult(new List<string> { "Admin", "Vendedor" });
        }

        // ========== Menús según roles ==========
        public async Task<IEnumerable<object>> GetMenusByUserIdAsync(int idUsuario)
        {
            // 1) Obtener los roles del usuario
            var roles = await GetRolesByUserIdAsync(idUsuario);
            // 2) Con la lista de roles, deberías consultar las tablas correspondientes (Permiso, Menu, etc.)
            // para obtener los menús permitidos. Aquí se retorna una lista ficticia.
            var menus = new List<object>
            {
                new { IdMenu = 1, Nombre = "Dashboard", Url = "/dashboard" },
                new { IdMenu = 2, Nombre = "Ventas", Url = "/ventas" }
            };

            return menus;
        }

        // ========== CRUD Básico ==========
        public async Task<IEnumerable<Usuario>> GetAllAsync()
        {
            return await _usuarioRepository.GetAllAsync();
        }

        public async Task<Usuario> GetByIdAsync(int id)
        {
            return await _usuarioRepository.GetByIdAsync(id);
        }

        public async Task AddAsync(Usuario usuario)
        {
            // Aquí podrías incluir la lógica para encriptar la contraseña y validar datos.
            await _usuarioRepository.AddAsync(usuario);
        }

        public async Task UpdateAsync(Usuario usuario)
        {
            // Aquí podrías incluir validaciones adicionales y actualizar la fecha de modificación.
            await _usuarioRepository.UpdateAsync(usuario);
        }

        public async Task DeleteAsync(int id)
        {
            await _usuarioRepository.DeleteAsync(id);
        }

        public async Task<Usuario?> BuscarPorCorreoAsync(string email)
        {
            return await _usuarioRepository
                .GetAllAsync()
                .ContinueWith(t => t.Result.FirstOrDefault(u => u.Email == email));
        }

    }
}
