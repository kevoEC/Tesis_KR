import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TerminosCondiciones() {
  return (
    <div className="min-h-screen bg-pattern text-[--color-fg] px-4 py-10 flex flex-col items-center justify-center">
      <img
        src="/png/Logo SG 1 1.png"
        alt="SG Consulting Group"
        className="h-14 mb-6"
      />

      <Card className="w-full max-w-4xl bg-white text-[--color-fg] shadow-md rounded-xl border border-[--color-border] fade-in-up overflow-auto max-h-[90vh]">
        <CardContent className="py-10 px-8 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-black">
              Términos y Condiciones de Uso
            </h1>
            <p className="text-sm text-[--color-muted]">
              Última actualización: Abril 2025
            </p>
          </div>

          <section className="space-y-5 text-sm leading-relaxed text-justify">
            <p>
              Bienvenido al sitio web de SG CONSULTING GROUP. El acceso y uso de nuestros servicios digitales se rige por los presentes Términos y Condiciones. Al utilizar nuestros sitios o aplicaciones, usted acepta estar sujeto a los mismos.
            </p>

            <p>
              Estos términos aplican a todos los productos y servicios ofrecidos por SG a través de su sitio <strong>www.sgconsulting.site</strong>, el portal <strong>https://portal.sgconsulting.site</strong> y/o cualquier aplicación móvil. Lea cuidadosamente este documento antes de continuar.
            </p>

            <h2 className="text-lg font-semibold text-black pt-4">1. Uso y restricciones</h2>
            <p>
              El uso de nuestros servicios está limitado a personas con capacidad legal para contratar. SG se reserva el derecho de rechazar solicitudes y restringir accesos por motivos de seguridad o cumplimiento.
            </p>

            <h2 className="text-lg font-semibold text-black pt-4">2. Propiedad intelectual</h2>
            <p>
              Todos los derechos de autor, marcas y contenidos pertenecen a SG o a sus licenciantes. Está prohibida su reproducción sin autorización.
            </p>

            <h2 className="text-lg font-semibold text-black pt-4">3. Responsabilidades del usuario</h2>
            <p>
              El usuario acepta usar los servicios de forma ética, segura y conforme a la ley. Está prohibido alterar la plataforma, realizar prácticas maliciosas o uso indebido de los recursos digitales.
            </p>

            <h2 className="text-lg font-semibold text-black pt-4">4. Modificaciones</h2>
            <p>
              SG puede modificar estos términos en cualquier momento. Es responsabilidad del usuario consultarlos periódicamente.
            </p>

            <h2 className="text-lg font-semibold text-black pt-4">5. Protección de datos</h2>
            <p>
              SG tratará la información personal conforme a la legislación ecuatoriana y su Política de Privacidad. Los usuarios tienen derecho a solicitar la eliminación de su información tras finalizar cualquier vínculo contractual.
            </p>

            <h2 className="text-lg font-semibold text-black pt-4">6. Jurisdicción</h2>
            <p>
              Este acuerdo se regirá por las leyes de Ecuador, sometiéndose a los juzgados del Distrito Metropolitano de Quito.
            </p>

            <p className="pt-4">
              Si tiene dudas o requiere más información, puede comunicarse a{" "}
              <a
                href="mailto:info@sgconsulting.site"
                className="underline text-[--color-primary]"
              >
                info@sgconsulting.site
              </a>
            </p>
          </section>

          <div className="pt-6 text-center">
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
