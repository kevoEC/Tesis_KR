import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUI } from "@/hooks/useUI";
import { crearProyeccion } from "@/service/Entidades/ProyeccionService";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell
} from "@/components/ui/table";

function formatCurrency(value) {
  return `$${Number(value).toLocaleString("es-EC", { minimumFractionDigits: 2 })}`;
}

export default function ProyeccionNueva() {
  const { id } = useParams();
  const { notify, user } = useUI();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    tipoSolicitud: "1",
    idProducto: "2",
    capital: 0,
    plazo: "",
    fechaInicial: "",
    aporteAdicional: null,
    idOrigenCapital: "1",
    idOrigenIncremento: null,
    idSolicitudInversion: parseInt(id),
    costeOperativo: 0,
    costeNotarizacion: null,
  });

  const [cronograma, setCronograma] = useState([]);
  const [resumen, setResumen] = useState(null);
  const [bloqueado, setBloqueado] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerar = async () => {
    if (!form.capital || !form.plazo || !form.fechaInicial) {
      notify.error("Todos los campos obligatorios deben estar completos.");
      return;
    }

    if (!window.confirm("¿Estás seguro de generar el cronograma?")) return;

    try {
      const res = await crearProyeccion({
        ...form,
        idProducto: parseInt(form.idProducto),
        idUsuario: user?.idUsuario ?? 0,
        idOrigenCapital: parseInt(form.idOrigenCapital),
        idOrigenIncremento: form.idOrigenIncremento ? parseInt(form.idOrigenIncremento) : null,
        tipoSolicitud: parseInt(form.tipoSolicitud)
      });

      if (res.success) {
        setResumen(res.proyeccion);
        setCronograma(res.cronograma);
        notify.success("Cronograma generado correctamente.");
        setBloqueado(true);
      } else {
        notify.error("No se pudo generar la proyección.");
      }
    } catch (error) {
      notify.error("Error al generar proyección.");
      console.error("Error al generar proyección:", error);
    }
  };

  const mostrarAporte = form.tipoSolicitud === "2" || form.tipoSolicitud === "3";
  const mostrarOrigenIncremento = form.tipoSolicitud === "3";
  const plazos = form.idOrigenCapital === "2" ? ["6", "12", "24", "36"] : ["7", "13", "25", "37"];
  const isFija = form.idProducto === "1";

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">Nueva Proyección</h2>
        <Button variant="outline" onClick={() => navigate(`/solicitudes/editar/${id}`)}>
          Regresar a solicitud
        </Button>
      </div>

      <Card className="border shadow-sm bg-white rounded-2xl">
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormSelect label="Tipo de solicitud" value={form.tipoSolicitud} onChange={(val) => handleChange("tipoSolicitud", val)} options={["1", "2", "3"]} labels={["Nueva", "Renovación", "Incremento"]} disabled={bloqueado} />
            <FormSelect label="Producto" value={form.idProducto} onChange={(val) => handleChange("idProducto", val)} options={["1", "2", "3", "4", "5"]} labels={["Renta Fija", "Renta Periódica Mensual", "Renta Periódica Bimensual", "Renta Periódica Trimestral", "Renta Periódica Semestral"]} disabled={bloqueado} />
            <FormInput label="Capital" value={form.capital} onChange={(e) => handleChange("capital", parseFloat(e.target.value))} disabled={bloqueado} />
            <FormSelect label="Plazo" value={form.plazo} onChange={(val) => handleChange("plazo", val)} options={plazos} labels={plazos.map(p => `${p} meses`)} disabled={bloqueado} />
            <FormInput label="Fecha inicial" type="date" value={form.fechaInicial} onChange={(e) => handleChange("fechaInicial", e.target.value)} disabled={bloqueado} />
            {mostrarAporte && <FormInput label="Aporte adicional" value={form.aporteAdicional ?? ""} onChange={(e) => handleChange("aporteAdicional", parseFloat(e.target.value))} disabled={bloqueado} />}
            <FormSelect label="Origen del capital" value={form.idOrigenCapital} onChange={(val) => handleChange("idOrigenCapital", val)} options={["1", "2"]} labels={["Local", "Extranjero"]} disabled={bloqueado} />
            {mostrarOrigenIncremento && <FormSelect label="Origen del incremento" value={form.idOrigenIncremento} onChange={(val) => handleChange("idOrigenIncremento", val)} options={["1", "2"]} labels={["Local", "Extranjero"]} disabled={bloqueado} />}
            <FormInput label="Coste operativo" value={form.costeOperativo} onChange={(e) => handleChange("costeOperativo", parseFloat(e.target.value))} disabled={bloqueado} />
          </div>

          <div className="flex justify-end">
            <Button onClick={handleGenerar} disabled={bloqueado} className="bg-blue-600 hover:bg-blue-700 text-white">
              Generar cronograma
            </Button>
          </div>
        </CardContent>
      </Card>

      {cronograma.length > 0 && (
        <>
          <Card className="mt-6 border rounded-2xl">
            <CardContent className="p-4">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-blue-50">
                    <TableHead>Periodo</TableHead>
                    <TableHead>Inicio</TableHead>
                    <TableHead>Vencimiento</TableHead>
                    <TableHead>Tasa</TableHead>
                    {mostrarAporte && <TableHead>Aporte</TableHead>}
                    <TableHead>Capital</TableHead>
                    <TableHead>Rentabilidad</TableHead>
                    {isFija && <TableHead>Capital + Renta</TableHead>}
                    <TableHead>Coste Operativo</TableHead>
                    <TableHead>Renta Acumulada</TableHead>
                    {isFija && <TableHead>Capital Final</TableHead>}
                    {!isFija && <TableHead>Monto Pagar</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cronograma.map((item, i) => (
                    <TableRow key={i} className="hover:bg-blue-50">
                      <TableCell>{item.periodo}</TableCell>
                      <TableCell>{new Date(item.fechaInicial).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(item.fechaVencimiento).toLocaleDateString()}</TableCell>
                      <TableCell>{item.tasa.toFixed(2)}%</TableCell>
                      {mostrarAporte && <TableCell>{formatCurrency(item.aporteAdicional)}</TableCell>}
                      <TableCell>{formatCurrency(item.capitalOperacion)}</TableCell>
                      <TableCell>{formatCurrency(item.rentabilidad)}</TableCell>
                      {isFija && <TableCell>{formatCurrency(item.capitalRenta)}</TableCell>}
                      <TableCell>{formatCurrency(item.costoOperativo)}</TableCell>
                      <TableCell>{formatCurrency(item.rentaAcumulada)}</TableCell>
                      {isFija && <TableCell>{formatCurrency(item.capitalFinal)}</TableCell>}
                      {!isFija && <TableCell>{formatCurrency(item.montoPagar)}</TableCell>}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
            <Resumen label="Rentabilidad Total" value={resumen?.totalRentabilidad} />
            <Resumen label="Coste Operativo Total" value={resumen?.totalCosteOperativo} />
            <Resumen label="Valor a Liquidar" value={resumen?.valorProyectadoLiquidar} />
            <Resumen label="Renta Total" value={resumen?.totalRentaPeriodo} />
            <Resumen label="Capital + Rendimiento" value={resumen?.rendimientosMasCapital} />
            {form.tipoSolicitud === "3" && resumen?.fechaIncremento && (
              <Resumen label="Fecha Incremento" value={new Date(resumen.fechaIncremento).toLocaleDateString()} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

function FormInput({ label, value, onChange, type = "number", disabled }) {
  return (
    <div className="space-y-1">
      <Label className="text-sm text-gray-700 font-medium">{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="text-sm border-gray-300 bg-white"
        placeholder={label}
      />
    </div>
  );
}

function FormSelect({ label, value, onChange, options, labels = [], disabled }) {
  return (
    <div className="space-y-1">
      <Label className="text-sm text-gray-700 font-medium">{label}</Label>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className="text-sm border-gray-300 bg-white">
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {options.map((opt, idx) => (
            <SelectItem key={opt} value={opt}>
              {labels[idx] ?? opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function Resumen({ label, value }) {
  return (
    <div className="bg-gray-100 rounded-lg p-4 text-center">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-lg font-semibold text-gray-800">
        {typeof value === "number" ? formatCurrency(value) : value}
      </div>
    </div>
  );
}
