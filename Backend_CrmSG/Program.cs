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

// ------------------------- Configuración de Azure AD -------------------------
var azureAd = builder.Configuration.GetSection("AzureAd");
string azureAuthority = $"{azureAd["Instance"]}{azureAd["TenantId"]}/v2.0";
string azureAudience = azureAd["Audience"];
string azureIssuer = $"https://sts.windows.net/{azureAd["TenantId"]}/";

// ------------------------- CORS ----------------------------------
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy => policy
        .WithOrigins("http://localhost:5173")
        .AllowAnyHeader()
        .AllowAnyMethod());
});

// ------------------- JWT SERVICE LOCAL ---------------------------
builder.Services.AddScoped<IJwtService, JwtService>();

// ------------- AUTENTICACIÓN MÚLTIPLE ----------------------------
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = "MultiAuthScheme";
})
.AddPolicyScheme("MultiAuthScheme", "JWT or Azure AD", options =>
{
    options.ForwardDefaultSelector = context =>
    {
        var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();
        if (authHeader != null && authHeader.StartsWith("Bearer "))
        {
            var token = authHeader.Substring("Bearer ".Length);
            if (token.Length > 1000) // Tokens de Microsoft suelen ser más largos
                return "AzureAdJwtScheme";
            else
                return "LocalJwtScheme";
        }
        return "LocalJwtScheme";
    };
})
.AddJwtBearer("LocalJwtScheme", options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
})
.AddJwtBearer("AzureAdJwtScheme", options =>
{
    options.Authority = azureAuthority;
    options.Audience = azureAudience;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = azureIssuer,
        ValidateAudience = true,
        ValidAudience = azureAudience,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true
    };
});

// ------------------ AUTORIZACIÓN GENERAL --------------------------
builder.Services.AddAuthorization();

// ------------------ DB CONTEXT ------------------------------------
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// ------------------ CONTROLADORES ---------------------------------
builder.Services.AddControllers(options =>
{
    options.Filters.Add<Backend_CrmSG.Filters.SuccessMessageFilter>();
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ------------------ INYECCIÓN DE SERVICIOS ------------------------
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IProspectoService, ProspectoService>();
builder.Services.AddScoped<IActividadService, ActividadService>();

// Catálogos
builder.Services.AddScoped<IOrigenClienteService, OrigenClienteService>();
builder.Services.AddScoped<IAgenciaService, AgenciaService>();
builder.Services.AddScoped<IPrioridadService, PrioridadService>();
builder.Services.AddScoped<ITipoActividadService, TipoActividadService>();
builder.Services.AddScoped<ITipoIdentificacionService, TipoIdentificacionService>();
builder.Services.AddScoped<IProductoInteresService, ProductoInteresService>();

// Seguridad
builder.Services.AddScoped<IUsuarioService, UsuarioService>();
builder.Services.AddScoped<IRolService, RolService>();
builder.Services.AddScoped<IPermisoService, PermisoService>();
builder.Services.AddScoped<IMenuService, MenuService>();
builder.Services.AddScoped<IUsuarioRolService, UsuarioRolService>();

// ------------------ APP BUILD --------------------------------------
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionHandlingMiddleware>();
app.UseHttpsRedirection();
app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();
