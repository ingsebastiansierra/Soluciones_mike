import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';

const fadeIn = {
  hidden: {
    y: 100,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: 'easeOut'
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Componente de carrusel para proyectos destacados
const ProjectsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const carouselRef = useRef(null);
  
  // Datos de proyectos para el carrusel
  const projects = [
    {
      id: 1,
      title: "Desarrollo Web",
      description: "Sitio web moderno con las últimas tecnologías",
      category: "Desarrollo Web",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "E-commerce Premium",
      description: "Tienda online con experiencia de usuario excepcional",
      category: "E-commerce",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Aplicación Móvil",
      description: "App multiplataforma con diseño intuitivo",
      category: "Aplicación",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Dashboard Analytics",
      description: "Panel de control con visualización de datos avanzada",
      category: "Dashboard",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Plataforma Educativa",
      description: "Sistema de gestión de aprendizaje personalizado",
      category: "Educación",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Navegar al proyecto anterior
  const prevSlide = () => {
    setDirection('right');
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  // Navegar al proyecto siguiente
  const nextSlide = () => {
    setDirection('left');
    setCurrentIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Variantes de animación para el carrusel
  const slideVariants = {
    hiddenLeft: {
      x: '100%',
      opacity: 0,
    },
    hiddenRight: {
      x: '-100%',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (direction) => ({
      x: direction === 'left' ? '-100%' : '100%',
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    }),
  };

  // Efecto para autoplay del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden w-full" ref={carouselRef}>
      <div className="aspect-w-16 aspect-h-9 w-full max-w-5xl mx-auto relative">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial={direction === 'left' ? 'hiddenLeft' : 'hiddenRight'}
            animate="visible"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full flex flex-col md:flex-row">
              <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                <img 
                  src={projects[currentIndex].image} 
                  alt={projects[currentIndex].title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <span className="text-sm font-medium bg-accent px-2 py-1 rounded">
                      {projects[currentIndex].category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6 md:w-1/2 flex flex-col justify-center">
                <motion.h3 
                  className="text-2xl font-bold mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {projects[currentIndex].title}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 dark:text-gray-300 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {projects[currentIndex].description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button to={`/projects/${projects[currentIndex].id}`} variant="primary" size="md">
                    Ver proyecto
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controles de navegación */}
      <div className="flex justify-center mt-6 space-x-4">
        <button 
          onClick={prevSlide} 
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-accent hover:text-white transition-colors"
          aria-label="Proyecto anterior"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 'left' : 'right');
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-accent' : 'bg-gray-300 dark:bg-gray-600'}`}
              aria-label={`Ir al proyecto ${index + 1}`}
            />
          ))}
        </div>
        <button 
          onClick={nextSlide} 
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-accent hover:text-white transition-colors"
          aria-label="Proyecto siguiente"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <Section className="min-h-[80vh] flex items-center pt-4" id="hero">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div 
            className="flex-1"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              variants={fadeIn}
            >
              {t('home.hero.title')}
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl mb-8 text-gray-700 dark:text-gray-300 max-w-2xl"
              variants={fadeIn}
            >
              {t('home.hero.subtitle')}
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={fadeIn}
            >
              <Button to="/projects" variant="primary" size="lg">
                Proyectos
              </Button>
              <Button to="/contact" variant="outline" size="lg">
                Contacto
              </Button>
            </motion.div>
          </motion.div>
          <motion.div 
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-full h-[400px] rounded-lg shadow-xl overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt={t('home.hero.imageAlt')} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <span className="text-white text-lg font-medium">{t('home.hero.imageAlt')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Services Section */}
      <Section className="py-12" id="services" dark>
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.services.title')}</h2>
            <p className="text-lg max-w-3xl mx-auto">{t('home.services.subtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
                  <img 
                    src={index === 1 ? 
                      "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" : 
                      index === 2 ? 
                      "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" : 
                      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"} 
                    alt={`Servicio ${index}`} 
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">{index === 1 ? "Desarrollo Web" : index === 2 ? "Diseño UX/UI" : "Consultoría IT"}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{index === 1 ? "Creación de sitios web modernos y responsivos con las últimas tecnologías" : index === 2 ? "Diseño de interfaces intuitivas y experiencias de usuario excepcionales" : "Asesoramiento experto para optimizar sus procesos tecnológicos"}</p>
                <Button to="/specifications" variant="text" size="sm" className="mt-auto">
                  {t('common.learnMore')} →
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Projects Carousel Section */}
      <Section id="projects" className="py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="container mx-auto px-4"
        >
          <motion.div 
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.projects.title')}</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('home.projects.description')}
            </p>
          </motion.div>

          <motion.div
            className="mb-12"
          >
            <ProjectsCarousel />
          </motion.div>

          <div className="text-center mt-12">
            <Button to="/projects" variant="primary" size="lg">
              {t('home.projects.viewAll')}
            </Button>
          </div>
        </motion.div>
      </Section>

      {/* Testimonials Section */}
      <Section className="py-12" id="testimonials" dark>
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Testimonios</h2>
            <p className="text-lg max-w-3xl mx-auto">Lo que dicen nuestros clientes</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full mr-4 overflow-hidden">
                    <img 
                      src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 10}.jpg`} 
                      alt={`Cliente ${index}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{index === 1 ? "Juan Pérez" : index === 2 ? "María García" : "Carlos Rodríguez"}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{index === 1 ? "Empresa ABC" : index === 2 ? "Startup XYZ" : "Corporación 123"}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">"{index === 1 ? "Excelente trabajo, superó todas mis expectativas. El sitio web quedó perfecto y en tiempo récord." : index === 2 ? "La mejor inversión que hemos hecho. Nuestras ventas aumentaron un 30% desde que lanzamos la nueva web." : "Profesionalismo y calidad en cada detalle. Recomiendo ampliamente sus servicios."}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="py-12" id="cta">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para comenzar?</h2>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">Contáctanos hoy mismo y convierte tus ideas en realidad</p>
            <Button 
              to="/contact" 
              variant="light" 
              size="lg"
              className="inline-block"
            >
              Contactar ahora
            </Button>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default Home;