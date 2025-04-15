using Backend_CrmSG.Models.Seguridad;
using System.Collections.Generic;

namespace Backend_CrmSG.Services.Seguridad
{
    public interface IJwtService
    {
        string GenerateToken(Usuario usuario, IEnumerable<string> roles);
    }
}
