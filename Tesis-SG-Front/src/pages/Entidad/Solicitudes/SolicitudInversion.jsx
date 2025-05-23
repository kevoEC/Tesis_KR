import { useNavigate } from "react-router-dom";
import EntidadView from "@/components/shared/VistaEntidad";
import {
  getSolicitudes,
  deleteSolicitud,
} from "@/service/Entidades/SolicitudService";
import TablaCustom2 from "@/components/shared/TablaCustom2";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import SolicitudInversionForm from "./SolicitudInversionForm";

export default function SolicitudInversion() {
  const navigate = useNavigate();

  const [solicitudes, setSolicitudes] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSolicitudes(); // Ejecutar función async

        console.log("Inversiones", data.data);

        setSolicitudes(data.data); // Almacenar solo las identificaciones
      } catch (error) {
        console.error("Error al cargar solicitudes:", error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await getSolicitudes(); // Ejecutar función async

  //       // Filtrar solo la parte de "identificacion"
  //       const solicitudesFiltradas = data.data.map(
  //         (item) => item.identificacion
  //       );

  //       console.log("Inversiones", solicitudesFiltradas);

  //       setSolicitudes(solicitudesFiltradas); // Almacenar solo las identificaciones
  //     } catch (error) {
  //       console.error("Error al cargar solicitudes:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // ✏️ Editar
  const handleEditar = (item) => {
    navigate(`/solicitudes/editar/${item.idSolicitudInversion}`);
  };

  // ❌ Eliminar
  const handleEliminar = async (item) => {
    try {
      await deleteSolicitud(item.idSolicitudInversion);
    } catch (err) {
      console.error("Error al eliminar solicitud:", err);
    }
  };

  const handleAbrirFormulario = () => {
    setIsDialogOpen(true);
  };
  const handleCerrarDialog = () => {
    setIsDialogOpen(false);
  };

  const columnasSolicitud = [
    { key: "idSolicitudInversion", label: "ID" },
    { key: "nombreCompletoProspecto", label: "nombre Completo Prospecto" },
    { key: "nombrePropietario", label: "nombre Propietario" },
  ];

  return (
    <div>
      {/* <div>
        <EntidadView
          titulo="Solicitudes de Inversión"
          entidad="solicitudinversion" // para el endpoint /filtrados
          ruta="solicitudes" // para navegación
          columnas={{
            idSolicitudInversion: "ID",
            idTipoSolicitud: "Tipo Solicitud",
            idTipoCliente: "Tipo Cliente",
            fechaCreacion: "Fecha de Creación",
            fechaModificacion: "Fecha de Modificación",
            idUsuarioPropietario: "Propietario",
            jsonDocument: "JSON Document",
          }}
          onEditar={handleEditar}
          onEliminar={handleEliminar}
        />
      </div> */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Solicitudes de Inversión - Todos</CardTitle>
          </CardHeader>
          <CardContent>
            <TablaCustom2
              columns={columnasSolicitud}
              data={solicitudes}
              mostrarEditar={true}
              mostrarAgregarNuevo={true}
              mostrarEliminar={true}
              onAgregarNuevoClick={handleAbrirFormulario}
              onEditarClick={handleEditar}
              onEliminarClick={handleEliminar}
            />
          </CardContent>
        </Card>
        {/* Dialog para el formulario */}
        <Dialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          className="min-w-3xl"
        >
          <DialogContent className="min-w-3xl">
            <DialogHeader>
              <DialogTitle>Agregar Solicitud</DialogTitle>
              <DialogDescription>
                Completa la información de la nueva solicitud
              </DialogDescription>
            </DialogHeader>
            <SolicitudInversionForm onClose={handleCerrarDialog} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
