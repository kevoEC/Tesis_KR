import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PoliticaPrivacidad() {
  return (
    <div className="min-h-screen bg-pattern flex flex-col items-center justify-center px-4 py-10 text-[--color-fg]">
      {/* Logo SG */}
      <img
        src="/png/Logo SG 1 1.png"
        alt="SG Consulting Group"
        className="h-14 mb-6"
      />

      {/* Card principal con scroll y animación */}
      <Card className="w-full max-w-4xl bg-white text-[--color-fg] shadow-md rounded-xl border border-[--color-border] fade-in-up overflow-auto max-h-[90vh]">
        <CardContent className="py-8 px-10 space-y-6">
          <h1 className="text-2xl font-bold text-center text-black">
            POLÍTICA DE PRIVACIDAD
          </h1>

          <p className="text-sm leading-relaxed text-justify">
            De conformidad con el Artículo 15 de la Ley Orgánica de Protección de Datos Personales, esta política describe cómo SG CONSULTING GROUP (SG SUASTI GUERRERO CORP S.A.S.) trata los datos personales de sus clientes. No constituye un medio de recolección de consentimiento, sino una guía informativa clara y transparente.
          </p>

          <div className="space-y-6 text-sm text-justify leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-black">1. Definiciones</h2>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Datos personales:</strong> Información que permite identificar a una persona natural.</li>
                <li><strong>Banco de datos:</strong> Conjunto organizado de datos personales.</li>
                <li><strong>Tratamiento:</strong> Cualquier acción técnica o manual sobre los datos.</li>
                <li><strong>Titular:</strong> Persona natural a la que pertenecen los datos.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-black">2. Identidad del responsable</h2>
              <p>
                SG SUASTI GUERRERO CORP S.A.S., RUC: 1793196797001, con domicilio en Francisco Caicedo OE-277, Edificio Tenis Center, Oficina 601, Quito - Ecuador.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-black">3. Finalidades del tratamiento</h2>
              <p>Los datos serán utilizados para:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Evaluación crediticia y financiera</li>
                <li>Verificación de identidad</li>
                <li>Celebración y ejecución de contratos</li>
                <li>Trámite de reclamos y solicitudes</li>
                <li>Campañas comerciales o publicitarias</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-black">4. Uso de cookies</h2>
              <p>
                Este sitio utiliza cookies para recordar preferencias de navegación, mejorar tu experiencia y mostrar contenido relevante. Puedes desactivarlas en tu navegador si lo deseas.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-black">5. Almacenamiento y conservación</h2>
              <p>
                Tus datos serán almacenados por SG el tiempo necesario para cumplir la finalidad por la que fueron recolectados, incluso tras la finalización del contrato, salvo que solicites su eliminación.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-black">6. Seguridad</h2>
              <p>
                SG CONSULTING GROUP implementa medidas técnicas y organizativas para proteger tus datos. Sin embargo, no puede garantizar la seguridad total durante la transmisión por Internet.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-black">7. Derechos del titular</h2>
              <p>
                Puedes ejercer tus derechos de acceso, rectificación, cancelación, oposición, revocación e información enviando tu solicitud a través de:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  Portal web:{" "}
                  <a
                    href="https://portal.sgconsulting.site"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-[--color-primary]"
                  >
                    https://portal.sgconsulting.site
                  </a>
                </li>
                <li>
                  Email:{" "}
                  <a
                    href="mailto:info@sgconsulting.site"
                    className="underline text-[--color-primary]"
                  >
                    info@sgconsulting.site
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-black">8. Modificaciones</h2>
              <p>
                Esta política puede ser modificada en cualquier momento y los cambios serán publicados inmediatamente en el sitio web. Última actualización: 04/10/2025.
              </p>
            </section>
          </div>

          {/* Botón cerrar */}
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
