import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function Finalizacion() {
  const [form, setForm] = useState({
    continuar: "",
    motivo: "",
    observacion: "",
    confirmarRechazo: false,
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-xl font-semibold text-gray-800">Finalización</h2>

      <Card className="shadow border">
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Número de contrato (bloqueado) */}
            <FormInput label="Número de contrato" value="000123456" disabled />

            {/* Propietario (bloqueado con link simulado) */}
            <FormInput
              label="Propietario"
              value="CRM Servicio (Desconectado)"
              disabled
            />

            {/* Continuar */}
            <div className="space-y-1 md:col-span-2">
              <Label className="text-sm text-gray-700 font-medium">
                Continuar <span className="text-red-500">*</span>
              </Label>
              <Select
                value={form.continuar}
                onValueChange={(val) => handleChange("continuar", val)}
              >
                <SelectTrigger className="bg-white border border-gray-300">
                  <SelectValue placeholder="Seleccionar opción..." />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="finalizar">Finalizar con el registro</SelectItem>
                  <SelectItem value="rechazar">Rechazar y terminar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Mostrar si se rechaza */}
            {form.continuar === "rechazar" && (
              <>
                <div className="space-y-1">
                  <Label className="text-sm text-gray-700 font-medium">
                    Motivo <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      value={form.motivo}
                      onChange={(e) => handleChange("motivo", e.target.value)}
                      className="pr-10"
                    />
                    <Search className="absolute right-3 top-2.5 size-4 text-gray-500" />
                  </div>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <Label className="text-sm text-gray-700 font-medium">
                    Observación <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    rows={3}
                    value={form.observacion}
                    onChange={(e) => handleChange("observacion", e.target.value)}
                    className="border border-gray-300"
                  />
                </div>

                <div className="flex items-center gap-4 md:col-span-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Confirmar rechazo <span className="text-red-500">*</span>
                  </Label>
                  <Switch
                    checked={form.confirmarRechazo}
                    onCheckedChange={(checked) =>
                      handleChange("confirmarRechazo", checked)
                    }
                    className="border border-gray-400"
                  />
                  <span className="text-sm text-muted-foreground">
                    {form.confirmarRechazo ? "Sí" : "No"}
                  </span>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Reutilizable
function FormInput({ label, value, onChange, disabled = false }) {
  return (
    <div className="space-y-1">
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      <Input
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="bg-gray-100 text-sm"
      />
    </div>
  );
}
