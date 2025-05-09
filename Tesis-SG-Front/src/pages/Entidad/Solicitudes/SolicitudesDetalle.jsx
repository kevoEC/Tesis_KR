// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getSolicitudById } from "@/service/Entidades/SolicitudService";
// import { useUI } from "@/hooks/useUI";
// import { Scoped } from "@/service/stepper/stepperSolicitud";
// import TopTabs from "@/components/solicitud/layout/TopTabs";
// import StepperHeader from "@/components/solicitud/layout/StepperHeader";
// import StepperBody from "@/components/solicitud/layout/StepperBody";

// export default function SolicitudesDetalle() {
//   const { id } = useParams();
//   const { setSolicitudId, setSolicitudHabilitada } = useUI();

//   const [errores, setErrores] = useState({});

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const solicitud = await getSolicitudById(id);
//         const parsed = JSON.parse(solicitud.jsonDocument);
//         setSolicitudId(solicitud.idSolicitudInversion);
//         sessionStorage.setItem("solicitud", JSON.stringify(parsed));
//         sessionStorage.setItem("solicitudHabilitada", "true");
//         setSolicitudHabilitada(true);
//       } catch (err) {
//         console.error("Error cargando solicitud:", err);
//       }
//     };
//     fetch();
//   }, [id, setSolicitudId, setSolicitudHabilitada]);

//   return (
//     <Scoped initialStep="identificacion">
//       <div className="flex flex-col h-full bg-gray-50 min-h-screen">
//         <TopTabs active="general" />
//         <StepperHeader errores={errores} />
//         <StepperBody setErrores={setErrores} />
//       </div>
//     </Scoped>
//   );
// }

// SimpleStepper.jsx
import React, { useState } from "react";
import Identificacion from "@/components/solicitud/Identificacion";
import Proyeccion from "@/components/solicitud/Proyeccion";
import DatosGenerales from "@/components/solicitud/DatosGenerales";
import ActividadEconomica from "@/components/solicitud/ActividadEconomica";
import ContactoUbicacion from "@/components/solicitud/ContactoUbicacion";
import Conyuge from "@/components/solicitud/Conyuge";
import Banco from "@/components/solicitud/Banco";
import Beneficiarios from "@/components/solicitud/Beneficiarios";
import Finalizacion from "@/components/solicitud/Finalizacion";
//import Adjuntos              from "@/components/solicitud/Adjuntos";
//import TareasSolicitudes     from "@/components/solicitud/TareasSolicitudes";

const steps = [
  {
    id: "identificacion",
    label: "Identificación",
    component: <Identificacion />,
  },
  { id: "proyeccion", label: "Proyección", component: <Proyeccion /> },
  { id: "datos", label: "Datos generales", component: <DatosGenerales /> },
  {
    id: "actividad",
    label: "Actividad económica",
    component: <ActividadEconomica />,
  },
  {
    id: "contacto",
    label: "Contacto y ubicación",
    component: <ContactoUbicacion />,
  },
  { id: "conyuge", label: "Cónyuge", component: <Conyuge /> },
  { id: "banco", label: "Banco", component: <Banco /> },
  { id: "beneficiarios", label: "Beneficiarios", component: <Beneficiarios /> },
  { id: "finalizacion", label: "Finalización", component: <Finalizacion /> },

  // --- aquí añades tus dos nuevas pestañas ---
  { id: "adjuntos", label: "Adjuntos", component: <DatosGenerales /> },
  {
    id: "tareas",
    label: "Tareas de solicitudes",
    component: <DatosGenerales />,
  },
];

export default function SimpleStepper() {
  const [current, setCurrent] = useState(0);

  const goNext = () => setCurrent((c) => Math.min(c + 1, steps.length - 1));
  const goPrev = () => setCurrent((c) => Math.max(c - 1, 0));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="flex border-b bg-white px-6 py-4">
        {steps.map((step, idx) => (
          <div
            key={step.id}
            onClick={() => setCurrent(idx)}
            className={`
              flex-1 text-center cursor-pointer pb-1
              ${
                idx === current
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }
            `}
          >
            {step.label}
          </div>
        ))}
      </div>

      {/* BODY */}
      <div className="flex-1 p-6">{steps[current].component}</div>

      {/* FOOTER */}
      <div className="flex justify-between px-6 py-4 bg-white border-t">
        <button
          onClick={goPrev}
          disabled={current === 0}
          className="px-4 py-2 rounded border disabled:opacity-50"
        >
          ← Anterior
        </button>
        <button
          onClick={goNext}
          disabled={current === steps.length - 1}
          className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
