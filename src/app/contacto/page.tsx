import Image from "next/image";
import LogoBiblioteca from "./Logo_biblioteca_transparente.png";
import { FaMapMarkerAlt, FaPhoneAlt, FaInstagram, FaEnvelope, FaPaintBrush, FaFire, FaUtensils, FaBirthdayCake, FaCalendarPlus } from "react-icons/fa";
import { FaTicketSimple } from "react-icons/fa6";
import styles from "./contacto.module.scss";
import PageTitle from "../components/PageTitle";

export default function ContactoPage() {
  return (
    <div>
        <div className="container">
            <div className="row justify-content-center mb-5">
                <div className="col-12 text-center">
                    <PageTitle>Contacto</PageTitle>
                </div>
            </div>

            <div className="row g-4 align-items-stretch">
                <div className="col-lg-6">
                    <div className={styles["contact-card"] + " h-100"}>
                        <div className={styles["contact-header"]}>
                            <h2 className={styles["contact-title"]}>JJ Circuito Cultural</h2>
                            <div className={styles["pulse-dot"]}></div>
                        </div>
                        
                        <div className={styles["contact-info"]}>
                            <a
                              className={styles["contact-item"]}
                              data-aos="fade-up"
                              data-aos-delay="100"
                              href="https://maps.google.com/?q=Jean+Jaurés+347,+CABA,+Buenos+Aires,+Argentina"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ textDecoration: 'none' }}
                            >
                              <div className={styles["contact-icon"]}>
                                <FaMapMarkerAlt color="#fff" />
                              </div>
                              <div className={styles["contact-details"]}>
                                <h5>Dirección</h5>
                                <p>Jean Jaurés 347, CABA, Buenos Aires, Argentina</p>
                              </div>
                            </a>

                            <a
                              className={styles["contact-item"]}
                              data-aos="fade-up"
                              data-aos-delay="200"
                              href="tel:+541149613547"
                              style={{ textDecoration: 'none' }}
                            >
                              <div className={styles["contact-icon"]}>
                                <FaPhoneAlt color="#fff" />
                              </div>
                              <div className={styles["contact-details"]}>
                                <h5>Teléfono</h5>
                                <p>+54 11 4961-3547</p>
                              </div>
                            </a>

                            <a
                              className={styles["contact-item"]}
                              data-aos="fade-up"
                              data-aos-delay="300"
                              href="https://instagram.com/jjcircuitocultural"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ textDecoration: 'none' }}
                            >
                              <div className={styles["contact-icon"]}>
                                <FaInstagram color="#fff" />
                              </div>
                              <div className={styles["contact-details"]}>
                                <h5>Instagram</h5>
                                <p>@jjcircuitocultural</p>
                              </div>
                            </a>

                            <a
                              className={styles["contact-item"]}
                              data-aos="fade-up"
                              data-aos-delay="400"
                              href="mailto:info@jjcircuitocultural.com.ar"
                              style={{ textDecoration: 'none' }}
                            >
                              <div className={styles["contact-icon"]}>
                                <FaEnvelope color="#fff" />
                              </div>
                              <div className={styles["contact-details"]}>
                                <h5>Email</h5>
                                <p>info@jjcircuitocultural.com.ar</p>
                              </div>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className={styles["map-container"] + " h-100"} data-aos="fade-left" data-aos-delay="500">
                        <div className={styles["map-overlay"]}>
                            <div className={styles["map-info"]}>
                                <h4>Encontranos</h4>
                                <p>Jean Jaurés 347, Buenos Aires</p>
                            </div>
                        </div>
                        <iframe 
                            src="https://www.google.com/maps?q=Jean+Jaur%C3%A9S+347,+CABA,+Buenos+Aires,+Argentina&output=embed"
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Ubicación de JJ Circuito Cultural en Google Maps"
                        />
                    </div>
                </div>
            </div>

            <div className="row justify-content-center mt-5">
                <div className="col-lg-10">
                    <div className={styles["links-section"]} data-aos="fade-up" data-aos-delay="600">
                        <h3 className={styles["links-title"] + " text-center mb-5"}>Enlaces Importantes</h3>
                        <div className="row g-4">
                            <div className="col-md-12">
                                <div className={styles["link-card"]}>
                                    <div className="bg-light rounded">
                                        <Image src={LogoBiblioteca} alt="Logo Biblioteca" style={{ width: 60, height: 60, objectFit: 'contain' }} />
                                    </div>
                                    <div className={styles["link-content"]}>
                                        <h5>Biblioteca Popular MD&S</h5>
                                        <p>Descubrí la biblioteca y sus actividades</p>
                                        <a href="https://www.instagram.com/bibliomds/?hl=en" target="_blank" rel="noopener noreferrer" className={styles["link-btn"]}>Instagram</a>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-md-12">
                                <div className={styles["link-card"] + " " + styles["workshop-card"]}>
                                    <div className={styles["link-icon"]}><FaPaintBrush /></div>
                                    <div className={styles["link-content"]}>
                                        <h5>Jota Jotita 2025- Talleres de Arte</h5>
                                        <p>Inscribite a los talleres</p>
                                        <a href="https://forms.gle/mxh7rrCtuDkcicdv6" target="_blank" rel="noopener noreferrer" className={styles["link-btn"]}>Inscribirse</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className={styles["link-card"] + " " + styles["featured-card"]}>
                                    <div className={styles["link-icon"]}><FaFire /></div>
                                    <div className={styles["link-content"]}>
                                        <h5>🔥 PEÑA SOMBRA BLANCA 🔥</h5>
                                        <p>Todos los miércoles 20-03hs (a contribución consciente)</p>
                                        <a href="http://wa.me/+5491158556584" target="_blank" rel="noopener noreferrer" className={styles["link-btn"] + " featured-btn"}>¡Hacé tu reserva!</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={styles["link-card"] + " " + styles["party-card"]}>
                                    <div className={styles["link-icon"]}><FaBirthdayCake /></div>
                                    <div className={styles["link-content"]}>
                                        <h5>🎉 ARMA TU FIESTA EN JJ</h5>
                                        <p>Organizá tu fiesta en JJ</p>
                                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSfpC7ZTbLVb5sNHNk4lpV6uplL9C-fQOJdxbumdR1AX8v7AZA/viewform?usp=dialog" target="_blank" rel="noopener noreferrer" className={styles["link-btn"]}>Consultar</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={styles["link-card"] + " " + styles["event-card"]}>
                                    <div className={styles["link-icon"]}><FaCalendarPlus /></div>
                                    <div className={styles["link-content"]}>
                                        <h5>📅 Organizá tu evento en JJ</h5>
                                        <p>Reservá tu espacio</p>
                                        <a href="https://forms.gle/dnaD7F3imnsP8UXX6" target="_blank" rel="noopener noreferrer" className={styles["link-btn"]}>Reservar</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={styles["link-card"] + " " + styles["tickets-card"]}>
                                    <div className={styles["link-icon"]}><FaTicketSimple /></div>
                                    <div className={styles["link-content"]}>
                                        <h5>Tickets para Eventos</h5>
                                        <p>Comprá tus entradas online</p>
                                        <a href="https://www.passline.com/productora/jj-circuito-cultural?srsltid=AfmBOoqRwzBou_Krjh_MIVXIHs57-73kqp88bJ63Q8nq89xVrfyhnQu4" target="_blank" rel="noopener noreferrer" className={styles["link-btn"]}>Comprar</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={styles["link-card"] + " " + styles["menu-card"]}>
                                    <div className={styles["link-icon"]}><FaUtensils /></div>
                                    <div className={styles["link-content"]}>
                                        <h5>🍕 🥟 Carta de precios 🍻 🍹</h5>
                                        <p>Conocé nuestra oferta gastronómica</p>
                                        <a href="http://bit.ly/cartadepreciosjj" target="_blank" rel="noopener noreferrer" className={styles["link-btn"]}>Ver carta</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
