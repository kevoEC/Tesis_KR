import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { createProspecto } from "@/service/Entidades/ProspectoService";
import { useAuth } from "@/hooks/useAuth";
import { useContext } from "react";
import { CatalogContext } from "@/contexts/CatalogContext";
import { getAgencias } from "@/service/Catalogos/AgenciaService";
import { getProductosInteres } from "@/service/Catalogos/ProductoInteresService";
import { getOrigenes } from "@/service/Catalogos/OrigenClienteService";
import { getTipoIdentificacion } from "@/service/Catalogos/TipoIdentificacionService";

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
    const cargarCatalogos = async () => {
      try {
        console.log("🔄 Iniciando carga de catálogos...");

        const [agencias, productos, origenes, tipoIdentificaciones] =
          await Promise.all([
            getAgencias(),
            getProductosInteres(),
            getOrigenes(),
            getTipoIdentificacion(),
          ]);

        console.log("📦 Agencias recibidas:", agencias);
        console.log("📦 Productos recibidos:", productos);
        console.log("📦 Orígenes recibidos:", origenes);
        console.log(
          "📦 Tipos de identificación recibidos:",
          tipoIdentificaciones
        );

        setCatalogos({
          agencias,
          productos,
          origenes,
          tipoIdentificaciones,
        });

        // Verificación de catálogos vacíos
        const vacios = [];
        if (!agencias || agencias.length === 0) vacios.push("Agencias");
        if (!productos || productos.length === 0)
          vacios.push("Productos de Interés");
        if (!origenes || origenes.length === 0)
          vacios.push("Orígenes del Cliente");
        if (!tipoIdentificaciones || tipoIdentificaciones.length === 0)
          vacios.push("Tipos de Identificación");

        if (vacios.length > 0) {
          toast.warning(
            `Los siguientes catálogos están vacíos: ${vacios.join(", ")}`
          );
        } else {
          console.log("✅ Todos los catálogos se cargaron correctamente.");
        }
      } catch (error) {
        console.error("❌ Error al cargar catálogos:", error);
        toast.error("No se pudieron cargar todos los catálogos");
      }
    };

    cargarCatalogos();
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
      esCliente: false,
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
                onChange={(e) =>
                  handleChange("apellidoPaterno", e.target.value)
                }
                required
              />
            </FormGroup>

            <FormGroup label="Apellido Materno">
              <Input
                placeholder="Ej: Gutiérrez"
                value={form.apellidoMaterno}
                onChange={(e) =>
                  handleChange("apellidoMaterno", e.target.value)
                }
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
                    <SelectItem
                      key={item.idTipoIdentificacion}
                      value={item.idTipoIdentificacion.toString()}
                    >
                      {item.tipo}
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
                    <SelectItem
                      key={item.idOrigenCliente}
                      value={item.idOrigenCliente.toString()}
                    >
                      {item.nombreOrigen}
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
                    <SelectItem
                      key={item.idProductoInteres}
                      value={item.idProductoInteres.toString()}
                    >
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
                    <SelectItem
                      key={item.idAgencia}
                      value={item.idAgencia.toString()}
                    >
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
