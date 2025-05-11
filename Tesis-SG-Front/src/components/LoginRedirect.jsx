// src/components/LoginRedirect.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Login from "@/pages/Auth/Login";

export default function LoginRedirect() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/panel/metricas", { replace: true });
    }
  }, [isAuthenticated, navigate]); // ← dependencias necesarias

  return isAuthenticated ? null : <Login />;
}
