import { API_BASE_URL } from "@/config";

const getAuthHeaders = () => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const handleResponse = async (res) => {
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const getOrigenes = async () => {
  const res = await fetch(`${API_BASE_URL}/OrigenCliente`, { headers: getAuthHeaders() });
  return handleResponse(res);
};

export const getOrigenById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/OrigenCliente/${id}`, { headers: getAuthHeaders() });
  return handleResponse(res);
};

export const createOrigen = async (data) => {
  const res = await fetch(`${API_BASE_URL}/OrigenCliente`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const updateOrigen = async (data) => {
  const res = await fetch(`${API_BASE_URL}/OrigenCliente/${data.idOrigenCliente}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const deleteOrigen = async (id) => {
  const res = await fetch(`${API_BASE_URL}/OrigenCliente/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};
