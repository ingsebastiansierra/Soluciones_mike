import React from 'react';
import { Link } from 'react-router-dom';
import './AbogadoStyles.css';

const Abogado = () => {
  return (
    <div className="abogado-page">
      <header className="abogado-header">
        <div className="container">
          <div className="logo">
            <h1>González & Asociados</h1>
            <p>Bufete Jurídico</p>
          </div>
          <nav>
            <ul>
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#servicios">Servicios</a></li>
              <li><a href="#abogados">Abogados</a></li>
              <li><a href="#testimonios">Testimonios</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ul>
          </nav>
          <div className="menu-toggle">
            <i className="fas fa-bars"></i>
          </div>
        </div>
      </header>

      <section id="inicio" className="hero">
        <div className="container">
          <div className="hero-content">
            <h2>Expertos en Derecho a su Servicio</h2>
            <p>Ofrecemos asesoría legal personalizada con más de 20 años de experiencia en diferentes áreas del derecho.</p>
            <a href="#contacto" className="btn">Consulta Gratuita</a>
          </div>
        </div>
      </section>

      <section id="servicios" className="services">
        <div className="container">
          <h2 className="section-title">Nuestros Servicios</h2>
          <div className="services-grid">
            <div className="service-card">
              <i className="fas fa-balance-scale"></i>
              <h3>Derecho Civil</h3>
              <p>Contratos, responsabilidad civil, propiedad, sucesiones y derecho de familia.</p>
            </div>
            <div className="service-card">
              <i className="fas fa-briefcase"></i>
              <h3>Derecho Mercantil</h3>
              <p>Constitución de sociedades, contratos mercantiles y asesoría empresarial.</p>
            </div>
            <div className="service-card">
              <i className="fas fa-gavel"></i>
              <h3>Derecho Penal</h3>
              <p>Defensa en procesos penales, acusación particular y recursos.</p>
            </div>
            <div className="service-card">
              <i className="fas fa-building"></i>
              <h3>Derecho Inmobiliario</h3>
              <p>Compraventa, arrendamientos, hipotecas y urbanismo.</p>
            </div>
            <div className="service-card">
              <i className="fas fa-user-tie"></i>
              <h3>Derecho Laboral</h3>
              <p>Contratos, despidos, reclamaciones y negociación colectiva.</p>
            </div>
            <div className="service-card">
              <i className="fas fa-landmark"></i>
              <h3>Derecho Administrativo</h3>
              <p>Recursos administrativos, contratación pública y sanciones.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="abogados" className="lawyers">
        <div className="container">
          <h2 className="section-title">Nuestro Equipo</h2>
          <div className="lawyers-grid">
            <div className="lawyer-card">
              <div className="lawyer-img">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Abogado" />
              </div>
              <h3>Carlos González</h3>
              <p className="lawyer-specialty">Socio Fundador - Derecho Civil y Mercantil</p>
              <p>Más de 25 años de experiencia en asesoría legal a empresas y particulares.</p>
            </div>
            <div className="lawyer-card">
              <div className="lawyer-img">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Abogada" />
              </div>
              <h3>Laura Martínez</h3>
              <p className="lawyer-specialty">Socia - Derecho Penal</p>
              <p>Especialista en derecho penal económico y defensa en procesos penales complejos.</p>
            </div>
            <div className="lawyer-card">
              <div className="lawyer-img">
                <img src="https://randomuser.me/api/portraits/men/67.jpg" alt="Abogado" />
              </div>
              <h3>Miguel Rodríguez</h3>
              <p className="lawyer-specialty">Socio - Derecho Laboral</p>
              <p>Experto en negociación colectiva y resolución de conflictos laborales.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonios" className="testimonials">
        <div className="container">
          <h2 className="section-title">Testimonios</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Excelente servicio y asesoramiento. Resolvieron mi caso con profesionalidad y eficacia. Totalmente recomendable."</p>
              </div>
              <div className="testimonial-author">
                <div className="testimonial-img">
                  <img src="https://randomuser.me/api/portraits/women/28.jpg" alt="Cliente" />
                </div>
                <div className="testimonial-info">
                  <h4>Ana García</h4>
                  <p>Cliente - Derecho de Familia</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Profesionales muy competentes que me ayudaron a resolver un complejo caso mercantil. Su experiencia fue clave para el éxito."</p>
              </div>
              <div className="testimonial-author">
                <div className="testimonial-img">
                  <img src="https://randomuser.me/api/portraits/men/54.jpg" alt="Cliente" />
                </div>
                <div className="testimonial-info">
                  <h4>Roberto Fernández</h4>
                  <p>Cliente - Derecho Mercantil</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Gracias a su asesoramiento, pudimos resolver favorablemente un litigio inmobiliario que llevaba años estancado."</p>
              </div>
              <div className="testimonial-author">
                <div className="testimonial-img">
                  <img src="https://randomuser.me/api/portraits/women/76.jpg" alt="Cliente" />
                </div>
                <div className="testimonial-info">
                  <h4>Elena Martín</h4>
                  <p>Cliente - Derecho Inmobiliario</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="contact">
        <div className="container">
          <h2 className="section-title">Contacto</h2>
          <div className="contact-container">
            <div className="contact-info">
              <div className="info-item">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <h3>Dirección</h3>
                  <p>Calle Principal 123, Ciudad</p>
                </div>
              </div>
              <div className="info-item">
                <i className="fas fa-phone"></i>
                <div>
                  <h3>Teléfono</h3>
                  <p>+34 912 345 678</p>
                </div>
              </div>
              <div className="info-item">
                <i className="fas fa-envelope"></i>
                <div>
                  <h3>Email</h3>
                  <p>info@gonzalezasociados.com</p>
                </div>
              </div>
              <div className="info-item">
                <i className="fas fa-clock"></i>
                <div>
                  <h3>Horario</h3>
                  <p>Lunes a Viernes: 9:00 - 18:00</p>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Nombre" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Email" required />
                </div>
                <div className="form-group">
                  <input type="tel" placeholder="Teléfono" />
                </div>
                <div className="form-group">
                  <select>
                    <option value="">Seleccione área legal</option>
                    <option value="civil">Derecho Civil</option>
                    <option value="mercantil">Derecho Mercantil</option>
                    <option value="penal">Derecho Penal</option>
                    <option value="inmobiliario">Derecho Inmobiliario</option>
                    <option value="laboral">Derecho Laboral</option>
                    <option value="administrativo">Derecho Administrativo</option>
                  </select>
                </div>
                <div className="form-group">
                  <textarea placeholder="Mensaje" rows="5" required></textarea>
                </div>
                <button type="submit" className="btn">Enviar Mensaje</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h2>González & Asociados</h2>
              <p>Bufete Jurídico de Confianza</p>
            </div>
            <div className="footer-links">
              <h3>Enlaces Rápidos</h3>
              <ul>
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#servicios">Servicios</a></li>
                <li><a href="#abogados">Abogados</a></li>
                <li><a href="#testimonios">Testimonios</a></li>
                <li><a href="#contacto">Contacto</a></li>
              </ul>
            </div>
            <div className="footer-social">
              <h3>Síguenos</h3>
              <div className="social-icons">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} González & Asociados. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      <div className="back-to-projects">
        <Link to="/projects" className="btn-back">← Volver a Proyectos</Link>
      </div>
    </div>
  );
};

export default Abogado;