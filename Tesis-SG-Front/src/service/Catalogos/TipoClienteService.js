// src/services/Catalogos/AgenciaService.js
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
export const getTipoCliente = async () => {
  const res = await fetch(`${API_BASE_URL}/TipoCliente`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};

// 🔵 GET: Obtener agencia por ID
export const getTipoClienteById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/TipoCliente/${id}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};

// 🟡 POST: Crear nueva agencia
export const createTipoCliente = async (data) => {
  const res = await fetch(`${API_BASE_URL}/TipoCliente`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

// 🟠 PUT: Actualizar agencia
export const updateTipoCliente = async (data) => {
  const res = await fetch(`${API_BASE_URL}/TipoCliente/${data.idAgencia}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

// 🔴 DELETE: Eliminar agencia
export const deleteTipoCliente = async (id) => {
  const res = await fetch(`${API_BASE_URL}/TipoCliente/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};
