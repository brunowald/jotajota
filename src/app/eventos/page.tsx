import { createClient } from "@/prismicio";
import type { ImageField, RichTextField } from "@prismicio/client";
import EventList from "./EventList";

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

export default async function EventosPage() {
  const client = createClient();
  const events = (await client.getAllByType("events", { fetchOptions: { cache: "no-store" } })) as EventDoc[];

  return (
    <div className="container">
      <EventList events={events} />
    </div>
  );
}