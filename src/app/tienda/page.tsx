import Image from "next/image";
import image from "./libro.jpg";
import FoodStore from "./FoodStore";

export default function TiendaPage() {
  return (
    <div className="container py-4">
      {/* ── Tienda de comidas ── */}
      <FoodStore />

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
