import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Search } from "lucide-react";

export default function ActividadEconomica() {
  const [isPEP, setIsPEP] = useState(false);

  return (
    <div className="space-y-6 p-6">
      {/* 🔹 Actividad Económica */}
      <h2 className="text-xl font-semibold text-gray-800">Actividad económica</h2>
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormSelectWithIcon label="Actividad económica principal" />
            <FormSelectWithIcon label="Actividad económica del lugar de trabajo" />
            <FormInput label="Lugar de trabajo" />
            <FormInput label="Otra actividad económica" />
            <FormInput label="Cargo" />
            <FormInput label="Correo electrónico del trabajo" />
            <FormInput label="Antigüedad (años)" />
            <FormInput label="Teléfono del trabajo" />
            <FormInput label="Fecha de inicio" type="date" />
            <FormInput label="Dirección del trabajo" />
            <FormSwitch label="Es PEP" checked={isPEP} onChange={setIsPEP} />
            <FormInput label="Referencia de la dirección del trabajo" />
          </div>
        </CardContent>
      </Card>

      {/* 🔹 Datos Económicos */}
      <h2 className="text-xl font-semibold text-gray-800">Datos económicos</h2>
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormInput label="Total ingresos mensuales" required />
            <FormInput label="Total egresos mensuales" required />
            <FormInput label="Total activos" required />
            <FormInput label="Total pasivos" required />
            <FormInput label="Activos muebles" />
            <FormInput label="Activos inmuebles" />
            <FormInput label="Ingresos fijos" />
            <FormInput label="Activos de los títulos valor" />
            <FormInput label="Ingresos variables" />
            <FormInput label="Origen de ingreso variable" />
            <FormInput label="Patrimonio neto" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 🔁 Reutilizables

function FormInput({ label, required = false, type = "text" }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Input placeholder="---" type={type} />
    </div>
  );
}

function FormSelectWithIcon({ label, required = false }) {
  return (
    <div className="space-y-1.5 relative">
      <Label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Select>
        <SelectTrigger className="bg-white border border-gray-300 pr-10 text-sm">
          <SelectValue placeholder="---" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="opcion1">Opción 1</SelectItem>
          <SelectItem value="opcion2">Opción 2</SelectItem>
        </SelectContent>
      </Select>
      <Search className="absolute right-3 top-9 size-4 text-muted-foreground pointer-events-none" />
    </div>
  );
}

function FormSwitch({ label, checked, onChange }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </Label>
      <div className="flex items-center gap-4">
        <Switch
          checked={checked}
          onCheckedChange={onChange}
          className="border border-gray-500"
        />
        <span className="text-sm text-muted-foreground">{checked ? "Sí" : "No"}</span>
      </div>
    </div>
  );
}
