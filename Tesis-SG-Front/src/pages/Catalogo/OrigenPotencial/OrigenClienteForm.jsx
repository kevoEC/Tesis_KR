import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { getOrigenById, createOrigen, updateOrigen } from "@/service/Catalogos/OrigenClienteService";

export default function OrigenClienteForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { user } = useAuth();

  const [nombre, setNombre] = useState("");

  useEffect(() => {
    if (isEdit) {
      getOrigenById(id)
        .then((data) => setNombre(data.nombreOrigen))
        .catch((err) => console.error("Error al cargar origen:", err));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      idOrigenCliente: isEdit ? parseInt(id) : 0,
      nombreOrigen: nombre,
      idUsuarioCreacion: user?.id || null,
    };

    try {
      if (isEdit) {
        await updateOrigen(payload);
        toast.success("Origen actualizado correctamente");
      } else {
        await createOrigen(payload);
        toast.success("Origen creado correctamente");
      }
      navigate("/catalogo/origencliente");
    } catch (err) {
      console.error("Error al guardar:", err);
      toast.error("Error al guardar el origen");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <Button variant="link" onClick={() => navigate("/catalogo/origencliente")} className="text-blue-600 px-0">
          ← Volver a Origen Cliente
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">{isEdit ? "Editar" : "Crear"} Origen Cliente</h1>
      </div>
      <Card className="shadow-md">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Nombre del Origen</Label>
              <Input value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Guardar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
