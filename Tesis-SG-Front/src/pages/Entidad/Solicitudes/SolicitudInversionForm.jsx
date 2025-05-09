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
import { createSolicitud } from "@/service/Entidades/SolicitudService";
import { useAuth } from "@/hooks/useAuth";
import { useContext } from "react";
import { CatalogContext } from "@/contexts/CatalogContext";

export default function SolicitudInversionForm() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState({
    identificacion: "",
    idTipoSolicitud: "",
    idTipoCliente: "",
    idUsuarioPropietario: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      fechaCreacion: new Date().toISOString(),
      fechaModificacion: new Date().toISOString(),
    };

    try {
      await createSolicitud(payload);

      toast.success("Solicitud guardado correctamente");
      //navigate("/solicitudes");
    } catch (error) {
      toast.error("Error al guardar solicitud");
      console.error("Error al guardar:", error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Card className="shadow-xl border border-gray-200 rounded-2xl">
        <CardContent className="p-8">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <FormGroup label="Identificacion">
              <Input
                placeholder="Ej: Juan Andrés"
                value={form.identificacion}
                onChange={(e) => handleChange("identificacion", e.target.value)}
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

            <div className="col-span-full mt-4">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
              >
                <PlusCircle className="w-4 h-4 mr-2" /> Guardar Solicitud
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
