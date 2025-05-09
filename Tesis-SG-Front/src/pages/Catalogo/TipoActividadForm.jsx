import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import {
  getTipoActividadById,
  createTipoActividad,
  updateTipoActividad,
} from "@/service/Catalogos/TipoActividadService";
import { ArrowLeft } from "lucide-react";

export default function TipoActividadForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [tipoactividad, setTipoactividad] = useState("");

  // Obtener ID del usuario logueado desde localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const idUsuario = user?.usuario?.idUsuario;

  useEffect(() => {
    if (isEdit) {
      const fetchData = async () => {
        try {
          const data = await getTipoActividadById(id);
          setTipoactividad(data.tipoactividad);
        } catch (err) {
          console.error("Error al cargar agencia:", err);
        }
      };
      fetchData();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        idAgencia: isEdit ? parseInt(id) : 0,
        tipoactividad,
        ...(isEdit
          ? { idUsuarioModificacion: idUsuario }
          : { idUsuarioCreacion: idUsuario }),
      };

      if (isEdit) {
        await updateTipoActividad(payload);
        toast.success("Tipo Actividad actualizada correctamente");
      } else {
        await createTipoActividad(payload);
        toast.success("Tipo Actividad creada correctamente");
      }

      navigate("/catalogo/tipoactividad/vista");
    } catch (err) {
      console.error("Error al guardar agencia:", err);
      toast.error("Error al guardar la agencia");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="link"
          onClick={() => navigate("/catalogo/tipoactividad/vista")}
          className="text-blue-600 px-0"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver a Tipo Actividad
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">
          {isEdit ? "Editar Tipo Actividad" : "Crear Tipo Actividad"}
        </h1>
      </div>

      <Card className="shadow-lg border border-gray-200 rounded-2xl">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="font-medium text-gray-700">Descripcion</Label>
              <Input
                placeholder="Ej: Quito"
                value={tipoactividad}
                onChange={(e) => setTipoactividad(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Guardar Tipo Actividad
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
