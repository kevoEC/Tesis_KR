import { useContext } from "react";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import { Outlet } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";
export default function DashboardLayout() {
  const { isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[--color-bg] text-[--color-fg]">
        <span className="text-sm text-muted">Cargando sesión...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[--color-bg] text-[--color-fg] overflow-x-auto">
      {/* 👇 Sidebar: puedes mejorar con responsive más abajo */}
      <Sidebar />

      {/* 👇 Contenedor principal */}
      <div className="flex flex-col flex-1 min-h-screen min-w-0">
        <Header />
        <main className="flex-1 overflow-auto px-4 sm:px-6 py-6 fade-in-up">
          <div className="max-w-7xl mx-auto w-full">

            <Outlet />
          </div>
        </main>
        <DashboardFooter />
      </div>
    </div>
  );
}


