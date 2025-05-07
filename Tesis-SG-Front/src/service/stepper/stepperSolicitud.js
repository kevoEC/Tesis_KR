import { defineStepper } from "@stepperize/react";

export const { Scoped, useStepper, steps, utils } = defineStepper(
  {
    id: "identificacion",
    title: "Identificación",
    description: "Datos del solicitante",
  },
  {
    id: "proyeccion",
    title: "Proyección",
    description: "Simulación financiera",
  },
  {
    id: "datos",
    title: "Datos generales",
    description: "Información personal",
  },
  { id: "actividad", title: "Actividad económica", description: "Ingresos" },
  { id: "contacto", title: "Contacto y ubicación", description: "Dirección" },
  { id: "conyuge", title: "Cónyuge", description: "Datos cónyuge" },
  { id: "banco", title: "Banco", description: "Cuentas bancarias" },
  { id: "beneficiarios", title: "Beneficiarios", description: "Destinatarios" },
  { id: "finalizacion", title: "Finalización", description: "Resumen" }
);
