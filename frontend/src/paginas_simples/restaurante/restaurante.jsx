import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import './restaurante-nav.css';

const FoodHutLandingPage = () => {
    // Estados para controlar el menú y el scroll
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Función para abrir/cerrar el menú en dispositivos móviles
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Función para cerrar el menú
    const closeMenu = () => {
        setMenuOpen(false);
    };
    
    // Función para manejar el evento de scroll
    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
        
        // Efecto parallax
        const parallaxElements = document.querySelectorAll('.parallax-element');
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed');
            const yPos = -(offset * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    };

    // Efecto para manejar el evento de scroll
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Cargar estilos y scripts necesarios
    useEffect(() => {
        // Guardar los estilos originales del body y root
        const originalBodyStyle = document.body.style.cssText;
        const originalRootStyle = document.getElementById('root')?.style.cssText || '';
        
        // Limpiar estilos del proyecto principal
        document.body.className = '';
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.overflow = 'auto';
        document.body.style.backgroundColor = '#fff';
        
        // Ajustar el contenedor root para que no interfiera
        const rootElement = document.getElementById('root');
        if (rootElement) {
            rootElement.style.height = '100%';
            rootElement.style.width = '100%';
            rootElement.style.overflow = 'visible';
            rootElement.style.padding = '0';
            rootElement.style.margin = '0';
            rootElement.style.maxWidth = 'none';
            rootElement.style.display = 'block';
        }
        
        // Cargar estilos CSS externos
        const loadStylesheet = (href) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.className = 'foodhut-style';
            document.head.appendChild(link);
            console.log('Cargando estilo:', href); // Agregar log para depuración
            return link;
        };
        
        // Cargar los estilos necesarios con rutas absolutas
        loadStylesheet('/paginas_simples/restaurante/assets/vendors/themify-icons/css/themify-icons.css');
        loadStylesheet('/paginas_simples/restaurante/assets/vendors/animate/animate.css');
        loadStylesheet('/paginas_simples/restaurante/assets/css/foodhut.css');
        
        // Agregar estilos inline para asegurar que se apliquen los básicos
        const styleElement = document.createElement('style');
        styleElement.className = 'foodhut-style';
        styleElement.textContent = `
            body {
                font-family: 'Open Sans', sans-serif;
                color: #444;
                background-color: #fff;
            }
            .restaurant-page {
                font-family: 'Open Sans', sans-serif;
                color: #444;
                background-color: #fff;
            }
            .header {
                background-image: url('/paginas_simples/restaurante/assets/imgs/main.jpg');
                background-size: cover;
                background-position: center;
            }
            .has-img-bg {
                background-image: url('/paginas_simples/restaurante/assets/imgs/about-section.jpg');
                background-size: cover;
                background-position: center;
            }
            /* Asegurar que los enlaces del menú sean visibles */
            .navbar-nav .nav-link {
                color: #fff !important;
                font-weight: 700 !important;
                visibility: visible !important;
                opacity: 1 !important;
            }
            #book-table {
                background-image: url('/paginas_simples/restaurante/assets/imgs/book-table-img.jpg');
                background-size: cover;
                background-position: center;
            }
        `;
        document.head.appendChild(styleElement);
        
        // Cargar scripts externos
        const loadScript = (src) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.className = 'foodhut-script';
            document.body.appendChild(script);
            return script;
        };
        
        // Cargar los scripts necesarios con rutas correctas
        const jqueryScript = loadScript('/paginas_simples/restaurante/assets/vendors/jquery/jquery-3.4.1.js');
        
        // Cargar scripts dependientes después de que jQuery esté listo
        jqueryScript.onload = () => {
            loadScript('/paginas_simples/restaurante/assets/vendors/bootstrap/bootstrap.bundle.js');
            loadScript('/paginas_simples/restaurante/assets/vendors/bootstrap/bootstrap.affix.js');
            loadScript('/paginas_simples/restaurante/assets/vendors/wow/wow.js');
            loadScript('/paginas_simples/restaurante/assets/js/foodhut.js');
            
            // Cargar Google Maps API
            const googleMapsScript = loadScript('https://maps.googleapis.com/maps/api/js?callback=initMap');
            googleMapsScript.defer = true;
        };
        
        // Limpiar al desmontar
        return () => {
            // Restaurar estilos originales
            document.body.style.cssText = originalBodyStyle;
            if (rootElement) {
                rootElement.style.cssText = originalRootStyle;
            }
            
            // Eliminar scripts
            document.querySelectorAll('.foodhut-script').forEach(script => {
                script.remove();
            });
            
            // Eliminar estilos
            document.querySelectorAll('.foodhut-style').forEach(link => {
                link.remove();
            });
        };
    }, []);
    return (
        <div data-spy="scroll" data-target=".navbar" data-offset="40" id="home" className="restaurant-page">
            {/* Encabezado HTML y enlaces CSS/meta se representan fuera del componente en el index.html de un proyecto React típico, 
                pero los incluyo aquí para referencia si los necesitas. En una aplicación React real, 
                los enlaces externos y metas irían en public/index.html */}
            {/*
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="description" content="Start your development with FoodHut landing page." />
                <meta name="author" content="Devcrud" />
                <title>FoodHut | Free Bootstrap 4.3.x template</title>
                
                <link rel="stylesheet" href="assets/vendors/themify-icons/css/themify-icons.css" />
                <link rel="stylesheet" href="assets/vendors/animate/animate.css" />
                <link rel="stylesheet" href="assets/css/foodhut.css" />
            </head>
            */}

            {/* Navbar Responsive Mejorado */}
            <nav className="responsive-navbar">
                <div className="nav-container">
                    {/* Logo */}
                    <div className="nav-logo">
                        <a href="#home">
                            <img src="/paginas_simples/restaurante/assets/imgs/logo.svg" alt="Logo" />
                            <span>Sabor Colombiano</span>
                        </a>
                    </div>

                    {/* Menu Items */}
                    <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
                        <a href="#home" className="nav-link" onClick={closeMenu}>
                            <i className="fas fa-home"></i>
                            Inicio
                        </a>
                        <a href="#about" className="nav-link" onClick={closeMenu}>
                            <i className="fas fa-users"></i>
                            Nosotros
                        </a>
                        <a href="#menu" className="nav-link" onClick={closeMenu}>
                            <i className="fas fa-utensils"></i>
                            Menú
                        </a>
                        <a href="#gallary" className="nav-link" onClick={closeMenu}>
                            <i className="fas fa-images"></i>
                            Galería
                        </a>
                        <a href="#book-table" className="nav-link" onClick={closeMenu}>
                            <i className="fas fa-calendar-alt"></i>
                            Reservas
                        </a>
                        <a href="#testmonial" className="nav-link" onClick={closeMenu}>
                            <i className="fas fa-star"></i>
                            Reseñas
                        </a>
                        <a href="#contact" className="nav-link" onClick={closeMenu}>
                            <i className="fas fa-map-marker-alt"></i>
                            Contacto
                        </a>
                        
                        {/* CTA Button dentro del menú móvil */}
                        <a href="#book-table" className="nav-cta-mobile" onClick={closeMenu}>
                            <i className="fas fa-phone"></i>
                            Reservar Mesa
                        </a>
                    </div>

                    {/* CTA Button para desktop */}
                    <div className="nav-cta-desktop">
                        <a href="#book-table" className="cta-btn">
                            <i className="fas fa-phone"></i>
                            Reservar Mesa
                        </a>
                    </div>

                    {/* Hamburger Menu */}
                    <div className={`nav-hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>

            {/* header con efecto parallax */}
            <header id="home" className="header parallax-section">
                <div className="overlay text-white text-center">
                    <h1 className="display-2 font-weight-bold my-3 parallax-element" data-speed="0.5">Sabor Colombiano</h1>
                    <h2 className="display-4 mb-5 parallax-element" data-speed="0.3">Siempre fresco &amp; Delicioso</h2>
                    <a className="btn btn-lg btn-primary parallax-element" data-speed="0.1" href="#gallary">Ver Nuestra Galería</a>
                </div>
            </header>

            {/*  About Section  */}
            <div id="about" className="container-fluid wow fadeIn parallax-section" data-wow-duration="1.5s">
                <div className="row">
                    <div className="col-lg-6 has-img-bg parallax-element" data-speed="0.2"></div>
                    <div className="col-lg-6">
                        <div className="row justify-content-center">
                            <div className="col-sm-8 py-5 my-5 parallax-element" data-speed="0.1">
                                <h2 className="mb-4">Sobre Nosotros</h2>
                                <p>Bienvenidos a Sabor Colombiano, un rincón gastronómico donde la tradición culinaria colombiana se fusiona con técnicas modernas para crear experiencias inolvidables. Desde 2010, nos hemos dedicado a ofrecer los sabores más auténticos de Colombia, utilizando ingredientes frescos y de la más alta calidad.<br /><br />Nuestro equipo de chefs, liderado por el reconocido Chef Carlos Martínez, se especializa en rescatar recetas tradicionales colombianas y darles un toque contemporáneo que sorprende a cada comensal. Cada plato cuenta una historia de nuestra rica cultura gastronómica, desde las montañas andinas hasta las costas caribeñas.</p>
                                <p><b>Comprometidos con la sostenibilidad y el apoyo a productores locales, garantizando ingredientes frescos y de temporada.</b></p>
                                <p>En Sabor Colombiano no solo ofrecemos comida excepcional, sino una experiencia completa que transporta a nuestros clientes a un viaje culinario por las diversas regiones de Colombia. Nuestro ambiente acogedor, servicio personalizado y música tradicional complementan perfectamente cada visita, creando momentos memorables para compartir con familiares y amigos.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*  gallary Section  */}
            <div id="gallary" className="text-center bg-dark text-light has-height-md middle-items wow fadeIn">
                <h2 className="section-title">NUESTRO MENÚ</h2>
            </div>
            <div className="gallary row">
                <div className="col-sm-6 col-lg-3 gallary-item wow fadeIn">
                    <img src="/paginas_simples/restaurante/assets/imgs/gallary-1.jpg" alt="template by DevCRID http://www.devcrud.com/" className="gallary-img" />
                    <a href="#" className="gallary-overlay">
                        <i className="gallary-icon ti-plus"></i>
                    </a>
                </div>
                <div className="col-sm-6 col-lg-3 gallary-item wow fadeIn">
                    <img src="/paginas_simples/restaurante/assets/imgs/gallary-2.jpg" alt="template by DevCRID http://www.devcrud.com/" className="gallary-img" />
                    <a href="#" className="gallary-overlay">
                        <i className="gallary-icon ti-plus"></i>
                    </a>
                </div>
                <div className="col-sm-6 col-lg-3 gallary-item wow fadeIn">
                    <img src="/paginas_simples/restaurante/assets/imgs/gallary-3.jpg" alt="template by DevCRID http://www.devcrud.com/" className="gallary-img" />
                    <a href="#" className="gallary-overlay">
                        <i className="gallary-icon ti-plus"></i>
                    </a>
                </div>
                <div className="col-sm-6 col-lg-3 gallary-item wow fadeIn">
                    <img src="/paginas_simples/restaurante/assets/imgs/gallary-4.jpg" alt="template by DevCRID http://www.devcrud.com/" className="gallary-img" />
                    <a href="#" className="gallary-overlay">
                        <i className="gallary-icon ti-plus"></i>
                    </a>
                </div>
                <div className="col-sm-6 col-lg-3 gallary-item wow fadeIn">
                    <img src="/paginas_simples/restaurante/assets/imgs/gallary-5.jpg" alt="template by DevCRID http://www.devcrud.com/" className="gallary-img" />
                    <a href="#" className="gallary-overlay">
                        <i className="gallary-icon ti-plus"></i>
                    </a>
                </div>
                <div className="col-sm-6 col-lg-3 gallary-item wow fadeIn">
                    <img src="/paginas_simples/restaurante/assets/imgs/gallary-6.jpg" alt="template by DevCRID http://www.devcrud.com/" className="gallary-img" />
                    <a href="#" className="gallary-overlay">
                        <i className="gallary-icon ti-plus"></i>
                    </a>
                </div>
                <div className="col-sm-6 col-lg-3 gallary-item wow fadeIn">
                    <img src="/paginas_simples/restaurante/assets/imgs/gallary-7.jpg" alt="template by DevCRID http://www.devcrud.com/" className="gallary-img" />
                    <a href="#" className="gallary-overlay">
                        <i className="gallary-icon ti-plus"></i>
                    </a>
                </div>
                <div className="col-sm-6 col-lg-3 gallary-item wow fadeIn">
                    <img src="/paginas_simples/restaurante/assets/imgs/gallary-8.jpg" alt="template by DevCRID http://www.devcrud.com/" className="gallary-img" />
                    <a href="#" className="gallary-overlay">
                        <i className="gallary-icon ti-plus"></i>
                    </a>
                </div>
                <div className="col-sm-6 col-lg-3 gallary-item wow fadeIn">
                    <img src="/paginas_simples/restaurante/assets/imgs/gallary-9.jpg" alt="template by DevCRID http://www.devcrud.com/" className="gallary-img" />
                    <a href="#" className="gallary-overlay">
                        <i className="gallary-icon ti-plus"></i>
                    </a>
                </div>
                <div className="col-sm-6 col-lg-3 gallary-item wow fadeIn">
                    <img src="/paginas_simples/restaurante/assets/imgs/gallary-10.jpg" alt="template by DevCRID http://www.devcrud.com/" className="gallary-img" />
                    <a href="#" className="gallary-overlay">
                        <i className="gallary-icon ti-plus"></i>
                    </a>
                </div>
                <div className="col-sm-6 col-lg-3 gallary-item wow fadeIn">
                    <img src="/paginas_simples/restaurante/assets/imgs/gallary-11.jpg" alt="template by DevCRID http://www.devcrud.com/" className="gallary-img" />
                    <a href="#" className="gallary-overlay">
                        <i className="gallary-icon ti-plus"></i>
                    </a>
                </div>
                <div className="col-sm-6 col-lg-3 gallary-item wow fadeIn">
                    <img src="/paginas_simples/restaurante/assets/imgs/gallary-12.jpg" alt="template by DevCRID http://www.devcrud.com/" className="gallary-img" />
                    <a href="#" className="gallary-overlay">
                        <i className="gallary-icon ti-plus"></i>
                    </a>
                </div>
            </div>

            {/* book a table Section  */}
            <div className="container-fluid has-bg-overlay text-center text-light has-height-lg middle-items" id="book-table">
                <div className="">
                    <h2 className="section-title mb-5">RESERVAR UNA MESA</h2>
                    <div className="row mb-5">
                        <div className="col-sm-6 col-md-3 col-xs-12 my-2">
                            <label htmlFor="email-reserva" className="form-label text-white mb-2 font-weight-bold">Correo Electrónico</label>
                            <input type="email" id="email-reserva" className="form-control form-control-lg custom-form-control" placeholder="ejemplo@correo.com" />
                        </div>
                        <div className="col-sm-6 col-md-3 col-xs-12 my-2">
                            <label htmlFor="invitados-reserva" className="form-label text-white mb-2 font-weight-bold">Número de Invitados</label>
                            <input type="number" id="invitados-reserva" className="form-control form-control-lg custom-form-control" placeholder="2" max="20" min="1" />
                        </div>
                        <div className="col-sm-6 col-md-3 col-xs-12 my-2">
                            <label htmlFor="hora-reserva" className="form-label text-white mb-2 font-weight-bold">Hora</label>
                            <input type="time" id="hora-reserva" className="form-control form-control-lg custom-form-control" />
                        </div>
                        <div className="col-sm-6 col-md-3 col-xs-12 my-2">
                            <label htmlFor="fecha-reserva" className="form-label text-white mb-2 font-weight-bold">Fecha</label>
                            <input type="date" id="fecha-reserva" className="form-control form-control-lg custom-form-control" />
                        </div>
                    </div>
                    <a href="#" className="btn btn-lg btn-primary" id="rounded-btn">BUSCAR MESA</a>
                </div>
            </div>

            {/* NUEVO MENU Section con Imágenes */}
            <div id="menu" className="container-fluid bg-dark text-light py-5 wow fadeIn">
                <div className="container">
                    <h2 className="section-title text-center py-5">NUESTRO DELICIOSO MENÚ</h2>
                    
                    {/* Navegación de categorías */}
                    <div className="row mb-5">
                        <div className="col-12">
                            <ul className="nav nav-pills justify-content-center menu-tabs" id="menuTabs" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link active" id="entradas-tab" data-toggle="pill" href="#entradas" role="tab" aria-controls="entradas" aria-selected="true">
                                        <i className="fas fa-leaf"></i> Entradas
                                    </a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link" id="principales-tab" data-toggle="pill" href="#principales" role="tab" aria-controls="principales" aria-selected="false">
                                        <i className="fas fa-utensils"></i> Platos Principales
                                    </a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link" id="hamburguesas-tab" data-toggle="pill" href="#hamburguesas" role="tab" aria-controls="hamburguesas" aria-selected="false">
                                        <i className="fas fa-hamburger"></i> Hamburguesas
                                    </a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link" id="pizzas-tab" data-toggle="pill" href="#pizzas" role="tab" aria-controls="pizzas" aria-selected="false">
                                        <i className="fas fa-pizza-slice"></i> Pizzas
                                    </a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link" id="bebidas-tab" data-toggle="pill" href="#bebidas" role="tab" aria-controls="bebidas" aria-selected="false">
                                        <i className="fas fa-cocktail"></i> Bebidas
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Contenido de las categorías */}
                    <div className="tab-content" id="menuTabContent">
                        
                        {/* ENTRADAS */}
                        <div className="tab-pane fade show active" id="entradas" role="tabpanel">
                            <div className="row">
                                <div className="col-lg-4 col-md-6 mb-4">
                                    <div className="menu-card">
                                        <div className="menu-card-img">
                                            <img src="https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop" alt="Patacones" className="img-fluid" />
                                            <div className="menu-card-overlay">
                                                <span className="price">$12.000</span>
                                            </div>
                                        </div>
                                        <div className="menu-card-content">
                                            <h5>Patacones con Hogao</h5>
                                            <p>Plátano verde frito acompañado de delicioso hogao casero y queso fresco</p>
                                            <div className="menu-card-rating">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 mb-4">
                                    <div className="menu-card">
                                        <div className="menu-card-img">
                                            <img src="https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop" alt="Empanadas" className="img-fluid" />
                                            <div className="menu-card-overlay">
                                                <span className="price">$15.000</span>
                                            </div>
                                        </div>
                                        <div className="menu-card-content">
                                            <h5>Empanadas Colombianas</h5>
                                            <p>Tradicionales empanadas de carne con ají casero picante (3 unidades)</p>
                                            <div className="menu-card-rating">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 mb-4">
                                    <div className="menu-card">
                                        <div className="menu-card-img">
                                            <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop" alt="Arepa" className="img-fluid" />
                                            <div className="menu-card-overlay">
                                                <span className="price">$10.000</span>
                                            </div>
                                        </div>
                                        <div className="menu-card-content">
                                            <h5>Arepa Rellena</h5>
                                            <p>Arepa de maíz blanco con queso costeño derretido y aguacate fresco</p>
                                            <div className="menu-card-rating">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="far fa-star"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PLATOS PRINCIPALES */}
                        <div className="tab-pane fade" id="principales" role="tabpanel">
                            <div className="row">
                                <div className="col-lg-4 col-md-6 mb-4">
                                    <div className="menu-card">
                                        <div className="menu-card-img">
                                            <img src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop" alt="Bandeja Paisa" className="img-fluid" />
                                            <div className="menu-card-overlay">
                                                <span className="price">$45.000</span>
                                                <span className="badge-special">Especialidad</span>
                                            </div>
                                        </div>
                                        <div className="menu-card-content">
                                            <h5>Bandeja Paisa</h5>
                                            <p>El plato más tradicional: frijoles, arroz, carne, chicharrón, huevo, aguacate, arepa y plátano</p>
                                            <div className="menu-card-rating">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 mb-4">
                                    <div className="menu-card">
                                        <div className="menu-card-img">
                                            <img src="https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop" alt="Ajiaco" className="img-fluid" />
                                            <div className="menu-card-overlay">
                                                <span className="price">$38.000</span>
                                            </div>
                                        </div>
                                        <div className="menu-card-content">
                                            <h5>Ajiaco Santafereño</h5>
                                            <p>Sopa cremosa con tres tipos de papas, pollo, mazorca y alcaparras</p>
                                            <div className="menu-card-rating">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 mb-4">
                                    <div className="menu-card">
                                        <div className="menu-card-img">
                                            <img src="https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop" alt="Sancocho" className="img-fluid" />
                                            <div className="menu-card-overlay">
                                                <span className="price">$42.000</span>
                                            </div>
                                        </div>
                                        <div className="menu-card-content">
                                            <h5>Sancocho de Gallina</h5>
                                            <p>Caldo sustancioso con gallina criolla, yuca, plátano y verduras frescas</p>
                                            <div className="menu-card-rating">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="far fa-star"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* HAMBURGUESAS */}
                        <div className="tab-pane fade" id="hamburguesas" role="tabpanel">
                            <div className="row">
                                <div className="col-lg-4 col-md-6 mb-4">
                                    <div className="menu-card">
                                        <div className="menu-card-img">
                                            <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop" alt="Hamburguesa Clásica" className="img-fluid" />
                                            <div className="menu-card-overlay">
                                                <span className="price">$28.000</span>
                                            </div>
                                        </div>
                                        <div className="menu-card-content">
                                            <h5>Hamburguesa Clásica</h5>
                                            <p>Carne de res, lechuga, tomate, cebolla, queso y salsa especial con papas fritas</p>
                                            <div className="menu-card-rating">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="far fa-star"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 mb-4">
                                    <div className="menu-card">
                                        <div className="menu-card-img">
                                            <img src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop" alt="Hamburguesa BBQ" className="img-fluid" />
                                            <div className="menu-card-overlay">
                                                <span className="price">$32.000</span>
                                                <span className="badge-popular">Popular</span>
                                            </div>
                                        </div>
                                        <div className="menu-card-content">
                                            <h5>Hamburguesa BBQ</h5>
                                            <p>Doble carne, tocino, queso cheddar, cebolla caramelizada y salsa BBQ</p>
                                            <div className="menu-card-rating">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 mb-4">
                                    <div className="menu-card">
                                        <div className="menu-card-img">
                                            <img src="https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=400&h=300&fit=crop" alt="Hamburguesa Criolla" className="img-fluid" />
                                            <div className="menu-card-overlay">
                                                <span className="price">$35.000</span>
                                            </div>
                                        </div>
                                        <div className="menu-card-content">
                                            <h5>Hamburguesa Criolla</h5>
                                            <p>Carne de res, plátano maduro, queso costeño, hogao y aguacate</p>
                                            <div className="menu-card-rating">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PIZZAS */}
                        <div className="tab-pane fade" id="pizzas" role="tabpanel">
                            <div className="row">
                                <div className="col-lg-4 col-md-6 mb-4">
                                    <div className="menu-card">
                                        <div className="menu-card-img">
                                            <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop" alt="Pizza Margherita" className="img-fluid" />
                                            <div className="menu-card-overlay">
                                                <span className="price">$38.000</span>
                                            </div>
                                        </div>
                                        <div className="menu-card-content">
                                            <h5>Pizza Margherita</h5>
                                            <p>Salsa de tomate, mozzarella fresca, albahaca y aceite de oliva</p>
                                            <div className="menu-card-rating">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="far fa-star"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 mb-4">
                                    <div className="menu-card">
                                        <div className="menu-card-img">
                                            <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop" alt="Pizza Pepperoni" className="img-fluid" />
                                            <div className="menu-card-overlay">
                                                <span className="price">$42.000</span>
                                                <span className="badge-popular">Popular</span>
                                            </div>
                                        </div>
                                        <div className="menu-card-content">
                                            <h5>Pizza Pepperoni</h5>
                                            <p>Salsa de tomate, mozzarella, pepperoni y orégano fresco</p>
                                            <div className="menu-card-rating">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 mb-4">
                                    <div className="menu-card">
                                        <div className="menu-card-img">
                                            <img src="https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&h=300&fit=crop" alt="Pizza Tropical" className="img-fluid" />
                                            <div className="menu-card-overlay">
                                                <span className="price">$45.000</span>
                                            </div>
                                        </div>
                                        <div className="menu-card-content">
                                            <h5>Pizza Tropical</h5>
                                            <p>Jamón, piña, queso mozzarella y salsa BBQ dulce</p>
                                            <div className="menu-card-rating">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="far fa-star"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* BEBIDAS */}
                        <div className="tab-pane fade" id="bebidas" role="tabpanel">
                            <div className="row">
                                <div className="col-lg-4 col-md-6 mb-4">
                                    <div className="menu-card">
                                        <div className="menu-card-img">
                                            <img src="https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop" alt="Limonada de Coco" className="img-fluid" />
                                            <div className="menu-card-overlay">
                                                <span className="price">$15.000</span>
                                            </div>
                                        </div>
                                        <div className="menu-card-content">
                                            <h5>Limonada de Coco</h5>
                                            <p>Refrescante combinación de limón fresco y leche de coco natural</p>
                                            <div className="menu-card-rating">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 mb-4">
                                    <div className="menu-card">
                                        <div className="menu-card-img">
                                            <img src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop" alt="Café Colombiano" className="img-fluid" />
                                            <div className="menu-card-overlay">
                                                <span className="price">$8.000</span>
                                                <span className="badge-special">Especial</span>
                                            </div>
                                        </div>
                                        <div className="menu-card-content">
                                            <h5>Café Colombiano</h5>
                                            <p>El mejor café del mundo, de las montañas colombianas, recién molido</p>
                                            <div className="menu-card-rating">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 mb-4">
                                    <div className="menu-card">
                                        <div className="menu-card-img">
                                            <img src="https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop" alt="Jugo Natural" className="img-fluid" />
                                            <div className="menu-card-overlay">
                                                <span className="price">$12.000</span>
                                            </div>
                                        </div>
                                        <div className="menu-card-content">
                                            <h5>Jugos Naturales</h5>
                                            <p>Lulo, maracuyá, mango, guayaba o mora. Frutas frescas y naturales</p>
                                            <div className="menu-card-rating">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="far fa-star"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Nota especial */}
                    <div className="row mt-5">
                        <div className="col-12 text-center">
                            <div className="alert alert-warning" role="alert">
                                <h5 className="mb-2">🌟 ¡Especialidad de la Casa! 🌟</h5>
                                <p className="mb-0">Todos nuestros platos son preparados con ingredientes frescos y recetas tradicionales colombianas. ¡Pregunta por nuestros especiales del día!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* REVIEWS Section  */}
            <div id="testmonial" className="container-fluid wow fadeIn bg-dark text-light has-height-lg middle-items">
                <h2 className="section-title my-5 text-center">RESEÑAS</h2>
                <div className="row mt-3 mb-5">
                    <div className="col-md-4 my-3 my-md-0">
                        <div className="testmonial-card">
                            <h3 className="testmonial-title">Carlos Rodríguez</h3>
                            <h6 className="testmonial-subtitle">Chef Profesional</h6>
                            <div className="testmonial-body">
                                <p>¡Sabor Colombiano es una joya gastronómica! Los platos tradicionales mantienen la esencia de nuestra cocina con un toque de innovación. La bandeja paisa es simplemente espectacular, con ingredientes frescos y sabores auténticos.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 my-3 my-md-0">
                        <div className="testmonial-card">
                            <h3 className="testmonial-title">María Gómez</h3>
                            <h6 className="testmonial-subtitle">Crítica Gastronómica</h6>
                            <div className="testmonial-body">
                                <p>Una experiencia culinaria excepcional. La fusión de sabores tradicionales colombianos con técnicas modernas es impresionante. El servicio es impecable y el ambiente acogedor. ¡Las hamburguesas con toques colombianos son una delicia que no te puedes perder!</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 my-3 my-md-0">
                        <div className="testmonial-card">
                            <h3 className="testmonial-title">Andrés Martínez</h3>
                            <h6 className="testmonial-subtitle">Bloguero de Viajes</h6>
                            <div className="testmonial-body">
                                <p>Visité Sabor Colombiano durante mi viaje a Colombia y quedé maravillado. La variedad de platos regionales es impresionante y los cócteles son únicos. El ajiaco y la cazuela de mariscos son imperdibles. ¡Definitivamente regresaré en mi próxima visita!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTACT Section - Nueva sección moderna */}
            <div id="contact" className="py-5 bg-gradient-dark">
                <div className="container">
                    <div className="row justify-content-center mb-5">
                        <div className="col-lg-8 text-center">
                            <h2 className="section-title text-white mb-3">ENCUÉNTRANOS</h2>
                            <p className="text-light lead">Visítanos en nuestro acogedor restaurante y disfruta de la mejor experiencia gastronómica colombiana</p>
                        </div>
                    </div>
                    
                    <div className="row g-4">
                        {/* Mapa centrado */}
                        <div className="col-lg-8 mx-auto mb-4">
                            <div className="map-container shadow-lg rounded overflow-hidden">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.6881119055424!2d-74.05543492426948!3d4.6662648422826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9a446a229063%3A0x5f34c39493fa40a8!2sZona%20Rosa%2C%20Bogot%C3%A1%2C%20Colombia!5e0!3m2!1ses!2sco!4v1659123456789!5m2!1ses!2sco" 
                                    width="100%" 
                                    height="400" 
                                    style={{ border: 0 }} 
                                    allowFullScreen="" 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade">
                                </iframe>
                            </div>
                        </div>
                        
                        {/* Información de contacto */}
                        <div className="col-lg-10 mx-auto">
                            <div className="row g-4">
                                <div className="col-md-4">
                                    <div className="contact-card text-center p-4 h-100">
                                        <div className="contact-icon mb-3">
                                            <i className="ti-location-pin"></i>
                                        </div>
                                        <h5 className="text-white mb-3">UBICACIÓN</h5>
                                        <p className="text-light mb-2">Calle 82 #12-45</p>
                                        <p className="text-light mb-2">Zona Rosa, Bogotá</p>
                                        <p className="text-light">Colombia</p>
                                    </div>
                                </div>
                                
                                <div className="col-md-4">
                                    <div className="contact-card text-center p-4 h-100">
                                        <div className="contact-icon mb-3">
                                            <i className="ti-mobile"></i>
                                        </div>
                                        <h5 className="text-white mb-3">TELÉFONOS</h5>
                                        <p className="text-light mb-2">
                                            <a href="tel:+576012345678" className="text-light text-decoration-none">
                                                (+57) 601-234-5678
                                            </a>
                                        </p>
                                        <p className="text-light mb-2">
                                            <a href="tel:+573001234567" className="text-light text-decoration-none">
                                                (+57) 300-123-4567
                                            </a>
                                        </p>
                                        <p className="text-muted small">Lun - Dom: 11:00 AM - 11:00 PM</p>
                                    </div>
                                </div>
                                
                                <div className="col-md-4">
                                    <div className="contact-card text-center p-4 h-100">
                                        <div className="contact-icon mb-3">
                                            <i className="ti-email"></i>
                                        </div>
                                        <h5 className="text-white mb-3">CONTACTO</h5>
                                        <p className="text-light mb-2">
                                            <a href="mailto:contacto@saborcolombiano.com" className="text-light text-decoration-none">
                                                contacto@saborcolombiano.com
                                            </a>
                                        </p>
                                        <p className="text-light mb-2">
                                            <a href="mailto:reservas@saborcolombiano.com" className="text-light text-decoration-none">
                                                reservas@saborcolombiano.com
                                            </a>
                                        </p>
                                        <div className="social-links mt-3">
                                            <a href="#" className="text-warning me-3"><i className="ti-facebook"></i></a>
                                            <a href="#" className="text-warning me-3"><i className="ti-instagram"></i></a>
                                            <a href="#" className="text-warning"><i className="ti-twitter"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* page footer  */}
            <div className="container-fluid bg-dark text-light has-height-md middle-items border-top text-center wow fadeIn">
                <div className="row">
                    <div className="col-sm-4">
                        <h3>CORREO ELECTRÓNICO</h3>
                        <p className="text-muted">contacto@saborcolombiano.com</p>
                    </div>
                    <div className="col-sm-4">
                        <h3>LLÁMANOS</h3>
                        <p className="text-muted">(+57) 601-234-5678</p>
                    </div>
                    <div className="col-sm-4">
                        <h3>VISÍTANOS</h3>
                        <p className="text-muted">Calle 82 #12-45, Zona Rosa, Bogotá</p>
                    </div>
                </div>
            </div>
            <div className="bg-dark text-light text-center border-top wow fadeIn">
                {/* La expresión JavaScript document.write(new Date().getFullYear()) se reemplaza por la sintaxis de JSX para obtener el año */}
                <p className="mb-0 py-3 text-muted small">&copy; Copyright {new Date().getFullYear()} Sabor Colombiano - Todos los derechos reservados | Diseñado con <i className="ti-heart text-danger"></i> para la gastronomía colombiana</p>
            </div>
            {/* end of page footer */}

            {/* Los enlaces a scripts de JavaScript (core, affix, wow, google maps, foodhut) se manejarían típicamente en 
            la forma en que React maneja dependencias (npm/yarn install y luego import) o se cargarían en public/index.html si son globales. 
            No se incluyen aquí como etiquetas <script> porque no se ejecutan como esperas en un componente de React. */}
            
            <div className="back-to-projects">
                <Link to="/projects" className="btn-back">← Volver a Proyectos</Link>
            </div>
        </div>
    );
};

export default FoodHutLandingPage;