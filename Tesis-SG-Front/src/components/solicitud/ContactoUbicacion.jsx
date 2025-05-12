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

export default function ContactoUbicacion({ id }) {
  const [loading, setLoading] = useState(true);
  const [solicitudData, setSolicitudData] = useState(null);
  const [contactoUbicacion, setContactoUbicacion] = useState({
    correoElectronico: "",
    otroTelefono: "",
    telefonoCelular: "",
    telefonoFijo: "",
    idTipoVia: "",
    callePrincipal: "",
    numeroDomicilio: "",
    calleSecundaria: "",
    referenciaDomicilio: "",
    sectorBarrio: "",
    tiempoResidencia: "",
    idPaisResidencia: "",
    idProvinciaResidencia: "",
    idCiudadResidencia: "",
    residenteOtroPais: false,
    contribuyenteEEUU: false,
    numeroIdentificacionOtroPais: "",
    numeroIdentificacionEEUU: "",
  });

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await getSolicitudById(id);
        const data = res.data[0];
        setSolicitudData(data);
        setContactoUbicacion({
          correoElectronico: data.contactoUbicacion.correoElectronico || "",
          otroTelefono: data.contactoUbicacion.otroTelefono || "",
          telefonoCelular: data.contactoUbicacion.telefonoCelular || "",
          telefonoFijo: data.contactoUbicacion.telefonoFijo || "",
          idTipoVia: data.contactoUbicacion.idTipoVia || "",
          callePrincipal: data.contactoUbicacion.callePrincipal || "",
          numeroDomicilio: data.contactoUbicacion.numeroDomicilio || "",
          calleSecundaria: data.contactoUbicacion.calleSecundaria || "",
          referenciaDomicilio: data.contactoUbicacion.referenciaDomicilio || "",
          sectorBarrio: data.contactoUbicacion.sectorBarrio || "",
          tiempoResidencia: data.contactoUbicacion.tiempoResidencia || "",
          idPaisResidencia: data.contactoUbicacion.idPaisResidencia || "",
          idProvinciaResidencia:
            data.contactoUbicacion.idProvinciaResidencia || "",
          idCiudadResidencia: data.contactoUbicacion.idCiudadResidencia || "",
          residenteOtroPais: data.contactoUbicacion.residenteOtroPais || false,
          contribuyenteEEUU: data.contactoUbicacion.contribuyenteEEUU || false,
          numeroIdentificacionOtroPais:
            data.contactoUbicacion.numeroIdentificacionOtroPais || "",
          numeroIdentificacionEEUU:
            data.contactoUbicacion.numeroIdentificacionEEUU || "",
        });
      } catch (err) {
        toast.error("Error al cargar contacto: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [id]);

  const handleGuardar = async () => {
    if (!solicitudData) return;
    try {
      setLoading(true);
      const payload = {
        ...solicitudData,
        contactoUbicacion,
      };
      const res = await updateSolicitud(id, payload);
      if (res.success) toast.success("Contacto actualizado.");
      else toast.error("Error al actualizar contacto.");
    } catch (err) {
      toast.error("Error al guardar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Cargando contacto...</p>;

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-xl font-semibold">Contacto y Ubicación</h2>
      <Button onClick={handleGuardar} disabled={loading} className="text-white">
        Guardar datos
      </Button>
      <Card>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FormInput
            label="Correo electrónico"
            value={contactoUbicacion.correoElectronico}
            onChange={(e) =>
              setContactoUbicacion({
                ...contactoUbicacion,
                correoElectronico: e.target.value,
              })
            }
          />
          <FormInput
            label="Otro teléfono"
            value={contactoUbicacion.otroTelefono}
            onChange={(e) =>
              setContactoUbicacion({
                ...contactoUbicacion,
                otroTelefono: e.target.value,
              })
            }
          />
          <FormInput
            label="Teléfono celular"
            value={contactoUbicacion.telefonoCelular}
            onChange={(e) =>
              setContactoUbicacion({
                ...contactoUbicacion,
                telefonoCelular: e.target.value,
              })
            }
          />
          <FormInput
            label="Teléfono fijo"
            value={contactoUbicacion.telefonoFijo}
            onChange={(e) =>
              setContactoUbicacion({
                ...contactoUbicacion,
                telefonoFijo: e.target.value,
              })
            }
          />
          <FormInput
            label="Tipo de vía (ID)"
            type="number"
            value={contactoUbicacion.idTipoVia}
            onChange={(e) =>
              setContactoUbicacion({
                ...contactoUbicacion,
                idTipoVia: e.target.value,
              })
            }
          />
          <FormInput
            label="Calle principal"
            value={contactoUbicacion.callePrincipal}
            onChange={(e) =>
              setContactoUbicacion({
                ...contactoUbicacion,
                callePrincipal: e.target.value,
              })
            }
          />
          <FormInput
            label="Número de domicilio"
            value={contactoUbicacion.numeroDomicilio}
            onChange={(e) =>
              setContactoUbicacion({
                ...contactoUbicacion,
                numeroDomicilio: e.target.value,
              })
            }
          />
          <FormInput
            label="Calle secundaria"
            value={contactoUbicacion.calleSecundaria}
            onChange={(e) =>
              setContactoUbicacion({
                ...contactoUbicacion,
                calleSecundaria: e.target.value,
              })
            }
          />
          <FormInput
            label="Referencia"
            value={contactoUbicacion.referenciaDomicilio}
            onChange={(e) =>
              setContactoUbicacion({
                ...contactoUbicacion,
                referenciaDomicilio: e.target.value,
              })
            }
          />
          <FormInput
            label="Sector / Barrio"
            value={contactoUbicacion.sectorBarrio}
            onChange={(e) =>
              setContactoUbicacion({
                ...contactoUbicacion,
                sectorBarrio: e.target.value,
              })
            }
          />
          <FormInput
            label="Tiempo de residencia (años)"
            type="number"
            value={contactoUbicacion.tiempoResidencia}
            onChange={(e) =>
              setContactoUbicacion({
                ...contactoUbicacion,
                tiempoResidencia: e.target.value,
              })
            }
          />
          <FormInput
            label="ID País"
            type="number"
            value={contactoUbicacion.idPaisResidencia}
            onChange={(e) =>
              setContactoUbicacion({
                ...contactoUbicacion,
                idPaisResidencia: e.target.value,
              })
            }
          />
          <FormInput
            label="ID Provincia"
            type="number"
            value={contactoUbicacion.idProvinciaResidencia}
            onChange={(e) =>
              setContactoUbicacion({
                ...contactoUbicacion,
                idProvinciaResidencia: e.target.value,
              })
            }
          />
          <FormInput
            label="ID Ciudad"
            type="number"
            value={contactoUbicacion.idCiudadResidencia}
            onChange={(e) =>
              setContactoUbicacion({
                ...contactoUbicacion,
                idCiudadResidencia: e.target.value,
              })
            }
          />
          <FormSwitch
            label="Residente otro país"
            checked={contactoUbicacion.residenteOtroPais}
            onChange={(checked) =>
              setContactoUbicacion({
                ...contactoUbicacion,
                residenteOtroPais: checked,
              })
            }
          />
          <FormSwitch
            label="Contribuyente EEUU"
            checked={contactoUbicacion.contribuyenteEEUU}
            onChange={(checked) =>
              setContactoUbicacion({
                ...contactoUbicacion,
                contribuyenteEEUU: checked,
              })
            }
          />
          <FormInput
            label="ID otro país"
            value={contactoUbicacion.numeroIdentificacionOtroPais}
            onChange={(e) =>
              setContactoUbicacion({
                ...contactoUbicacion,
                numeroIdentificacionOtroPais: e.target.value,
              })
            }
          />
          <FormInput
            label="ID EEUU"
            value={contactoUbicacion.numeroIdentificacionEEUU}
            onChange={(e) =>
              setContactoUbicacion({
                ...contactoUbicacion,
                numeroIdentificacionEEUU: e.target.value,
              })
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}

// Componentes reutilizables

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
    <div className="space-y-1.5 flex items-center gap-3">
      <Switch checked={checked} onCheckedChange={onChange} className="border" />
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
    </div>
  );
}
