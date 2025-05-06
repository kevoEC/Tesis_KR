// src/contexts/UIProvider.jsx
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { UIContext } from "./UIContext";

export function UIProvider({ children }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [solicitudHabilitada, setSolicitudHabilitada] = useState(
    sessionStorage.getItem("solicitudHabilitada") === "true"
  );
  const [solicitudId, setSolicitudId] = useState(
    sessionStorage.getItem("solicitudId")
      ? parseInt(sessionStorage.getItem("solicitudId"))
      : null
  );

  useEffect(() => {
    if (solicitudHabilitada) {
      sessionStorage.setItem("solicitudHabilitada", "true");
    } else {
      sessionStorage.removeItem("solicitudHabilitada");
    }
  }, [solicitudHabilitada]);

  useEffect(() => {
    if (solicitudId) {
      sessionStorage.setItem("solicitudId", solicitudId.toString());
    } else {
      sessionStorage.removeItem("solicitudId");
    }
  }, [solicitudId]);

  const notify = {
    success: (msg) => toast.success(msg),
    error: (msg) => toast.error(msg),
    info: (msg) => toast(msg),
  };

  return (
    <UIContext.Provider
      value={{
        modalOpen,
        setModalOpen,
        notify,
        solicitudHabilitada,
        setSolicitudHabilitada,
        solicitudId,
        setSolicitudId,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}
