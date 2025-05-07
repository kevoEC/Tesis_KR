using System;
using System.Linq;
using System.Threading.Tasks;
using Backend_CrmSG.Models.Seguridad;
using Backend_CrmSG.Repositories;

namespace Backend_CrmSG.Services.Seguridad
{
    public class TransaccionValidacionService : ITransaccionValidacionService
    {
        private readonly IRepository<TransaccionesValidacion> _repo;
        private readonly IRepository<TipoTransaccion> _tipoRepo;

        public TransaccionValidacionService(
            IRepository<TransaccionesValidacion> repo,
            IRepository<TipoTransaccion> tipoRepo)
        {
            _repo = repo;
            _tipoRepo = tipoRepo;
        }

        public async Task RegistrarCorreoAsync(int idUsuario, string email)
        {
            var tipo = (await _tipoRepo.GetAllAsync())
                .FirstOrDefault(t => t.Nombre == "Correo");

            if (tipo == null)
                throw new Exception("Tipo de transacción 'Correo' no configurado.");

            var hash = GenerarHash(email + DateTime.UtcNow.ToString("yyyyMMddHHmmss"));

            var transaccion = new TransaccionesValidacion
            {
                IdUsuario = idUsuario,
                IdTipoTransaccion = tipo.IdTipoTransaccion,
                HashValidacion = hash,
                FechaCreacion = DateTime.UtcNow,
                Expiracion = DateTime.UtcNow.AddMinutes(30),
                Operacion = "Creacion",
                Exitoso = false
            };

            await _repo.AddAsync(transaccion);
        }

        public async Task<TransaccionesValidacion?> ObtenerPorHashAsync(string hash)
        {
            var lista = await _repo.GetAllAsync();
            return lista.FirstOrDefault(t => t.HashValidacion == hash && t.Expiracion > DateTime.UtcNow);
        }

        public async Task MarcarComoExitosaAsync(int idTransaccion)
        {
            var transacciones = await _repo.GetAllAsync();
            var trans = transacciones.FirstOrDefault(t => t.IdTransaccion == idTransaccion);
            if (trans != null)
            {
                trans.Exitoso = true;
                await _repo.UpdateAsync(trans);
            }
        }

        private string GenerarHash(string input)
        {
            using (var sha256 = System.Security.Cryptography.SHA256.Create())
            {
                var bytes = System.Text.Encoding.UTF8.GetBytes(input);
                var hashBytes = sha256.ComputeHash(bytes);
                return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
            }
        }
    }
}
