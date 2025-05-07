import { useEffect, useState } from "react";
import CatalogoView from "@/components/shared/CatalogoView";
import { useNavigate } from "react-router-dom";
import { getOrigenes, deleteOrigen } from "@/service/Catalogos/OrigenClienteService";

export default function OrigenCliente() {
  const [origenes, setOrigenes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getOrigenes().then(setOrigenes).catch(console.error);
  }, []);

  const handleEditar = (item) => {
    navigate(`/catalogo/origencliente/editar/${item.idOrigenCliente}`);
  };

  const handleEliminar = async (item) => {
    try {
      await deleteOrigen(item.idOrigenCliente);
      setOrigenes((prev) => prev.filter((i) => i.idOrigenCliente !== item.idOrigenCliente));
    } catch (err) {
      console.error("Error al eliminar origen:", err);
    }
  };

  return (
    <CatalogoView
      titulo="Origen Cliente"
      entidad="catalogo/origencliente"
      data={origenes}
      columnas={{
        idOrigenCliente: "ID",
        nombreOrigen: "Nombre del Origen"
      }}
      onEditar={handleEditar}
      onEliminar={handleEliminar}
    />
  );
}
