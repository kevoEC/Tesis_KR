using Backend_CrmSG.DTOs;
using Backend_CrmSG.Models.Catalogos.Producto;

public class ProductoConConfiguracionesDto
{
    public Producto Producto { get; set; }
    public IEnumerable<ConfiguracionProductoDto> Configuraciones { get; set; }
}
