// src/hooks/useUI.js
import { useContext } from "react";
import { UIContext } from "@/contexts/UIContext";

export function useUI() {
  return useContext(UIContext);
}
