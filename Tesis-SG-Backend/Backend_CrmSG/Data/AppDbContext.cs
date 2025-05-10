using Microsoft.EntityFrameworkCore;
using Backend_CrmSG.Models;
using Backend_CrmSG.Models.Catalogos;
using Backend_CrmSG.Models.Seguridad;
using Backend_CrmSG.Models.Catalogos.Producto;
using Backend_CrmSG.Models.Entidades;
using Backend_CrmSG.Models.Vistas;

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
        public DbSet<TipoCliente> TipoCliente { get; set; }
        public DbSet<TipoSolicitud> TipoSolicitud { get; set; }

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
        public DbSet<Referencia> Referencia { get; set; } // ← esta línea
        public DbSet<Beneficiario> Beneficiario { get; set; } // ← esta línea

        public DbSet<Producto> Producto { get; set; }
        public DbSet<ConfiguracionesProducto> ConfiguracionesProducto { get; set; } // ← ESTA ES LA CLAVE
        public DbSet<Proyeccion> Proyeccion { get; set; }
        public DbSet<CronogramaProyeccion> CronogramaProyeccion { get; set; }

        public DbSet<Documento> Documento { get; set; }

        public DbSet<TipoTransaccion> TipoTransaccion { get; set; }
        public DbSet<TransaccionesValidacion> TransaccionesValidacion { get; set; }

        // VISTAS

        public DbSet<ActividadDetalle> ActividadesDetalle { get; set; } // ← esta línea
        public DbSet<ProspectoDetalle> ProspectosDetalle { get; set; }
        public DbSet<SolicitudInversionDetalle> SolicitudesInversionDetalle { get; set; }
        public DbSet<ReferenciaDetalle> ReferenciasDetalle { get; set; } // ← esta línea
        public DbSet<BeneficiarioDetalle> BeneficiariosDetalle { get; set; } // ← esta línea


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuración de clave compuesta para UsuarioRol
            modelBuilder.Entity<UsuarioRol>()
                .HasKey(ur => new { ur.IdUsuario, ur.IdRol });

            modelBuilder.Entity<Proyeccion>()
                .Ignore(p => p.Producto)
                .Ignore(p => p.ConfiguracionUsada)
                .Ignore(p => p.SolicitudInversion);

            modelBuilder.Entity<ActividadDetalle>()
            .HasNoKey()
            .ToView("vw_ActividadesConDetalle");

            modelBuilder.Entity<ProspectoDetalle>()
                .HasNoKey()
                .ToView("vw_ProspectosDetalle");

            modelBuilder.Entity<SolicitudInversionDetalle>()
                .HasNoKey()
                .ToView("vw_SolicitudIdentificacionVistaCompleta");

            modelBuilder.Entity<ReferenciaDetalle>()
                .HasNoKey()
                .ToView("vw_ReferenciaDetalle");

            modelBuilder.Entity<BeneficiarioDetalle>()
                .HasNoKey()
                .ToView("vw_BeneficiarioDetalle");

            base.OnModelCreating(modelBuilder);
        }




        // Aquí podrías configurar relaciones (OnModelCreating) si lo deseas
    }
}
