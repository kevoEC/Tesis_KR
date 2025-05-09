import { API_BASE_URL } from "@/config";

// 🧱 Función común para manejar respuestas
const handleResponse = async (response) => {
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Error en la solicitud");
    }
    return await response.json();
  };

  //  GET: Obtener todas los tipos
  export const getTiposIdentificacion = async () => {
    const res = await fetch(`${API_BASE_URL}/TipoIdentificacion`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  };
    //  GET: Obtener todas los tipos
    export const getTiposIdentificacionById = async () => {
        const res = await fetch(`${API_BASE_URL}/TipoIdentificacion/${id}`, {
          headers: getAuthHeaders(),
        });
        return handleResponse(res);
      };

  const getAuthHeaders = () => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };
  