// src/services/authService.js
import { API_BASE_URL } from "@/config";

export const loginRequest = async (email, contraseña) => {
  const response = await fetch(`${API_BASE_URL}/Usuario/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, contraseña }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Error al iniciar sesión");
  }

  const data = await response.json();
  return data; // contiene idUsuario, nombre, email, token
};

// Envía un token al número del usuario
export const enviarTokenSMS = async (telefono) => {
  const response = await fetch(`${API_BASE_URL}/Usuario/enviar-token-sms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ telefono }), // Asegúrate que sea 'telefono' y no 'email'
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "No se pudo enviar el token por SMS");
  }

  return await response.json(); // puede retornar { success: true } o similar
};




