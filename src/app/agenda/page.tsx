import { createClient } from "@/prismicio";
import { PrismicImage, PrismicRichText } from "@prismicio/react";
import Link from "next/link";

export default async function AgendaPage() {
  const client = createClient();
  const events = await client.getAllByType("events");

  // Group events by date (YYYY-MM-DD)
  const grouped = events.reduce((acc, event) => {
    const date = event.data.date?.split("T")[0] || "Sin fecha";
    if (!acc[date]) acc[date] = [];
    acc[date].push(event);
    return acc;
  }, {} as Record<string, any[]>);

  // Sort dates ascending
  const sortedDates = Object.keys(grouped).sort();

  return (
    <main className="bg-dark text-white min-vh-100 position-relative overflow-hidden py-5">
      <div className="container py-4">
        <h1 className="display-3 fw-bold mb-5 text-center text-info">Agenda</h1>
        {sortedDates.map(date => (
          <section key={date} className="mb-5">
            <h2 className="h4 fw-bold text-warning mb-4 border-bottom pb-2">
              {new Date(date).toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" })}
            </h2>
            <div className="row g-4">
              {grouped[date].map((event, idx) => (
                <div className="col-12 col-md-6 col-lg-4 d-flex" key={event.id || idx}>
                  <div className="card shadow-lg border-primary flex-fill h-100 bg-dark text-white">
                    <div className="ratio ratio-16x9 bg-secondary bg-opacity-10 rounded-top overflow-hidden">
                      <PrismicImage field={event.data.image} className="w-100 h-100 object-fit-cover" />
                    </div>
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <span className="badge bg-info mb-2 text-dark fw-bold fs-6">{event.data.category || "Evento"}</span>
                        <h3 className="h5 fw-bold text-primary mb-2">{event.data.title}</h3>
                        <div className="mb-2 text-warning fw-bold">
                          {event.data.time || ""}
                        </div>
                        {event.data.descripcion && (
                          <PrismicRichText field={event.data.descripcion} components={{
                            paragraph: ({ children }) => <p className="text-info mb-2 small">{children}</p>
                          }} />
                        )}
                      </div>
                      {event.data.link && (
                        <Link href={event.data.link} target="_blank" className="btn btn-success mt-2 fw-bold">
                          Comprar / Reservar
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
