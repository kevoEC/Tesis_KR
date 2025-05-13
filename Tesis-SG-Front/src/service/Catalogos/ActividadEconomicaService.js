import { API_BASE_URL } from "@/config";

// 🧱 Función común para manejar respuestas
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error en la solicitud");
  }
  return await response.json();
};

// 🔐 Función para obtener headers con token
const getAuthHeaders = () => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// 🟢 GET: Obtener todas las agencias
export const getActividadEconomicaPrincipal = async () => {
  const res = await fetch(`${API_BASE_URL}/ActividadEconomicaPrincipal`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};
export const getActividadEconomicaTrabajo = async () => {
  const res = await fetch(`${API_BASE_URL}/ActividadEconomicaLugarTrabajo`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};