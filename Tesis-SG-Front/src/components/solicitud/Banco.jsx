import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Search } from "lucide-react";

export default function Banco() {
  return (
    <div className="space-y-6 p-6">
      <h2 className="text-xl font-semibold text-gray-800">Banco</h2>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormSelect label="Institución" required icon={<Search size={14} />} />
            <FormSelect label="Tipo de cuenta" required options={["Corriente", "Ahorros"]} />
            <FormInput label="Número de cuenta" required />
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
  
  function FormSelect({ label, required = false, icon, options = [] }) {
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
            {options.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {icon && <span className="absolute right-3 top-9 text-gray-400">{icon}</span>}
      </div>
    );
  }
  