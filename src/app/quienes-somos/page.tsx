import PageTitle from "../components/PageTitle";
import { createClient } from "@/prismicio";
import { notFound } from "next/navigation";
import GalleryImages from "./GalleryImages";

export default async function QuienesSomosPage() {
  const client = createClient();
  const paragraphs = await client
    .getAllByType("pharagraph_quienes_somos", { fetchOptions: { cache: "no-store" } })
    .catch(() => notFound());
  return (
    <div>
        <div className="container">
            <div className="row justify-content-center mb-5">
                <div className="col-12 text-center">
                    <PageTitle>¿Quiénes somos?</PageTitle>
                </div>
            </div>

            <div className="row g-4 align-items-stretch">
                <section className="mb-4">
                  {paragraphs
                  .sort((a, b) => {
                    const orderA = a?.data?.order ?? 0;
                    const orderB = b?.data?.order ?? 0;
                    return orderA - orderB;
                  })
                  .map((para, index) => (
                    <p key={index} className="mb-2">
                      {para.data.text}
                    </p>
                  ))}
                </section>

                {/* Galería de imágenes con lazy loading */}
                <GalleryImages />
            </div>

        </div>
    </div>
  );
}