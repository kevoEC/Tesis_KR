// import { useState, useEffect } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Switch } from "@/components/ui/switch";
// import { toast } from "sonner";
// import { getTipoIdentificacion } from "@/service/Catalogos/TipoIdentificacionService";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { Separator } from "@/components/ui/separator";
// import {
//   validarEquifax,
//   validarLDS,
// } from "@/service/Entidades/SolicitudService";
// import { Loader2 } from "lucide-react";
// import { useUI } from "@/hooks/useUI";
// import { getSolicitudById } from "@/service/Entidades/SolicitudService";

// export default function Identificacion({ id }) {
//   const { notify, setSolicitudHabilitada } = useUI();
//   const [solicitudes, setSolicitudes] = useState([]);

//   // estado para los tipos dinámicos
//   const [tiposIdentificacion, setTiposIdentificacion] = useState([]);

//   // carga al montar el componente
//   useEffect(() => {
//     getTipoIdentificacion().then((data) => {
//       setTiposIdentificacion(data);
//     });
//   }, []);

//   useEffect(() => {
//     const cargar = async () => {
//       try {
//         const solicitudes = await getSolicitudById(id);
//         setSolicitudes(solicitudes);
//         console.log(solicitudes);
//       } catch (error) {
//         toast.error("Error al cargar solicitudes: " + error.message);
//       }
//     };

//     cargar();
//   }, [id]);

//   const [form, setForm] = useState(() => {
//     const stored = sessionStorage.getItem("solicitud");
//     if (stored) {
//       console.log("📥 Recuperando estado inicial desde sessionStorage");
//       return JSON.parse(stored);
//     }
//     return {
//       tipoSolicitud: "",
//       tipoCliente: "",
//       tipoDocumento: "C",
//       numeroDocumento: "",
//       nombres: "",
//       apellidoPaterno: "",
//       apellidoMaterno: "",
//       validar: false,
//       equifax: "",
//       obsEquifax: "",
//       listasControl: "",
//       obsListasControl: "",
//       continuar: "",
//     };
//   });

//   function mapToNumericValues(form) {
//     return {
//       ...form,
//       tipoSolicitud:
//         form.tipoSolicitud === "Nueva"
//           ? 1
//           : form.tipoSolicitud === "Renovación"
//           ? 2
//           : 3,
//       tipoCliente: form.tipoCliente === "Natural" ? 1 : 2,
//       tipoDocumento:
//         form.tipoDocumento === "Cédula"
//           ? 1
//           : form.tipoDocumento === "RUC"
//           ? 2
//           : 3,
//     };
//   }

//   const [loadingValidacion, setLoadingValidacion] = useState(false);
//   const [bloquearCampos, setBloquearCampos] = useState(form.validar);

//   useEffect(() => {
//     if (form.continuar === "Continuar con la solicitud") {
//       console.log("✅ Habilitando solicitud desde useEffect");
//       setSolicitudHabilitada(true);
//     } else {
//       console.log("❌ Deshabilitando solicitud desde useEffect");
//       setSolicitudHabilitada(false);
//     }
//   }, [form.continuar]);

//   useEffect(() => {
//     const camposValidos = Object.values(form).some(
//       (val) => val !== "" && val !== false
//     );
//     if (camposValidos) {
//       console.log("💾 Guardando en sessionStorage:", form);
//       sessionStorage.setItem(
//         "solicitud",
//         JSON.stringify(mapToNumericValues(form))
//       );
//     } else {
//       console.log("⛔ Ignorando guardado de formulario vacío");
//     }
//   }, [form]);

//   const handleChange = (field, value) => {
//     setForm((prev) => ({ ...prev, [field]: value }));
//   };

//   const esFormularioValido = () => {
//     return (
//       form.tipoSolicitud &&
//       form.tipoCliente &&
//       form.tipoDocumento &&
//       form.numeroDocumento &&
//       form.nombres &&
//       form.apellidoPaterno &&
//       form.apellidoMaterno
//     );
//   };

//   const ejecutarValidaciones = async () => {
//     if (loadingValidacion || bloquearCampos) return;

//     if (!esFormularioValido()) {
//       notify.error(
//         "Por favor llena todos los campos requeridos antes de validar."
//       );
//       return false;
//     }

//     setLoadingValidacion(true);
//     notify.info("Iniciando validación...");

