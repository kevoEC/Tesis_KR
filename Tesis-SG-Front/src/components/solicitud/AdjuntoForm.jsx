import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import {
  updateAdjunto,
  getAdjuntoById,
} from "@/service/Entidades/AdjuntoService";

export default function AdjuntoForm({ documentoId }) {
  const [archivoBase64, setArchivoBase64] = useState("");
  const [newFile, setNewFile] = useState(null);
  const [observaciones, setObservaciones] = useState("Subido por el cliente");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Carga inicial del adjunto
  useEffect(() => {
    async function loadFile() {
      setLoading(true);
      try {
        const res = await getAdjuntoById(documentoId);
        // Ajusta según el shape de tu servicio:
        setArchivoBase64(res[0].base64Contenido || res[0].archivo);
      } catch (err) {
        setError("Error al cargar el archivo");
      } finally {
        setLoading(false);
      }
    }
    loadFile();
  }, [documentoId]);

  // Cuando el usuario selecciona un nuevo PDF
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const b64 = reader.result.split(",")[1];
      setNewFile(b64);
    };
    reader.readAsDataURL(file);
  };

  // Guardar el nuevo adjunto
  const handleSaveFile = async () => {
    if (!newFile) {
      setError("Por favor selecciona un archivo antes de guardar");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const payload = {
        base64Contenido: newFile,
        observaciones,
      };
      const res = await updateAdjunto(documentoId, payload);
      if (res.success) {
        setArchivoBase64(newFile);
        setNewFile(null);
        toast.success("Adjunto actualizado correctamente");
      } else {
        setError("Error al guardar el archivo");
      }
    } catch {
      setError("Error al guardar el archivo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-semibold">Adjunto</h2>

      {error && <p className="text-red-500">{error}</p>}
      {loading && <p>Cargando...</p>}

      {archivoBase64 && !loading ? (
        <iframe
          src={`data:application/pdf;base64,${archivoBase64}`}
          width="100%"
          height="500"
          title="Visor de documento"
        />
      ) : (
        !loading && <p>No hay archivo cargado.</p>
      )}

      <div className="mt-4 space-y-4">
        <div>
          <Label className="block text-sm font-medium">
            Seleccionar archivo
          </Label>
          <Input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </div>

        <div>
          <Label className="block text-sm font-medium">Observaciones</Label>
          <Input
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            placeholder="Subido por el cliente"
          />
        </div>

        <Button
          onClick={handleSaveFile}
          disabled={loading || !newFile}
          className="text-white"
        >
          {loading ? "Guardando..." : "Guardar Adjunto"}
        </Button>
      </div>
    </div>
  );
}
