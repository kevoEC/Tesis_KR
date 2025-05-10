// src/services/ActividadService.js

import { API_BASE_URL } from "@/config";

// Función auxiliar para manejar respuestas de la API
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error en la solicitud");
  }
  return await response.json();
};
// Función para obtener el token actual desde localStorage
const getAuthHeaders = () => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};


let actividadesPorProspecto = {
  1: [
    {
      idActividad: 1,
      idTipoActividad: 1,
      asunto: "Primera llamada",
      descripcion: "Se realizó contacto inicial",
      duracion: "00:15:00",
      vencimiento: "2025-04-16T10:00",
      idPrioridad: 2,
      estado: true, // finalizada
    },
    {
      idActividad: 2,
      idTipoActividad: 2,
      asunto: "Seguimiento por correo",
      descripcion: "Se envió información adicional",
      duracion: "00:30:00",
      vencimiento: "2025-04-18T16:00",
      idPrioridad: 1,
      estado: false, // en progreso
    },
  ],
};

// export const getActividadesByProspectoId = async (idProspecto) => {
//   return actividadesPorProspecto[idProspecto] || [];
// };

// 🔵 GET: Obtener prospecto por ID
export const getActividadesByProspectoId = async (id) => {
  const res = await fetch(`${API_BASE_URL}/vista/actividad/filtrar?por=IdProspecto&id=${id}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};

// 🟡 POST: Crear nuevo prospecto
export const createActividad = async (data) => {
  const res = await fetch(`${API_BASE_URL}/Actividad`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};



export const updateActividad = async (idActividad, data) => {
  const idP = data.idProspecto;
  const lista = actividadesPorProspecto[idP] || [];

  const index = lista.findIndex((a) => a.idActividad === idActividad);
  if (index === -1) throw new Error("Actividad no encontrada");

  actividadesPorProspecto[idP][index] = { ...lista[index], ...data };

  console.log("🟡 Actividad actualizada:", actividadesPorProspecto[idP][index]);
  return actividadesPorProspecto[idP][index];
};
