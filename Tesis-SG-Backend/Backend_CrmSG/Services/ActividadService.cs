using Backend_CrmSG.DTOs;
using Backend_CrmSG.Models;
using Backend_CrmSG.Repositories;
using Backend_CrmSG.Services;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace TesisBackend.Services
{
    public class ActividadService : IActividadService
    {
        private readonly IRepository<Actividad> _actividadRepository;
        private readonly IConfiguration _configuration;

        public ActividadService(IRepository<Actividad> actividadRepository, IConfiguration configuration)
        {
            _actividadRepository = actividadRepository;
            _configuration = configuration;
        }

        public async Task<IEnumerable<Actividad>> ObtenerFiltradasAsync(ActividadFiltroDto filtro)
        {
            var actividades = new List<Actividad>();

            using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            using var cmd = new SqlCommand("sp_ObtenerActividades", connection)
            {
                CommandType = CommandType.StoredProcedure
            };

            cmd.Parameters.AddWithValue("@IdProspecto", filtro.IdProspecto ?? (object)DBNull.Value);
            cmd.Parameters.AddWithValue("@Estado", filtro.Estado ?? (object)DBNull.Value);
            cmd.Parameters.AddWithValue("@SoloMisRegistros", filtro.SoloMisRegistros);
            cmd.Parameters.AddWithValue("@IdUsuario", filtro.IdUsuario ?? (object)DBNull.Value);
            cmd.Parameters.AddWithValue("@Busqueda", filtro.Busqueda ?? (object)DBNull.Value);

            await connection.OpenAsync();
            using var reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                actividades.Add(new Actividad
                {
                    IdActividad = Convert.ToInt32(reader["IdActividad"]),
                    Asunto = reader["Asunto"]?.ToString(),
                    Descripcion = reader["Descripcion"]?.ToString(),
                    Duracion = reader["Duracion"] != DBNull.Value ? (TimeSpan?)reader["Duracion"] : null,
                    Vencimiento = reader["Vencimiento"] != DBNull.Value ? (DateTime?)reader["Vencimiento"] : null,
                    Estado = reader["Estado"] != DBNull.Value ? Convert.ToBoolean(reader["Estado"]) : false,
                    IdTipoActividad = reader["IdTipoActividad"] != DBNull.Value ? Convert.ToInt32(reader["IdTipoActividad"]) : null,
                    IdPrioridad = reader["IdPrioridad"] != DBNull.Value ? Convert.ToInt32(reader["IdPrioridad"]) : null,
                    IdProspecto = reader["IdProspecto"] != DBNull.Value ? Convert.ToInt32(reader["IdProspecto"]) : null,
                    IdUsuarioPropietario = reader["IdUsuarioPropietario"] != DBNull.Value ? Convert.ToInt32(reader["IdUsuarioPropietario"]) : null,
                    FechaCreacion = reader["FechaCreacion"] != DBNull.Value ? Convert.ToDateTime(reader["FechaCreacion"]) : null
                });
            }

            return actividades;
        }

        public async Task<IEnumerable<Actividad>> GetAllActividadesAsync()
        {
            return await _actividadRepository.GetAllAsync();
        }

        public async Task<Actividad> GetActividadByIdAsync(int id)
        {
            return await _actividadRepository.GetByIdAsync(id);
        }

        public async Task AddActividadAsync(Actividad actividad)
        {
            // Aquí puedes agregar validaciones o lógica de negocio extra
            await _actividadRepository.AddAsync(actividad);
        }

        public async Task UpdateActividadAsync(Actividad actividad)
        {
            await _actividadRepository.UpdateAsync(actividad);
        }

        public async Task DeleteActividadAsync(int id)
        {
            await _actividadRepository.DeleteAsync(id);
        }
    }
}
