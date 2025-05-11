import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState(null); // puedes cambiar por múltiples estados si quieres

  const getData = async (endpoint) => {
    try {
      const res = await fetch(endpoint);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Error al obtener datos:", err);
    }
  };

  return (
    <DataContext.Provider value={{ data, getData }}>
      {children}
    </DataContext.Provider>
  );
}
