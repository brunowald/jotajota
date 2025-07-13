import { createClient } from "@/prismicio";
import { PrismicImage, PrismicRichText } from "@prismicio/react";
import Link from "next/link";
import styles from "./eventos.module.css";

export default async function EventosPage() {
  const client = createClient();
  const events = await client.getAllByType("events");

  return (
    <main className={styles.bg}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Eventos</h1>
        <div className={styles.grid}>
          {events.map((event, idx) => (
            <div className={styles.card} key={event.id || idx}>
              <div className={styles.imageWrapper}>
                <PrismicImage field={event.data.image} className={styles.image} />
              </div>
              <div className={styles.content}>
                <h2 className={styles.title}>{event.data.title}</h2>
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
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 