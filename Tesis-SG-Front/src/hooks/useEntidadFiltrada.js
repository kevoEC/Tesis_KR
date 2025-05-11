import { useEffect, useState, useCallback } from "react";
import { getEntidadFiltrada } from "@/service/Entidades/EntidadService";
import { useAuth } from "@/hooks/useAuth";

export function useEntidadFiltrada(entidad, filtro) {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarDatos = useCallback(async () => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const resultado = await getEntidadFiltrada(entidad, filtro, user.id);
      setData(resultado);
    } catch (err) {
      setError(err.message || "Error al cargar los datos");
    } finally {
      setLoading(false);
    }
  }, [entidad, filtro, user?.id]);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  return {
    data,
    loading,
    error,
    refetch: cargarDatos,
  };
}
