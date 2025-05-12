import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectValue, SelectContent, SelectTrigger, SelectItem } from "../ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Plus } from "lucide-react";
import TablaCustom2 from "../shared/TablaCustom2";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getBeneficiariosPorSolicitud, crearBeneficiario, editarBeneficiario, eliminarBeneficiario, } from "@/service/Entidades/BeneficiariosService";
import { useAuth } from "@/hooks/useAuth";
import { getTipoIdentificacion } from "@/service/Catalogos/TipoIdentificacionService";

export default function Beneficiarios() {

  const { id } = useParams();
  const { user } = useAuth();

  const [beneficiarios, setBeneficiarios] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [tiposIdentificacion, setTiposIdentificacion] = useState([]);

  const [nuevoDato, setNuevoDato] = useState({
    idSolicitudInversion: Number(id),
    nombre: "",
    idTipoDocumento: "",
    numeroDocumento: "",
    correoElectronico: "",
    telefono: "",
    direccion: "",
    porcentajeBeneficio: "",
    fechaCreacion: new Date().toISOString(),
    idUsuarioPropietario: user.idUsuario,
  });


  const obtenerDatos = async () => {
    try {
      const data = await getBeneficiariosPorSolicitud(id);
      setBeneficiarios(data);
    } catch (error) {
      console.error("Error al cargar beneficiarios:", error);
    }
  };

  useEffect(() => {
    const fetchTiposIdentificacion = async () => {
      try {
        const data = await getTipoIdentificacion();
        setTiposIdentificacion(data);
      } catch (error) {
        console.error("Error al cargar tipos de identificación:", error);
      }
    };

    fetchTiposIdentificacion();
    obtenerDatos();
  }, []);

  const handleAbrirFormulario = () => {
    setModoEdicion(false);
    setNuevoDato({
      idSolicitudInversion: Number(id),
      nombre: "",
      idTipoDocumento: "",
      numeroDocumento: "",
      correoElectronico: "",
      telefono: "",
      direccion: "",
      porcentajeBeneficio: "",
      fechaCreacion: new Date().toISOString(),
      idUsuarioPropietario: user.idUsuario,
    });
    setModalAbierto(true);
  };

  const handleEditar = (item) => {
    setModoEdicion(true);
    setNuevoDato({
      idBeneficiario: item.idBeneficiario,
      idSolicitudInversion: Number(id),
      nombre: item.nombre,
      idTipoDocumento: item.idTipoDocumento,
      numeroDocumento: item.numeroDocumento,
      correoElectronico: item.correoElectronico,
      telefono: item.telefono,
      direccion: item.direccion,
      porcentajeBeneficio: item.porcentajeBeneficio,
      fechaCreacion: item.fechaCreacion,
      idUsuarioPropietario: user.idUsuario,
    });

    setModalAbierto(true);
  };

  const handleEliminar = async (item) => {
    if (!window.confirm(`¿Deseas eliminar a "${item.nombre}"?`)) return;

    try {
      await eliminarBeneficiario(item.idBeneficiario);
      toast.success("Beneficiario eliminado");
      obtenerDatos();
    } catch (error) {
      console.error("Error al eliminar:", error);
      toast.error("Error al eliminar beneficiario");
    }
  };

  const columnas = [
    { key: "nombre", label: "Nombre" },
    { key: "idTipoDocumento", label: "Tipo Documento" },
    { key: "numeroDocumento", label: "Número Documento" },
    { key: "correoElectronico", label: "Correo" },
    { key: "telefono", label: "Teléfono" },
    { key: "direccion", label: "Dirección" },
    { key: "porcentajeBeneficio", label: "Porcentaje (%)" },
    { key: "fechaCreacion", label: "Fecha de Creación" },
  ];


  return (
    <div className="space-y-6 p-6">
      <h2 className="text-xl font-semibold text-gray-800">Beneficiarios</h2>

      <Card>
        <CardContent className="p-6 space-y-4">
          {/* Encabezado con switch */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Label className="text-sm font-medium text-gray-700">¿Tiene beneficiario?</Label>
              <Switch checked={false} disabled className="border border-gray-400" />
              <span className="text-muted-foreground text-sm">Sí</span>
            </div>

            <Button variant="outline" className="text-sm">
              <Plus size={16} className="mr-2" />
              Agregar Beneficiario
            </Button>
          </div>

          {/* Tabla vacía */}
          <div className="overflow-x-auto border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Nombre de beneficiario</TableHead>
                  <TableHead className="min-w-[200px]">Teléfono de beneficiario</TableHead>
                  <TableHead className="min-w-[200px]">Porcentaje de beneficio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-gray-500 py-10">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xl">📊</span>
                      </div>
                      <span>No se encontró nada para mostrar aquí</span>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <TablaCustom2
              columns={columnas}
              data={beneficiarios}
              mostrarEditar={true}
              mostrarAgregarNuevo={true}
              mostrarEliminar={true}
              onAgregarNuevoClick={handleAbrirFormulario}
              onEditarClick={handleEditar}
              onEliminarClick={handleEliminar}
            />
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={modalAbierto} onOpenChange={setModalAbierto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{modoEdicion ? "Editar beneficiario" : "Agregar beneficiario"}</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormGroup label="Nombre">
              <Input
                value={nuevoDato.nombre}
                onChange={(e) => setNuevoDato({ ...nuevoDato, nombre: e.target.value })}
              />
            </FormGroup>

            <FormGroup label="Tipo Documento">
              <Select
                value={nuevoDato.idTipoDocumento?.toString()}
                onValueChange={(value) =>
                  setNuevoDato({ ...nuevoDato, idTipoDocumento: Number(value) })
                }
              >
                <SelectTrigger className="bg-white border border-gray-300">
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {tiposIdentificacion.map((tipo) => (
                    <SelectItem
                      key={tipo.idTipoIdentificacion}
                      value={tipo.idTipoIdentificacion.toString()}
                    >
                      {tipo.tipo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormGroup>


            <FormGroup label="Número Documento">
              <Input
                value={nuevoDato.numeroDocumento}
                onChange={(e) => setNuevoDato({ ...nuevoDato, numeroDocumento: e.target.value })}
              />
            </FormGroup>

            <FormGroup label="Correo electrónico">
              <Input
                type="email"
                value={nuevoDato.correoElectronico}
                onChange={(e) => setNuevoDato({ ...nuevoDato, correoElectronico: e.target.value })}
              />
            </FormGroup>

            <FormGroup label="Teléfono">
              <Input
                value={nuevoDato.telefono}
                onChange={(e) => setNuevoDato({ ...nuevoDato, telefono: e.target.value })}
              />
            </FormGroup>

            <FormGroup label="Dirección">
              <Input
                value={nuevoDato.direccion}
                onChange={(e) => setNuevoDato({ ...nuevoDato, direccion: e.target.value })}
              />
            </FormGroup>

            <FormGroup label="Porcentaje de beneficio">
              <Input
                type="number"
                value={nuevoDato.porcentajeBeneficio}
                onChange={(e) => setNuevoDato({ ...nuevoDato, porcentajeBeneficio: e.target.value })}
              />
            </FormGroup>
          </div>


          <DialogFooter className="pt-4">
            <Button
              onClick={async () => {
                const {
                  nombre,
                  idTipoDocumento,
                  numeroDocumento,
                  correoElectronico,
                  telefono,
                  direccion,
                  porcentajeBeneficio,
                } = nuevoDato;

                if (
                  !nombre.trim() ||
                  !idTipoDocumento ||
                  !numeroDocumento.trim() ||
                  !correoElectronico.trim() ||
                  !telefono.trim() ||
                  !direccion.trim() ||
                  !porcentajeBeneficio
                ) {
                  toast.error("Todos los campos son obligatorios");
                  return;
                }


                try {
                  if (modoEdicion) {
                    await editarBeneficiario(nuevoDato.idBeneficiario, nuevoDato);
                    toast.success("Beneficiario actualizado");
                  } else {
                    await crearBeneficiario(nuevoDato);
                    toast.success("Beneficiario creado");
                  }

                  obtenerDatos();
                  setModalAbierto(false);
                  setModoEdicion(false);
                  setNuevoDato({
                    idSolicitudInversion: Number(id),
                    nombre: "",
                    telefono: "",
                    porcentaje: "",
                    idUsuarioPropietario: user.idUsuario,
                  });
                } catch (error) {
                  console.error("Error al guardar beneficiario:", error);
                  toast.error("No se pudo guardar el beneficiario");
                }
              }}
            >
              {modoEdicion ? "Actualizar" : "Crear"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FormGroup({ label, children }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      {children}
    </div>
  );
}
