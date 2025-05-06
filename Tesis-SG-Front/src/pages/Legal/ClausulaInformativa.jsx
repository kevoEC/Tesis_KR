import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ClausulaInformativa() {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-pattern flex flex-col items-center justify-center px-4 text-[--color-fg]">
      {/* Logo SG */}
      <img src="/png/Logo SG 1 1.png" alt="SG Consulting Group" className="h-14 mb-6" />

      {/* Card con scroll y estilo elegante */}
      <Card className="w-full max-w-3xl bg-white text-[--color-fg] shadow-md rounded-xl border border-[--color-border] fade-in-up overflow-auto max-h-[90vh]">
        <CardContent className="py-8 px-10 space-y-6">
          <h1 className="text-2xl font-bold text-center text-black">
            CLÁUSULA INFORMATIVA Y AUTORIZACIÓN SOBRE PROTECCIÓN DE DATOS PERSONALES
          </h1>

          <p className="text-sm text-justify leading-relaxed">
            SG CONSULTING GROUP (SG), ubicado en Quito, Ecuador, en la dirección CALLE FRANCISCO CAICEDO N° OE-277, ha implementado medidas de seguridad y confidencialidad conforme al Artículo 15 de la Ley Orgánica de Protección de Datos Personales. Esta ley protege toda información que pueda identificarte directa o indirectamente.
          </p>

          <p className="text-sm text-justify leading-relaxed">
            SG tratará tus datos personales (“Los Datos”) para evaluar solicitudes de servicios de asesoría financiera e inversiones, gestión de productos contratados, así como para la prestación de servicios complementarios que podrían incluir plataformas tecnológicas, servicios legales, autenticación digital, custodia documental, entre otros.
          </p>

          <p className="text-sm text-justify leading-relaxed">
            Los Datos serán almacenados en el banco de datos “Clientes” hasta que dejen de ser necesarios. Puedes ejercer tus derechos de acceso, rectificación, oposición, suspensión y revocación en cualquier momento escribiendo a{" "}
            <a href="mailto:contacto@sgconsulting.site" className="underline text-[--color-primary]">
              info@sgconsulting.site
            </a>{" "}
            o ingresando a{" "}
            <a
              href="https://portal.sgconsulting.site"
              className="underline text-[--color-primary]"
              target="_blank"
              rel="noreferrer"
            >
              https://portal.sgconsulting.site
            </a>.
          </p>

          <h2 className="text-lg font-semibold mt-6">CONSENTIMIENTO PARA EL TRATAMIENTO DE DATOS PERSONALES</h2>

          <ul className="list-disc pl-5 text-sm space-y-2 text-justify">
            <li>
              Autorizo a SG CONSULTING GROUP a tratar Los Datos para ofrecer productos y servicios de asesoría financiera, enviar comunicaciones e información comercial a través de sus canales y proveedores autorizados.
            </li>
            <li>
              Autorizo a SG CONSULTING GROUP a compartir mis datos con proveedores nacionales e internacionales, incluyendo servicios en la nube, para campañas comerciales, estudios de mercado, servicios de cobranza, almacenamiento y cumplimiento de obligaciones contractuales.
            </li>
          </ul>

          <p className="text-sm text-justify">
            Esta autorización es opcional. Si decides no otorgarla, SG CONSULTING GROUP solo podrá utilizar tus datos para ejecutar el contrato celebrado.
          </p>

          <div className="pt-4 text-center">
            <Button
              variant="outline"
              className="btn-microsoft btn-animated text-sm py-2 px-6"
              onClick={() => window.close()}
            >
              Cerrar
            </Button>
          </div>
        </CardContent>
      </Card>

      <footer className="text-center text-xs text-[--color-muted] mt-6">
        © 2025 SG CONSULTING GROUP ·{" "}
        <a href="#" className="underline hover:text-[--color-primary]">
          Todos los derechos reservados
        </a>
      </footer>
    </div>
  );
}
