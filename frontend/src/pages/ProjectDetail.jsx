import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';

// Mock data for project details
const projectsData = {
  1: {
    id: 1,
    title: 'Bufete de Abogados Profesional',
    subtitle: 'Sitio web corporativo para estudio jurídico',
    description: 'Desarrollo completo de sitio web profesional para un prestigioso bufete de abogados, enfocado en transmitir confianza, profesionalismo y experiencia legal.',
    longDescription: 'Este proyecto consistió en el desarrollo de una plataforma web completa para un bufete de abogados reconocido. El objetivo principal era crear una presencia digital que reflejara la seriedad y profesionalismo del estudio, mientras proporcionaba información clara sobre sus servicios legales y facilitaba el contacto con potenciales clientes.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    gallery: [
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    category: 'Sitio Web Corporativo',
    client: 'Estudio Jurídico Martínez & Asociados',
    duration: '3 semanas',
    status: 'Completado',
    year: '2024',
    url: '/paginas_simples/abogado',
    technologies: [
      { name: 'React', color: 'primary', icon: '⚛️' },
      { name: 'CSS3', color: 'secondary', icon: '🎨' },
      { name: 'JavaScript', color: 'accent', icon: '⚡' },
      { name: 'Responsive Design', color: 'success', icon: '📱' }
    ],
    features: [
      {
        title: 'Diseño Profesional',
        description: 'Interfaz elegante y profesional que transmite confianza y seriedad',
        icon: '🎯'
      },
      {
        title: 'Sección de Servicios',
        description: 'Presentación clara de todas las áreas de práctica legal',
        icon: '⚖️'
      },
      {
        title: 'Equipo Legal',
        description: 'Perfiles detallados del equipo de abogados con sus especialidades',
        icon: '👥'
      },
      {
        title: 'Formulario de Contacto',
        description: 'Sistema de contacto directo para consultas legales',
        icon: '📧'
      },
      {
        title: 'Testimonios',
        description: 'Sección de testimonios de clientes satisfechos',
        icon: '⭐'
      },
      {
        title: 'Optimización SEO',
        description: 'Optimizado para motores de búsqueda y mejor visibilidad',
        icon: '🔍'
      }
    ],
    challenges: [
      'Transmitir profesionalismo y confianza a través del diseño',
      'Organizar gran cantidad de información legal de manera clara',
      'Crear una experiencia de usuario intuitiva para diferentes tipos de clientes',
      'Optimizar para dispositivos móviles manteniendo la elegancia'
    ],
    solutions: [
      'Paleta de colores sobria con toques de azul corporativo',
      'Estructura de información jerárquica y navegación intuitiva',
      'Diseño responsive que se adapta perfectamente a todos los dispositivos',
      'Implementación de formularios de contacto especializados por área legal'
    ],
    results: [
      'Aumento del 150% en consultas online',
      'Mejora del 200% en tiempo de permanencia en el sitio',
      'Incremento del 80% en conversiones de visitantes a clientes',
      'Posicionamiento en primera página de Google para palabras clave relevantes'
    ],
    testimonial: {
      text: "El sitio web superó todas nuestras expectativas. Hemos visto un incremento significativo en consultas y la percepción de nuestros clientes sobre nuestro profesionalismo ha mejorado notablemente.",
      author: "Dr. Carlos Martínez",
      position: "Socio Fundador",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  },
  2: {
    id: 2,
    title: 'Barbería Moderna Premium',
    subtitle: 'Plataforma digital para servicios de barbería',
    description: 'Sitio web moderno y atractivo para una barbería premium, con sistema de reservas online y galería de trabajos.',
    longDescription: 'Desarrollo de una plataforma web completa para una barbería moderna que buscaba digitalizar sus servicios y atraer a una clientela más joven. El proyecto incluyó diseño visual impactante, sistema de reservas y galería interactiva.',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    gallery: [
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    category: 'Sitio Web Comercial',
    client: 'Barbería Premium Style',
    duration: '4 semanas',
    status: 'Completado',
    year: '2024',
    url: '/paginas_simples/barberia',
    technologies: [
      { name: 'React', color: 'primary', icon: '⚛️' },
      { name: 'CSS3', color: 'secondary', icon: '🎨' },
      { name: 'JavaScript', color: 'accent', icon: '⚡' },
      { name: 'Bootstrap', color: 'warning', icon: '🅱️' }
    ],
    features: [
      {
        title: 'Galería Interactiva',
        description: 'Showcase de trabajos realizados con efectos visuales atractivos',
        icon: '📸'
      },
      {
        title: 'Sistema de Reservas',
        description: 'Calendario integrado para reservar citas online',
        icon: '📅'
      },
      {
        title: 'Lista de Servicios',
        description: 'Catálogo completo de servicios con precios actualizados',
        icon: '✂️'
      },
      {
        title: 'Testimonios de Clientes',
        description: 'Reseñas y comentarios de clientes satisfechos',
        icon: '💬'
      }
    ],
    testimonial: {
      text: "Desde que lanzamos el sitio web, nuestras reservas online han aumentado un 300%. El diseño refleja perfectamente el estilo moderno de nuestra barbería.",
      author: "Miguel Rodríguez",
      position: "Propietario",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
    }
  },
  3: {
    id: 3,
    title: 'Restaurante Gourmet Experience',
    subtitle: 'Plataforma gastronómica digital',
    description: 'Sitio web elegante para restaurante gourmet con menú digital interactivo y sistema de reservas.',
    longDescription: 'Creación de una experiencia digital completa para un restaurante gourmet, incluyendo menú interactivo, galería de platos, sistema de reservas y información nutricional detallada.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    gallery: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    category: 'Sitio Web Gastronómico',
    client: 'Restaurante Bella Vista',
    duration: '5 semanas',
    status: 'Completado',
    year: '2024',
    url: '/paginas_simples/restaurante',
    technologies: [
      { name: 'React', color: 'primary', icon: '⚛️' },
      { name: 'CSS3', color: 'secondary', icon: '🎨' },
      { name: 'Bootstrap', color: 'warning', icon: '🅱️' },
      { name: 'jQuery', color: 'accent', icon: '💫' }
    ],
    features: [
      {
        title: 'Menú Digital Interactivo',
        description: 'Catálogo completo de platos con imágenes y descripciones detalladas',
        icon: '🍽️'
      },
      {
        title: 'Sistema de Reservas',
        description: 'Reserva de mesas online con selección de fecha y hora',
        icon: '📅'
      },
      {
        title: 'Galería Gastronómica',
        description: 'Showcase visual de los platos más destacados del restaurante',
        icon: '📸'
      },
      {
        title: 'Información Nutricional',
        description: 'Detalles nutricionales y alérgenos de cada plato',
        icon: '🥗'
      }
    ],
    testimonial: {
      text: "El sitio web ha transformado completamente la experiencia de nuestros clientes. Las reservas online han simplificado nuestra operación y el menú digital es espectacular.",
      author: "Chef Isabella García",
      position: "Chef Ejecutiva",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg"
    }
  }
};

const ProjectDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [project, setProject] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const projectData = projectsData[id];
    if (projectData) {
      setProject(projectData);
    }
  }, [id]);

  // Mouse tracking para efectos interactivos
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-text-primary mb-4">Proyecto no encontrado</h2>
          <p className="text-text-secondary mb-8">El proyecto que buscas no existe o ha sido movido.</p>
          <Button to="/projects" className="btn-primary">
            Ver Todos los Proyectos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <motion.section
        className="section relative overflow-hidden bg-gradient-to-br from-primary-50/50 via-secondary-50/30 to-accent-50/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Interactive Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, 
                rgba(14, 165, 233, 0.15), 
                rgba(217, 70, 239, 0.15), 
                transparent 50%)`,
            }}
            transition={{
              type: "spring",
              stiffness: 1.2,
              damping: 55,
              mass: 4.5,
              duration: 7
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <motion.nav
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2 text-text-secondary">
              <Link to="/" className="hover:text-primary-600 transition-colors">Inicio</Link>
              <span>/</span>
              <Link to="/projects" className="hover:text-primary-600 transition-colors">Proyectos</Link>
              <span>/</span>
              <span className="text-text-primary">{project.title}</span>
            </div>
          </motion.nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Project Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 500 }}
              >
                {project.category}
              </motion.div>

              <h1 className="heading-lg mb-4">{project.title}</h1>
              <p className="text-xl text-text-secondary mb-6 leading-relaxed">{project.subtitle}</p>
              <p className="text-lg text-text-primary mb-8 leading-relaxed">{project.description}</p>

              {/* Project Meta */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-semibold text-text-primary mb-2">Cliente</h3>
                  <p className="text-text-secondary">{project.client}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-2">Duración</h3>
                  <p className="text-text-secondary">{project.duration}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-2">Estado</h3>
                  <span className="px-3 py-1 bg-success-100 text-success-800 rounded-full text-sm font-semibold">
                    {project.status}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-2">Año</h3>
                  <p className="text-text-secondary">{project.year}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {project.url && (
                  <Button to={project.url} className="btn-primary">
                    Ver Proyecto Live
                  </Button>
                )}
                <Button to="/contact" className="btn-outline">
                  Proyecto Similar
                </Button>
              </div>
            </motion.div>

            {/* Project Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Technologies Section */}
      <motion.section
        className="section bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-md mb-4">Tecnologías Utilizadas</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Stack tecnológico empleado para el desarrollo de este proyecto
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6">
            {project.technologies.map((tech, index) => (
              <motion.div
                key={index}
                className={`card group cursor-pointer bg-${tech.color}-50 border-${tech.color}-200 hover:bg-${tech.color}-100`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <div className="text-center p-6">
                  <div className="text-4xl mb-3">{tech.icon}</div>
                  <h3 className={`text-lg font-semibold text-${tech.color}-700`}>{tech.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="section bg-gradient-to-b from-primary-50/30 to-secondary-50/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-md mb-4">Características Principales</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Funcionalidades y características que hacen único a este proyecto
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {project.features.map((feature, index) => (
              <motion.div
                key={index}
                className="card group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="p-6 text-center">
                  <motion.div
                    className="text-5xl mb-4"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-primary-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Gallery Section */}
      {project.gallery && project.gallery.length > 1 && (
        <motion.section
          className="section bg-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-md mb-4">Galería del Proyecto</h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Diferentes vistas y secciones del proyecto desarrollado
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {/* Main Image */}
              <motion.div
                className="relative rounded-2xl overflow-hidden shadow-2xl mb-8"
                layoutId="main-image"
              >
                <img
                  src={project.gallery[selectedImage]}
                  alt={`${project.title} - Vista ${selectedImage + 1}`}
                  className="w-full h-auto"
                />
              </motion.div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-3 gap-4">
                {project.gallery.map((image, index) => (
                  <motion.button
                    key={index}
                    className={`relative rounded-lg overflow-hidden aspect-video ${selectedImage === index ? 'ring-4 ring-primary-500' : ''
                      }`}
                    onClick={() => setSelectedImage(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={image}
                      alt={`${project.title} - Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 transition-opacity ${selectedImage === index ? 'bg-primary-500/20' : 'bg-black/20 hover:bg-black/10'
                      }`} />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Testimonial Section */}
      {project.testimonial && (
        <motion.section
          className="section bg-gradient-to-br from-secondary-50/50 to-accent-50/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="card">
                <div className="p-8 md:p-12">
                  <div className="text-6xl mb-6">💬</div>
                  <blockquote className="text-2xl text-text-primary mb-8 leading-relaxed italic">
                    "{project.testimonial.text}"
                  </blockquote>

                  <div className="flex items-center justify-center">
                    <img
                      src={project.testimonial.avatar}
                      alt={project.testimonial.author}
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div className="text-left">
                      <div className="font-bold text-text-primary text-lg">
                        {project.testimonial.author}
                      </div>
                      <div className="text-text-secondary">
                        {project.testimonial.position}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* CTA Section */}
      <motion.section
        className="section relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="relative bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 rounded-3xl p-12 md:p-16 text-white text-center overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative z-10">
              <motion.h2
                className="text-4xl md:text-5xl font-bold mb-6 font-display"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                ¿Te gustó este proyecto?
              </motion.h2>

              <motion.p
                className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Podemos crear algo similar o aún mejor para tu negocio. Contáctanos y hablemos sobre tu proyecto.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  to="/contact"
                  className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Iniciar Mi Proyecto
                </Button>

                <Button
                  to="/projects"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
                >
                  Ver Más Proyectos
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default ProjectDetail;