import Image from "next/image";
import LogoBiblioteca from "./Logo_biblioteca_transparente.png";
import { FaMapMarkerAlt, FaInstagram, FaEnvelope, FaPaintBrush, FaFire, FaUtensils, FaBirthdayCake, FaCalendarPlus } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { FaTicketSimple } from "react-icons/fa6";
import styles from "./quienes-somos.module.scss";
import PageTitle from "../components/PageTitle";
import { useMemo } from "react";

// Función para importar automáticamente todas las imágenes de la carpeta
const useGalleryImages = () => {
  return useMemo(() => {
    // Usar require.context para obtener todos los archivos de imagen automáticamente
    function importAll(r: any) {
      let images: { src: any; alt: string }[] = [];
      r.keys().forEach((item: string) => {
        const imageName = item.replace('./', '');
        const displayName = imageName.replace(/\.(jpeg|jpg|png|gif)$/i, '').replace('quienes-somos-', '');
        images.push({
          src: r(item).default || r(item),
          alt: `JJ Circuito Cultural - ${displayName}`
        });
      });
      // Ordenar por nombre para mantener consistencia
      return images.sort((a, b) => a.alt.localeCompare(b.alt));
    }

    try {
      // Importar automáticamente todos los archivos de imagen de la carpeta
      // @ts-ignore - require.context es una función específica de webpack
      const context = require.context('./imagenes', false, /\.(png|jpe?g|gif)$/i);
      return importAll(context);
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
