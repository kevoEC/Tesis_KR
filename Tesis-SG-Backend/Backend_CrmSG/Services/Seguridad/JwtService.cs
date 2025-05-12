using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Backend_CrmSG.Models.Seguridad;

namespace Backend_CrmSG.Services.Seguridad
{
    public class JwtService : IJwtService
    {
        private readonly IConfiguration _configuration;

        public JwtService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // ✅ Método original (por compatibilidad)
        public string GenerateToken(Usuario usuario, IEnumerable<string> roles)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, usuario.Email),
                new Claim("id", usuario.IdUsuario.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            return GenerateTokenFromClaims(claims);
        }

        // ✅ NUEVO MÉTODO: para uso directo con claims desde SP
        public string GenerateTokenFromClaims(List<Claim> claims)
        {
            var keyString = _configuration["Jwt:Key"]
                ?? throw new InvalidOperationException("La clave JWT (Jwt:Key) no está configurada en appsettings.json.");

            var key = Encoding.UTF8.GetBytes(keyString);

            var issuer = _configuration["Jwt:Issuer"]
                ?? throw new InvalidOperationException("El issuer JWT (Jwt:Issuer) no está configurado.");

            var audience = _configuration["Jwt:Audience"]
                ?? throw new InvalidOperationException("El audience JWT (Jwt:Audience) no está configurado.");

            var expiresInConfig = _configuration["Jwt:ExpiresInMinutes"]
                ?? throw new InvalidOperationException("La duración del token (Jwt:ExpiresInMinutes) no está configurada.");

            var expiresInMinutes = Convert.ToDouble(expiresInConfig);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(expiresInMinutes),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

    }
}
