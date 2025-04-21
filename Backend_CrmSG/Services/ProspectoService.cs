using Backend_CrmSG.DTOs;
using Backend_CrmSG.Models;
using Backend_CrmSG.Repositories;
using Backend_CrmSG.Services;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace TesisBackend.Services
{
    public class ProspectoService : IProspectoService
    {
        private readonly IRepository<Prospecto> _prospectoRepository;
        private readonly StoredProcedureService _spService;

        public ProspectoService(IRepository<Prospecto> prospectoRepository, StoredProcedureService spService)
        {
            _prospectoRepository = prospectoRepository;
            _spService = spService;
        }


        public async Task<IEnumerable<Prospecto>> GetAllProspectosAsync()
        {
            return await _prospectoRepository.GetAllAsync();
        }

        public async Task<Prospecto> GetProspectoByIdAsync(int id)
        {
            return await _prospectoRepository.GetByIdAsync(id);
        }

        public async Task AddProspectoAsync(Prospecto prospecto)
        {
            // Aquí puedes agregar validaciones de negocio antes de agregar el prospecto
            await _prospectoRepository.AddAsync(prospecto);
        }

        public async Task UpdateProspectoAsync(Prospecto prospecto)
        {
            await _prospectoRepository.UpdateAsync(prospecto);
        }

        public async Task DeleteProspectoAsync(int id)
        {
            await _prospectoRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<Prospecto>> ObtenerProspectosFiltradosAsync(ProspectoFiltroDto filtro)
        {
            var prospectos = new List<Prospecto>();

            using var connection = new SqlConnection(_spService.ConnectionString);
            using var cmd = new SqlCommand("sp_ObtenerProspectos", connection)
            {
                CommandType = CommandType.StoredProcedure
            };

            cmd.Parameters.AddWithValue("@SoloMisRegistros", filtro.SoloMisRegistros);
            cmd.Parameters.AddWithValue("@IdUsuario", filtro.IdUsuario ?? (object)DBNull.Value);
            cmd.Parameters.AddWithValue("@Estado", filtro.Estado ?? (object)DBNull.Value);
            cmd.Parameters.AddWithValue("@Busqueda", filtro.Busqueda ?? (object)DBNull.Value);

            await connection.OpenAsync();
            using var reader = await cmd.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                prospectos.Add(new Prospecto
                {
                    IdProspecto = reader.GetInt32(0),
                    Nombres = reader["Nombres"]?.ToString(),
                    ApellidoPaterno = reader["ApellidoPaterno"]?.ToString(),
                    ApellidoMaterno = reader["ApellidoMaterno"]?.ToString(),
                    TelefonoCelular = reader["TelefonoCelular"]?.ToString(),
                    CorreoElectronico = reader["CorreoElectronico"]?.ToString(),
                    Estado = reader["Estado"] != DBNull.Value ? Convert.ToBoolean(reader["Estado"]) : (bool?)null,
                    EsCliente = reader["EsCliente"] != DBNull.Value ? Convert.ToBoolean(reader["EsCliente"]) : (bool?)null,
                    IdUsuarioPropietario = reader["IdUsuarioPropietario"] != DBNull.Value ? Convert.ToInt32(reader["IdUsuarioPropietario"]) : (int?)null,
                    FechaCreacion = reader["FechaCreacion"] != DBNull.Value ? Convert.ToDateTime(reader["FechaCreacion"]) : null,
                });
            }

            return prospectos;
        }

    }
}
