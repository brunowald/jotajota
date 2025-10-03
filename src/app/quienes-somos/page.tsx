import Image from "next/image";
import styles from "./quienes-somos.module.scss";
import PageTitle from "../components/PageTitle";
import { useMemo } from "react";

// Función para importar automáticamente todas las imágenes de la carpeta
const useGalleryImages = () => {
  return useMemo(() => {
    // Usar require.context para obtener todos los archivos de imagen automáticamente
    function importAll(r: { keys(): string[]; (id: string): unknown }) {
      const images: { src: string; alt: string }[] = [];
      r.keys().forEach((item: string) => {
        const imageName = item.replace('./', '');
        const displayName = imageName.replace(/\.(jpeg|jpg|png|gif)$/i, '').replace('quienes-somos-', '');
        const moduleExport = r(item) as { default?: string } | string;
        const src = typeof moduleExport === 'string' ? moduleExport : (moduleExport.default || '');
        images.push({
          src,
          alt: `JJ Circuito Cultural - ${displayName}`
        });
      });
      // Ordenar por nombre para mantener consistencia
      return images.sort((a, b) => a.alt.localeCompare(b.alt));
    }

    try {
      // Importar automáticamente todos los archivos de imagen de la carpeta
      // @ts-expect-error - require.context es una función específica de webpack
      const context = require.context('./imagenes', false, /\.(png|jpe?g|gif)$/i);
      const allImages = importAll(context);
      
      // Ajustar para que sea divisible por 3
      const divisibleBy3 = Math.floor(allImages.length / 3) * 3;
      return allImages.slice(0, divisibleBy3);
    } catch (error) {
      console.warn('No se pudieron cargar las imágenes automáticamente:', error);
      return [];
    }
  }, []);
};

export default function QuienesSomosPage() {
  const images = useGalleryImages();
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

                {/* Galería de imágenes con lazy loading */}
                <section className="mb-5">
                    <div className="row g-3">
                        {images.map((image, index) => (
                            <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                                <div className={`${styles.imageContainer} position-relative overflow-hidden rounded shadow-sm`}>
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        loading="lazy"
                                        className={`${styles.galleryImage} object-fit-cover`}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        placeholder="blur"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

        </div>
    </div>
  );
}