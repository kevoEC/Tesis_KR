import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import StepIndicator from "@/components/ui/StepIndicator";
import { toast } from "sonner";

export default function Step3VerificacionCorreo({ data, onNext }) {
  const [email] = useState(data.correo || "usuario@correo.com");

  const reenviarCorreo = () => {
    toast.success("Correo de verificación enviado nuevamente 📬");
  };

  const continuar = () => {
    toast.success("Correo verificado correctamente ✅");
    onNext(); // avanzamos al paso 4
  };

  return (
    <div className="min-h-screen bg-pattern flex flex-col items-center justify-center px-4 text-[--color-fg]">
      {/* Logo SG */}
      <img
        src="/png/Logo SG 1 1.png"
        alt="SG Consulting Group"
        className="h-14 mb-8"
      />

      {/* Card */}
      <Card className="w-full max-w-md bg-white text-[--color-fg] shadow-md rounded-xl border border-[--color-border] fade-in-up">
        <CardContent className="py-8 px-10 space-y-8 text-center">
          <StepIndicator currentStep={3} />

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-black">Tu registro ha sido exitoso</h1>
            <p className="text-sm text-[--color-muted] leading-relaxed">
              Te hemos enviado un correo electrónico a: <br />
              <strong className="text-black">{email}</strong> <br />
              Por favor revísalo para activar tu cuenta.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={reenviarCorreo}
              className="w-full btn-microsoft btn-animated text-sm py-3 h-12"
            >
              Volver a enviar el correo
            </Button>

            <Button
              type="button"
              onClick={continuar}
              className="w-full btn-primary btn-animated text-sm py-3 h-12"
            >
              Ya verifiqué mi correo
            </Button>
          </div>
        </CardContent>
      </Card>

      <footer className="text-center text-xs text-[--color-muted] mt-8">
        © SG CONSULTING GROUP ·{" "}
        <a href="/legal/privacidad" target="_blank" className="underline hover:text-[--color-primary]">
          Privacidad y condiciones
        </a>
      </footer>
    </div>
  );
}
