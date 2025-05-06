// src/pages/Dashboard.jsx
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black">Dashboard</h1>
        <Button
          variant="destructive"
          onClick={handleLogout}
          className="h-10 px-4 text-sm"
        >
          Cerrar sesión
        </Button>
      </div>
      <p className="text-[--color-muted] text-sm">
        Bienvenido al panel principal. Desde aquí puedes acceder a los módulos según tus permisos.
      </p>
    </div>
  );
}
