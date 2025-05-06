/* eslint-disable react-hooks/exhaustive-deps */
// src/components/prospectos/ModalActividad.jsx
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
  } from "@/components/ui/select";
  import { Textarea } from "@/components/ui/textarea";
  import { useEffect, useState } from "react";
  
  export default function ModalActividad({
    open,
    onClose,
    onSave,
    modo = "crear",
    actividadEditar = null,
    tiposActividad = [],
    prioridades = [],
  }) {
    const [form, setForm] = useState({
      idTipoActividad: "",
      asunto: "",
      descripcion: "",
      duracion: "",
      vencimiento: "",
      idPrioridad: "",
      estado: "En progreso",
    });
  
    useEffect(() => {
      if (modo === "editar" && actividadEditar) {
        const { idTipoActividad, asunto, descripcion, duracion, vencimiento, idPrioridad, estado } = actividadEditar;
        setForm({
          idTipoActividad: idTipoActividad?.toString() || "",
          asunto,
          descripcion,
          duracion: convertirDuracionAMinutos(duracion),
          vencimiento: vencimiento?.substring(0, 16),
          idPrioridad: idPrioridad?.toString() || "",
          estado: estado ? "Finalizada" : "En progreso",
        });
      } else {
        setForm({
          idTipoActividad: "",
          asunto: "",
          descripcion: "",
          duracion: "",
          vencimiento: "",
          idPrioridad: "",
          estado: "En progreso",
        });
      }
    }, [open]);
  
    const convertirDuracionAMinutos = (duracionStr) => {
      const [h, m] = duracionStr.split(":").map(Number);
      return (h * 60 + m).toString();
    };
  
    const convertirMinutosATiempo = (min) => {
      const h = String(Math.floor(min / 60)).padStart(2, "0");
      const m = String(min % 60).padStart(2, "0");
      return `${h}:${m}:00`;
    };
  
    const handleChange = (key, val) => {
      setForm((prev) => ({ ...prev, [key]: val }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const payload = {
        idTipoActividad: parseInt(form.idTipoActividad),
        asunto: form.asunto,
        descripcion: form.descripcion,
        duracion: convertirMinutosATiempo(parseInt(form.duracion)),
        vencimiento: form.vencimiento,
        idPrioridad: parseInt(form.idPrioridad),
        estado: form.estado === "Finalizada",
      };
      onSave(payload);
      onClose();
    };
  
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {modo === "editar" ? "Editar Actividad" : "Nueva Actividad"}
            </DialogTitle>
          </DialogHeader>
  
          <form onSubmit={handleSubmit} className="space-y-4 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Tipo de Actividad</Label>
                <Select
                  value={form.idTipoActividad}
                  onValueChange={(val) => handleChange("idTipoActividad", val)}
                >
                  <SelectTrigger><SelectValue placeholder="Seleccionar tipo..." /></SelectTrigger>
                  <SelectContent>
                    {tiposActividad.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.descripcion}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
  
              <div>
                <Label>Prioridad</Label>
                <Select
                  value={form.idPrioridad}
                  onValueChange={(val) => handleChange("idPrioridad", val)}
                >
                  <SelectTrigger><SelectValue placeholder="Seleccionar prioridad..." /></SelectTrigger>
                  <SelectContent>
                    {prioridades.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.categoria}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
  
            <div>
              <Label>Asunto</Label>
              <Input value={form.asunto} onChange={(e) => handleChange("asunto", e.target.value)} required />
            </div>
  
            <div>
              <Label>Descripción</Label>
              <Textarea rows={3} value={form.descripcion} onChange={(e) => handleChange("descripcion", e.target.value)} required />
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Duración (minutos)</Label>
                <Input type="number" value={form.duracion} onChange={(e) => handleChange("duracion", e.target.value)} required />
              </div>
  
              <div>
                <Label>Vencimiento</Label>
                <Input type="datetime-local" value={form.vencimiento} onChange={(e) => handleChange("vencimiento", e.target.value)} required />
              </div>
            </div>
  
            {modo === "editar" && (
              <div>
                <Label>Estado</Label>
                <Select
                  value={form.estado}
                  onValueChange={(val) => handleChange("estado", val)}
                >
                  <SelectTrigger><SelectValue placeholder="Seleccionar estado" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="En progreso">En progreso</SelectItem>
                    <SelectItem value="Finalizada">Finalizada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
  
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
              <Button type="submit">{modo === "editar" ? "Guardar Cambios" : "Crear Actividad"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
  