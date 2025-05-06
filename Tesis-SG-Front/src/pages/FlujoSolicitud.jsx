import { useEffect } from "react";
import { SolicitudStepperProvider } from "@/service/stepper/stepperSolicitud";
import { TopTabs } from "@/components/solicitud/layout/MenusSolicitud";
import StepperHeader from "@/components/solicitud/layout/StepperHeader";
import StepperBody from "@/components/solicitud/layout/StepperBody";
import { useUI } from "@/hooks/useUI";

// ⚠️ Opcional: simula una solicitud habilitada para pruebas
function useSimularHabilitacion() {
  const { setSolicitudHabilitada } = useUI();
  useEffect(() => {
    sessionStorage.setItem("solicitudHabilitada", "true");
    setSolicitudHabilitada(true);
  }, [setSolicitudHabilitada]);
}

export default function FlujoSolicitud() {
  useSimularHabilitacion();

  return (
    <SolicitudStepperProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <TopTabs active="general" />
        <StepperHeader />
        <StepperBody />
      </div>
    </SolicitudStepperProvider>
  );
}
