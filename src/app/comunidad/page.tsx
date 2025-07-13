import { FaUsers, FaMusic, FaTheaterMasks, FaPaintBrush, FaFilm, FaDumbbell, FaHandshake } from "react-icons/fa";
import AsociateTabs from "./AsociateTabs";
import SingleContribution from "./SingleContribution";

export default function CommunityPage() {
  return (
    <main className="bg-dark text-white min-vh-100 position-relative overflow-hidden">
      {/* Hero Section */}
      <section className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <header className="mb-4">
              <h1 className="display-3 fw-bold mb-2">
                <span className="text-primary">ÚNETE AL CIRCUITO</span><br />
                <span className="text-info">CULTURAL</span>
              </h1>
              <h2 className="h4 text-secondary mb-3">
                MÁS GRANDE DE <span className="fw-semibold text-warning">LATINOAMÉRICA</span>
              </h2>
            </header>
            <section className="mb-4">
              <p className="lead mb-2">
                <FaHandshake className="me-2 text-info" />
                Este 2025 en <span className="fw-semibold text-info">JJ Circuito Cultural</span> nos la jugamos con un tremendo estudio nuevo y una programación de contenidos a la cultura de nuestra Comunidad.
              </p>
              <p className="mb-2">
                <FaUsers className="me-2 text-warning" />
                Necesitamos <span className="fw-bold text-warning">10 mil socios nuevos</span> para consolidar este crecimiento.
              </p>
              <p className="mb-2">
                Nos da orgullo ser un medio independiente bancado por sus socios y por eso te invitamos a ser parte.
              </p>
              <p className="h5 fw-bold text-info mb-4">
                ¡Asociate a JJ Circuito Cultural!
              </p>
            </section>
          </div>
          <div className="col-lg-6">
            <div className="card shadow-lg border-primary h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <h3 className="h5 text-center text-info mb-4">ASOCIATE</h3>
                <AsociateTabs />
                <SingleContribution />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}