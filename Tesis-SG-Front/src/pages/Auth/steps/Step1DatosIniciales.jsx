import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import StepIndicator from "@/components/ui/StepIndicator";
import { useNavigate } from "react-router-dom";

export default function Step1DatosIniciales({ data, setData, onNext }) {
  const navigate = useNavigate();

  const handleCheckboxChange = (key) => {
    setData((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isValid =
    data.correo &&
    data.confirmarCorreo &&
    data.identificacion &&
    data.aceptaClausula &&
    data.aceptaTerminos &&
    data.aceptaPrivacidad;

  return (
    <div className="min-h-screen bg-pattern flex flex-col items-center justify-center px-4 text-[--color-fg]">
      {/* Logo fuera del card */}
      <img
        src="/png/Logo SG 1 1.png"
        alt="SG Consulting Group"
        className="h-14 mb-8"
      />

      <Card className="w-full max-w-md bg-white text-[--color-fg] shadow-md rounded-xl border border-[--color-border] fade-in-up">
        <CardContent className="py-8 px-10 space-y-8">
          {/* Step Indicator */}
          <StepIndicator currentStep={1} />

          {/* Título */}
          <div className="space-y-1 text-left">
            <h1 className="text-3xl font-bold text-black">Crea tu cuenta</h1>
            <p className="text-sm text-[--color-muted]">Ingresa tu información inicial para continuar.</p>
          </div>

          {/* Formulario */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="correo">Correo electrónico</Label>
              <Input
                id="correo"
                type="email"
                placeholder="correo@ejemplo.com"
                value={data.correo}
                onChange={(e) => setData({ ...data, correo: e.target.value })}
                className="h-11 text-base bg-[--color-bg] border border-[--color-border]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmarCorreo">Confirmar correo electrónico</Label>
              <Input
                id="confirmarCorreo"
                type="email"
                placeholder="correo@ejemplo.com"
                value={data.confirmarCorreo}
                onChange={(e) => setData({ ...data, confirmarCorreo: e.target.value })}
                className="h-11 text-base bg-[--color-bg] border border-[--color-border]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="identificacion">Identificación</Label>
              <Input
                id="identificacion"
                placeholder="XXX-XXXXXXXX"
                value={data.identificacion}
                onChange={(e) => setData({ ...data, identificacion: e.target.value })}
                className="h-11 text-base bg-[--color-bg] border border-[--color-border]"
              />
            </div>
          </div>

          {/* Checkboxes legales */}
          <div className="space-y-3 text-sm text-[--color-muted] pt-2">
            <div className="flex items-center gap-2">
            <Checkbox
              id="clausula"
              checked={data.aceptaClausula}
              onCheckedChange={() => handleCheckboxChange("aceptaClausula")}
              className="data-[state=checked]:bg-[--color-primary] data-[state=checked]:border-[--color-primary] data-[state=checked]:text-white checkbox-animated"
            />

              <label htmlFor="clausula">
                Acepto la{" "}
                <a href="/legal/clausula" target="_blank" className="underline hover:text-[--color-primary]">
                  Cláusula informativa
                </a>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="terminos"
                checked={data.aceptaTerminos}
                onCheckedChange={() => handleCheckboxChange("aceptaTerminos")}
                className="data-[state=checked]:bg-[--color-primary] data-[state=checked]:border-[--color-primary] data-[state=checked]:text-white checkbox-animated"
              />
              <label htmlFor="terminos">
                Acepto los{" "}
                <a href="/legal/terminos" target="_blank" className="underline hover:text-[--color-primary]">
                  Términos y condiciones
                </a>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="privacidad"
                checked={data.aceptaPrivacidad}
                onCheckedChange={() => handleCheckboxChange("aceptaPrivacidad")}
                className="data-[state=checked]:bg-[--color-primary] data-[state=checked]:border-[--color-primary] data-[state=checked]:text-white checkbox-animated"
              />
              <label htmlFor="privacidad">
                Acepto la{" "}
                <a href="/legal/privacidad" target="_blank" className="underline hover:text-[--color-primary]">
                  Política de Privacidad
                </a>
              </label>
            </div>
          </div>

          {/* Botones */}
          <div className="space-y-3 pt-2">
            <Button
              className="w-full btn-primary btn-animated text-base py-3 h-12"
              onClick={onNext}
              disabled={!isValid}
            >
              Continuar
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full btn-microsoft btn-animated text-sm py-3 h-12"
              onClick={() => navigate("/login")}
            >
              Cancelar
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
