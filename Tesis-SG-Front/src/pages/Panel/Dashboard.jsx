import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    Legend,
    ResponsiveContainer,
  } from "recharts";
  import { Card, CardContent } from "@/components/ui/card";
  
  const resumenData = [
    { label: "Prospectos", valor: 128 },
    { label: "Inversiones", valor: 56 },
    { label: "Clientes Activos", valor: 43 },
    { label: "Ganancias Est.", valor: "$12.4K" },
  ];
  
  const lineData = [
    { mes: "Ene", prospectos: 20 },
    { mes: "Feb", prospectos: 35 },
    { mes: "Mar", prospectos: 50 },
    { mes: "Abr", prospectos: 42 },
    { mes: "May", prospectos: 65 },
  ];
  
  const barData = [
    { categoria: "Cripto", total: 12000 },
    { categoria: "Fondos", total: 8000 },
    { categoria: "Bienes Raíces", total: 10500 },
  ];
  
  const pieData = [
    { name: "Activos", value: 45 },
    { name: "Inactivos", value: 30 },
    { name: "En espera", value: 25 },
  ];
  
  const COLORS = ["#4ade80", "#facc15", "#f87171"];
  
  export default function DashboardPanel() {
    return (
      <div className="space-y-6">
        {/* Totales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {resumenData.map((item, idx) => (
            <Card key={idx} className="shadow-sm">
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">{item.label}</div>
                <div className="text-2xl font-bold text-gray-900">{item.valor}</div>
              </CardContent>
            </Card>
          ))}
        </div>
  
        {/* Gráficas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Línea */}
          <Card className="col-span-1 lg:col-span-2 shadow-sm">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">Prospectos Mensuales</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={lineData}>
                  <Line type="monotone" dataKey="prospectos" stroke="#2563eb" strokeWidth={2} />
                  <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
  
          {/* Pie */}
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">Estado de Prospectos</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
  
        {/* Barras */}
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">Inversiones por Categoría</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="categoria" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    );
  }
  