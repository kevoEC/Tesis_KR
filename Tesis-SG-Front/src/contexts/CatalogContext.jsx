import { createContext, useEffect, useState } from "react";
import { getAgencias } from "@/service/Catalogos/AgenciaService";
// Aquí también importarás los demás servicios: getTipoIdentificacion, etc.

export const CatalogContext = createContext();

export const CatalogProvider = ({ children }) => {
  const [catalogs, setCatalogs] = useState({
    agencias: [],
    tipoIdentificaciones: [],
    origenes: [],
    productos: [],
  });

  const loadCatalogs = async () => {
    try {
      const [agencias] = await Promise.all([
        getAgencias(),
        // Aquí irían otros: getTipoIdentificaciones(), getOrigenes(), getProductos()
      ]);

      setCatalogs({
        agencias,
        tipoIdentificaciones: [
          { id: 1, nombre: "Cédula" },
          { id: 2, nombre: "Pasaporte" },
        ],
        origenes: [
          { id: 1, nombre: "Publicidad" },
          { id: 2, nombre: "Recomendación" },
        ],
        productos: [
          { id: 1, nombre: "Inversión A" },
          { id: 2, nombre: "Inversión B" },
        ],
      });
    } catch (error) {
      console.error("Error cargando catálogos:", error);
    }
  };

  useEffect(() => {
    loadCatalogs();
  }, []);

  return (
    <CatalogContext.Provider value={catalogs}>
      {children}
    </CatalogContext.Provider>
  );
};
