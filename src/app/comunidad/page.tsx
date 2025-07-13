import { FaUsers, FaMusic, FaTheaterMasks, FaPaintBrush, FaFilm, FaDumbbell, FaHandshake } from "react-icons/fa";
import AsociateTabs from "./AsociateTabs";
import SingleContribution from "./SingleContribution";
import { createClient } from "@/prismicio";
import { notFound } from "next/navigation";

export default async function CommunityPage() {
  const client = createClient();
  const mp_links = await client.getAllByType("mp_link").catch(() => notFound());
  // Ordenar por Importe ASC
  mp_links.sort((a, b) => {
    const importeA = Number(a.data.importe);
    const importeB = Number(b.data.importe);
    return importeA - importeB;
  });

  // Separar por tipo
  const mensualOptions = mp_links
    .filter((link) => link.data.tipo === "Mensual")
    .map((link) => ({
      price: `$${Number(link.data.importe).toLocaleString()}`,
      color: "primary",
      tipo: link.data.tipo,
      url: link.data.link?.text || "#"
    }));
  const anualOptions = mp_links
    .filter((link) => link.data.tipo === "Anual")
    .map((link) => ({
      price: `$${Number(link.data.importe).toLocaleString()}`,
      color: "primary",
      tipo: link.data.tipo,
      url: link.data.link?.text || "#"
    }));
  const unicavezOptions = mp_links
    .filter((link) => link.data.tipo === "Unica")
    .map((link) => ({
      price: `$${Number(link.data.importe).toLocaleString()}`,
      color: "primary",
      tipo: link.data.tipo,
      url: link.data.link?.text || "#"
    }));

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
            <section className="mb-4">
              <h3 className="h6 fw-bold mb-3">CATEGORÍAS CULTURALES</h3>
              <div className="d-flex flex-wrap gap-2">
                <span className="badge rounded-pill bg-danger bg-opacity-25 border border-danger text-danger px-3 py-2 d-flex align-items-center"><FaTheaterMasks className="me-2" />Teatro</span>
                <span className="badge rounded-pill bg-info bg-opacity-25 border border-info text-info px-3 py-2 d-flex align-items-center"><FaMusic className="me-2" />Música</span>
                <span className="badge rounded-pill bg-primary bg-opacity-25 border border-primary text-primary px-3 py-2 d-flex align-items-center"><FaPaintBrush className="me-2" />Arte</span>
                <span className="badge rounded-pill bg-warning bg-opacity-25 border border-warning text-warning px-3 py-2 d-flex align-items-center"><FaDumbbell className="me-2" />Danza</span>
                <span className="badge rounded-pill bg-purple bg-opacity-25 border border-purple text-purple px-3 py-2 d-flex align-items-center"><FaFilm className="me-2" />Cine</span>
              </div>
            </section>
          </div>
          <div className="col-lg-6">
            <div className="card shadow-lg border-primary h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <h3 className="h5 text-center text-info mb-4">ASOCIATE</h3>
                <AsociateTabs mensualOptions={mensualOptions} anualOptions={anualOptions} />
                <SingleContribution unicavezOptions={unicavezOptions} />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Cultural Showcase Section */}
      {/*
      <section className="bg-dark border-top border-primary py-5">
        <div className="container">
          <h3 className="text-center text-info mb-5 display-6">NUESTRO UNIVERSO CULTURAL</h3>
          <div className="row justify-content-center g-4">
            {[
              { name: 'TEATRO', color: 'danger', icon: <FaTheaterMasks /> },
              { name: 'MÚSICA', color: 'info', icon: <FaMusic /> },
              { name: 'ARTE', color: 'primary', icon: <FaPaintBrush /> },
              { name: 'DANZA', color: 'warning', icon: <FaDumbbell /> },
              { name: 'CINE', color: 'purple', icon: <FaFilm /> },
              { name: 'CULTURA', color: 'secondary', icon: <FaUsers /> },
              { name: 'EVENTOS', color: 'pink', icon: <FaHandshake /> }
            ].map((category, index) => (
              <div key={index} className="col-6 col-md-3 col-lg-2 d-flex justify-content-center">
                <div className={`d-flex flex-column align-items-center justify-content-center rounded-4 border border-${category.color} bg-${category.color} bg-opacity-10 p-3 w-100`} style={{ minWidth: 100, minHeight: 100 }}>
                  <span className="fs-2 mb-1">{category.icon}</span>
                  <span className={`fw-bold text-${category.color} text-center`}>{category.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}
    </main>
  );
}