//     try {
//       const resEquifax = await validarEquifax(form.numeroDocumento);
//       if (resEquifax.success) {
//         const r = resEquifax.resultado;
//         handleChange(
//           "equifax",
//           r.error ? "Error" : r.resultado ? "Paso" : "Rechazado"
//         );
//         handleChange("obsEquifax", r.observacion || "Sin observación");
//       } else {
//         handleChange("equifax", "Error");
//         handleChange("obsEquifax", "Error en validación Equifax");
//       }

//       const resLDS = await validarLDS({
//         identificacion: form.numeroDocumento,
//         primerNombre: form.nombres.split(" ")[0] || "",
//         segundoNombre: form.nombres.split(" ")[1] || "",
//         primerApellido: form.apellidoPaterno,
//         segundoApellido: form.apellidoMaterno,
//       });

//       if (resLDS.success) {
//         const r = resLDS.resultado;
//         handleChange(
//           "listasControl",
//           r.error ? "Error" : r.coincidencia ? "Rechazado" : "Paso"
//         );
//         handleChange("obsListasControl", r.mensaje || "Sin observación");
//       } else {
//         handleChange("listasControl", "Error");
//         handleChange("obsListasControl", "Error en validación LDS");
//       }

//       setBloquearCampos(true);
//       notify.success("Validación completada");
//       return true;
//     } catch (err) {
//       console.error("Error validando", err);
//       notify.error("Ocurrió un error durante la validación.");
//       return false;
//     } finally {
//       setLoadingValidacion(false);
//     }
//   };

//   return (
//     <div className="space-y-8 p-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-semibold text-gray-800">Identificación</h2>
//         <div className="flex items-center gap-3">
//           <Label className="text-sm font-medium text-gray-700">Validar</Label>
//           <Switch
//             checked={form.validar}
//             className={"border border-gray-400"}
//             onCheckedChange={async (checked) => {
//               if (!loadingValidacion && !bloquearCampos) {
//                 if (!checked) {
//                   handleChange("validar", false);
//                   return;
//                 }

//                 const fueValidado = await ejecutarValidaciones();
//                 if (fueValidado) {
//                   handleChange("validar", true);
//                 } else {
//                   handleChange("validar", false);
//                 }
//               }
//             }}
//           />
//           {loadingValidacion && (
//             <span className="flex items-center text-sm text-muted-foreground">
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Consultando...
//             </span>
//           )}
//           {bloquearCampos && (
//             <button
//               onClick={() => setBloquearCampos(false)}
//               className="text-sm text-blue-600 hover:underline ml-4"
//             >
//               Editar datos
//             </button>
//           )}
//         </div>
//       </div>

//       <Separator />

//       <Card className="shadow-md rounded-2xl bg-white border border-gray-200">
//         <CardContent className="p-6 space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <FormSelect
//               label="Tipo de solicitud"
//               value={form.tipoSolicitud}
//               onChange={(val) => handleChange("tipoSolicitud", val)}
//               options={["Nueva", "Renovación", "Incremento"]}
//               disabled={bloquearCampos}
//             />
//             <FormSelect
//               label="Tipo de cliente"
//               value={form.tipoCliente}
//               onChange={(val) => handleChange("tipoCliente", val)}
//               options={["Natural", "Jurídico"]}
//               disabled={bloquearCampos}
//             />
//             <div className="space-y-1">
//               <Label className="text-sm text-gray-700 font-medium">
//                 Tipo de documento
//               </Label>
//               <Select
//                 value={form.tipoDocumento}
//                 onValueChange={(val) => handleChange("tipoDocumento", val)}
//                 disabled={bloquearCampos}
//               >
//                 <SelectTrigger className="text-sm">
//                   <SelectValue placeholder="Seleccione un tipo" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-white">
//                   {tiposIdentificacion.map((t) => (
//                     <SelectItem
//                       key={t.idTipoIdentificacion}
//                       value={t.tipo} // o `t.idTipoIdentificacion.toString()` si quieres almacenar el id
//                     >
//                       {t.tipo}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <FormInput
//               label="Número de identificación"
//               value={form.numeroDocumento}
//               onChange={(e) => handleChange("numeroDocumento", e.target.value)}
//               disabled={bloquearCampos}
//             />
//             <FormInput
//               label="Nombres"
//               value={form.nombres}
//               onChange={(e) => handleChange("nombres", e.target.value)}
//               disabled={bloquearCampos}
//             />
//             <FormInput
//               label="Apellido paterno"
//               value={form.apellidoPaterno}
//               onChange={(e) => handleChange("apellidoPaterno", e.target.value)}
//               disabled={bloquearCampos}
//             />
//             <FormInput
//               label="Apellido materno"
//               value={form.apellidoMaterno}
//               onChange={(e) => handleChange("apellidoMaterno", e.target.value)}
//               disabled={bloquearCampos}
//             />
//           </div>
//         </CardContent>
//       </Card>

