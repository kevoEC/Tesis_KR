// src/hooks/useCatalog.js
import { useContext } from "react";
import { CatalogContext } from "@/contexts/CatalogContext";

export function useCatalog() {
  return useContext(CatalogContext);
}
