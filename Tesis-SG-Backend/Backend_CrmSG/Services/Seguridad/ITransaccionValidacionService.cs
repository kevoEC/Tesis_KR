using System.Threading.Tasks;
using Backend_CrmSG.Models.Seguridad;

namespace Backend_CrmSG.Services.Seguridad
{
    public interface ITransaccionValidacionService
    {
        Task RegistrarCorreoAsync(int idUsuario, string email);
        Task<TransaccionesValidacion?> ObtenerPorHashAsync(string hash);
        Task MarcarComoExitosaAsync(int idTransaccion);
    }
}
