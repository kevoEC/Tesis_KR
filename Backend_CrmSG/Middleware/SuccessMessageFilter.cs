using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Backend_CrmSG.Filters
{
    public class SuccessMessageFilter : IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {
            // No se requiere acción previa
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            // Si la acción devolvió NoContent, cambiamos el resultado
            if (context.Result is NoContentResult)
            {
                var method = context.HttpContext.Request.Method.ToUpperInvariant();
                string message = method switch
                {
                    "PUT" => "Registro actualizado con éxito",
                    "DELETE" => "Registro eliminado con éxito",
                    _ => "Operación realizada con éxito"
                };

                context.Result = new OkObjectResult(new { message });
            }
        }
    }
}
