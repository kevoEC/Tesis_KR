import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CatalogoView from "@/components/shared/CatalogoView";
import {
  getTipoActividad,
  deleteTipoActividad,
} from "@/service/Catalogos/TipoActividadService";

export default function TipoActividad() {
  const [tipoActividades, setTipoActividades] = useState([]);
  const navigate = useNavigate();

  const fetchTipoActividades = async () => {
    try {
      const data = await getTipoActividad();
      setTipoActividades(data);
    } catch (err) {
      console.error("Error al cargar tipos de actividad:", err);
    }
  };

  useEffect(() => {
    fetchTipoActividades();
  }, []);

  const handleEditar = (item) => {
    navigate(`/catalogo/tipoactividad/editar/${item.idTipoActividad}`);
  };

  const handleEliminar = async (item) => {
    try {
      await deleteTipoActividad(item.idTipoActividad);
      setTipoActividades((prev) =>
        prev.filter((t) => t.idTipoActividad !== item.idTipoActividad)
      );
    } catch (err) {
      console.error("Error al eliminar tipo de actividad:", err);
    }
  };

  return (
    <CatalogoView
      titulo="Tipos de Actividad"
      entidad="catalogo/tipoactividad"
      ruta="catalogo/tipoactividad"
      data={tipoActividades}
      columnas={{
        idTipoActividad: "ID",
        descripcion: "Descripcion",
      }}
      onEditar={handleEditar}
      onEliminar={handleEliminar}
    />
  );
}
