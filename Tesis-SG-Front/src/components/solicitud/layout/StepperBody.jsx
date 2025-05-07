import { useStepper } from "@/service/stepper/stepperSolicitud"; // Solo si usas stepper
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import Identificacion from "@/components/solicitud/Identificacion";
import Proyeccion from "@/components/solicitud/Proyeccion";
import DatosGenerales from "@/components/solicitud/DatosGenerales";
import ActividadEconomica from "@/components/solicitud/ActividadEconomica";
import ContactoUbicacion from "@/components/solicitud/ContactoUbicacion";
import Conyuge from "@/components/solicitud/Conyuge";
import Banco from "@/components/solicitud/Banco";
import Beneficiarios from "@/components/solicitud/Beneficiarios";
import Finalizacion from "@/components/solicitud/Finalizacion";

const componentes = {
  identificacion: <Identificacion />,
  proyeccion: <Proyeccion />,
  datos: <DatosGenerales />,
  actividad: <ActividadEconomica />,
  contacto: <ContactoUbicacion />,
  conyuge: <Conyuge />,
  banco: <Banco />,
  beneficiarios: <Beneficiarios />,
  finalizacion: <Finalizacion />,
};

const validaciones = {
  identificacion: () => !!JSON.parse(sessionStorage.getItem("solicitud"))?.numeroDocumento,
  proyeccion: () => !!JSON.parse(sessionStorage.getItem("solicitud"))?.proyeccion,
  // agrega más si necesitas
};

export default function StepperBody({ preview = false }) {
  const stepper = useStepper();
  const currentStep = stepper?.currentStep;
  const isPreview = preview || !currentStep;

  if (isPreview) {
    // Renderiza todos los formularios como vista previa
    return (
      <div className="flex-1 p-6 space-y-6">
        {Object.entries(componentes).map(([id, Componente]) => (
          <Card
            key={id}
            className="p-6 shadow-md bg-white rounded-2xl border border-gray-200"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4 capitalize">
              {id}
            </h2>
            {Componente}
          </Card>
        ))}
      </div>
    );
  }

  const ComponenteActual = componentes[currentStep.id];

  const handleNext = () => {
    const validar = validaciones[currentStep.id];
    const pasoValido = validar ? validar() : true;

    return stepper.beforeNext(() => {
      if (!pasoValido) {
        if (window.toast) toast.error("Debes completar este paso antes de continuar");
        else alert("Debes completar este paso antes de continuar");
        return false;
      }
      return true;
    });
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      <Card className="p-6 shadow-md bg-white rounded-2xl border border-gray-200">
        {ComponenteActual ?? (
          <p className="text-gray-500 text-sm">
            ❌ Componente no encontrado para: {currentStep.id}
          </p>
        )}
      </Card>

      <div className="flex justify-between mt-4">
        <Button
          onClick={() => stepper.beforePrev(() => true)}
          variant="outline"
          disabled={stepper.isFirst}
        >
          ← Anterior
        </Button>

        <Button
          onClick={handleNext}
          className="bg-blue-600 text-white hover:bg-blue-700"
          disabled={stepper.isLast}
        >
          Siguiente →
        </Button>
      </div>
    </div>
  );
}
