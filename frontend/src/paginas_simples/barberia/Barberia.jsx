import React from 'react';
import { Link } from 'react-router-dom';
import './BarberiaStyles.css';

const Barberia = () => {
  return (
    <div className="barberia-page">
      <header className="barberia-header">
        <div className="container">
          <div className="logo">
            <h1>BarberShop</h1>
            <p>Estilo & Tradición</p>
          </div>
          <nav>
            <ul>
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#nosotros">Nosotros</a></li>
              <li><a href="#servicios">Servicios</a></li>
              <li><a href="#galeria">Galería</a></li>
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
            <h2>Barbería Clásica con Estilo Moderno</h2>
            <p>Cortes de cabello y arreglo de barba con la mejor calidad y atención personalizada.</p>
            <a href="#contacto" className="btn">Reserva tu Cita</a>
          </div>
        </div>
      </section>

      <section id="nosotros" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="section-title">Sobre Nosotros</h2>
              <p>Somos una barbería con más de 10 años de experiencia, dedicados a ofrecer el mejor servicio y los mejores resultados. Nuestro equipo de barberos profesionales está capacitado para brindarte el estilo que buscas.</p>
              <p>En BarberShop nos preocupamos por cada detalle, desde el ambiente acogedor hasta las técnicas de corte más avanzadas, para que tu experiencia sea única y satisfactoria.</p>
              <div className="features">
                <div className="feature">
                  <i className="fas fa-cut"></i>
                  <h3>Barberos Expertos</h3>
                  <p>Profesionales con años de experiencia y formación continua.</p>
                </div>
                <div className="feature">
                  <i className="fas fa-certificate"></i>
                  <h3>Productos Premium</h3>
                  <p>Utilizamos productos de alta calidad para cuidar tu cabello y barba.</p>
                </div>
                <div className="feature">
                  <i className="fas fa-clock"></i>
                  <h3>Ambiente Relajado</h3>
                  <p>Disfruta de un espacio diseñado para tu comodidad y relax.</p>
                </div>
              </div>
            </div>
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Barbería" />
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="services">
        <div className="container">
          <h2 className="section-title">Nuestros Servicios</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-img">
                <img src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80" alt="Corte de Cabello" />
              </div>
              <div className="service-info">
                <h3>Corte de Cabello</h3>
                <p>Cortes clásicos y modernos adaptados a tu estilo y tipo de cabello.</p>
                <div className="service-price">Desde $15</div>
                <a href="#contacto" className="btn-service">Reservar</a>
              </div>
            </div>
            <div className="service-card">
              <div className="service-img">
                <img src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Arreglo de Barba" />
              </div>
              <div className="service-info">
                <h3>Arreglo de Barba</h3>
                <p>Perfilado, recorte y tratamiento para mantener tu barba impecable.</p>
                <div className="service-price">Desde $10</div>
                <a href="#contacto" className="btn-service">Reservar</a>
              </div>
            </div>
            <div className="service-card">
              <div className="service-img">
                <img src="https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Afeitado Clásico" />
              </div>
              <div className="service-info">
                <h3>Afeitado Clásico</h3>
                <p>Afeitado tradicional con navaja, toallas calientes y productos premium.</p>
                <div className="service-price">Desde $20</div>
                <a href="#contacto" className="btn-service">Reservar</a>
              </div>
            </div>
            <div className="service-card">
              <div className="service-img">
                <img src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Tratamiento Capilar" />
              </div>
              <div className="service-info">
                <h3>Tratamiento Capilar</h3>
                <p>Hidratación, nutrición y cuidado para el cabello y cuero cabelludo.</p>
                <div className="service-price">Desde $25</div>
                <a href="#contacto" className="btn-service">Reservar</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="galeria" className="gallery">
        <div className="container">
          <h2 className="section-title">Galería</h2>
          <div className="gallery-grid">
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Galería 1" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Galería 2" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80" alt="Galería 3" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" alt="Galería 4" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Galería 5" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Galería 6" />
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="contact">
        <div className="container">
          <h2 className="section-title">Contacto y Reservas</h2>
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
                  <p>info@barbershop.com</p>
                </div>
              </div>
              <div className="info-item">
                <i className="fas fa-clock"></i>
                <div>
                  <h3>Horario</h3>
                  <p>Lunes a Sábado: 10:00 - 20:00</p>
                  <p>Domingo: Cerrado</p>
                </div>
              </div>
              <div className="social-media">
                <h3>Síguenos</h3>
                <div className="social-icons">
                  <a href="#"><i className="fab fa-facebook-f"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
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
                  <input type="tel" placeholder="Teléfono" required />
                </div>
                <div className="form-group">
                  <select required>
                    <option value="">Selecciona un servicio</option>
                    <option value="corte">Corte de Cabello</option>
                    <option value="barba">Arreglo de Barba</option>
                    <option value="afeitado">Afeitado Clásico</option>
                    <option value="tratamiento">Tratamiento Capilar</option>
                  </select>
                </div>
                <div className="form-group">
                  <input type="date" required />
                </div>
                <div className="form-group">
                  <select required>
                    <option value="">Selecciona una hora</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                    <option value="13:00">13:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                    <option value="18:00">18:00</option>
                    <option value="19:00">19:00</option>
                  </select>
                </div>
                <div className="form-group">
                  <textarea placeholder="Mensaje o petición especial" rows="3"></textarea>
                </div>
                <button type="submit" className="btn">Reservar Cita</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h2>BarberShop</h2>
              <p>Estilo & Tradición</p>
            </div>
            <div className="footer-links">
              <h3>Enlaces Rápidos</h3>
              <ul>
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#nosotros">Nosotros</a></li>
                <li><a href="#servicios">Servicios</a></li>
                <li><a href="#galeria">Galería</a></li>
                <li><a href="#contacto">Contacto</a></li>
              </ul>
            </div>
            <div className="footer-services">
              <h3>Servicios</h3>
              <ul>
                <li>Corte de Cabello</li>
                <li>Arreglo de Barba</li>
                <li>Afeitado Clásico</li>
                <li>Tratamiento Capilar</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} BarberShop. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      <div className="back-to-projects">
        <Link to="/projects" className="btn-back">← Volver a Proyectos</Link>
      </div>
    </div>
  );
};

export default Barberia;