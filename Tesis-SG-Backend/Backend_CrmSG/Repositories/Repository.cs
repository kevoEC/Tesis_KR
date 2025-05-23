﻿using Microsoft.EntityFrameworkCore;
using Backend_CrmSG.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend_CrmSG.Repositories;
using System.ComponentModel.DataAnnotations;
using Microsoft.Data.SqlClient;
using System.Linq.Expressions;

namespace Backend_CrmSG.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly AppDbContext _context;
        private readonly DbSet<T> _dbSet;

        public Repository(AppDbContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<T> GetByIdAsync(int id)
        {
            var entity = await _dbSet.FindAsync(id);
            if (entity == null)
                throw new KeyNotFoundException($"{typeof(T).Name} con ID {id} no fue encontrado.");

            return entity;
        }


        public async Task AddAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(T entity)
        {
            // Buscar la propiedad que tenga el atributo [Key]
            var keyProperty = typeof(T).GetProperties()
                .FirstOrDefault(p => p.GetCustomAttributes(typeof(KeyAttribute), false).Any());
            if (keyProperty == null)
            {
                throw new Exception($"La entidad {typeof(T).Name} no tiene definida una propiedad [Key].");
            }

            // Obtener el valor de la clave de la entidad a actualizar
            var keyValue = keyProperty.GetValue(entity);
            if (keyValue == null)
            {
                throw new Exception("El valor de la clave primaria no puede ser nulo.");
            }

            // Buscar el registro existente en la base de datos
            var existingEntity = await _dbSet.FindAsync(keyValue);
            if (existingEntity == null)
            {
                throw new KeyNotFoundException("Registro no encontrado");
            }

            // Actualizar los valores de la entidad existente con los de la entidad pasada
            _context.Entry(existingEntity).CurrentValues.SetValues(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _dbSet.FindAsync(id);
            if (entity == null)
            {
                throw new KeyNotFoundException("Registro no encontrado");
            }

            _dbSet.Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<List<T>> ExecuteStoredProcedureAsync(string storedProcedure, params SqlParameter[] parameters)
        {
            var sql = storedProcedure + " " + string.Join(", ", parameters.Select(p => p.ParameterName));
            return await _context.Set<T>().FromSqlRaw(sql, parameters).ToListAsync();
        }

        public async Task<IEnumerable<T>> GetByPropertyAsync(string propertyName, object value)
        {
            try
            {
                var parameter = Expression.Parameter(typeof(T), "x");
                var property = Expression.Property(parameter, propertyName);

                // Convert value to the actual property type (e.g., int to int?)
                var propertyType = property.Type;
                var convertedValue = Convert.ChangeType(value, Nullable.GetUnderlyingType(propertyType) ?? propertyType);
                var constant = Expression.Constant(convertedValue, propertyType);

                var equal = Expression.Equal(property, constant);
                var lambda = Expression.Lambda<Func<T, bool>>(equal, parameter);

                return await _dbSet.Where(lambda).ToListAsync();
            }
            catch (Exception ex)
            {
                throw new ArgumentException(
                    $"Error al filtrar por propiedad '{propertyName}' con valor '{value}': {ex.Message}", ex);
            }
        }

    }




}

