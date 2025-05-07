// utils/permisos.js
export const tienePermiso = (ruta, tipoPermiso, user) => {
  const permiso = user.permisos.find((p) => p.Ruta === ruta);
  return permiso?.Permisos.includes(tipoPermiso);
};
