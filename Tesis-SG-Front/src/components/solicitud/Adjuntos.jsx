import { useEffect, useState } from "react";
import { getAdjuntos, deleteAdjunto } from "@/service/Entidades/AdjuntoService";
import TablaCustom2 from "@/components/shared/TablaCustom2";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import AdjuntoForm from "./AdjuntoForm";

export default function Adjuntos() {
  const [documentos, setDocumentos] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [documentoId, setDocumentoId] = useState(null); // Estado para el idDocumento

  /*Cargar los datos al montar el componente*/
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAdjuntos(); // Ejecutar función async
        setDocumentos(data);
      } catch (error) {
        console.error("Error al cargar documentos:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditar = (item) => {
    setIsDialogOpen(true);
    // setDocumentoId(1); // Guarda el idDocumento del item que se está editando

    setDocumentoId(item.idDocumento); // Guarda el idDocumento del item que se está editando
  };

  const handleAbrirFormulario = () => {
    setIsDialogOpen(true);
  };
  const handleCerrarDialog = () => {
    setIsDialogOpen(false);
  };

  const columnas = [
    {
      key: "idDocumento",
      label: "IdDocumento",
      render: (value) => (
        <div className="text-end font-semibold text-gray-800">{value}</div>
      ),
    },

    { key: "nombres", label: "Nombres" },
    { key: "Documento", label: "Url Documento Adjunto" },
  ];

  return (
    <div>
      <Card className="border border-muted rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.12)]">
        <CardHeader>
          <CardTitle>Lista de Adjuntos</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <TablaCustom2
            columns={columnas}
            data={documentos}
            mostrarEditar={true}
            mostrarAgregarNuevo={false}
            mostrarEliminar={false}
            onEditarClick={handleEditar}
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
            <DialogTitle>Agregar Adjuntos</DialogTitle>
            <DialogDescription>
              Completa la información del nuevo adjunto
            </DialogDescription>
          </DialogHeader>
          <AdjuntoForm documentoId={documentoId} onClose={handleCerrarDialog} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
