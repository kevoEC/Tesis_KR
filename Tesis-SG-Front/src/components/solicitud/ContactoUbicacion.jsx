import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Mail, Phone, Lock, Search } from "lucide-react";

export default function ContactoUbicacion() {
  const [esResidenteOtroPais, setEsResidenteOtroPais] = useState(false);
  const [esContribuyenteEEUU, setEsContribuyenteEEUU] = useState(false);

  return (
    <div className="space-y-6 p-6">
      {/* 📬 Contacto */}
      <h2 className="text-xl font-semibold text-gray-800">Contacto</h2>
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormInput label="Correo electrónico" required icon={<Mail size={16} />} />
            <FormInput label="Otro teléfono" />
            <FormInput label="Teléfono celular" required icon={<Phone size={16} />} />
            <FormInput label="Teléfono fijo" />
          </div>
        </CardContent>
      </Card>

      {/* 🏠 Ubicación */}
      <h2 className="text-xl font-semibold text-gray-800">Ubicación</h2>
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormSelect label="Tipo de vía" required />
            <FormInput label="Calle principal" required />
            <FormInput label="Número" required />
            <FormInput label="Calle secundaria" />
            <FormInput label="Referencia" />
            <FormInput label="Tipo de vivienda" />
            <FormInput label="Tiempo de residencia (años)" type="number" />
            <FormSelect label="País" icon={<Search size={14} />} />
            <FormSelect label="Provincia" icon={<Search size={14} />} />
            <FormInput label="Ciudad" icon={<Lock size={14} />} value="Quito" disabled />
            <FormSelect label="Parroquia" icon={<Search size={14} />} />
            <FormInput label="Sector o barrio" />
            <FormSwitch
              label="Es residente en otro país diferente a EEUU"
              checked={esResidenteOtroPais}
              onChange={setEsResidenteOtroPais}
            />
            <FormSwitch
              label="Es contribuyente en EEUU"
              checked={esContribuyenteEEUU}
              onChange={setEsContribuyenteEEUU}
            />
            <FormInput label="Número de identificación contribuyente EEUU" />
            <FormInput label="Número de identificación contribuyente otro país" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function FormInput({ label, required = false, icon, ...props }) {
    return (
      <div className="space-y-1.5 relative">
        <Label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <Input
          placeholder="---"
          {...props}
          className={`text-sm pr-10 ${props.disabled ? "bg-gray-100 text-gray-500" : ""}`}
        />
        {icon && <span className="absolute right-3 top-9 text-gray-400">{icon}</span>}
      </div>
    );
  }
  
  function FormSelect({ label, required = false, icon }) {
    return (
      <div className="space-y-1.5 relative">
        <Label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <Select>
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
  