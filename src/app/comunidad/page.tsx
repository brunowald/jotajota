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
              <h1 className="display-3 fw-bold mb-2 text-white">SUMATE AL <span className="text-primary">CIRCUITO CULTURAL </span><span className="text-info">JJ</span></h1>
            </header>
            <section className="mb-4">
              <p className="lead mb-2">
                JJ Circuito Cultural es un espacio independiente y autogestivo que, desde el barrio de Balvanera, banca una programación diversa, comprometida y bien plantada en el arte y la cultura.
              </p>
              <p className="mb-3">
                Este 2025 redoblamos la apuesta: abrimos un nuevo estudio y seguimos armando contenidos que nacen de la fuerza de nuestra comunidad.<br/>
                Pero para que todo esto siga creciendo, necesitamos sumar <span className="fw-bold text-warning">10 mil nuevas personas asociadas</span> que nos ayuden a sostener el proyecto.
              </p>
              <p className="mb-3">
                Con tu aporte mensual colaborás con los gastos del día a día y hacés posible que sigamos generando ciclos, talleres, residencias, exposiciones y encuentros que hacen del JJ un espacio vivo y necesario.
              </p>
              <p className="mb-2">
                Creemos en la autogestión, en lo colectivo y en la cultura como trinchera.<br/>
                <span className="fw-bold text-info">Sumate, compartí, apoyá. El JJ también es tuyo.</span>
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