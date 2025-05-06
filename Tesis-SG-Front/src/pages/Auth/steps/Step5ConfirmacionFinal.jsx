// src/pages/Auth/Step5ConfirmacionFinal.jsx
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function Step5ConfirmacionFinal() {
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-pattern flex flex-col items-center justify-center px-4 text-[--color-fg]">
      {/* Logo */}
      <img
        src="/png/Logo SG 1 1.png"
        alt="SG Consulting Group"
        className="h-14 mb-8"
      />

      {/* Card */}
      <Card className="w-full max-w-md bg-white text-[--color-fg] shadow-md rounded-xl border border-[--color-border] fade-in-up">
        <CardContent className="py-10 px-10 space-y-6 text-center">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
          <h2 className="text-2xl font-bold">
            ¡Registro completado!
          </h2>
          <p className="text-sm text-[--color-muted]">
            Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión en la plataforma.
          </p>

          <Button
            className="w-full btn-primary btn-animated text-base h-12 mt-4"
            onClick={handleFinish}
          >
            Ir al inicio de sesión
          </Button>
        </CardContent>
      </Card>

      {/* Footer */}
      <footer className="text-center text-xs text-[--color-muted] mt-8">
        © SG CONSULTING GROUP · {" "}
        <a href="/legal/privacidad" target="_blank" className="underline hover:text-[--color-primary]">
          Privacidad y condiciones
        </a>
      </footer>
    </div>
  );
}
