using Backend_CrmSG.DTOs;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

public class StoredProcedureService
{
    private readonly string _connectionString;
    public string ConnectionString => _connectionString;


    public StoredProcedureService(IConfiguration config)
    {
        _connectionString = config.GetConnectionString("DefaultConnection");
    }

    public async Task<LoginResultDto> EjecutarLoginSP(string email, string password)
    {
        var result = new LoginResultDto();

        using (var connection = new SqlConnection(_connectionString))
        {
            using (var cmd = new SqlCommand("sp_LoginUsuario", connection))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Email", email);
                cmd.Parameters.AddWithValue("@Password", password);

                await connection.OpenAsync();
                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    // 1. Datos del usuario
                    if (await reader.ReadAsync())
                    {
                        result.Usuario = new UsuarioDto
                        {
                            Id = Convert.ToInt32(reader["IdUsuario"]),
                            Email = reader["Email"]?.ToString() ?? "",
                            NombreCompleto = reader["NombreCompleto"]?.ToString() ?? "",
                            Identificacion = reader["Identificacion"]?.ToString() ?? ""
                        };



                    }

                    // 2. Roles del usuario
                    if (await reader.NextResultAsync())
                    {
                        result.Roles = new List<string>();
                        while (await reader.ReadAsync())
                        {
                            result.Roles.Add(reader.GetString(0));
                        }
                    }

                    // 3. Permisos detallados
                    if (await reader.NextResultAsync())
                    {
                        result.Permisos = new List<PermisoDto>();
                        while (await reader.ReadAsync())
                        {
                            result.Permisos = new List<PermisoDto>();
                            while (await reader.ReadAsync())
                            {
                                result.Permisos.Add(new PermisoDto
                                {
                                    Menu = Convert.ToInt32(reader["Menu"]),
                                    Nombre = reader["Nombre"]?.ToString() ?? "",
                                    Ruta = reader["Ruta"]?.ToString() ?? "",
                                    Icono = reader["Icono"]?.ToString() ?? "",
                                    Permiso = Convert.ToInt32(reader["Permiso"])
                                });
                            }

                        }
                    }
                }
            }
        }

        return result;
    }
}
