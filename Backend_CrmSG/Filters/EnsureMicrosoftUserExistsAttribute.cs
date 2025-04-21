using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;
using Backend_CrmSG.Services.Seguridad;
using Backend_CrmSG.Models.Seguridad;

public class EnsureMicrosoftUserExistsAttribute : Attribute, IAsyncActionFilter
{
    private readonly string _defaultRole;

    public EnsureMicrosoftUserExistsAttribute(string defaultRole = "Externo")
    {
        _defaultRole = defaultRole;
    }

    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var httpContext = context.HttpContext;
        var user = httpContext.User;

        var issuer = user.FindFirst("iss")?.Value;
        if (issuer != null && issuer.Contains("microsoft"))
        {
            var email = user.FindFirst("preferred_username")?.Value ?? user.FindFirst("email")?.Value;
            var nameFull = user.FindFirst("name")?.Value;
            var given = user.FindFirst("given_name")?.Value;
            var family = user.FindFirst("family_name")?.Value;

            if (!string.IsNullOrEmpty(email))
            {
                var usuarioService = httpContext.RequestServices.GetRequiredService<IUsuarioService>();
                var usuarioRolService = httpContext.RequestServices.GetRequiredService<IUsuarioRolService>();

                var usuario = await usuarioService.BuscarPorCorreoAsync(email);
                if (usuario == null)
                {
                    // Descomposición del nombre si no vienen claims separados
                    string primerNombre = "", segundoNombre = "", primerApellido = "", segundoApellido = "";

                    if (!string.IsNullOrEmpty(given) && !string.IsNullOrEmpty(family))
                    {
                        primerNombre = given;
                        primerApellido = family;
                    }
                    else if (!string.IsNullOrEmpty(nameFull))
                    {
                        var partes = nameFull.Split(" ", StringSplitOptions.RemoveEmptyEntries);
                        if (partes.Length >= 1) primerNombre = partes[0];
                        if (partes.Length >= 2) segundoNombre = partes[1];
                        if (partes.Length >= 3) primerApellido = partes[2];
                        if (partes.Length >= 4) segundoApellido = partes[3];
                    }

                    var nuevoUsuario = new Usuario
                    {
                        Email = email,
                        PrimerNombre = primerNombre,
                        SegundoNombre = segundoNombre,
                        PrimerApellido = primerApellido,
                        SegundoApellido = segundoApellido,
                        EsActivo = true,
                        Contraseña = "", // No se necesita para usuarios externos
                        Identificacion = email // O puedes usar un GUID si prefieres
                    };

                    await usuarioService.AddAsync(nuevoUsuario);
                    await usuarioRolService.AsignarRolPorDefecto(nuevoUsuario.IdUsuario, _defaultRole);
                }
            }
        }

        await next();
    }
}
