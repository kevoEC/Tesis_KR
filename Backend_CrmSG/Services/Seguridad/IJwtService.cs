using System.Security.Claims;
using Backend_CrmSG.Models.Seguridad;

public interface IJwtService
{
    string GenerateToken(Usuario usuario, IEnumerable<string> roles);
    string GenerateTokenFromClaims(List<Claim> claims); // ← Nuevo método
}
