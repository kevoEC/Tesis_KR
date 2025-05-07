// src/components/ui/StepIndicator.jsx
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  "Cuenta",
  "Datos personales",
  "Verificación",
  "Teléfono",
  "Confirmación",
];

export default function StepIndicator({ currentStep = 1 }) {
  return (
    <div className="flex items-center justify-center space-x-4 mb-6">
      {steps.map((label, index) => {
        const stepNum = index + 1;
        const isCompleted = stepNum < currentStep;
        const isCurrent = stepNum === currentStep;

        return (
          <div key={stepNum} className="flex items-center gap-2">
            {/* Círculo */}
            <div
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center border text-xs font-bold transition",
                isCompleted
                  ? "bg-green-600 text-white border-green-600"
                  : isCurrent
                  ? "border-[--color-primary] text-[--color-primary]"
                  : "border-[--color-border] text-[--color-muted] bg-white"
              )}
            >
              {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
            </div>

            {/* Texto solo para paso actual */}
            {isCurrent && (
              <span className="text-sm font-medium text-[--color-primary]">
                {label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
