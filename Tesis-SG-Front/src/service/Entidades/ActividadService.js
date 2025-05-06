// src/services/ActividadService.js

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

export const getActividadesByProspectoId = async (idProspecto) => {
  return actividadesPorProspecto[idProspecto] || [];
};

export const createActividad = async (actividad) => {
  const id = Date.now(); // ID simulado
  const nueva = { ...actividad, idActividad: id };
  const idP = actividad.idProspecto;

  if (!actividadesPorProspecto[idP]) actividadesPorProspecto[idP] = [];
  actividadesPorProspecto[idP].push(nueva);

  console.log("🟢 Actividad creada:", nueva);
  return nueva;
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
