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
  return await res.json();
};

// 🔍 Obtener referencias por ID solicitud
export const getReferenciasPorSolicitud = async (idSolicitud) => {
  const res = await fetch(
    `${API_BASE_URL}/vista/referencia/filtrar?por=idSolicitudInversion&id=${idSolicitud}`,
    {
      headers: getAuthHeaders(),
    }
  );
  return handleResponse(res);
};

// 🟢 Crear nueva referencia
export const crearReferencia = async (data) => {
  const res = await fetch(`${API_BASE_URL}/referencia`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

// Editar referencia existente
export const editarReferencia = async (id, data) => {
    const res = await fetch(`${API_BASE_URL}/referencia/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  };

  // ❌ Eliminar referencia por ID
export const eliminarReferencia = async (id) => {
    const res = await fetch(`${API_BASE_URL}/referencia/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  };
  
  