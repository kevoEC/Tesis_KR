using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend_CrmSG.Data;
using Backend_CrmSG.Models.Seguridad;
using Backend_CrmSG.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Backend_CrmSG.Services.Seguridad
{
    public class UsuarioRolService : IUsuarioRolService
    {
        private readonly AppDbContext _context;

        public UsuarioRolService(AppDbContext context)
        {
            _context = context;
        }

        // Obtiene todas las relaciones usuario-rol
        public async Task<IEnumerable<UsuarioRol>> GetAllAsync()
        {
            return await _context.Set<UsuarioRol>().ToListAsync();
        }

        // Obtiene una relación específica por clave compuesta
        public async Task<UsuarioRol?> GetByIdAsync(int idUsuario, int idRol)
        {
            return await _context.Set<UsuarioRol>()
                .FirstOrDefaultAsync(ur => ur.IdUsuario == idUsuario && ur.IdRol == idRol);
        }

        // Agrega una nueva relación usuario-rol
        public async Task AddAsync(UsuarioRol usuarioRol)
        {
            await _context.Set<UsuarioRol>().AddAsync(usuarioRol);
            await _context.SaveChangesAsync();
        }

        // Actualiza una relación usuario-rol (aunque en muchos casos, la relación no se actualiza, solo se crea o elimina)
        public async Task UpdateAsync(UsuarioRol usuarioRol)
        {
            var existing = await GetByIdAsync(usuarioRol.IdUsuario, usuarioRol.IdRol);
            if (existing == null)
            {
                throw new KeyNotFoundException("La relación usuario-rol no fue encontrada.");
            }
            _context.Entry(existing).CurrentValues.SetValues(usuarioRol);
            await _context.SaveChangesAsync();
        }

        // Elimina una relación usuario-rol usando la clave compuesta
        public async Task DeleteAsync(int idUsuario, int idRol)
        {
            var entity = await GetByIdAsync(idUsuario, idRol);
            if (entity == null)
            {
                throw new KeyNotFoundException("La relación usuario-rol no fue encontrada.");
            }
            _context.Set<UsuarioRol>().Remove(entity);
            await _context.SaveChangesAsync();
        }

        // Opcionales: obtener todas las relaciones para un usuario o para un rol
        public async Task<IEnumerable<UsuarioRol>> GetByUsuarioIdAsync(int idUsuario)
        {
            return await _context.Set<UsuarioRol>()
                .Where(ur => ur.IdUsuario == idUsuario)
                .ToListAsync();
        }

        public async Task<IEnumerable<UsuarioRol>> GetByRolIdAsync(int idRol)
        {
            return await _context.Set<UsuarioRol>()
                .Where(ur => ur.IdRol == idRol)
                .ToListAsync();
        }

        public async Task AsignarRolPorDefecto(int idUsuario, string nombreRol)
        {
            var rol = await _context.Rol.FirstOrDefaultAsync(r => r.Nombre == nombreRol);

            if (rol == null)
                return;

            // Validar si ya tiene ese rol asignado
            var yaExiste = await _context.UsuarioRol
                .AnyAsync(ur => ur.IdUsuario == idUsuario && ur.IdRol == rol.IdRol);

            if (!yaExiste)
            {
                var nuevoUsuarioRol = new UsuarioRol
                {
                    IdUsuario = idUsuario,
                    IdRol = rol.IdRol
                };

                _context.UsuarioRol.Add(nuevoUsuarioRol);
                await _context.SaveChangesAsync();
            }
        }
    }

    }
