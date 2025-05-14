import { API_BASE_URL } from "@/config";

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Error en el registro");
  return data;
};

export const registroParcial = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/Usuario/registro-parcial`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};


export const validarCorreoToken = async (token) => {
  const response = await fetch(`${API_BASE_URL}/usuario/validar-correo?token=${token}`);
  const data = await response.json();

  // No lances error aquí, deja que el frontend maneje todos los casos
  return data;
};




