"use client";
import { useParams } from "next/navigation";

export default function ThanksPage() {
  const params = useParams();
  return (
    <main className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
      <div className="text-center">
        <h1 className="display-2 fw-bold text-success mb-4">¡Gracias!</h1>
        {params?.tipo && params?.monto && (
          <div className="h4 text-muted">
            Ya recibimos tu&nbsp;
            {params.tipo === "anual" && "suscripción anual"}
            {params.tipo === "mensual" && "suscripción mensual"}
            {params.tipo === "unico" && "pago único"}
            &nbsp;por ${params.monto}
          </div>
        )}
      </div>
    </main>
  );
}
