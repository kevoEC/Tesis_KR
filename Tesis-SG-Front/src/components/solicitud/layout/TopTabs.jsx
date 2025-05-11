import { Button } from "@/components/ui/button";
import { useUI } from "@/hooks/useUI";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { createSolicitud, updateSolicitud } from "@/service/Entidades/SolicitudService";

export default function TopTabs({ active, onChange }) {
  const tabs = [
    { key: "general", label: "General" },
    { key: "adjuntos", label: "Adjuntos" },
    { key: "tareas", label: "Tareas de solicitudes" },
  ];

  const { solicitudId, setSolicitudId, notify } = useUI();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleRegresar = () => {
    sessionStorage.removeItem("solicitud");
    sessionStorage.removeItem("solicitudHabilitada");
    sessionStorage.removeItem("solicitudId");
    navigate("/solicitudes/vista");
  };

  const getFormData = () => {
    const raw = sessionStorage.getItem("solicitud");
    return raw ? JSON.parse(raw) : null;
  };

  const crearSolicitud = async () => {
    const parsed = getFormData();
    if (!parsed) return notify.error("No hay datos en el formulario");

    const payload = {
      identificacion: parsed.numeroDocumento,
      idTipoSolicitud: parsed.tipoSolicitud === "Nueva" ? 1 : parsed.tipoSolicitud === "Renovación" ? 2 : 3,
      idTipoCliente: parsed.tipoCliente === "Natural" ? 1 : 2,
      idUsuarioPropietario: user?.idUsuario,
      jsonDocument: JSON.stringify(parsed),
    };

    try {
      const res = await createSolicitud(payload);
      setSolicitudId(res.idSolicitudInversion);
      notify.success("Solicitud creada correctamente");
    } catch (err) {
      console.error("Error al crear solicitud:", err);
      notify.error("Error al crear la solicitud");
    }
  };

  const guardarSolicitud = async () => {
    const parsed = getFormData();
    if (!parsed) return notify.error("No hay datos para guardar");

    const payload = {
      identificacion: parsed.numeroDocumento,
      idTipoSolicitud: parsed.tipoSolicitud === "Nueva" ? 1 : parsed.tipoSolicitud === "Renovación" ? 2 : 3,
      idTipoCliente: parsed.tipoCliente === "Natural" ? 1 : 2,
      idUsuarioPropietario: user?.idUsuario,
      jsonDocument: JSON.stringify(parsed),
    };

    try {
      await updateSolicitud(solicitudId, payload);
      notify.success("Solicitud actualizada correctamente");
    } catch (err) {
      console.error("Error al guardar solicitud:", err);
      notify.error("Error al guardar los cambios");
    }
  };

  return (
    <div className="border-b bg-white px-6 py-2 flex items-center justify-between">
      <div className="flex gap-6">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            onClick={() => onChange?.(tab.key)}
            className={`text-sm font-medium cursor-pointer border-b-2 pb-1 transition-all ${
              active === tab.key
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        {!solicitudId ? (
          <Button onClick={crearSolicitud} className="bg-green-600 text-white hover:bg-green-700">
            Crear solicitud
          </Button>
        ) : (
          <Button onClick={guardarSolicitud} className="bg-blue-600 text-white hover:bg-blue-700">
            Guardar cambios
          </Button>
        )}
        <Button variant="outline" onClick={handleRegresar}>
          Regresar
        </Button>
      </div>
    </div>
  );
}
