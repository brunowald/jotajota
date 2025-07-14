import Link from "next/link";

import { createClient } from "@/prismicio";
import { PrismicImage, PrismicRichText } from "@prismicio/react";
import type { ImageField, RichTextField } from "@prismicio/client";

import styles from "./eventos.module.scss";
import PageTitle from "../components/PageTitle";

// Tipar el evento según el modelo de Prismic
interface EventDoc {
  id: string;
  data: {
    title?: string;
    image?: ImageField;
    descripcion?: RichTextField;
    day?: string;
    hour?: string;
    hour_end?: string;
    categoria?: string;
    more?: { url?: string };
  };
}

type GroupedEvents = Record<string, EventDoc[]>;

function parseLocalDate(dateString?: string, timeString?: string): Date | null {
  if (!dateString) return null;
  const [year, month, day] = dateString.split("-").map(Number);
  let date;
  if (timeString) {
    // Accepts formats like "18:00" or "18:00:00"
    const [hour, minute, second] = timeString.split(":").map(Number);
    date = new Date(Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0));
  } else {
    date = new Date(Date.UTC(year, month - 1, day));
  }
  // Convert to Argentina time (UTC-3)
  date.setHours(date.getHours() - 3);
  return date;
}

function formatTimeRange(hour?: string, hourEnd?: string): string {
  if (!hour) return "";
  if (!hourEnd) return `${hour}hs`;
  return `Inicio ${hour}hs - Fin ${hourEnd}hs`;
}

function groupByDay(events: EventDoc[]): GroupedEvents {
  const groups: GroupedEvents = {};
  for (const event of events) {
    const dateObj = parseLocalDate(event.data.day);
    const day = dateObj
      ? dateObj.toLocaleDateString("es-AR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Sin fecha";
    if (!groups[day]) groups[day] = [];
    groups[day].push(event);
  }
  return groups;
}

export default async function EventosPage() {
  const client = createClient();
  const events = (await client.getAllByType("events", { fetchOptions: { cache: "no-store" } })) as EventDoc[];

  // Filtrar eventos futuros (hoy en adelante)
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Resetear a inicio del día
  
  const futureEvents = events.filter(event => {
    if (!event.data.day) return false; // Excluir eventos sin fecha
    const eventDate = parseLocalDate(event.data.day);
    if (!eventDate) return false;
    return eventDate >= today;
  });

  // Agrupar por día y ordenar días descendente
  const grouped = groupByDay(futureEvents);
  const sortedDays = Object.keys(grouped).sort((a, b) => {
    if (a === "Sin fecha") return 1;
    if (b === "Sin fecha") return -1;
    // Parsear fechas para comparar correctamente
    const dateA = a !== "Sin fecha" ? Date.parse(a) : 0;
    const dateB = b !== "Sin fecha" ? Date.parse(b) : 0;
    return dateA - dateB; // Most recent first (descending)
  }).reverse();

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-12 text-center">
            <PageTitle>Eventos</PageTitle>
          </div>
        </div>
        {sortedDays.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "1.2rem", color: "var(--bs-text-muted)" }}>
            No hay eventos programados próximamente.
          </p>
        ) : (
          sortedDays.map((day) => (
            <section key={day} style={{ marginBottom: 48 }}>
              <h2 style={{
                fontSize: "1.3rem",
                fontWeight: 700,
                margin: "32px 0 24px 0",
                textTransform: "uppercase",
                color: "var(--bs-primary)"
              }}>{day}</h2>
              <div className={styles.grid}>
                {grouped[day].map((event, idx) => (
                  <div className={styles.card} key={event.id || idx}>
                    <div className={styles.imageWrapper}>
                      <PrismicImage field={event.data.image} className={styles.image} />
                    </div>
                    <div className={styles.content}>
                      {event.data.categoria && (
                        <span className={styles.category}>{event.data.categoria}</span>
                      )}
                      <h2 className={styles.title}>{event.data.title}</h2>
                      {event.data.hour && (
                        <p className={styles.time}>
                          {formatTimeRange(event.data.hour, event.data.hour_end)}
                        </p>
                      )}
                      {event.data.descripcion && (
                        <PrismicRichText field={event.data.descripcion} components={{
                          paragraph: ({ children }) => <p className={styles.desc}>{children}</p>
                        }} />
                      )}
                      {event.data.more?.url ? (
                        <Link
                          href={event.data.more.url}
                          className={styles.button}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Más info
                        </Link>
                      ) : (
                        <button className={`${styles.button} ${styles.buttonDisabled}`} disabled>
                          Más info
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}