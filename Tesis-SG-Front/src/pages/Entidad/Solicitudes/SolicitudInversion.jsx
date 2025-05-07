import { useNavigate } from "react-router-dom";
import EntidadView from "@/components/shared/VistaEntidad";
import { deleteSolicitud } from "@/service/Entidades/SolicitudService";
import TablaCustom2 from "@/components/shared/TablaCustom2";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

export default function SolicitudInversion() {
  const navigate = useNavigate();

  // ✏️ Editar
  const handleEditar = (item) => {
    navigate(`/solicitudes/editar/${item.idSolicitudInversion}`);
  };

  // ❌ Eliminar
  const handleEliminar = async (item) => {
    try {
      await deleteSolicitud(item.idSolicitudInversion);
    } catch (err) {
      console.error("Error al eliminar solicitud:", err);
    }
  };

  const columnasSolicitud = [
    { key: 'tipoActividad', label: 'ID' },
    { key: 'asunto', label: 'Tipo Solicitud' },
    { key: 'descripcion', label: 'Tipo Cliente' },
    { key: 'duracion', label: 'Fecha de Creación' },
    { key: 'vencimiento', label: 'Fecha de Modificación' },
    { key: 'prioridad', label: 'Propietario' },
    { key: 'prioridad', label: 'JSON Document' }
  ]

  return (
    <div>

      <div>


        <EntidadView
          titulo="Solicitudes de Inversión"
          entidad="solicitudinversion"  // para el endpoint /filtrados
          ruta="solicitudes"            // para navegación
          columnas={{
            idSolicitudInversion: "ID",
            idTipoSolicitud: "Tipo Solicitud",
            idTipoCliente: "Tipo Cliente",
            fechaCreacion: "Fecha de Creación",
            fechaModificacion: "Fecha de Modificación",
            idUsuarioPropietario: "Propietario",
            jsonDocument: "JSON Document",
          }}
          onEditar={handleEditar}
          onEliminar={handleEliminar}
        />
      </div>
      <div>

        <Card>
          <CardHeader>
            <CardTitle>Solicitudes de Inversión - Todos</CardTitle>
          </CardHeader>
          <CardContent>
            <TablaCustom2
              columns={columnasSolicitud}
              data={[]}
              mostrarEditar={true}
              mostrarAgregarNuevo={true}
              mostrarEliminar={true}
              onEditarClick={handleEditar}
              onEliminarClick={handleEliminar}
            />
          </CardContent>
          <CardFooter>

          </CardFooter>
        </Card>

      </div>
    </div>
  );
}
