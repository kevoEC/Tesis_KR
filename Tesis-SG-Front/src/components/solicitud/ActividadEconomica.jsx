import { useEffect, useState } from "react";
import {
  getSolicitudById,
  updateSolicitud,
} from "@/service/Entidades/SolicitudService";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
export default function ActividadEconomica({ id }) {
  const [loading, setLoading] = useState(true);
  const [solicitudData, setSolicitudData] = useState(null); // Aquí almacenamos toda la solicitud
  const [actividadEconomica, setActividadEconomica] = useState({
    idActividadEconomicaPrincipal: "",
    idActividadEconomicaLugarTrabajo: "",
    lugarTrabajo: "",
    correoTrabajo: "",
    otraActividadEconomica: "",
    cargo: "",
    antiguedad: "",
    telefonoTrabajo: "",
    fechaInicioActividad: "",
    direccionTrabajo: "",
    referenciaDireccionTrabajo: "",
    isPEP: false,
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await getSolicitudById(id);
        const data = response.data[0];

        // Guardar toda la solicitud
        setSolicitudData(data);

        // Inicializar los valores de actividadEconomica
        setActividadEconomica({
          idActividadEconomicaPrincipal:
            data.actividadEconomica.idActividadEconomicaPrincipal || "",
          idActividadEconomicaLugarTrabajo:
            data.actividadEconomica.idActividadEconomicaLugarTrabajo || "",
          lugarTrabajo: data.actividadEconomica.lugarTrabajo || "",
          correoTrabajo: data.actividadEconomica.correoTrabajo || "",
          otraActividadEconomica:
            data.actividadEconomica.otraActividadEconomica || "",
          cargo: data.actividadEconomica.cargo || "",
          antiguedad: data.actividadEconomica.antiguedad || "",
          telefonoTrabajo: data.actividadEconomica.telefonoTrabajo || "",
          fechaInicioActividad:
            data.actividadEconomica.fechaInicioActividad || "",
          direccionTrabajo: data.actividadEconomica.direccionTrabajo || "",
          referenciaDireccionTrabajo:
            data.actividadEconomica.referenciaDireccionTrabajo || "",
          isPEP: data.actividadEconomica.esPEP || false,
        });
      } catch (error) {
        toast.error("Error al cargar la actividad económica: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [id]);

  // Función para manejar el guardado de los datos
  const handleGuardar = async () => {
    if (!solicitudData) return;

    try {
      // Creamos un objeto con todos los datos de la solicitud y actualizamos solo la parte de actividadEconomica
      const dataToSave = {
        ...solicitudData, // Copia todo el JSON original
        actividadEconomica, // Solo se actualizará esta parte
      };
      console.log(dataToSave);

      setLoading(true);
      const response = await updateSolicitud(id, dataToSave);

      if (response.success) {
        toast.success("Datos guardados exitosamente.");
      } else {
        toast.error("Error al guardar los datos.");
      }
    } catch (error) {
      toast.error("Error al guardar los datos: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Mostrar spinner o mensaje de carga */}
      {loading ? (
        <p>Cargando datos...</p> // Aquí podrías poner un spinner si prefieres
      ) : (
        <>
          {/* 🔹 Actividad Económica */}
          <h2 className="text-xl font-semibold text-gray-800">
            Actividad económica
          </h2>
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormInput
                  label="Actividad económica principal"
                  value={actividadEconomica.idActividadEconomicaPrincipal}
                  onChange={(e) =>
                    setActividadEconomica({
                      ...actividadEconomica,
                      idActividadEconomicaPrincipal: e.target.value,
                    })
                  }
                />
                <FormInput
                  label="Actividad económica del lugar de trabajo"
                  value={actividadEconomica.idActividadEconomicaLugarTrabajo}
                  onChange={(e) =>
                    setActividadEconomica({
                      ...actividadEconomica,
                      idActividadEconomicaLugarTrabajo: e.target.value,
                    })
                  }
                />
                <FormInput
                  label="Lugar de trabajo"
                  value={actividadEconomica.lugarTrabajo}
                  onChange={(e) =>
                    setActividadEconomica({
                      ...actividadEconomica,
                      lugarTrabajo: e.target.value,
                    })
                  }
                />
                <FormInput
                  label="Otra actividad económica"
                  value={actividadEconomica.otraActividadEconomica}
                  onChange={(e) =>
                    setActividadEconomica({
                      ...actividadEconomica,
                      otraActividadEconomica: e.target.value,
                    })
                  }
                />
                <FormInput
                  label="Cargo"
                  value={actividadEconomica.cargo}
                  onChange={(e) =>
                    setActividadEconomica({
                      ...actividadEconomica,
                      cargo: e.target.value,
                    })
                  }
                />
                <FormInput
                  label="Correo electrónico del trabajo"
                  value={actividadEconomica.correoTrabajo}
                  onChange={(e) =>
                    setActividadEconomica({
                      ...actividadEconomica,
                      correoTrabajo: e.target.value,
                    })
                  }
                />
                <FormInput
                  label="Antigüedad (años)"
                  value={actividadEconomica.antiguedad}
                  onChange={(e) =>
                    setActividadEconomica({
                      ...actividadEconomica,
                      antiguedad: e.target.value,
                    })
                  }
                />
                <FormInput
                  label="Teléfono del trabajo"
                  value={actividadEconomica.telefonoTrabajo}
                  onChange={(e) =>
                    setActividadEconomica({
                      ...actividadEconomica,
                      telefonoTrabajo: e.target.value,
                    })
                  }
                />
                <FormInput
                  label="Fecha de inicio"
                  type="date"
                  value={actividadEconomica.fechaInicioActividad}
                  onChange={(e) =>
                    setActividadEconomica({
                      ...actividadEconomica,
                      fechaInicioActividad: e.target.value,
                    })
                  }
                />
                <FormInput
                  label="Dirección del trabajo"
                  value={actividadEconomica.direccionTrabajo}
                  onChange={(e) =>
                    setActividadEconomica({
                      ...actividadEconomica,
                      direccionTrabajo: e.target.value,
                    })
                  }
                />
                <FormInput
                  label="Referencia de la dirección del trabajo"
                  value={actividadEconomica.referenciaDireccionTrabajo}
                  onChange={(e) =>
                    setActividadEconomica({
                      ...actividadEconomica,
                      referenciaDireccionTrabajo: e.target.value,
                    })
                  }
                />
                <FormSwitch
                  label="Es PEP"
                  checked={actividadEconomica.isPEP}
                  onChange={(checked) =>
                    setActividadEconomica({
                      ...actividadEconomica,
                      isPEP: checked,
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Botón para guardar datos */}
          <Button onClick={handleGuardar} disabled={loading}>
            Guardar datos
          </Button>
        </>
      )}
    </div>
  );
}

// 🔁 Reutilizables

function FormInput({ label, value, onChange, type = "text" }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      <Input placeholder="---" type={type} value={value} onChange={onChange} />
    </div>
  );
}

function FormSwitch({ label, checked, onChange }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      <Switch
        checked={checked}
        onCheckedChange={onChange}
        className="border border-gray-500"
      />
      <span className="text-sm">{checked ? "Sí" : "No"}</span>
    </div>
  );
}
