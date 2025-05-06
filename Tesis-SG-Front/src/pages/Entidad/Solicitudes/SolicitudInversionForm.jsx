
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import Identificacion from "@/components/solicitud/Identificacion";
import { TopTabs } from "@/components/solicitud/layout/MenusSolicitud";
import { useUI } from "@/hooks/useUI";

export default function SolicitudInversionForm() {
  const { solicitudId } = useUI();
  const navigate = useNavigate();

  useEffect(() => {
    // Si ya existe una solicitud creada, redirigir automáticamente
    if (solicitudId) {
      navigate("/solicitudes/vista");
    }
  }, [solicitudId, navigate]);

  return (
    <div className="flex flex-col h-full">
      <TopTabs active="general" />
      <div className="flex flex-grow">
        <div className="flex-1 p-6">
          <Card className="p-6 shadow-lg border rounded-xl bg-white">
            <Identificacion />
          </Card>
        </div>
      </div>
    </div>
  );
}
