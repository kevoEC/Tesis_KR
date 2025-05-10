import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import {
  updateAdjunto,
  getAdjuntoById,
} from "@/service/Entidades/AdjuntoService";
import { useAuth } from "@/hooks/useAuth";

export default function AdjuntoForm({ documentoId }) {
  const [archivoBase64, setArchivoBase64] = useState("");
  const [newFile, setNewFile] = useState(null); // Nuevo archivo para subir
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Cargar el archivo al iniciar el componente
  useEffect(() => {
    console.log(documentoId);
    async function loadFile() {
      setLoading(true);
      try {
        const res = await getAdjuntoById(documentoId); // Traer archivo por ID
        setArchivoBase64(res?.base64 ?? res); // Suponiendo que el servicio devuelve base64
      } catch (err) {
        setError("Error al cargar el archivo");
      }
      setLoading(false);
    }
    loadFile();
  }, [documentoId]);

  // Manejar cambio de archivo (nuevo archivo)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(",")[1];
        setNewFile(base64); // Guardar el nuevo archivo en base64
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para guardar el nuevo archivo
  const handleSaveFile = async () => {
    if (newFile) {
      setLoading(true);
      try {
        await updateAdjunto(documentoId, newFile); // Llamar al servicio para actualizar
        setArchivoBase64(newFile); // Actualizar el archivo visualizado
        setNewFile(null); // Limpiar el nuevo archivo
        setError(""); // Limpiar error
      } catch (err) {
        setError("Error al guardar el archivo");
      }
      setLoading(false);
    } else {
      setError("Por favor selecciona un archivo antes de guardar");
    }
  };

  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-2xl font-semibold">Adjunto</h2>

        {/* Mostrar mensaje de error */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Si está cargando, mostrar mensaje de espera */}
        {loading && <p>Cargando...</p>}

        {/* Visualizar archivo actual */}
        {archivoBase64 && !loading && (
          <div>
            <h3>Archivo actual:</h3>
            <iframe
              src={`data:application/pdf;base64,${archivoBase64}`}
              width="100%"
              height="500"
              title="Visor de documento"
            />
          </div>
        )}

        {/* Si no hay archivo cargado */}
        {!archivoBase64 && !loading && <p>No hay archivo cargado.</p>}

        {/* Selección de archivo para actualizar */}
        <div className="mt-4">
          <label className="block text-sm font-medium">
            Seleccionar archivo
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="mt-1"
          />
        </div>

        {/* Botón para guardar el archivo */}
        <div className="mt-4">
          <button
            onClick={handleSaveFile}
            disabled={loading || !newFile}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            {loading ? "Guardando..." : "Guardar Adjunto"}
          </button>
        </div>
      </div>
    </div>
  );
}
