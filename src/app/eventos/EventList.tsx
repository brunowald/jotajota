/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { PrismicImage, PrismicRichText } from "@prismicio/react";
import styles from "./eventos.module.scss";
import PageTitle from "../components/PageTitle";

// Tipar el evento según el modelo de Prismic
interface EventDoc {
  id: string;
  data: {
    title?: string;
    image?: any;
    descripcion?: any;
    day?: string;
    hour?: string;
    hour_end?: string;
    categoria?: string;
    more?: { url?: string };
  };
}

function parseLocalDate(dateString?: string, timeString?: string): Date | null {
  if (!dateString) return null;
  const [year, month, day] = dateString.split("-").map(Number);
  let date;
  if (timeString) {
    const [hour, minute, second] = timeString.split(":").map(Number);
    date = new Date(Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0));
  } else {
    date = new Date(Date.UTC(year, month - 1, day));
  }
  date.setHours(date.getHours() - 3); // Argentina time
  return date;
}

// Algunos cargan la hora como "20 hs", así que sacamos el sufijo antes de agregarlo
function cleanHour(hour: string): string {
  return hour.replace(/\s*hs\.?\s*$/i, "").trim();
}

function formatTimeRange(hour?: string, hourEnd?: string): string {
  if (!hour) return "";
  if (!hourEnd) return `${cleanHour(hour)}hs`;
  return `Inicio ${cleanHour(hour)}hs - Fin ${cleanHour(hourEnd)}hs`;
}

function hourValue(hour?: string): number {
  const n = parseFloat((hour || "").replace(":", "."));
  return isNaN(n) ? 0 : n;
}

function groupByMonth(events: EventDoc[]): { month: string; events: EventDoc[] }[] {
  const sorted = [...events].sort(
    (a, b) =>
      (a.data.day || "").localeCompare(b.data.day || "") ||
      hourValue(a.data.hour) - hourValue(b.data.hour)
  );
  const months: { month: string; events: EventDoc[] }[] = [];
  for (const event of sorted) {
    const dateObj = parseLocalDate(event.data.day);
    const month = dateObj
      ? dateObj.toLocaleDateString("es-AR", { month: "long", year: "numeric" })
      : "Sin fecha";
    const last = months[months.length - 1];
    if (last && last.month === month) last.events.push(event);
    else months.push({ month, events: [event] });
  }
  return months;
}

function dateParts(day?: string) {
  const date = parseLocalDate(day);
  if (!date) return null;
  return {
    weekdayLong: date.toLocaleDateString("es-AR", { weekday: "long" }),
    day: date.getDate(),
    month: date.toLocaleDateString("es-AR", { month: "short" }).replace(".", ""),
  };
}

export default function EventList({ events }: { events: EventDoc[] }) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const months = useMemo(() => {
    const futureEvents = events.filter(event => {
      if (!event.data.day) return false;
      const eventDate = parseLocalDate(event.data.day);
      if (!eventDate) return false;
      return eventDate >= today;
    });
    return groupByMonth(futureEvents);
  }, [events, today]);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [flyer, setFlyer] = useState<EventDoc | null>(null);

  const openFlyer = (event: EventDoc) => {
    setFlyer(event);
    dialogRef.current?.showModal();
  };

  return (
    <div>
      <div className="row justify-content-center mb-5">
        <div className="col-12 text-center">
          <PageTitle>Eventos</PageTitle>
        </div>
      </div>
      {months.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "1.2rem", color: "var(--bs-text-muted)" }}>
          No hay eventos programados próximamente.
        </p>
      ) : (
        months.map(({ month, events }) => (
          <section key={month} className={styles.month}>
            <h2 className={styles.monthTitle}>{month}</h2>
            <div className={styles.grid}>
              {events.map((event, idx) => {
                const date = dateParts(event.data.day);
                const time = formatTimeRange(event.data.hour, event.data.hour_end);
                return (
                  <article className={styles.card} key={event.id || idx}>
                    <button
                      type="button"
                      className={styles.imageWrapper}
                      onClick={() => openFlyer(event)}
                      aria-label={`Ver flyer de ${event.data.title || "evento"}`}
                    >
                      <PrismicImage field={event.data.image} className={styles.imageBlur} alt="" aria-hidden />
                      <PrismicImage field={event.data.image} className={styles.image} />
                    </button>
                    <div className={styles.content}>
                      {date && (
                        <p className={styles.dateLine}>
                          {date.weekdayLong} {date.day} {date.month}
                          {event.data.hour && (
                            <span className={styles.dateTime}> · {formatTimeRange(event.data.hour)}</span>
                          )}
                        </p>
                      )}
                      {event.data.categoria && (
                        <span className={styles.category}>{event.data.categoria}</span>
                      )}
                      <h3 className={styles.title}>{event.data.title}</h3>
                      {time && <p className={styles.time}>{time}</p>}
                      {event.data.descripcion && (
                        <PrismicRichText field={event.data.descripcion} components={{
                          paragraph: ({ children }) => <p className={styles.desc}>{children}</p>
                        }} />
                      )}
                      {event.data.more?.url && (
                        <Link
                          href={event.data.more.url}
                          className={styles.button}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Más info
                        </Link>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))
      )}
      <dialog
        ref={dialogRef}
        className={styles.flyerDialog}
        onClick={() => dialogRef.current?.close()}
        onClose={() => setFlyer(null)}
      >
        {flyer && <PrismicImage field={flyer.data.image} className={styles.flyerImage} />}
      </dialog>
    </div>
  );
}
