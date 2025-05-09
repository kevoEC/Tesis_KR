import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CatalogoView from "@/components/shared/CatalogoView";
import {
  getPrioridad,
  deletePrioridad,
} from "@/service/Catalogos/PrioridadService";

export default function Prioridad() {
  const [prioridades, setPrioridades] = useState([]);
  const navigate = useNavigate();

  const fetchPrioridades = async () => {
    try {
      const data = await getPrioridad();
      setPrioridades(data);
    } catch (err) {
      console.error("Error al cargar prioridades:", err);
    }
  };

  useEffect(() => {
    fetchPrioridades();
  }, []);

  const handleEditar = (item) => {
    navigate(`/catalogo/prioridad/editar/${item.idPrioridad}`);
  };

  const handleEliminar = async (item) => {
    try {
      await deletePrioridad(item.idPrioridad);
      setPrioridades((prev) =>
        prev.filter((t) => t.idPrioridad !== item.idPrioridad)
      );
    } catch (err) {
      console.error("Error al eliminar tipo de actividad:", err);
    }
  };

  return (
    <CatalogoView
      titulo="Prioridad"
      entidad="catalogo/prioridad"
      ruta="catalogo/prioridad"
      data={prioridades}
      columnas={{
        idPrioridad: "ID",
        categoria: "Descripcion",
      }}
      onEditar={handleEditar}
      onEliminar={handleEliminar}
    />
  );
}
