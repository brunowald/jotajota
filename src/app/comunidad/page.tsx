export const dynamic = "force-dynamic";

import AsociateTabs from "./AsociateTabs";
import SingleContribution from "./SingleContribution";
import { createClient } from "@/prismicio";
import { notFound } from "next/navigation";

export default async function CommunityPage() {
  const client = createClient();
  const mp_links = await client
    .getAllByType("mp_link", { fetchOptions: { cache: "no-store" } })
    .catch(() => notFound());
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
      url: link.data.link?.text || "#",
    }));
  const anualOptions = mp_links
    .filter((link) => link.data.tipo === "Anual")
    .map((link) => ({
      price: `$${Number(link.data.importe).toLocaleString()}`,
      color: "primary",
      tipo: link.data.tipo,
      url: link.data.link?.text || "#",
    }));
  const unicavezOptions = mp_links
    .filter((link) => link.data.tipo === "Unica")
    .map((link) => ({
      price: `$${Number(link.data.importe).toLocaleString()}`,
      color: "primary",
      tipo: link.data.tipo,
      url: link.data.link?.text || "#",
    }));

  return (
    <div>
      {/* Hero Section */}
      <section className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <header className="mb-4">
              <h1 className="display-3 fw-bold mb-2 text-white">
                SUMATE AL{" "}
                <span className="text-primary">CIRCUITO CULTURAL </span>
                <span className="text-info">JJ</span>
              </h1>
            </header>
            <section className="mb-4">
              <p className="lead mb-2">
                JJ Circuito Cultural es un espacio independiente y autogestivo
                que, desde el barrio de Balvanera, banca una programación
                diversa, comprometida y bien plantada en el arte y la cultura.
              </p>
              <p className="mb-3">
                Con tu aporte mensual colaborás con los gastos del día a día y
                hacés posible que sigamos generando ciclos, talleres,
                residencias, exposiciones y encuentros que hacen del JJ un
                espacio vivo y necesario.
              </p>
              <p className="mb-2">
                Creemos en la autogestión, en lo colectivo y en la cultura como
                trinchera.
                <br />
                <span className="fw-bold text-info">
                  Sumate, compartí, apoyá. El JJ también es tuyo.
                </span>
              </p>
            </section>
          </div>
          <div className="col-lg-6">
            <div className="card shadow-lg border-primary h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <h3 className="h5 text-center text-info mb-4">ASOCIATE</h3>
                <AsociateTabs
                  mensualOptions={mensualOptions}
                  anualOptions={anualOptions}
                />
                <SingleContribution unicavezOptions={unicavezOptions} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
