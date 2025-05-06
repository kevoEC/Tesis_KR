import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CatalogoView from "@/components/shared/CatalogoView";
import {
  getProductosInteres,
  deleteProductoInteres,
} from "@/service/Catalogos/ProductoInteresService";

export default function ProductoInteres() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  const fetchProductos = async () => {
    try {
      const data = await getProductosInteres();
      setProductos(data);
    } catch (err) {
      console.error("Error al cargar productos:", err);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleEditar = (item) => {
    navigate(`/catalogo/productointeres/editar/${item.idProductoInteres}`);
  };

  const handleEliminar = async (item) => {
    try {
      await deleteProductoInteres(item.idProductoInteres);
      setProductos((prev) => prev.filter((p) => p.idProductoInteres !== item.idProductoInteres));
    } catch (err) {
      console.error("Error al eliminar producto:", err);
    }
  };

  return (
    <CatalogoView
      titulo="Productos de Interés"
      entidad="catalogo/productointeres"
      data={productos}
      columnas={{
        idProductoInteres: "ID",
        nombre: "Nombre",
      }}
      onEditar={handleEditar}
      onEliminar={handleEliminar}
    />
  );
}
