import { useNavigate } from "react-router-dom";
import EntidadView from "@/components/shared/VistaEntidad";
import { deleteSolicitud } from "@/service/Entidades/SolicitudService";

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

  return (
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
  );
}
