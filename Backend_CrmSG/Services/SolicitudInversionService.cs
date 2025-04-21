using Backend_CrmSG.DTOs;
using Backend_CrmSG.Models;
using Backend_CrmSG.Repositories;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

public class SolicitudInversionService : ISolicitudInversionService
{
    private readonly IRepository<SolicitudInversion> _repository;
    private readonly IConfiguration _config;

    public SolicitudInversionService(IRepository<SolicitudInversion> repository, IConfiguration config)
    {
        _repository = repository;
        _config = config;
    }

    public async Task<IEnumerable<SolicitudInversion>> ObtenerFiltradasAsync(SolicitudInversionFiltroDto filtro)
    {
        var lista = new List<SolicitudInversion>();

        using var conn = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
        using var cmd = new SqlCommand("sp_ObtenerSolicitudesInversion", conn)
        {
            CommandType = CommandType.StoredProcedure
        };

        cmd.Parameters.AddWithValue("@Identificacion", filtro.Identificacion ?? (object)DBNull.Value);
        cmd.Parameters.AddWithValue("@IdTipoSolicitud", filtro.IdTipoSolicitud ?? (object)DBNull.Value);
        cmd.Parameters.AddWithValue("@IdTipoCliente", filtro.IdTipoCliente ?? (object)DBNull.Value);
        cmd.Parameters.AddWithValue("@SoloMisRegistros", filtro.SoloMisRegistros);
        cmd.Parameters.AddWithValue("@IdUsuario", filtro.IdUsuario ?? (object)DBNull.Value);
        cmd.Parameters.AddWithValue("@Busqueda", filtro.Busqueda ?? (object)DBNull.Value);

        await conn.OpenAsync();
        using var reader = await cmd.ExecuteReaderAsync();

        while (await reader.ReadAsync())
        {
            lista.Add(new SolicitudInversion
            {
                IdSolicitudInversion = Convert.ToInt32(reader["IdSolicitudInversion"]),
                Identificacion = reader["Identificacion"]?.ToString(),
                IdTipoSolicitud = reader["IdTipoSolicitud"] != DBNull.Value ? Convert.ToInt32(reader["IdTipoSolicitud"]) : null,
                IdTipoCliente = reader["IdTipoCliente"] != DBNull.Value ? Convert.ToInt32(reader["IdTipoCliente"]) : null,
                FechaCreacion = reader["FechaCreacion"] != DBNull.Value ? Convert.ToDateTime(reader["FechaCreacion"]) : null,
                FechaModificacion = reader["FechaModificacion"] != DBNull.Value ? Convert.ToDateTime(reader["FechaModificacion"]) : null,
                IdUsuarioPropietario = reader["IdUsuarioPropietario"] != DBNull.Value ? Convert.ToInt32(reader["IdUsuarioPropietario"]) : null,
                JSONDocument = reader["JSONDocument"]?.ToString()
            });
        }

        return lista;
    }

    public async Task<IEnumerable<SolicitudInversion>> GetAllAsync() =>
        await _repository.GetAllAsync();

    public async Task<SolicitudInversion> GetByIdAsync(int id) =>
        await _repository.GetByIdAsync(id);

    public async Task AddAsync(SolicitudInversion solicitud) =>
        await _repository.AddAsync(solicitud);

    public async Task UpdateAsync(SolicitudInversion solicitud) =>
        await _repository.UpdateAsync(solicitud);

    public async Task DeleteAsync(int id) =>
        await _repository.DeleteAsync(id);
}
