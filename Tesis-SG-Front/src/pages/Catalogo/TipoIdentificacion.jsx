import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CatalogoView from "@/components/shared/CatalogoView";
import {
  getTipoIdentificacion,
  deleteTipoIdentificacion,
} from "@/service/Catalogos/TipoIdentificacionService";

export default function TipoIdentificacion() {
  const [tipoIdentificacion, setTipoIdentificacion] = useState([]);
  const navigate = useNavigate();

  const fetchTipoIdentificacion = async () => {
    try {
      const data = await getTipoIdentificacion();
      setTipoIdentificacion(data);
    } catch (err) {
      console.error("Error al cargar tipos de identificación:", err);
    }
  };

  useEffect(() => {
    fetchTipoIdentificacion();
  }, []);

  const handleEditar = (item) => {
    navigate(
      `/catalogo/tipoidentificacion/editar/${item.idTipoIdentificacion}`
    );
  };

  const handleEliminar = async (item) => {
    try {
      await deleteTipoIdentificacion(item.idTipoIdentificacion);
      setTipoIdentificacion((prev) =>
        prev.filter((t) => t.idTipoIdentificacion !== item.idTipoIdentificacion)
      );
    } catch (err) {
      console.error("Error al eliminar tipo de identificación:", err);
    }
  };

  return (
    <CatalogoView
      titulo="Tipos de Identificación"
      entidad="catalogo/tipoidentificacion"
      ruta="catalogo/tipoidentificacion"
      data={tipoIdentificacion}
      columnas={{
        idTipoIdentificacion: "ID",
        tipo: "Descripción",
      }}
      onEditar={handleEditar}
      onEliminar={handleEliminar}
    />
  );
}
