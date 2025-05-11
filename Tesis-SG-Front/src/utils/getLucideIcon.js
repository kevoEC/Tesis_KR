import * as Icons from "lucide-react";

export function getLucideIcon(nombre) {
  if (!nombre || typeof nombre !== "string") return Icons.Circle;

  const pascal = nombre
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");

  return Icons[pascal] || Icons.Circle;
}
