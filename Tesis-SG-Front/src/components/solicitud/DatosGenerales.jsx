import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, } from "@/components/ui/table";
import TablaCustom2 from "../shared/TablaCustom2";
import { getReferenciasPorSolicitud } from "@/service/Entidades/ReferenciasService";
import { getTipoReferencia } from "@/service/Catalogos/TipoReferenciaService";
import { crearReferencia, editarReferencia } from "@/service/Entidades/ReferenciasService";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";


export default function DatosGenerales() {
  const { user } = useAuth();
  const { id } = useParams();
  /*Carga desde catálogo */
  const [tiposReferencia, setTiposReferencia] = useState([]);
  /*Info de referencias desde base */
  const [referencias, setReferencias] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [nuevoDato, setNuevoDato] = useState({
    idSolicitudInversion: Number(id), // lo obtenemos de useParams
    idTipoReferencia: "", // será un número
    nombre: "",
    direccion: "",
    telefonoCelular: "",
    fechaCreacion: new Date().toISOString(),
    idUsuarioPropietario: user.idUsuario,
  });
  const [modoEdicion, setModoEdicion] = useState(false); // false = nuevo, true = editar
  const [referenciaEditando, setReferenciaEditando] = useState(null); // para guardar ID o datos



  const handleAbrirFormulario = () => {
    setModoEdicion(false); // ← salimos del modo edición

    setNuevoDato({
      idSolicitudInversion: Number(id),
      idTipoReferencia: "",
      nombre: "",
      direccion: "",
      telefonoCelular: "",
      fechaCreacion: new Date().toISOString(),
      idUsuarioPropietario: user.idUsuario,
    });

    setModalAbierto(true);
  };


  /*Cargar los datos al montar el componente*/
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getReferenciasPorSolicitud(id);
        setReferencias(data);
      } catch (error) {
        console.error("Error al cargar prospectos:", error);
      }
    };
    /*Datos del ca´talogo de tipos referencia */
    const fetchTipos = async () => {
      try {
        const tipos = await getTipoReferencia();
        setTiposReferencia(tipos);
        console.log("Tipos cargados:", tipos);
      } catch (error) {
        console.error("Error al cargar tipos de referencia:", error);
      }
    };

    fetchData();
    fetchTipos();
  }, []);


  /**********Editar********************* */
  const handleEditar = (item) => {
    setNuevoDato({
      idReferencia: item.idReferencia,
      idSolicitudInversion: Number(id),
      idTipoReferencia: item.idTipoReferencia,
      nombre: item.nombreReferencia,
      direccion: item.direccion,
      telefonoCelular: item.telefonoCelular,
      telefonoFijo: item.telefonoFijo || "", // si usas este campo luego
      fechaCreacion: item.fechaCreacion,
      idUsuarioPropietario: user.idUsuario,
    });
    setModoEdicion(true);
    setModalAbierto(true);
  };
  /*********Eliminar************ */
  const handleEliminar = async (item) => {
    if (!window.confirm(`¿Estás seguro de eliminar la referencia "${item.nombreReferencia}"?`)) {
      return;
    }

    try {
      await eliminarReferencia(item.idReferencia);
      toast.success("Referencia eliminada", {
        description: `"${item.nombreReferencia}" fue eliminada correctamente.`,
      });

      // Recargar lista
      const dataActualizada = await getReferenciasPorSolicitud(id);
      setReferencias(dataActualizada);
    } catch (error) {
      console.error("Error al eliminar referencia:", error);
      toast.error("Error al eliminar", {
        description: "No se pudo eliminar la referencia. Intenta de nuevo.",
      });
    }
  };



  const columnas = [
    {
      key: 'idReferencia',
      label: 'ID Referencia',
      render: (value) => (
        <div className="text-end font-semibold text-gray-800">
          {value}
        </div>
      ),
    },
    {
      key: 'nombreReferencia',
      label: 'Nombre Referencia',
      render: (value) => (
        <div className="text-end font-semibold text-gray-800">
          {value}
        </div>
      ),
    },
    { key: 'nombreTipoReferencia', label: 'Tipo Referencia' },
    { key: 'telefonoCelular', label: 'Teléfono Celular' },
    { key: 'direccion', label: 'Dirección' },
    { key: 'fechaCreacion', label: 'Fecha de Creación' },
  ];

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
          <Button onClick={handleAbrirFormulario} className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md">
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
      <div>
        <Card>
          <CardContent>
            <TablaCustom2
              columns={columnas}
              data={referencias}
              mostrarEditar={true}
              mostrarAgregarNuevo={true}
              mostrarEliminar={true}
              onAgregarNuevoClick={handleAbrirFormulario}
              onEditarClick={handleEditar}
              onEliminarClick={handleEliminar}
            />

          </CardContent>
        </Card>
      </div>
      <Dialog open={modalAbierto} onOpenChange={setModalAbierto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{modoEdicion ? "Editar referencia" : "Agregar nueva referencia"}</DialogTitle>

          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormGroup label="Nombre">
              <Input
                value={nuevoDato.nombre}
                onChange={(e) =>
                  setNuevoDato({ ...nuevoDato, nombre: e.target.value })
                }
              />
            </FormGroup>

            <FormGroup label="Dirección">
              <Input
                value={nuevoDato.direccion}
                onChange={(e) =>
                  setNuevoDato({ ...nuevoDato, direccion: e.target.value })
                }
              />
            </FormGroup>

            <FormGroup label="Teléfono Celular">
              <Input
                value={nuevoDato.telefonoCelular}
                onChange={(e) =>
                  setNuevoDato({ ...nuevoDato, telefonoCelular: e.target.value })
                }
              />
            </FormGroup>

            <FormGroup label="Tipo de Referencia">
              <Select
                value={nuevoDato.idTipoReferencia?.toString()}
                onValueChange={(value) =>
                  setNuevoDato({ ...nuevoDato, idTipoReferencia: Number(value) })
                }
              >
                <SelectTrigger className="bg-white border border-gray-300">
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {tiposReferencia.map((tipo) => (
                    <SelectItem
                      key={tipo.idTipoReferencia}
                      value={tipo.idTipoReferencia.toString()}
                    >
                      {tipo.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormGroup>
          </div>


          <DialogFooter className="pt-4">
            <Button
              className="text-gray-300 hover:text-white"
              onClick={async () => {
                const datosAEnviar = {
                  ...nuevoDato,
                  fechaCreacion: new Date().toISOString(),
                };

                try {
                  if (modoEdicion) {
                    await editarReferencia(nuevoDato.idReferencia, datosAEnviar);
                    toast.success("Referencia actualizada", {
                      description: `Se actualizó ${nuevoDato.nombre}`,
                    });
                  } else {
                    await crearReferencia(datosAEnviar);
                    toast.success("Referencia creada", {
                      description: `Se agregó ${nuevoDato.nombre}`,
                    });
                  }


                  const dataActualizada = await getReferenciasPorSolicitud(id);
                  setReferencias(dataActualizada);

                  setModalAbierto(false);
                  setModoEdicion(false);
                  setNuevoDato({
                    idSolicitudInversion: Number(id),
                    idTipoReferencia: "",
                    nombre: "",
                    direccion: "",
                    telefonoCelular: "",
                    fechaCreacion: new Date().toISOString(),
                    idUsuarioPropietario: user.idUsuario,
                  });
                } catch (error) {
                  console.error("Error al guardar referencia:", error);
                  toast.error("Error", {
                    description: "No se pudo guardar la referencia.",
                  });
                }
              }}
            >
              {modoEdicion ? "Actualizar" : "Crear"}
            </Button>


          </DialogFooter>
        </DialogContent>
      </Dialog>


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
