// src/components/dashboard/DashboardFooter.jsx
export default function DashboardFooter() {
  return (
    <footer className="w-full text-center text-xs text-zinc-500 py-4 shadow-inner bg-white">
      © 2025 SG CONSULTING GROUP ·{" "}
      <a
        href="/legal/privacidad"
        className="underline hover:text-indigo-600 transition-colors"
        target="_blank"
        rel="noreferrer"
      >
        Política de Privacidad
      </a>
    </footer>
  );
}
