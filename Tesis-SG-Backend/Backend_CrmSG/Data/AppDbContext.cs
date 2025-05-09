using Microsoft.EntityFrameworkCore;
using Backend_CrmSG.Models;
using Backend_CrmSG.Models.Catalogos;
using Backend_CrmSG.Models.Seguridad;
using Backend_CrmSG.Models.Catalogos.Producto;
using Backend_CrmSG.Models.Entidades;

namespace Backend_CrmSG.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // DbSets de tus tablas de catalogos
        public DbSet<OrigenCliente> OrigenCliente { get; set; }
        public DbSet<TipoIdentificacion> TipoIdentificacion { get; set; }
        public DbSet<TipoActividad> TipoActividad { get; set; }
        public DbSet<Prioridad> Prioridad { get; set; }
        public DbSet<Agencia> Agencia { get; set; }
        public DbSet<ProductoInteres> ProductoInteres { get; set; }
        // DbSets de tus tablas de entidades principales
        public DbSet<Prospecto> Prospecto { get; set; }
        public DbSet<Actividad> Actividad { get; set; }
        // DbSets de tus tablas de seguridad
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<Rol> Rol { get; set; }
        public DbSet<UsuarioRol> UsuarioRol { get; set; }
        public DbSet<Permiso> Permiso { get; set; }
        public DbSet<Menu> Menu { get; set; }
        public DbSet<SolicitudInversion> SolicitudInversion { get; set; } // ← ESTA ES LA CLAVE

        public DbSet<Producto> Producto { get; set; }
        public DbSet<ConfiguracionesProducto> ConfiguracionesProducto { get; set; } // ← ESTA ES LA CLAVE
        public DbSet<Proyeccion> Proyeccion { get; set; }
        public DbSet<CronogramaProyeccion> CronogramaProyeccion { get; set; }

        public DbSet<Documento> Documento { get; set; }

        public DbSet<TipoTransaccion> TipoTransaccion { get; set; }
        public DbSet<TransaccionesValidacion> TransaccionesValidacion { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuración de clave compuesta para UsuarioRol
            modelBuilder.Entity<UsuarioRol>()
                .HasKey(ur => new { ur.IdUsuario, ur.IdRol });

            modelBuilder.Entity<Proyeccion>()
                .Ignore(p => p.Producto)
                .Ignore(p => p.ConfiguracionUsada)
                .Ignore(p => p.SolicitudInversion);

            base.OnModelCreating(modelBuilder);
        }




        // Aquí podrías configurar relaciones (OnModelCreating) si lo deseas
    }
}
