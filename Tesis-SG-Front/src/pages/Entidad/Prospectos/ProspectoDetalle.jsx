import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import ActividadModal from "@/components/prospectos/ModalActividad";
import { getProspectoById } from "@/service/Entidades/ProspectoService";
import { getActividadesByProspectoId } from "@/service/Entidades/ActividadService";
import { getSolicitudesByProspectoId } from "@/service/Entidades/SolicitudService";

export default function ProspectoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [prospecto, setProspecto] = useState(null);
  const [actividades, setActividades] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [actividadEditar, setActividadEditar] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const datos = await getProspectoById(id);
        const acts = await getActividadesByProspectoId(id);
        const sols = await getSolicitudesByProspectoId(id);
        setProspecto(datos);
        setActividades(acts);
        setSolicitudes(sols);
      } catch (error) {
        toast.error("Error al cargar prospecto: " + error.message);
      }
    };

    cargar();
  }, [id]);

  const handleActividadCreada = async () => {
    const acts = await getActividadesByProspectoId(id);
    setActividades(acts);
    setActividadEditar(null);
  };

  if (!prospecto) {
    return <p className="text-center text-gray-600">Cargando prospecto...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Detalle del Prospecto</h1>
        <Button variant="outline" onClick={() => navigate("/prospectos/vista")}>
          Volver a listado
        </Button>
      </div>

      {/* Información del prospecto */}
      <Card>
        <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Info label="Nombre completo" value={`${prospecto.nombres} ${prospecto.apellidoPaterno} ${prospecto.apellidoMaterno}`} />
          <Info label="Correo" value={prospecto.correoElectronico} />
          <Info label="Teléfono" value={prospecto.telefonoCelular} />
          <Info label="Tipo Identificación" value={prospecto.tipoIdentificacion?.nombre} />
          <Info label="Origen del Cliente" value={prospecto.origen?.nombre} />
          <Info label="Producto de Interés" value={prospecto.productoInteres?.nombre} />
          <Info label="Agencia" value={prospecto.agencia?.ciudad} />
        </CardContent>
      </Card>

      {/* Actividades */}
      <div className="flex items-center justify-between mt-8">
        <h2 className="text-xl font-semibold text-gray-800">Actividades</h2>
        <Button onClick={() => setModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
          <PlusCircle className="w-4 h-4 mr-2" />
          Nueva Actividad
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Asunto</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Duración</TableHead>
                <TableHead>Vencimiento</TableHead>
                <TableHead>Prioridad</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {actividades.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500 py-4">
                    No hay actividades registradas.
                  </TableCell>
                </TableRow>
              ) : (
                actividades.map((act) => (
                  <TableRow key={act.idActividad}>
                    <TableCell>{act.tipoActividad?.descripcion}</TableCell>
                    <TableCell>{act.asunto}</TableCell>
                    <TableCell>{act.descripcion}</TableCell>
                    <TableCell>{act.duracion}</TableCell>
                    <TableCell>{new Date(act.vencimiento).toLocaleString()}</TableCell>
                    <TableCell>{act.prioridad?.categoria}</TableCell>
                    <TableCell>
                      <span className={act.estado ? "text-green-600" : "text-yellow-600"}>
                        {act.estado ? "Finalizada" : "En progreso"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Solicitudes de Inversión */}
      <div className="flex items-center justify-between mt-8">
        <h2 className="text-xl font-semibold text-gray-800">Solicitudes de Inversión</h2>
        <Button
          onClick={() => navigate(`/solicitudes/nueva/${id}`)}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Nueva Solicitud de Inversión
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número de Contrato</TableHead>
                <TableHead>Nombre del Prospecto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {solicitudes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center text-gray-500 py-4">
                    No hay solicitudes registradas.
                  </TableCell>
                </TableRow>
              ) : (
                solicitudes.map((sol) => (
                  <TableRow key={sol.idSolicitudInversion}>
                    <TableCell>{sol.numeroContrato}</TableCell>
                    <TableCell>
                      {sol.prospecto?.nombres} {sol.prospecto?.apellidoPaterno}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de Actividad */}
      {modalOpen && (
        <ActividadModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setActividadEditar(null);
          }}
          className="bg-amber-50"
          idProspecto={id}
          modo="crear"
          onActividadCreada={handleActividadCreada}
        />
      )}
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-base font-medium text-gray-900">{value || "-"}</p>
    </div>
  );
}
