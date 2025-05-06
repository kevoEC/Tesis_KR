import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { createProspecto } from "@/service/Entidades/ProspectoService";
import { useAuth } from "@/hooks/useAuth";
import { useContext } from "react";
import { CatalogContext } from "@/contexts/CatalogContext";

export default function ProspectoForm() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState({
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    correoElectronico: "",
    telefonoCelular: "",
    idTipoIdentificacion: "",
    idOrigenCliente: "",
    idProductoInteres: "",
    idAgencia: "",
  });

  const [catalogos, setCatalogos] = useState({
    tipoIdentificaciones: [],
    origenes: [],
    productos: [],
    agencias: [],
  });

  useEffect(() => {
    setCatalogos({
      tipoIdentificaciones: [
        { id: 1, nombre: "Cédula" },
        { id: 2, nombre: "Pasaporte" },
      ],
      origenes: [
        { id: 1, nombre: "Publicidad" },
        { id: 2, nombre: "Recomendación" },
      ],
      productos: [
        { id: 1, nombre: "Inversión A" },
        { id: 2, nombre: "Inversión B" },
      ],
      agencias: [
        { id: 1, ciudad: "Quito" },
        { id: 2, ciudad: "Guayaquil" },
      ],
    });
  }, []);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handlePhoneChange = (value) => {
    const raw = value.replace(/\D/g, "").slice(0, 10);
    const formatted = raw.replace(/(\d{3})(\d{3})(\d{0,4})/, "$1-$2-$3");
    handleChange("telefonoCelular", formatted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      estado: true,
      idSolicitudInversion: null,
      fechaCreacion: new Date().toISOString(),
      fechaModificacion: new Date().toISOString(),
      idUsuarioCreacion: user?.id || null,
      idUsuarioModificacion: user?.id || null,
      idUsuarioPropietario: user?.id || null,
    };

    try {
      await createProspecto(payload);
      toast.success("Prospecto guardado correctamente");
      navigate("/prospecto/vista");
    } catch (error) {
      toast.error("Error al guardar prospecto");
      console.error("Error al guardar:", error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="link"
          onClick={() => navigate("/prospectos/vista")}
          className="text-blue-600 px-0"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver a Prospectos
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">Crear Prospecto</h1>
      </div>

      <Card className="shadow-xl border border-gray-200 rounded-2xl">
        <CardContent className="p-8">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <FormGroup label="Nombres">
              <Input
                placeholder="Ej: Juan Andrés"
                value={form.nombres}
                onChange={(e) => handleChange("nombres", e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup label="Apellido Paterno">
              <Input
                placeholder="Ej: Pérez"
                value={form.apellidoPaterno}
                onChange={(e) => handleChange("apellidoPaterno", e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup label="Apellido Materno">
              <Input
                placeholder="Ej: Gutiérrez"
                value={form.apellidoMaterno}
                onChange={(e) => handleChange("apellidoMaterno", e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup label="Correo Electrónico">
              <Input
                type="email"
                placeholder="Ej: ejemplo@correo.com"
                value={form.correoElectronico}
                onChange={(e) =>
                  handleChange("correoElectronico", e.target.value)
                }
                required
              />
            </FormGroup>

            <FormGroup label="Teléfono Celular">
              <Input
                placeholder="Ej: 099-123-4567"
                value={form.telefonoCelular}
                onChange={(e) => handlePhoneChange(e.target.value)}
                maxLength={12}
                required
              />
            </FormGroup>

            <FormGroup label="Tipo de Identificación">
              <Select
                onValueChange={(val) =>
                  handleChange("idTipoIdentificacion", Number(val))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {catalogos.tipoIdentificaciones.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormGroup>

            <FormGroup label="Origen del Cliente">
              <Select
                onValueChange={(val) =>
                  handleChange("idOrigenCliente", Number(val))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {catalogos.origenes.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormGroup>

            <FormGroup label="Producto de Interés">
              <Select
                onValueChange={(val) =>
                  handleChange("idProductoInteres", Number(val))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {catalogos.productos.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormGroup>

            <FormGroup label="Agencia">
              <Select
                onValueChange={(val) => handleChange("idAgencia", Number(val))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {catalogos.agencias.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.ciudad}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormGroup>

            <div className="col-span-full mt-4">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
              >
                <PlusCircle className="w-4 h-4 mr-2" /> Guardar Prospecto
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function FormGroup({ label, children }) {
  return (
    <div className="space-y-1.5">
      <Label className="font-medium text-gray-700">{label}</Label>
      {children}
    </div>
  );
}
