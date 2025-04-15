using Microsoft.EntityFrameworkCore;
using Backend_CrmSG.Data;
using Backend_CrmSG.Repositories;
using Backend_CrmSG.Services;
using TesisBackend.Services;
using Backend_CrmSG.Services.Catalogos;
using Backend_CrmSG.Services.Seguridad;
using Backend_CrmSG.Middleware;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy => policy
        .WithOrigins("http://localhost:5173")
        .AllowAnyHeader()
        .AllowAnyMethod());
});


// Registro del servicio JWT
builder.Services.AddScoped<IJwtService, JwtService>();
// Configurar la autenticación JWT
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true, // Valida la expiración
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

builder.Services.AddAuthorization();
// Agregar el servicio del DbContext con la cadena de conexión definida en appsettings.json
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Resto de configuraciones
builder.Services.AddControllers(options =>
{
    options.Filters.Add<Backend_CrmSG.Filters.SuccessMessageFilter>();
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Registro del repositorio genérico
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
// Registro del servicio de entidades
builder.Services.AddScoped<IProspectoService, ProspectoService>();
builder.Services.AddScoped<IActividadService, ActividadService>();
//Registro dl servicio de catalogos
builder.Services.AddScoped<IOrigenClienteService, OrigenClienteService>();
builder.Services.AddScoped<IAgenciaService, AgenciaService>();
builder.Services.AddScoped<IPrioridadService, PrioridadService>();
builder.Services.AddScoped<ITipoActividadService, TipoActividadService>();
builder.Services.AddScoped<ITipoIdentificacionService, TipoIdentificacionService>();
builder.Services.AddScoped<IProductoInteresService, ProductoInteresService>();
// Registro del servicio de seguridad
builder.Services.AddScoped<IUsuarioService, UsuarioService>();
builder.Services.AddScoped<IRolService, RolService>();
builder.Services.AddScoped<IPermisoService, PermisoService>();
builder.Services.AddScoped<IMenuService, MenuService>();
builder.Services.AddScoped<IUsuarioRolService, UsuarioRolService>();



var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionHandlingMiddleware>();
app.UseHttpsRedirection();
// Agregar CORS aquí
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
