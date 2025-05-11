// src/service/Catalogos/ProductoInteresService.js
import { API_BASE_URL } from "@/config";

const handleResponse = async (res) => {
  if (!res.ok) throw new Error(await res.text() || "Error en la solicitud");
  return res.status === 204 ? null : res.json();
};

const getHeaders = () => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getProductosInteres = async () => {
  const res = await fetch(`${API_BASE_URL}/ProductoInteres`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
};

export const getProductoInteresById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/ProductoInteres/${id}`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
};

export const createProductoInteres = async (data) => {
  const res = await fetch(`${API_BASE_URL}/ProductoInteres`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const updateProductoInteres = async (data) => {
  const res = await fetch(`${API_BASE_URL}/ProductoInteres/${data.idProductoInteres}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const deleteProductoInteres = async (id) => {
  const res = await fetch(`${API_BASE_URL}/ProductoInteres/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return handleResponse(res);
};