//       {form.validar && (
//         <>
//           <h2 className="text-2xl font-semibold text-gray-800">Validación</h2>
//           <Separator />
//           <Card className="shadow-md rounded-2xl bg-white border border-gray-200">
//             <CardContent className="p-6 space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <FormInput
//                   label="Identidad (Equifax)"
//                   value={form.equifax}
//                   disabled
//                 />
//                 <FormTextArea
//                   label="Observación Equifax"
//                   value={form.obsEquifax}
//                   disabled
//                 />
//                 <FormInput
//                   label="Listas de Control (LDS)"
//                   value={form.listasControl}
//                   disabled
//                 />
//                 <FormTextArea
//                   label="Observación LDS"
//                   value={form.obsListasControl}
//                   disabled
//                 />
//                 <FormSelect
//                   label="Continuar"
//                   value={form.continuar}
//                   onChange={(val) => handleChange("continuar", val)}
//                   options={["Continuar con la solicitud", "Rechazar solicitud"]}
//                   full
//                   disabled={
//                     form.equifax === "Rechazado" ||
//                     form.listasControl === "Rechazado"
//                   }
//                 />
//               </div>
//             </CardContent>
//           </Card>
//         </>
//       )}
//     </div>
//   );
// }

// function FormInput({ label, value, onChange, disabled }) {
//   return (
//     <div className="space-y-1">
//       <Label className="text-sm text-gray-700 font-medium">{label}</Label>
//       <Input
//         value={value}
//         onChange={onChange}
//         disabled={disabled}
//         className="text-sm border-gray-300"
//         placeholder={label}
//       />
//     </div>
//   );
// }

// function FormSelect({
//   label,
//   value,
//   onChange,
//   options = [],
//   full = false,
//   disabled,
// }) {
//   return (
//     <div className={`space-y-1 ${full ? "md:col-span-2" : ""}`}>
//       <Label className="text-sm text-gray-700 font-medium">{label}</Label>
//       <Select value={value} onValueChange={onChange} disabled={disabled}>
//         <SelectTrigger className="text-sm">
//           <SelectValue placeholder={label} />
//         </SelectTrigger>
//         <SelectContent className="bg-white">
//           {options.map((opt) => (
//             <SelectItem key={opt} value={opt}>
//               {opt}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//     </div>
//   );
// }

// function FormTextArea({ label, value, onChange, disabled }) {
//   return (
//     <div className="space-y-1">
//       <Label className="text-sm text-gray-700 font-medium">{label}</Label>
//       <textarea
//         rows={3}
//         value={value}
//         onChange={onChange}
//         disabled={disabled}
//         placeholder={label}
//         className="w-full text-sm rounded-md border border-gray-300 px-3 py-2 resize-none"
//       />
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { getTipoIdentificacion } from "@/service/Catalogos/TipoIdentificacionService";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  validarEquifax,
  validarLDS,
  getSolicitudById,
  updateSolicitud,
} from "@/service/Entidades/SolicitudService";
import { Loader2 } from "lucide-react";
import { useUI } from "@/hooks/useUI";
import { Button } from "@/components/ui/button";

