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
      <section className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 mt-0">
            <header className="mb-4">
              <h1 className="display-3 fw-bold mb-2 text-white">
                SUMATE A LA{" "}
                <span className="text-info">COMUNIDAD</span>{" "}
                <span className="text-primary">JJ</span>
              </h1>
            </header>
            <section className="mb-4">
              <p className="mb-2">
                JJ Circuito Cultural es más que un espacio físico: es una propuesta político cultural comunitaria. Es una forma de ver y habitar el mundo. A contracorriente de las lógicas que nos gobiernan, queremos hacer de nuestro centro cultural una casa para todxs: trabajadorxs de nuestro espacio, artistas que vienen de afuera, vecinos, docentes, militantes barriales, entre tantos otros.
              </p>
              <p className="mb-3">
                JJ quiere ser un esfuerzo para repensar, inventar y crear lazos solidarios y comunitarios para que podamos vivir mejor en nuestra ciudad. Vos seguro ya sos parte de la comunidad de JJ y por eso leíste hasta acá. Ahora queremos pedirte -siempre algo pedimos- un aporte que nos va a servir para sobrevivir, sostener lo que hacemos y, lo más importante, crear cosas nuevas.
              </p>
              <p className="mb-3">
                En estos momentos complejos, necesitamos más que nunca de la comunidad que en estos años de historia construimos. Así, vamos a poder sostener los talleres artísticos para infancias "Jota Jotita", los ciclos de cine, las propuestas de la Biblioteca Mañana de Sol, la programación musical, los cortes de calle, los festivales, entre algunas de las cosas que programamos de lunes a lunes, de enero a diciembre.
              </p>
              <p className="mb-2">
                <span className="fw-bold text-info">
                  Ya sos parte de la comunidad de JJ. Haciendo un aporte económico mensual ayudás a que esta comunidad que integramos pueda seguir creciendo y existiendo.
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
