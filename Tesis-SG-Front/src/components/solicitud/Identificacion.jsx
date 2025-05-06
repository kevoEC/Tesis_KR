import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { validarEquifax, validarLDS } from "@/service/Entidades/SolicitudService";
import { Loader2 } from "lucide-react";
import { useUI } from "@/hooks/useUI";

export default function Identificacion() {
  const { notify, setSolicitudHabilitada } = useUI();

  const [form, setForm] = useState(() => {
    const stored = sessionStorage.getItem("solicitud");
    if (stored) {
      console.log("📥 Recuperando estado inicial desde sessionStorage");
      return JSON.parse(stored);
    }
    return {
      tipoSolicitud: "",
      tipoCliente: "",
      tipoDocumento: "C",
      numeroDocumento: "",
      nombres: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      validar: false,
      equifax: "",
      obsEquifax: "",
      listasControl: "",
      obsListasControl: "",
      continuar: "",
    };
  });

  function mapToNumericValues(form) {
    return {
      ...form,
      tipoSolicitud: form.tipoSolicitud === "Nueva" ? 1 : form.tipoSolicitud === "Renovación" ? 2 : 3,
      tipoCliente: form.tipoCliente === "Natural" ? 1 : 2,
      tipoDocumento:
        form.tipoDocumento === "Cédula" ? 1 : form.tipoDocumento === "RUC" ? 2 : 3,
    };
  }

  const [loadingValidacion, setLoadingValidacion] = useState(false);
  const [bloquearCampos, setBloquearCampos] = useState(form.validar);

  useEffect(() => {
    if (form.continuar === "Continuar con la solicitud") {
      console.log("✅ Habilitando solicitud desde useEffect");
      setSolicitudHabilitada(true);
    } else {
      console.log("❌ Deshabilitando solicitud desde useEffect");
      setSolicitudHabilitada(false);
    }
  }, [form.continuar]);

  useEffect(() => {
    const camposValidos = Object.values(form).some((val) => val !== "" && val !== false);
    if (camposValidos) {
      console.log("💾 Guardando en sessionStorage:", form);
      sessionStorage.setItem("solicitud", JSON.stringify(mapToNumericValues(form)));
    } else {
      console.log("⛔ Ignorando guardado de formulario vacío");
    }
  }, [form]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const esFormularioValido = () => {
    return (
      form.tipoSolicitud &&
      form.tipoCliente &&
      form.tipoDocumento &&
      form.numeroDocumento &&
      form.nombres &&
      form.apellidoPaterno &&
      form.apellidoMaterno
    );
  };

  const ejecutarValidaciones = async () => {
    if (loadingValidacion || bloquearCampos) return;

    if (!esFormularioValido()) {
      notify.error("Por favor llena todos los campos requeridos antes de validar.");
      return false;
    }

    setLoadingValidacion(true);
    notify.info("Iniciando validación...");

    try {
      const resEquifax = await validarEquifax(form.numeroDocumento);
      if (resEquifax.success) {
        const r = resEquifax.resultado;
        handleChange("equifax", r.error ? "Error" : r.resultado ? "Paso" : "Rechazado");
        handleChange("obsEquifax", r.observacion || "Sin observación");
      } else {
        handleChange("equifax", "Error");
        handleChange("obsEquifax", "Error en validación Equifax");
      }

      const resLDS = await validarLDS({
        identificacion: form.numeroDocumento,
        primerNombre: form.nombres.split(" ")[0] || "",
        segundoNombre: form.nombres.split(" ")[1] || "",
        primerApellido: form.apellidoPaterno,
        segundoApellido: form.apellidoMaterno,
      });

      if (resLDS.success) {
        const r = resLDS.resultado;
        handleChange("listasControl", r.error ? "Error" : r.coincidencia ? "Rechazado" : "Paso");
        handleChange("obsListasControl", r.mensaje || "Sin observación");
      } else {
        handleChange("listasControl", "Error");
        handleChange("obsListasControl", "Error en validación LDS");
      }

      setBloquearCampos(true);
      notify.success("Validación completada");
      return true;
    } catch (err) {
      console.error("Error validando", err);
      notify.error("Ocurrió un error durante la validación.");
      return false;
    } finally {
      setLoadingValidacion(false);
    }
  };

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">Identificación</h2>
        <div className="flex items-center gap-3">
          <Label className="text-sm font-medium text-gray-700">Validar</Label>
          <Switch
            checked={form.validar}
            className={"border border-gray-400"}
            onCheckedChange={async (checked) => {
              if (!loadingValidacion && !bloquearCampos) {
                if (!checked) {
                  handleChange("validar", false);
                  return;
                }

                const fueValidado = await ejecutarValidaciones();
                if (fueValidado) {
                  handleChange("validar", true);
                } else {
                  handleChange("validar", false);
                }
              }
            }}
          />
          {loadingValidacion && (
            <span className="flex items-center text-sm text-muted-foreground">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Consultando...
            </span>
          )}
          {bloquearCampos && (
            <button
              onClick={() => setBloquearCampos(false)}
              className="text-sm text-blue-600 hover:underline ml-4"
            >
              Editar datos
            </button>
          )}
        </div>
      </div>

      <Separator />

      <Card className="shadow-md rounded-2xl bg-white border border-gray-200">
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect label="Tipo de solicitud" value={form.tipoSolicitud} onChange={(val) => handleChange("tipoSolicitud", val)} options={["Nueva", "Renovación", "Incremento"]} disabled={bloquearCampos} />
            <FormSelect label="Tipo de cliente" value={form.tipoCliente} onChange={(val) => handleChange("tipoCliente", val)} options={["Natural", "Jurídico"]} disabled={bloquearCampos} />
            <FormSelect label="Tipo de documento" value={form.tipoDocumento} onChange={(val) => handleChange("tipoDocumento", val)} options={["Cédula", "RUC", "Pasaporte"]} disabled={bloquearCampos} />
            <FormInput label="Número de identificación" value={form.numeroDocumento} onChange={(e) => handleChange("numeroDocumento", e.target.value)} disabled={bloquearCampos} />
            <FormInput label="Nombres" value={form.nombres} onChange={(e) => handleChange("nombres", e.target.value)} disabled={bloquearCampos} />
            <FormInput label="Apellido paterno" value={form.apellidoPaterno} onChange={(e) => handleChange("apellidoPaterno", e.target.value)} disabled={bloquearCampos} />
            <FormInput label="Apellido materno" value={form.apellidoMaterno} onChange={(e) => handleChange("apellidoMaterno", e.target.value)} disabled={bloquearCampos} />
          </div>
        </CardContent>
      </Card>

      {form.validar && (
        <>
          <h2 className="text-2xl font-semibold text-gray-800">Validación</h2>
          <Separator />
          <Card className="shadow-md rounded-2xl bg-white border border-gray-200">
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label="Identidad (Equifax)" value={form.equifax} disabled />
                <FormTextArea label="Observación Equifax" value={form.obsEquifax} disabled />
                <FormInput label="Listas de Control (LDS)" value={form.listasControl} disabled />
                <FormTextArea label="Observación LDS" value={form.obsListasControl} disabled />
                <FormSelect label="Continuar" value={form.continuar} onChange={(val) => handleChange("continuar", val)} options={["Continuar con la solicitud", "Rechazar solicitud"]} full disabled={form.equifax === "Rechazado" || form.listasControl === "Rechazado"} />
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

function FormInput({ label, value, onChange, disabled }) {
  return (
    <div className="space-y-1">
      <Label className="text-sm text-gray-700 font-medium">{label}</Label>
      <Input value={value} onChange={onChange} disabled={disabled} className="text-sm border-gray-300" placeholder={label} />
    </div>
  );
}

function FormSelect({ label, value, onChange, options = [], full = false, disabled }) {
  return (
    <div className={`space-y-1 ${full ? "md:col-span-2" : ""}`}>
      <Label className="text-sm text-gray-700 font-medium">{label}</Label>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className="text-sm">
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {options.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function FormTextArea({ label, value, onChange, disabled }) {
  return (
    <div className="space-y-1">
      <Label className="text-sm text-gray-700 font-medium">{label}</Label>
      <textarea rows={3} value={value} onChange={onChange} disabled={disabled} placeholder={label} className="w-full text-sm rounded-md border border-gray-300 px-3 py-2 resize-none" />
    </div>
  );
}
