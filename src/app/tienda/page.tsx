import { FaStore, FaTicketAlt, FaUsers } from "react-icons/fa";

export default function TiendaPage() {
  return (
    <main className="bg-dark text-white min-vh-100 position-relative overflow-hidden py-5">
      <div className="container py-4 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "60vh" }}>
        <div className="card shadow-lg border-primary mb-4 bg-dark text-white" style={{ maxWidth: 800, width: "100%" }}>
          <div className="card-body text-center">
            <FaStore className="display-3 mb-3 text-primary" />
            <h1 className="display-5 fw-bold mb-3 text-info">Tienda Online</h1>
            <p className="lead mb-3">
              Estamos trabajando para abrir muy pronto nuestra tienda online.<br />
              En breve vas a poder encontrar <FaTicketAlt className="text-warning mx-1" /> entradas para eventos especiales, como el tradicional Locrazo del Día Patrio, además de otras propuestas culturales, productos y actividades que forman parte del espíritu del JJ.
            </p>
            <div className="alert alert-info fs-5 mb-3">
              ¡Gracias por tu paciencia y por ser parte de esta comunidad! <FaUsers className="ms-2 text-info" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
