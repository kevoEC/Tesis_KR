import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EntidadView from "@/components/shared/VistaEntidad";
import { getProspectos, deleteProspecto } from "@/service/Entidades/ProspectoService";
import TablaCustom2 from "@/components/shared/TablaCustom2";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"


export default function Prospectos() {
  const navigate = useNavigate();

  const [prospectos, setProspectos] = useState([]);
  /*Cargar los datos al montar el componente*/
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProspectos(); // Ejecutar función async
        setProspectos(data);
      } catch (error) {
        console.error("Error al cargar prospectos:", error);
      }
    };

    fetchData();
  }, []);

  // 🟡 Editar
  const handleEditar = (item) => {
    navigate(`/prospectos/editar/${item.idProspecto}`);
  };

  // 🔴 Eliminar
  const handleEliminar = async (item) => {
    try {
      await deleteProspecto(item.id);
      // Si usas refetch dentro de VistaEntidad, lo puedes llamar aquí después
    } catch (err) {
      console.error("Error al eliminar prospecto:", err);
    }
  };


  const columnas = [
    { key: 'idProspecto', label: 'IdProspecto' },
    { key: 'nombres', label: 'Nombres' },
    { key: 'apellidoPaterno', label: 'Apellido Pat' },
    { key: 'apellidoMaterno', label: 'Apellido Mat' },
    { key: 'telefonoCelular', label: 'Celular' },
    { key: 'correoElectronico', label: 'Correo' },
    {
      key: 'estado',
      label: 'Estado',
      render: (value) => (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            value ? 'bg-green-100 text-green-700' : 'bg-yellow-200 text-yellow-700'
          }`}
        >
          {value ? 'Activo' : 'Inactivo'}
        </span>
      ),
    }
    
  ];

  return (

    // <EntidadView
    //   titulo="Prospectos"
    //   entidad="prospecto"       // 🔗 Para el backend (API)
    //   ruta="prospectos"         // 🌐 Para el frontend (rutas reales)
    //   columnas={{
    //     nombres: "Nombres",
    //     apellidoPaterno: "Apellido Paterno",
    //     apellidoMaterno: "Apellido Materno",
    //     telefonoCelular: "Teléfono Celular",
    //     correoElectronico: "Correo Electrónico",
    //     estado: "Estado",

    //   }}
    //   onEditar={handleEditar}
    //   onEliminar={handleEliminar}
    // />

    <Card className="border border-muted rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.12)]">
      <CardHeader>
        <CardTitle>Lista de Prospectos</CardTitle>
      </CardHeader>
      <CardContent>
        <TablaCustom2
          columns={columnas}
          data={prospectos}
          mostrarEditar={true}
          mostrarAgregarNuevo={true}
          mostrarEliminar={true}
          onEditarClick={handleEditar}
          onEliminarClick={handleEliminar}
        />
      </CardContent>
    </Card>


  );
}
