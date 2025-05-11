import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function DatosGenerales() {
  return (
    <div className="space-y-6 p-6">
      <h2 className="text-xl font-semibold text-gray-800">Datos generales</h2>

      {/* 📝 Formulario */}
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormGroup label="Fecha de nacimiento">
              <Input type="date" />
            </FormGroup>

            <FormGroup label="Género">
              <Select>
                <SelectTrigger className="bg-white border border-gray-300">
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="femenino">Femenino</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </FormGroup>

            <FormGroup label="Estado civil">
              <Select>
                <SelectTrigger className="bg-white border border-gray-300">
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="soltero">Soltero</SelectItem>
                  <SelectItem value="casado">Casado</SelectItem>
                  <SelectItem value="divorciado">Divorciado</SelectItem>
                </SelectContent>
              </Select>
            </FormGroup>

            <FormGroup label="Nivel académico">
              <Select>
                <SelectTrigger className="bg-white border border-gray-300">
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="primaria">Primaria</SelectItem>
                  <SelectItem value="secundaria">Secundaria</SelectItem>
                  <SelectItem value="universitaria">Universitaria</SelectItem>
                </SelectContent>
              </Select>
            </FormGroup>

            <FormGroup label="Número de cargas familiares">
              <Input type="number" placeholder="Ej: 2" />
            </FormGroup>

            <FormGroup label="Nacionalidad">
              <Input placeholder="Ej: Ecuatoriana" />
            </FormGroup>

            <FormGroup label="Profesión">
              <Input placeholder="Ej: Ingeniero/a" />
            </FormGroup>

            <FormGroup label="Etnia">
              <Input placeholder="Ej: Mestizo" />
            </FormGroup>

            <FormGroup label="País de nacimiento">
              <Input placeholder="Ej: Ecuador" />
            </FormGroup>

            <FormGroup label="Provincia de nacimiento">
              <Input placeholder="Ej: Pichincha" />
            </FormGroup>

            <FormGroup label="Ciudad de nacimiento">
              <Input placeholder="Ej: Quito" />
            </FormGroup>
          </div>
        </CardContent>
      </Card>

      {/* 📇 Tabla de referencias */}
      <div className="pt-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">Referencias</h3>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md">
            Agregar Referencia
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre referencia</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Teléfono celular</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-gray-500 py-6">
                    No se encontró nada para mostrar aquí
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function FormGroup({ label, children }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      {children}
    </div>
  );
}
