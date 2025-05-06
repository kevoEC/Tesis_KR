import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Filter, FileDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEntidadFiltrada } from "@/hooks/useEntidadFiltrada";

const opcionesVista = [
  { label: "Mis", value: "mis" },
  { label: "Todos", value: "todos" },
  { label: "Activos", value: "activos" },
  { label: "Inactivos", value: "inactivos" },
];

export default function EntidadView({
  titulo,
  entidad,
  ruta,
  columnas = null,
  onEditar,
  onEliminar,
}) {
  const [filtro, setFiltro] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [filasPorPagina, setFilasPorPagina] = useState(10);
  const [filtrosColumnas, setFiltrosColumnas] = useState({});
  const [confirmDialog, setConfirmDialog] = useState({ open: false, item: null });
  const navigate = useNavigate();

  const { data, loading } = useEntidadFiltrada(entidad, filtro);

  const columnKeys = columnas
    ? Object.keys(columnas)
    : data.length
    ? Object.keys(data[0])
    : [];

  let resultados = data.filter((item) =>
    Object.values(item).some((valor) =>
      valor?.toString().toLowerCase().includes(busqueda.toLowerCase())
    )
  );

  resultados = resultados.filter((item) =>
    Object.entries(filtrosColumnas).every(([col, val]) =>
      val ? item[col]?.toString().toLowerCase().includes(val.toLowerCase()) : true
    )
  );

  const totalPaginas = Math.ceil(resultados.length / filasPorPagina);
  const indiceInicial = (paginaActual - 1) * filasPorPagina;
  const resultadosPaginados = resultados.slice(
    indiceInicial,
    indiceInicial + filasPorPagina
  );

  const exportToCSV = (rows, cols, filename = "export.csv") => {
    const csvContent = [
      cols.join(","),
      ...rows.map((row) =>
        cols.map((col) => `"${(row[col] ?? "").toString().replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = (rows, cols, filename = "export.pdf") => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => cols.map((col) => row[col] ?? ""));
    autoTable(doc, {
      head: [cols],
      body: tableData,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 128, 185] },
      margin: { top: 20 },
    });
    doc.save(filename);
  };

  return (
    <Card className="bg-white border border-[--color-border] shadow-lg rounded-2xl fade-in-up">
      <CardContent className="py-6 px-6 space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {titulo} - {opcionesVista.find((opt) => opt.value === filtro)?.label}
          </h2>

          <div className="flex flex-wrap gap-3 items-center sm:justify-end">
            <Button onClick={() => navigate(`/${ruta ?? entidad}/nuevo`)} className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg">
              <Plus size={16} className="mr-2" /> Nuevo
            </Button>

            <Select value={filtro} onValueChange={setFiltro}>
              <SelectTrigger className="w-36 h-10 text-sm bg-white border border-gray-300 shadow-sm">
                <SelectValue placeholder="Vista" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {opcionesVista.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Buscar..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="h-10 text-sm bg-white border border-gray-300 shadow-sm w-52"
            />

            <Select
              value={String(filasPorPagina)}
              onValueChange={(val) => {
                setFilasPorPagina(Number(val));
                setPaginaActual(1);
              }}
            >
              <SelectTrigger className="w-20 h-9 border border-gray-300 bg-white text-sm">
                <SelectValue placeholder="Filas" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {[5, 10, 25].map((cant) => (
                  <SelectItem key={cant} value={String(cant)}>
                    {cant}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              onValueChange={(val) => {
                const filename = `${entidad}-${Date.now()}`;
                if (val === "csv") exportToCSV(resultados, columnKeys, `${filename}.csv`);
                if (val === "pdf") exportToPDF(resultados, columnKeys, `${filename}.pdf`);
              }}
            >
              <SelectTrigger className="w-32 h-10 text-sm bg-white border border-gray-300 shadow-sm">
                <SelectValue placeholder={<span className="flex items-center"><FileDown size={16} className="mr-1" /> Exportar</span>} />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="csv">Exportar CSV</SelectItem>
                <SelectItem value="pdf">Exportar PDF</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          {loading ? (
            <div className="text-center py-10 text-gray-500">Cargando...</div>
          ) : (
            <Table>
              <TableHeader className="bg-gray-50 text-gray-700">
                <TableRow>
                  {columnKeys.map((col) => (
                    <TableHead key={col}>
                      <div className="flex items-center gap-1">
                        {columnas?.[col] || col}
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button size="icon" variant="ghost" className="w-5 h-5 p-0">
                              <Filter size={14} />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="bg-white w-48 p-4 border border-gray-200 shadow-lg">
                            <Input
                              placeholder={`Filtrar ${col}`}
                              value={filtrosColumnas[col] || ""}
                              onChange={(e) =>
                                setFiltrosColumnas((prev) => ({
                                  ...prev,
                                  [col]: e.target.value,
                                }))
                              }
                              className="h-8 text-sm"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </TableHead>
                  ))}
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resultadosPaginados.map((item, idx) => (
                  <TableRow key={idx} className="hover:bg-gray-50 transition">
                    {columnKeys.map((col) => (
                      <TableCell key={col}>{item[col]}</TableCell>
                    ))}
                    <TableCell className="flex justify-end gap-2 py-3">
                      <Button variant="outline" onClick={() => onEditar(item)} className="text-sm">Editar</Button>
                      <Button size="sm" variant="destructive" onClick={() => setConfirmDialog({ open: true, item })} className="text-sm bg-red-600 hover:bg-red-700 text-white">
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        <div className="flex justify-center items-center gap-4 pt-4 pb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
            disabled={paginaActual === 1}
            className="rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft size={18} />
          </Button>

          <span className="text-sm text-muted-foreground">
            Página {paginaActual} de {totalPaginas}
          </span>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
            disabled={paginaActual === totalPaginas}
            className="rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight size={18} />
          </Button>
        </div>

        <Dialog
          open={confirmDialog.open}
          onOpenChange={(open) =>
            setConfirmDialog((prev) => ({ ...prev, open }))
          }
        >
          <DialogContent className="bg-white rounded-lg shadow-xl border border-gray-200">
            <DialogHeader>
              <DialogTitle>¿Estás seguro de eliminar este elemento?</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground">Esta acción no se puede deshacer.</p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmDialog({ open: false, item: null })}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={() => {
                onEliminar(confirmDialog.item);
                setConfirmDialog({ open: false, item: null });
              }} className="bg-red-600 hover:bg-red-700 text-white">
                Eliminar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

