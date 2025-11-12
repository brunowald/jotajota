import { FaStore } from "react-icons/fa";
import Image from "next/image";
import image from "./libro.jpg";

export default function TiendaPage() {
  return (
    <div>
      <div className="container py-4 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "60vh" }}>
        <div className="card shadow-lg border-primary mb-4 bg-dark text-white" style={{ maxWidth: 800, width: "100%" }}>
          <div className="card-body text-center">
            <FaStore className="display-3 mb-3 text-primary" />
            <h1 className="display-5 fw-bold mb-3 text-info">Tienda Online</h1>
            {/* <p className="lead mb-3">
              Estamos trabajando para abrir muy pronto nuestra tienda online.<br />
              En breve vas a poder encontrar <FaTicketAlt className="text-warning mx-1" /> entradas para eventos especiales, como el tradicional Locrazo de los días patrios 🇦🇷, además de otras propuestas culturales, productos y actividades que forman parte del espíritu del JJ.
            </p>
            <div className="alert alert-primary fs-5 mb-3">
              ¡Gracias por tu paciencia y por ser parte de esta comunidad! <FaUsers className="ms-2 text-primary" />
            </div> */}
            {/* Libro section */}
            <h2 className="mt-3 mb-2 fw-bold text-light">Breve Historia de lo Imperceptible</h2>
            <p className="mb-3 text-secondary">7 perspectivas sobre la realidad asombrosa. Conversaciones con Sebastián Scolnik.</p>
            <div className="mb-3">
              <Image
                src={image}
                alt="Breve Historia de lo Imperceptible"
                width={300}
                height={450}
                style={{ borderRadius: "12px", boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }}
                className="mb-4"
              />
              <br />
              <a
                href="https://docs.google.com/forms/d/1z_uIhGqrUok9FpAYCBRald8v3lSAOm2TKjOnRHB1-KE/edit"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success btn-lg"
              >
                Comprar libro
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
