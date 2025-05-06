import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import StepIndicator from "@/components/ui/StepIndicator";

export default function Step2DatosPersonales({ onNext, onBack }) {
  const [form, setForm] = useState({
    nombres: "",
    segundoNombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const passwordChecks = {
    length: form.password.length >= 8,
    upper: /[A-Z]/.test(form.password),
    lower: /[a-z]/.test(form.password),
    number: /\d/.test(form.password),
    special: /[^A-Za-z0-9]/.test(form.password),
  };

  const allValid =
    Object.values(passwordChecks).every(Boolean) &&
    form.password === form.confirmPassword;

  return (
    <div className="min-h-screen bg-pattern flex flex-col items-center justify-center px-4 text-[--color-fg]">
      {/* Logo SG */}
      <img src="/png/Logo SG 1 1.png" alt="SG Consulting Group" className="h-14 mb-8" />

      <Card className="w-full max-w-md bg-white text-[--color-fg] shadow-md rounded-xl border border-[--color-border] fade-in-up">
        <CardContent className="py-8 px-10 space-y-6">
          <StepIndicator currentStep={2} />

          <div className="space-y-1 text-left">
            <h1 className="text-3xl font-bold text-black">Datos personales</h1>
            <p className="text-sm text-[--color-muted]">Completa esta información para continuar.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Primer nombre</Label>
              <Input
                name="nombres"
                placeholder="Ej. Juan"
                value={form.nombres}
                onChange={handleChange}
                className="h-11 text-base bg-[--color-bg] border border-[--color-border]"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Segundo nombre</Label>
              <Input
                name="segundoNombre"
                placeholder="Ej. Carlos"
                value={form.segundoNombre}
                onChange={handleChange}
                className="h-11 text-base bg-[--color-bg] border border-[--color-border]"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Apellido paterno</Label>
              <Input
                name="apellidoPaterno"
                placeholder="Ej. Pérez"
                value={form.apellidoPaterno}
                onChange={handleChange}
                className="h-11 text-base bg-[--color-bg] border border-[--color-border]"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Apellido materno</Label>
              <Input
                name="apellidoMaterno"
                placeholder="Ej. Gómez"
                value={form.apellidoMaterno}
                onChange={handleChange}
                className="h-11 text-base bg-[--color-bg] border border-[--color-border]"
              />
            </div>
          </div>

          <div className="space-y-1.5 pt-4">
            <Label>Contraseña</Label>
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="h-11 text-base pr-10 bg-[--color-bg] border border-[--color-border]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-[--color-muted]"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Confirmar contraseña</Label>
            <div className="relative">
              <Input
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="Repite la contraseña"
                value={form.confirmPassword}
                onChange={handleChange}
                className="h-11 text-base pr-10 bg-[--color-bg] border border-[--color-border]"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute inset-y-0 right-3 flex items-center text-[--color-muted]"
              >
                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {form.password.length > 0 && (
            <div className="text-sm space-y-1 pt-2">
              <p className="font-medium">Tu contraseña debe incluir:</p>
              {[
                ["length", "Más de 8 caracteres"],
                ["upper", "Al menos 1 mayúscula"],
                ["lower", "Al menos 1 minúscula"],
                ["number", "Al menos 1 número"],
                ["special", "Al menos 1 caracter especial"],
              ].map(([key, label]) => (
                <div key={key} className="flex items-center gap-2 text-[--color-muted]">
                  {passwordChecks[key] ? (
                    <CheckCircle className="text-green-600 w-4 h-4" />
                  ) : (
                    <XCircle className="text-gray-300 w-4 h-4" />
                  )}
                  <span>{label}</span>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2 pt-6">
            <Button
              type="button"
              className="w-full btn-primary btn-animated text-base py-3 h-12"
              onClick={() => onNext(form)}
              disabled={!allValid}
            >
              Continuar
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full btn-microsoft btn-animated text-base py-3 h-12"
              onClick={onBack}
            >
              Volver
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <footer className="text-center text-xs text-[--color-muted] mt-8">
        © SG CONSULTING GROUP ·{" "}
        <a href="/legal/privacidad" target="_blank" className="underline hover:text-[--color-primary]">
          Privacidad y condiciones
        </a>
      </footer>
    </div>
  );
}
