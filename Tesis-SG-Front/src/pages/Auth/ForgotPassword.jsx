import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-pattern flex flex-col items-center justify-center px-4 text-[--color-fg]">
      <Card className="w-full max-w-md bg-white text-[--color-fg] shadow-md rounded-xl border border-[--color-border] fade-in-up">
        <CardContent className="py-10 px-8 space-y-8 text-center">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Recuperar contraseña</h1>
            <p className="text-sm text-[--color-muted]">
              Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña
            </p>
          </div>

          <div className="space-y-2 text-left">
            <Label htmlFor="email" className="text-base font-medium">
              Correo electrónico
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              className="h-11 text-base bg-[--color-bg] border border-[--color-border]"
            />
          </div>

          <Button className="w-full btn-primary btn-animated text-base py-3 h-12">
            Enviar enlace de recuperación
          </Button>

          <Link
            to="/login"
            className="text-sm text-[--color-primary] hover:underline font-medium block"
          >
            Volver al inicio de sesión
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
