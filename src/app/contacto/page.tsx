import { FaMapMarkerAlt, FaPhoneAlt, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function ContactoPage() {
  return (
    <main className="bg-dark text-white min-vh-100 position-relative overflow-hidden py-5">
      <div className="container py-4">
        <h1 className="display-4 fw-bold mb-4 text-center text-info">Contacto</h1>
        <div className="row justify-content-center g-5">
          <div className="col-lg-6">
            <div className="card shadow border-primary mb-4 bg-dark text-white">
              <div className="card-body">
                <h2 className="h5 fw-bold mb-3 text-primary">JJ Circuito Cultural</h2>
                <ul className="list-unstyled fs-5 mb-0">
                  <li className="mb-3 d-flex align-items-center">
                    <FaMapMarkerAlt className="me-2 text-danger" />
                    Dirección: Jean Jaurés 347, CABA, Buenos Aires, Argentina
                  </li>
                  <li className="mb-3 d-flex align-items-center">
                    <FaPhoneAlt className="me-2 text-info" />
                    <a href="tel:+541149613547" className="text-info text-decoration-none">+54 11 4961-3547</a>
                  </li>
                  <li className="mb-3 d-flex align-items-center">
                    <FaInstagram className="me-2 text-warning" />
                    <a href="https://instagram.com/jjcircuitocultural" target="_blank" rel="noopener noreferrer" className="text-warning text-decoration-none">@jjcircuitocultural</a>
                  </li>
                  <li className="mb-3 d-flex align-items-center">
                    <FaEnvelope className="me-2 text-success" />
                    <a href="mailto:info@jjcircuitocultural.com.ar" className="text-success text-decoration-none">info@jjcircuitocultural.com.ar</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="ratio ratio-16x9 shadow rounded border border-primary">
              <iframe
                src="https://www.google.com/maps?q=Jean+Jaur%C3%A9S+347,+CABA,+Buenos+Aires,+Argentina&output=embed"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="JJ Circuito Cultural Mapa"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
