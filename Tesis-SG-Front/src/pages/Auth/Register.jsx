import { useState } from "react";
import Step1DatosIniciales from "./steps/Step1DatosIniciales";
import Step2DatosPersonales from "./steps/Step2DatosPersonales";
import Step3VerificacionCorreo from "./steps/Step3VerificacionCorreo";
import Step4VerificacionTelefono from "./steps/Step4VerificacionTelefono";
import Step5ConfirmacionFinal from "./steps/Step5ConfirmacionFinal.jsx";

export default function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    correo: "",
    confirmarCorreo: "",
    identificacion: "",
    nombres: "",
    apellidos: "",
    contrasena: "",
    celular: "",
    token: "",
    aceptaClausula: false,
    aceptaTerminos: false,
    aceptaPrivacidad: false,
  });

  const next = () => setStep((prev) => prev + 1);
  const back = () => setStep((prev) => prev - 1);

  const steps = {
    1: <Step1DatosIniciales data={formData} setData={setFormData} onNext={next} />,
    2: <Step2DatosPersonales data={formData} setData={setFormData} onNext={next} onBack={back} />,
    3: <Step3VerificacionCorreo data={formData} onNext={next} />,
    4: <Step4VerificacionTelefono data={formData} onNext={next} />,
    5: <Step5ConfirmacionFinal />,
  };
  

  return <>{steps[step]}</>;
}
