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
export const getTipoActividad = async () => {
  const res = await fetch(`${API_BASE_URL}/TipoActividad`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};

// 🔵 GET: Obtener agencia por ID
export const getTipoActividadById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/TipoActividad/${id}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};

// 🟡 POST: Crear nueva agencia
export const createTipoActividad = async (data) => {
  const res = await fetch(`${API_BASE_URL}/TipoActividad`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

// 🟠 PUT: Actualizar agencia
export const updateTipoActividad = async (data) => {
  console.log(data);
  const res = await fetch(
    `${API_BASE_URL}/TipoActividad/${data.idTipoActividad}`,
    {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }
  );
  return handleResponse(res);
};

// 🔴 DELETE: Eliminar agencia
export const deleteTipoActividad = async (id) => {
  const res = await fetch(`${API_BASE_URL}/TipoActividad/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};