export default function Identificacion({ id }) {
  const { notify, setSolicitudHabilitada } = useUI();

  // tipos dinámicos
  const [tiposIdentificacion, setTiposIdentificacion] = useState([]);

  // datos completos de la solicitud
  const [solicitudData, setSolicitudData] = useState(null);

  // estado de la validación (equifax/lds)
  const [loadingValidacion, setLoadingValidacion] = useState(false);
  const [bloquearCampos, setBloquearCampos] = useState(false);

  // formulario controlado
  const [form, setForm] = useState({
    tipoSolicitud: "",
    tipoCliente: "",
    tipoDocumento: "",
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
  });

  // carga tipos de documento
  useEffect(() => {
    getTipoIdentificacion().then(setTiposIdentificacion);
  }, []);

  // mapeos numérico <-> etiqueta
  const mapTipoSolicitudLabel = (v) =>
    v === 1 ? "Nueva" : v === 2 ? "Renovación" : "Incremento";
  const mapTipoClienteLabel = (v) => (v === 1 ? "Natural" : "Jurídico");
  const mapTipoDocumentoLabel = (v) =>
    v === 1 ? "Cédula" : v === 2 ? "RUC" : "Pasaporte";
  const mapContinuarLabel = (v) =>
    v === 1 ? "Continuar con la solicitud" : "Rechazar solicitud";

  const mapContinuarNumeric = (s) =>
    s === "Continuar con la solicitud" ? 1 : 0;
  const mapToNumericValues = (f) => ({
    tipoSolicitud:
      f.tipoSolicitud === "Nueva"
        ? 1
        : f.tipoSolicitud === "Renovación"
        ? 2
        : 3,
    tipoCliente: f.tipoCliente === "Natural" ? 1 : 2,
    tipoDocumento:
      f.tipoDocumento === "Cédula" ? 1 : f.tipoDocumento === "RUC" ? 2 : 3,
  });

  // cargar datos de la solicitud
  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await getSolicitudById(id);
        const data = res.data[0];
        setSolicitudData(data);
        const i = data.identificacion;
        setForm({
          tipoSolicitud: mapTipoSolicitudLabel(i.tipoSolicitud),
          tipoCliente: mapTipoClienteLabel(i.tipoCliente),
          tipoDocumento: mapTipoDocumentoLabel(i.tipoDocumento),
          numeroDocumento: i.numeroDocumento || "",
          nombres: i.nombres || "",
          apellidoPaterno: i.apellidoPaterno || "",
          apellidoMaterno: i.apellidoMaterno || "",
          validar: i.validar || false,
          equifax: i.equifax || "",
          obsEquifax: i.obsEquifax || "",
          listasControl: i.listasControl || "",
          obsListasControl: i.obsListasControl || "",
          continuar: mapContinuarLabel(i.continuar),
        });
        setBloquearCampos(i.validar);
      } catch (err) {
        toast.error("Error al cargar identificación: " + err.message);
      }
    };
    cargar();
  }, [id]);

  // habilitar solicitud
  useEffect(() => {
    setSolicitudHabilitada(form.continuar === "Continuar con la solicitud");
  }, [form.continuar, setSolicitudHabilitada]);

  // manejar cambios
  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // validaciones Equifax / LDS
  const ejecutarValidaciones = async () => {
    if (loadingValidacion || bloquearCampos) return;
    if (
      !form.tipoSolicitud ||
      !form.tipoCliente ||
      !form.tipoDocumento ||
      !form.numeroDocumento ||
      !form.nombres ||
      !form.apellidoPaterno ||
      !form.apellidoMaterno
    ) {
      notify.error("Por favor llena todos los campos antes de validar.");
      return false;
    }
    setLoadingValidacion(true);
    notify.info("Iniciando validación...");
    try {
      const resE = await validarEquifax(form.numeroDocumento);
      if (resE.success) {
        const r = resE.resultado;
        handleChange(
          "equifax",
          r.error ? "Error" : r.resultado ? "Paso" : "Rechazado"
        );
        handleChange("obsEquifax", r.observacion || "Sin observación");
      } else {
        handleChange("equifax", "Error");
        handleChange("obsEquifax", "Error en validación Equifax");
      }
      const resL = await validarLDS({
        identificacion: form.numeroDocumento,
        primerNombre: form.nombres.split(" ")[0] || "",
        segundoNombre: form.nombres.split(" ")[1] || "",
        primerApellido: form.apellidoPaterno,
        segundoApellido: form.apellidoMaterno,
      });
      if (resL.success) {
        const r = resL.resultado;
        handleChange(
          "listasControl",
          r.error ? "Error" : r.coincidencia ? "Rechazado" : "Paso"
        );
        handleChange("obsListasControl", r.mensaje || "Sin observación");
      } else {
        handleChange("listasControl", "Error");
        handleChange("obsListasControl", "Error en validación LDS");
      }
      setBloquearCampos(true);
      notify.success("Validación completada");
      return true;
    } catch {
      notify.error("Ocurrió un error durante la validación.");
      return false;
    } finally {
      setLoadingValidacion(false);
    }
  };

  // guardar identificación
  const [loadingSave, setLoadingSave] = useState(false);
  const handleSaveIdentificacion = async () => {
    if (!solicitudData) return;
    setLoadingSave(true);
    try {
      const numeric = mapToNumericValues(form);
      const payload = {
        ...solicitudData,
        identificacion: {
          ...solicitudData.identificacion,
          ...numeric,
          numeroDocumento: form.numeroDocumento,
          nombres: form.nombres,
          apellidoPaterno: form.apellidoPaterno,
          apellidoMaterno: form.apellidoMaterno,
          validar: form.validar,
          equifax: form.equifax,
          obsEquifax: form.obsEquifax,
          listasControl: form.listasControl,
          obsListasControl: form.obsListasControl,
          continuar: mapContinuarNumeric(form.continuar),
        },
      };
      const res = await updateSolicitud(id, payload);
      res.success
        ? toast.success("Identificación actualizada.")
        : toast.error("Error al actualizar identificación.");
    } catch (err) {
      toast.error("Error al guardar: " + err.message);
    } finally {
      setLoadingSave(false);
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
            className="border border-gray-400"
            onCheckedChange={async (c) => {
              if (!loadingValidacion && !bloquearCampos) {
                if (!c) return handleChange("validar", false);
                const ok = await ejecutarValidaciones();
                handleChange("validar", ok);
              }
            }}
          />
          {loadingValidacion && (
            <span className="flex items-center text-sm text-muted-foreground">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Consultando...
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
            <FormSelect
              label="Tipo de solicitud"
              value={form.tipoSolicitud}
              onChange={(v) => handleChange("tipoSolicitud", v)}
              options={["Nueva", "Renovación", "Incremento"]}
              disabled={bloquearCampos}
            />
            <FormSelect
              label="Tipo de cliente"
              value={form.tipoCliente}
              onChange={(v) => handleChange("tipoCliente", v)}
              options={["Natural", "Jurídico"]}
              disabled={bloquearCampos}
            />
            <div className="space-y-1">
              <Label className="text-sm text-gray-700 font-medium">
                Tipo de documento
              </Label>
              <Select
                value={form.tipoDocumento}
                onValueChange={(v) => handleChange("tipoDocumento", v)}
                disabled={bloquearCampos}
              >
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Seleccione un tipo" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {tiposIdentificacion.map((t) => (
                    <SelectItem key={t.idTipoIdentificacion} value={t.tipo}>
                      {t.tipo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <FormInput
              label="Número de identificación"
              value={form.numeroDocumento}
              onChange={(e) => handleChange("numeroDocumento", e.target.value)}
              disabled={bloquearCampos}
            />
            <FormInput
              label="Nombres"
              value={form.nombres}
              onChange={(e) => handleChange("nombres", e.target.value)}
              disabled={bloquearCampos}
            />
            <FormInput
              label="Apellido paterno"
              value={form.apellidoPaterno}
              onChange={(e) => handleChange("apellidoPaterno", e.target.value)}
              disabled={bloquearCampos}
            />
            <FormInput
              label="Apellido materno"
              value={form.apellidoMaterno}
              onChange={(e) => handleChange("apellidoMaterno", e.target.value)}
              disabled={bloquearCampos}
            />
          </div>

          {/* botón guardar identificación */}
          <div className="flex justify-end">
            <Button
              onClick={handleSaveIdentificacion}
              disabled={loadingSave}
              className="text-white"
            >
              {loadingSave ? "Guardando..." : "Guardar Identificación"}
            </Button>
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
                <FormInput
                  label="Identidad (Equifax)"
                  value={form.equifax}
                  disabled
                />
                <FormTextArea
                  label="Observación Equifax"
                  value={form.obsEquifax}
                  disabled
                />
                <FormInput
                  label="Listas de Control (LDS)"
                  value={form.listasControl}
                  disabled
                />
                <FormTextArea
                  label="Observación LDS"
                  value={form.obsListasControl}
                  disabled
                />
                <FormSelect
                  label="Continuar"
                  value={form.continuar}
                  onChange={(v) => handleChange("continuar", v)}
                  options={["Continuar con la solicitud", "Rechazar solicitud"]}
                  full
                  disabled={
                    form.equifax === "Rechazado" ||
                    form.listasControl === "Rechazado"
                  }
                />
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
      <Input
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="text-sm border-gray-300"
        placeholder={label}
      />
    </div>
  );
}

function FormSelect({
  label,
  value,
  onChange,
  options = [],
  full = false,
  disabled,
}) {
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

function FormTextArea({ label, value, disabled }) {
  return (
    <div className="space-y-1">
      <Label className="text-sm text-gray-700 font-medium">{label}</Label>
      <textarea
        rows={3}
        value={value}
        disabled={disabled}
        placeholder={label}
        className="w-full text-sm rounded-md border border-gray-300 px-3 py-2 resize-none"
      />
    </div>
  );
}
