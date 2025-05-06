import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { getProductoInteresById, createProductoInteres, updateProductoInteres } from "@/service/Catalogos/ProductoInteresService";

export default function ProductoInteresForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { user } = useAuth();

  const [nombre, setNombre] = useState("");

  useEffect(() => {
    if (isEdit) {
      getProductoInteresById(id)
        .then((data) => setNombre(data.nombre))
        .catch((err) => toast.error("Error al cargar: " + err.message));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      idProductoInteres: isEdit ? parseInt(id) : 0,
      nombre,
      idUsuarioCreacion: user?.id || null,
    };

    try {
      if (isEdit) {
        await updateProductoInteres(payload);
        toast.success("Producto actualizado");
      } else {
        await createProductoInteres(payload);
        toast.success("Producto creado");
      }

      navigate("/catalogo/productointeres/vista");
    } catch (err) {
      toast.error("Error al guardar: " + err.message);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {isEdit ? "Editar Producto de Interés" : "Crear Producto de Interés"}
      </h1>
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Nombre</Label>
              <Input
                placeholder="Ej: Inversión Oro"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="bg-blue-600 text-white">
              Guardar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
