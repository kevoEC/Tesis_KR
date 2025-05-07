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

export const getEntidadFiltrada = async (entidad, filtro, idUsuario) => {
  if (filtro === "mis") {
    // 🔁 Si es "mis", POST con filtros dinámicos a /filtradas
    const url = `${API_BASE_URL}/${entidad}/filtradas`;
    let payload = {};

    switch (entidad) {
      case "prospecto":
        payload = construirPayloadProspecto(filtro, idUsuario);
        break;

      case "actividad":
        payload = {
          idProspecto: null,
          estado: null,
          soloMisRegistros: true,
          idUsuario,
          busqueda: null,
        };
        break;

      case "solicitudinversion":
        payload = {
          identificacion: "",
          idTipoSolicitud: 0,
          idTipoCliente: 0,
          soloMisRegistros: true,
          idUsuario,
          busqueda: "",
        };
        break;

      default:
        throw new Error(`Entidad no soportada: ${entidad}`);
    }

    const res = await fetch(url, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });

    return handleResponse(res);
  } else {
    // 🌐 Para "todos", "activos", "inactivos": GET simple a /{entidad}
    const url = `${API_BASE_URL}/${entidad}`;
    const res = await fetch(url, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    return handleResponse(res);
  }
};

// 🔧 Función separada para construir el payload de prospectos
function construirPayloadProspecto(filtro, idUsuario) {
  switch (filtro) {
    case "mis":
      return {
        soloMisRegistros: true,
        idUsuario,
        estado: null,
        busqueda: null,
      };
    case "activos":
      return {
        soloMisRegistros: false,
        idUsuario: null,
        estado: true,
        busqueda: null,
      };
    case "inactivos":
      return {
        soloMisRegistros: false,
        idUsuario: null,
        estado: false,
        busqueda: null,
      };
    default:
      return {
        soloMisRegistros: false,
        idUsuario: null,
        estado: null,
        busqueda: null,
      };
  }
}
