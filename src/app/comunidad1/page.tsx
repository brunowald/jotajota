import { createClient } from "@/prismicio";
import { notFound } from "next/navigation";

export default async function Comunidad() {
  const client = createClient();

  const mp_links = await client.getAllByType("mp_link").catch(() => notFound());
  // Ordenar por Importe ASC
  mp_links.sort((a, b) => {
    const importeA = Number(a.data.importe);
    const importeB = Number(b.data.importe);
    return importeA - importeB;
  });

  return (
    <>
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          fontFamily: "sans-serif",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
          Apoyá nuestra comunidad
        </h1>

        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          {mp_links.map((link) => (
            <a
              key={link.id}
              href={link.data.link.text}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "#009EE3",
                color: "white",
                padding: "1rem 2rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              {link.data.texto}
              {link.data.tipo}
            </a>
          ))}
        </div>
      </main>
    </>
  );
}