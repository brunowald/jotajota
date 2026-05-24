import Image from "next/image";
import image from "./libro.jpg";

export default function TiendaPage() {
  return (
    <div className="container py-4">
      {/* ── Locrazo Patrio: venta cerrada ── */}
      <section className="text-center py-5">
        <div
          className="d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill mb-3"
          style={{
            background: "linear-gradient(90deg, rgba(245,158,11,0.12), rgba(239,68,68,0.12))",
            border: "1px solid rgba(245,158,11,0.4)",
          }}
        >
          <span style={{ color: "#f59e0b" }}>🗓️</span>
          <span className="fw-bold small" style={{ color: "#f59e0b", letterSpacing: 1 }}>
            EVENTO ESPECIAL · 25 DE MAYO
          </span>
        </div>
        <h2 className="display-5 fw-bold mb-3" style={{ color: "#fb923c" }}>
          🍲 LOCRAZO PATRIO
        </h2>
        <div
          className="mx-auto p-4 rounded-4"
          style={{
            maxWidth: 560,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <h3 className="fw-bold text-light mb-3">¡Cerramos la venta!</h3>
          <p className="text-secondary mb-3">
            Gracias por sumarte al Locrazo Patrio de JJ, edición Mayo 2026. Con cada compra nos ayudás a sostener este proyecto de cultura independiente y cooperativa ❤️
          </p>
          <p className="text-light fw-bold mb-2 text-start">Si te quedaste con ganas:</p>
          <ul className="text-secondary text-start mb-0" style={{ paddingLeft: "1.2rem" }}>
            <li className="mb-2">
              Nos vemos este <strong>lunes 25 desde las 13hs</strong> en JJ Circuito Cultural (Jean Jaurés 347, Abasto, CABA), para comer y compartir en esta fecha patria.
            </li>
            <li>
              ¡Agendate! El <strong>9 de Julio</strong>, nuevo locrazo 🇦🇷 🍲
            </li>
          </ul>
        </div>
      </section>

      {/* ── Divisor ── */}
      <hr className="border-secondary my-5" />

      {/* ── Libro ── */}
      <section className="text-center py-2">
        <h3 className="fw-bold text-secondary mb-1" style={{ fontSize: "1rem", letterSpacing: 2 }}>
          TAMBIÉN EN LA TIENDA
        </h3>
        <h2 className="fw-bold text-light mb-1">Breve Historia de lo Imperceptible</h2>
        <p className="text-secondary mb-4" style={{ fontSize: "0.9rem" }}>
          7 perspectivas sobre la realidad asombrosa. Conversaciones con Sebastián Scolnik.
        </p>
        <Image
          src={image}
          alt="Breve Historia de lo Imperceptible"
          width={200}
          height={300}
          style={{ borderRadius: 12, boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}
          className="mb-4"
        />
        <br />
        <a
          href="https://docs.google.com/forms/d/1z_uIhGqrUok9FpAYCBRald8v3lSAOm2TKjOnRHB1-KE/edit"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-secondary"
        >
          Comprar libro
        </a>
      </section>
    </div>
  );
}
