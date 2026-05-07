"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const WA_NUMBER = "5491162141129";
const TRANSFER_DATA = {
  titular: "Cooperativa de Trabajo JJ Circuito Cultural LTDA",
  cbu: "1910249655024900981696",
  alias: "SALINA.CANCHA.PARIS",
  cuit: "30-71636013-6",
  banco: "Cuenta Corriente en Pesos",
};

function PedidoExitosoContent() {
  const searchParams = useSearchParams();
  const codigo = searchParams.get("codigo") ?? "";
  const metodo = searchParams.get("metodo") ?? "transferencia";

  const isTransferencia = metodo === "transferencia";
  const isRetiro = metodo === "retiro";
  const isMp = metodo === "mp";

  const waMessage = encodeURIComponent(
    `Hola! Adjunto el comprobante de transferencia del pedido ${codigo}. ¡Gracias!`
  );
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

  return (
    <div className="container py-4" style={{ maxWidth: 640 }}>
      {/* Header */}
      <div className="text-center mb-5">
        <div style={{ fontSize: 72 }} className="mb-3">
          {isMp ? "🎉" : "✅"}
        </div>
        <h1 className="fw-bold text-light mb-2">
          {isMp ? "¡Pago confirmado!" : "¡Pedido recibido!"}
        </h1>
        <p className="text-secondary">
          {isTransferencia && "Completá la transferencia para confirmar tu pedido."}
          {isRetiro && "Te esperamos en el JJ el día del evento."}
          {isMp && "Tu pago fue procesado correctamente."}
        </p>
      </div>

      {/* Código de pedido */}
      <div
        className="text-center rounded-3 p-4 mb-4"
        style={{
          background: "rgba(139,92,246,0.1)",
          border: "2px solid rgba(139,92,246,0.4)",
        }}
      >
        <div className="text-secondary small mb-1" style={{ letterSpacing: 2 }}>
          CÓDIGO DE PEDIDO
        </div>
        <div
          className="fw-bold text-primary"
          style={{ fontSize: "2.5rem", letterSpacing: 8, fontFamily: "monospace" }}
        >
          {codigo}
        </div>
        <div className="text-secondary small mt-1">
          Guardá este código — lo vas a necesitar al retirar
        </div>
      </div>

      {/* Transferencia */}
      {isTransferencia && (
        <div className="card bg-dark border-warning mb-4">
          <div className="card-body">
            <h5 className="text-warning fw-bold mb-3">🏦 Datos para la transferencia</h5>
            <div className="d-flex flex-column gap-2">
              {[
                { label: "Titular", value: TRANSFER_DATA.titular },
                { label: "Tipo de cuenta", value: TRANSFER_DATA.banco },
                { label: "CBU", value: TRANSFER_DATA.cbu },
                { label: "Alias", value: TRANSFER_DATA.alias },
                { label: "CUIT", value: TRANSFER_DATA.cuit },
              ].map(({ label, value }) => (
                <div key={label} className="d-flex justify-content-between gap-2 flex-wrap">
                  <span className="text-secondary small">{label}</span>
                  <span
                    className="text-light fw-semibold text-end"
                    style={{ fontFamily: label === "CBU" || label === "Alias" ? "monospace" : "inherit", fontSize: "0.9rem" }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <hr className="border-secondary my-3" />
            <p className="text-secondary small mb-3">
              Una vez hecha la transferencia, enviá el comprobante por WhatsApp indicando tu código{" "}
              <strong className="text-primary">{codigo}</strong>.
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success w-100 fw-bold"
            >
              📲 Enviar comprobante por WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* Al retirar */}
      {isRetiro && (
        <div className="card bg-dark border-secondary mb-4">
          <div className="card-body">
            <h5 className="text-light fw-bold mb-3">📍 Retiro en el JJ</h5>
            <p className="text-secondary mb-2">
              <strong className="text-light">Dirección:</strong> Jean Jaurés 347, CABA
            </p>
            <p className="text-secondary small">
              Presentá tu código de pedido <strong className="text-primary">{codigo}</strong> al
              momento de retirar. Abonás en el local.
            </p>
          </div>
        </div>
      )}

      {/* MercadoPago */}
      {isMp && (
        <div className="card bg-dark border-success mb-4">
          <div className="card-body text-center">
            <h5 className="text-success fw-bold mb-2">✅ Pago recibido</h5>
            <p className="text-secondary mb-0">
              Tu pago fue procesado. Presentá el código{" "}
              <strong className="text-primary">{codigo}</strong> al retirar.
            </p>
          </div>
        </div>
      )}

      {/* Mail notice */}
      <div
        className="rounded-3 p-3 text-center mb-5"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <span className="text-secondary small">
          📧 Te llegará un mail con el detalle de tu pedido a la dirección que indicaste.
        </span>
      </div>

      <div className="text-center">
        <Link href="/tienda" className="btn btn-outline-primary">
          ← Volver a la tienda
        </Link>
      </div>
    </div>
  );
}

export default function PedidoExitosoPage() {
  return (
    <Suspense
      fallback={
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
          <div className="spinner-border text-primary" />
        </div>
      }
    >
      <PedidoExitosoContent />
    </Suspense>
  );
}
