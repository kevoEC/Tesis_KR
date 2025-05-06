import { useNavigate } from "react-router-dom";
import EntidadView from "@/components/shared/VistaEntidad";
import { deleteProspecto } from "@/service/Entidades/ProspectoService";

export default function Prospectos() {
  const navigate = useNavigate();

  // 🟡 Editar
  const handleEditar = (item) => {
    navigate(`/prospectos/editar/${item.idProspecto}`);
  };

  // 🔴 Eliminar
  const handleEliminar = async (item) => {
    try {
      await deleteProspecto(item.id);
      // Si usas refetch dentro de VistaEntidad, lo puedes llamar aquí después
    } catch (err) {
      console.error("Error al eliminar prospecto:", err);
    }
  };

  return (
    <EntidadView
      titulo="Prospectos"
      entidad="prospecto"       // 🔗 Para el backend (API)
      ruta="prospectos"         // 🌐 Para el frontend (rutas reales)
      columnas={{
        nombres: "Nombres",
        apellidoPaterno: "Apellido Paterno",
        apellidoMaterno: "Apellido Materno",
        telefonoCelular: "Teléfono Celular",
        correoElectronico: "Correo Electrónico",
        estado: "Estado",
        
      }}
      onEditar={handleEditar}
      onEliminar={handleEliminar}
    />
  );
}
