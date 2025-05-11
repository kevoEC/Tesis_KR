import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Plus } from "lucide-react";

export default function Beneficiarios() {
  return (
    <div className="space-y-6 p-6">
      <h2 className="text-xl font-semibold text-gray-800">Beneficiarios</h2>

      <Card>
        <CardContent className="p-6 space-y-4">
          {/* Encabezado con switch */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Label className="text-sm font-medium text-gray-700">¿Tiene beneficiario?</Label>
              <Switch checked={false} disabled className="border border-gray-400" />
              <span className="text-muted-foreground text-sm">Sí</span>
            </div>

            <Button variant="outline" className="text-sm">
              <Plus size={16} className="mr-2" />
              Agregar Beneficiario
            </Button>
          </div>

          {/* Tabla vacía */}
          <div className="overflow-x-auto border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Nombre de beneficiario</TableHead>
                  <TableHead className="min-w-[200px]">Teléfono de beneficiario</TableHead>
                  <TableHead className="min-w-[200px]">Porcentaje de beneficio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-gray-500 py-10">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xl">📊</span>
                      </div>
                      <span>No se encontró nada para mostrar aquí</span>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="text-sm text-muted-foreground">Filas: 0</div>
        </CardContent>
      </Card>
    </div>
  );
}
