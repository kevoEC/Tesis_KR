import { useState } from "react";
import {
  CheckCircle,
  Circle,
  AlertCircle,
  User,
  BarChart,
  FileText,
  Banknote,
  MapPin,
  Heart,
  DollarSign,
  Users,
  CheckCheck,
  Info
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Si usas clsx o una helper similar

const pasosTemporales = [
  { id: "identificacion", title: "Identificación", description: "Datos del solicitante", icon: User },
  { id: "proyeccion", title: "Proyección", description: "Simulación financiera", icon: BarChart },
  { id: "datos", title: "Datos generales", description: "Información personal", icon: FileText },
  { id: "actividad", title: "Actividad económica", description: "Ingresos", icon: Banknote },
  { id: "contacto", title: "Contacto y ubicación", description: "Dirección", icon: MapPin },
  { id: "conyuge", title: "Cónyuge", description: "Datos cónyuge", icon: Heart },
  { id: "banco", title: "Banco", description: "Cuentas bancarias", icon: DollarSign },
  { id: "beneficiarios", title: "Beneficiarios", description: "Destinatarios", icon: Users },
  { id: "finalizacion", title: "Finalización", description: "Resumen", icon: CheckCheck }
];

const erroresPorPaso = {
  proyeccion: false,
};

export default function StepperHeader() {
  const [currentStepId, setCurrentStepId] = useState("identificacion");

  return (
    <div className="flex items-center justify-between px-8 py-6 bg-white shadow-sm border-b border-gray-200 rounded-t-xl relative overflow-x-auto">
      {pasosTemporales.map((step, index) => {
        const isActive = step.id === currentStepId;
        const currentIndex = pasosTemporales.findIndex(s => s.id === currentStepId);
        const stepIndex = index;
        const isVisited = stepIndex < currentIndex;
        const hasError = erroresPorPaso[step.id] === true;
        const Icon = step.icon;

        const bgColor = hasError
          ? "bg-red-100 text-red-600 border-red-300"
          : isActive
          ? "bg-blue-600 text-white border-blue-600 shadow-md"
          : isVisited
          ? "bg-green-100 text-green-600 border-green-400"
          : "bg-white text-gray-400 border-gray-300";

        const iconToRender = hasError
          ? <AlertCircle size={20} />
          : isVisited
          ? <CheckCircle size={20} />
          : <Icon size={20} />;

        return (
          <div
            key={step.id}
            onClick={() => setCurrentStepId(step.id)}
            className="relative z-10 flex flex-col items-center text-center group flex-1 cursor-pointer"
          >
            {index < pasosTemporales.length - 1 && (
              <div className="absolute top-5 left-1/2 w-full h-px bg-gray-300 z-[-1]" />
            )}

            <motion.div
              layout
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-300 group-hover:scale-110 group-hover:shadow",
                bgColor
              )}
            >
              {iconToRender}
            </motion.div>

            <motion.span
              layout
              className={cn(
                "mt-2 text-xs font-medium transition-colors",
                isActive ? "text-blue-600" : "text-gray-700 group-hover:text-black"
              )}
            >
              {step.title}
            </motion.span>

            {step.description && (
              <motion.span
                layout
                className="text-[11px] text-gray-400 font-normal mt-0.5 group-hover:text-gray-600 transition"
              >
                {step.description}
              </motion.span>
            )}
          </div>
        );
      })}
    </div>
  );
}