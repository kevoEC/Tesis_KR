import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSolicitudById } from "@/service/Entidades/SolicitudService";
import { useUI } from "@/hooks/useUI";
import { Scoped } from "@/service/stepper/stepperSolicitud";
import TopTabs from "@/components/solicitud/layout/TopTabs";
import StepperHeader from "@/components/solicitud/layout/StepperHeader";
import StepperBody from "@/components/solicitud/layout/StepperBody";

export default function SolicitudesDetalle() {
  const { id } = useParams();
  const { setSolicitudId, setSolicitudHabilitada } = useUI();

  const [errores, setErrores] = useState({});

  useEffect(() => {
    const fetch = async () => {
      try {
        const solicitud = await getSolicitudById(id);
        const parsed = JSON.parse(solicitud.jsonDocument);
        setSolicitudId(solicitud.idSolicitudInversion);
        sessionStorage.setItem("solicitud", JSON.stringify(parsed));
        sessionStorage.setItem("solicitudHabilitada", "true");
        setSolicitudHabilitada(true);
      } catch (err) {
        console.error("Error cargando solicitud:", err);
      }
    };
    fetch();
  }, [id, setSolicitudId, setSolicitudHabilitada]);

  return (
    <Scoped initialStep="identificacion">
      <div className="flex flex-col h-full bg-gray-50 min-h-screen">
        <TopTabs active="general" />
        <StepperHeader errores={errores} />
        <StepperBody setErrores={setErrores} />
      </div>
    </Scoped>
  );
}
