import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Search } from "lucide-react";

export default function Conyuge() {
  const [separacionBienes, setSeparacionBienes] = useState(false);

  return (
    <div className="space-y-6 p-6">
      {/* 🧑‍🤝‍🧑 Datos del cónyuge */}
      <h2 className="text-xl font-semibold text-gray-800">Cónyuge</h2>
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormInput label="Nombres" required />
            <FormInput label="Apellidos" />
            <FormSelect label="Tipo de documento" defaultValue="CI" />
            <FormInput label="Número de documento" required />
            <FormInput label="Correo electrónico" required />
            <FormInput label="Teléfono celular" required />
            <FormInput label="Teléfono fijo" />
            <FormInput label="Fecha de nacimiento" type="date" required />
            <FormInput label="Etnia" />
            <FormSelect label="País de nacimiento" icon={<Search size={14} />} />
            <FormSelect label="Provincia de nacimiento" icon={<Search size={14} />} />
            <FormSelect label="Ciudad de nacimiento" icon={<Search size={14} />} />
            <FormSelect label="Nivel académico" required />
            <FormInput label="Profesión" />
            <FormSelect label="Nacionalidad" icon={<Search size={14} />} />
            <FormSwitch label="Separación de bienes" checked={separacionBienes} onChange={setSeparacionBienes} />
          </div>
        </CardContent>
      </Card>

      {/* 💼 Actividad económica del cónyuge */}
      <h2 className="text-xl font-semibold text-gray-800">Actividad económica</h2>
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormSelect label="Actividad económica principal" required icon={<Search size={14} />} />
            <FormInput label="Correo electrónico del trabajo" />
            <FormInput label="Lugar de trabajo" />
            <FormInput label="Teléfono del trabajo" />
            <FormInput label="Cargo" />
            <FormInput label="Dirección del trabajo" />
            <FormInput label="Antigüedad (en años)" />
            <FormInput label="Referencia de la dirección del trabajo" />
            <FormInput label="Ingresos fijos del cónyuge" />
            <FormInput label="Ingresos variables del cónyuge" required />
            <FormInput label="Origen de ingresos variables del cónyuge" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function FormInput({ label, required = false, type = "text", icon, ...props }) {
    return (
      <div className="space-y-1.5 relative">
        <Label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <Input
          type={type}
          placeholder="---"
          {...props}
          className="text-sm pr-10"
        />
        {icon && <span className="absolute right-3 top-9 text-gray-400">{icon}</span>}
      </div>
    );
  }
  
  function FormSelect({ label, required = false, icon, defaultValue }) {
    return (
      <div className="space-y-1.5 relative">
        <Label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <Select defaultValue={defaultValue}>
          <SelectTrigger className="text-sm bg-white border border-gray-300 pr-10">
            <SelectValue placeholder="---" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="valor1">Opción 1</SelectItem>
            <SelectItem value="valor2">Opción 2</SelectItem>
          </SelectContent>
        </Select>
        {icon && <span className="absolute right-3 top-9 text-gray-400">{icon}</span>}
      </div>
    );
  }
  
  function FormSwitch({ label, checked, onChange }) {
    return (
      <div className="space-y-1.5">
        <Label className="text-sm font-medium text-gray-700">{label}</Label>
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
  