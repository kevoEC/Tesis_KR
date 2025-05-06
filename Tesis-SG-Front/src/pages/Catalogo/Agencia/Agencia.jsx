import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CatalogoView from "@/components/shared/CatalogoView";
import {
  getAgencias,
  deleteAgencia,
} from "@/service/Catalogos/AgenciaService";

export default function Agencia() {
  const [agencias, setAgencias] = useState([]);
  const navigate = useNavigate();

  const fetchAgencias = async () => {
    try {
      const data = await getAgencias();
      setAgencias(data);
    } catch (err) {
      console.error("Error al cargar agencias:", err);
    }
  };

  useEffect(() => {
    fetchAgencias();
  }, []);

  const handleEditar = (item) => {
    navigate(`/catalogo/agencia/editar/${item.idAgencia}`);
  };

  const handleEliminar = async (item) => {
    try {
      await deleteAgencia(item.idAgencia);
      setAgencias((prev) => prev.filter((a) => a.idAgencia !== item.idAgencia));
    } catch (err) {
      console.error("Error al eliminar agencia:", err);
    }
  };

  return (
    <CatalogoView
    titulo="Agencias"
    entidad="catalogo/agencia"  // ✅ necesario para que el botón "Nuevo" funcione correctamente
    ruta="catalogo/agencia"
    data={agencias}
    columnas={{
      idAgencia: "ID",
      ciudad: "Ciudad",
    }}
    onEditar={handleEditar}
    onEliminar={handleEliminar}
  />
  );
}
