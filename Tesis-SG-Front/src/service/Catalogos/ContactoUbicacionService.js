import { API_BASE_URL } from "@/config";

const getAuthHeaders = () => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const handleResponse = async (res) => {
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Error en la solicitud");
  }
  return res.json();
};

export const getCatalogoTipoVia = async () => {
  const res = await fetch(`${API_BASE_URL}/TipoVia`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};

export const getCatalogoPais = async () => {
  const res = await fetch(`${API_BASE_URL}/Pais`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};
export const getCatalogoProvinciaPorPais = async (id) => {
  const res = await fetch(`${API_BASE_URL}/Provincia/por-pais/${id}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};
export const getCatalogoCiudadPorProvincia = async (id) => {
  const res = await fetch(`${API_BASE_URL}/Ciudad/por-provincia/${id}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};
