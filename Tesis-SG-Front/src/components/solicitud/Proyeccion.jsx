import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUI } from "@/hooks/useUI";
import { getProyeccionesPorSolicitud } from "@/service/Entidades/ProyeccionService";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem
} from "@/components/ui/select";

export default function Proyeccion() {
  const { id: idSolicitud } = useParams();
  const { notify } = useUI();
  const navigate = useNavigate();
  const [proyecciones, setProyecciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProyecciones = async () => {
      if (!idSolicitud) return;

      try {
        const res = await getProyeccionesPorSolicitud(idSolicitud);
        setProyecciones(res.proyecciones || []);
      } catch (err) {
        notify.info("No hay proyecciones para esta solicitud.");
        console.error("Error al obtener proyecciones:", err);
        setProyecciones([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProyecciones();
  }, [idSolicitud]);

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-xl font-semibold text-gray-800">Proyecciones vinculadas</h2>

      <div className="flex justify-end mb-2">
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg"
          onClick={() => navigate(`/solicitudes/editar/${idSolicitud}/proyeccion/nueva`)}
        >
          <PlusCircle size={16} className="mr-2" />
          Agregar proyección
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Tasa %</TableHead>
                  <TableHead>Capital</TableHead>
                  <TableHead>Fecha Inicial</TableHead>
                  <TableHead>ID Producto</TableHead>
                  <TableHead>Usuario Creador</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      Cargando...
                    </TableCell>
                  </TableRow>
                ) : proyecciones.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No existen proyecciones para esta solicitud.
                    </TableCell>
                  </TableRow>
                ) : (
                  proyecciones.map((p) => (
                    <TableRow key={p.idProyeccion}>
                      <TableCell>{p.proyeccionNombre}</TableCell>
                      <TableCell>{p.tasa.toFixed(2)}%</TableCell>
                      <TableCell>${p.capital}</TableCell>
                      <TableCell>{new Date(p.fechaInicial).toLocaleDateString()}</TableCell>
                      <TableCell>{p.idProducto}</TableCell>
                      <TableCell>{p.idUsuarioCreacion}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormGroup label="Asesor comercial">
              <Input placeholder="PORTAL WEB" disabled />
            </FormGroup>

            <FormGroup label="Justificativo de transacción">
              <Select>
                <SelectTrigger className="bg-white border border-gray-300">
                  <SelectValue placeholder="---" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="1">Opción 1</SelectItem>
                  <SelectItem value="2">Opción 2</SelectItem>
                </SelectContent>
              </Select>
            </FormGroup>

            <FormGroup label="Proyección seleccionada">
              <Input placeholder="---" disabled />
            </FormGroup>

            <FormGroup label="Origen de fondos">
              <Input placeholder="---" disabled />
            </FormGroup>

            <FormGroup label="Enviar proyección">
              <div className="flex items-center gap-3">
                <Switch disabled className="border border-black" />
                <span className="text-sm text-muted-foreground">No</span>
              </div>
            </FormGroup>

            <FormGroup label="Aceptación del cliente">
              <Select>
                <SelectTrigger className="bg-white border border-gray-300">
                  <SelectValue placeholder="Selecciona aceptación" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="acepta">El Cliente Acepta</SelectItem>
                  <SelectItem value="no-acepta">El Cliente No Acepta</SelectItem>
                </SelectContent>
              </Select>
            </FormGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function FormGroup({ label, children }) {
  return (
    <div className="space-y-1">
      <Label className="text-sm text-gray-700 font-medium">{label}</Label>
      {children}
    </div>
  );
}
