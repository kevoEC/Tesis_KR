import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import Spinner from "@/components/ui/loader";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/layout/DashboardLayout"; // 👈 importa tu layout
import {
  publicRoutes,
  protectedRoutes,
  fallbackRoutes,
} from "@/routes/AppRoutes";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            {/* Redirección base */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Rutas públicas */}
            {publicRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}

            {/* Rutas protegidas con layout */}
            <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              {protectedRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
            </Route>
          </Route>


            {/* Rutas fallback */}
            {fallbackRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
