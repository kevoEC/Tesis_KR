// src/service/Entidades/BeneficiariosService.js

import { API_BASE_URL } from "@/config";

// 🔐 Obtener headers con token
const getAuthHeaders = () => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// ⚠️ Manejo de errores/respuesta
const handleResponse = async (res) => {
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Error en la solicitud");
  }
  return await res.json();
};

// 🔍 Obtener beneficiarios por ID solicitud
export const getBeneficiariosPorSolicitud = async (idSolicitud) => {
  const res = await fetch(
    `${API_BASE_URL}/vista/beneficiario/filtrar?por=idSolicitudInversion&id=${idSolicitud}`,
    {
      headers: getAuthHeaders(),
    }
  );
  return handleResponse(res);
};

// 🟢 Crear nuevo beneficiario
export const crearBeneficiario = async (data) => {
  const res = await fetch(`${API_BASE_URL}/beneficiario`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

// ✏️ Editar beneficiario existente
export const editarBeneficiario = async (id, data) => {
  const res = await fetch(`${API_BASE_URL}/beneficiario/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

// ❌ Eliminar beneficiario por ID
export const eliminarBeneficiario = async (id) => {
  const res = await fetch(`${API_BASE_URL}/beneficiario/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};
