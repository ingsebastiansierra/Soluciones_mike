import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import ProjectCard from '../components/projects/ProjectCard';
import VideoPlayer from '../components/ui/VideoPlayer';

// Datos de proyectos para el carrusel 3D
const projectsData = [
  {
    id: 1,
    title: "Barbería",
    description: "Sitio web moderno para una barbería con secciones para servicios, galería, precios, testimonios y reserva de citas.",
    category: "simple",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "/paginas_simples/barberia",
    technologies: ['React', 'CSS']
  },
  {
    id: 2,
    title: "Bufete de Abogados",
    description: "Sitio web profesional para un bufete de abogados con secciones para servicios, equipo legal, testimonios y contacto.",
    category: "simple",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "/paginas_simples/abogado",
    technologies: ['React', 'CSS']
  },
  {
    id: 3,
    title: "Restaurante",
    description: "Sitio web elegante para un restaurante con menú interactivo, reservas online y galería de platos.",
    category: "simple",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "/paginas_simples/restaurante",
    technologies: ['React', 'CSS']
  }
];

// Video ahora se maneja con YouTube embed para mejor rendimiento

const Home = () => {
  const { t } = useTranslation();

  // Estado para el carrusel 3D
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [direction, setDirection] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Referencias
  const heroRef = useRef(null);

  // Scroll animations
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mouse tracking para efectos parallax ultra suave
  useEffect(() => {
    let ticking = false;
    let lastTime = 0;
    const throttleDelay = 200; // Mucho más lento para máxima suavidad

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (!ticking && now - lastTime > throttleDelay) {
        requestAnimationFrame(() => {
          setMousePosition({
            x: (e.clientX / window.innerWidth) * 100,
            y: (e.clientY / window.innerHeight) * 100,
          });
          lastTime = now;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Verificar que las imágenes se carguen correctamente
  useEffect(() => {
    // Precargar imágenes
    projectsData.forEach(project => {
      const img = new Image();
      img.src = project.image;
    });
  }, []);

  // Navegar al proyecto anterior
  const prevSlide = () => {
    if (isRotating) return;
    setIsRotating(true);
    setDirection('left');
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projectsData.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsRotating(false), 100);
  };

  // Navegar al proyecto siguiente
  const nextSlide = () => {
    if (isRotating) return;
    setIsRotating(true);
    setDirection('right');
    setCurrentIndex((prevIndex) =>
      prevIndex === projectsData.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsRotating(false), 100);
  };

  // Efecto para autoplay del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isRotating) {
        nextSlide();
      }
    }, 8000); // Aumentado a 8 segundos para mejor visualización
    return () => clearInterval(interval);
  }, [isRotating]);


  // Video ahora se maneja con YouTube embed para mejor rendimiento


  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center text-center overflow-hidden"
        id="hero"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-secondary-500/20 to-accent-500/20">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10 animate-gradient-x" />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full opacity-10"
              style={{
                background: `linear-gradient(45deg, 
                  ${i % 3 === 0 ? '#0ea5e9' : i % 3 === 1 ? '#d946ef' : '#f97316'}, 
                  ${i % 3 === 0 ? '#0284c7' : i % 3 === 1 ? '#c026d3' : '#ea580c'})`,
                width: `${Math.random() * 150 + 30}px`,
                height: `${Math.random() * 150 + 30}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 15 - 7.5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: Math.random() * 8 + 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Interactive Cursor Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: `radial-gradient(400px circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(14, 165, 233, 0.05), 
              rgba(217, 70, 239, 0.05), 
              transparent 60%)`,
          }}
          transition={{
            type: "spring",
            stiffness: 2,
            damping: 40,
            mass: 3,
            duration: 5
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="heading-xl mb-6 leading-tight">
              {t('home.hero.title')}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="max-w-3xl mx-auto text-xl md:text-2xl text-text-secondary leading-relaxed">
              {t('home.hero.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              to="/projects"
              className="btn-primary text-lg px-8 py-4 group relative overflow-hidden"
            >
              <span className="relative z-10">{t('home.hero.viewProjects')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </Button>

            <Button
              to="/contact"
              className="btn-outline text-lg px-8 py-4"
            >
              {t('common.menu.contact')}
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-primary-500 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-primary-500 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      ---

      {/* Projects Carousel Section */}
      <motion.section
        id="projects"
        className="py-16 relative overflow-hidden bg-gradient-to-b from-transparent to-primary-50/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="5" cy="5" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: Math.random() * 15 + 15,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div
                className={`w-12 h-12 ${i % 3 === 0 ? 'bg-primary-500/8' : i % 3 === 1 ? 'bg-secondary-500/8' : 'bg-accent-500/8'} 
                  ${i % 2 === 0 ? 'rounded-full' : 'rounded-lg rotate-45'}`}
              />
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-md mb-4">
              {t('home.projects.title')}
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              {t('home.projects.subtitle')}
            </p>
          </motion.div>

          {/* Enhanced 3D Carousel */}
          <div className="relative overflow-hidden w-full py-8">
            <div className="w-full max-w-5xl mx-auto relative perspective-1000 h-[400px]">
              {/* Navigation Buttons */}
              <motion.button
                onClick={prevSlide}
                disabled={isRotating}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-4 rounded-full glass backdrop-blur-md bg-white/20 border border-white/30 hover:bg-white/30 transition-all disabled:opacity-50 shadow-2xl group"
                aria-label="Proyecto anterior"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 group-hover:text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>

              <motion.button
                onClick={nextSlide}
                disabled={isRotating}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-4 rounded-full glass backdrop-blur-md bg-white/20 border border-white/30 hover:bg-white/30 transition-all disabled:opacity-50 shadow-2xl group"
                aria-label="Proyecto siguiente"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 group-hover:text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>

              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    className="relative w-full h-full flex items-center justify-center"
                    style={{
                      perspective: '2000px',
                      transformStyle: 'preserve-3d',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {projectsData.map((project, index) => {
                      let position = index - currentIndex;

                      if (position < -1) {
                        position += projectsData.length;
                      } else if (position > 1) {
                        position -= projectsData.length;
                      }

                      const rotateY = position * 40;
                      const translateZ = position === 0 ? 100 : -200;
                      const translateX = position * 400;
                      const scale = position === 0 ? 1.1 : 0.8;
                      const opacity = position === 0 ? 1 : 0.6;
                      const zIndex = position === 0 ? 20 : 10;

                      return (
                        <motion.div
                          key={project.id}
                          className="absolute w-full max-w-md"
                          style={{
                            transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                            opacity,
                            zIndex,
                          }}
                          animate={{
                            transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                          }}
                          transition={{
                            duration: 0.5,
                            ease: "easeInOut",
                          }}
                          whileHover={position === 0 ? {
                            scale: 1.05,
                            transition: { duration: 0.2 }
                          } : {}}
                        >
                          <div className="relative">
                            {position === 0 && (
                              <motion.div
                                className="absolute -inset-2 bg-gradient-to-r from-primary-500/15 via-secondary-500/15 to-accent-500/15 rounded-2xl blur-lg"
                                animate={{
                                  scale: [1, 1.02, 1],
                                  opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{
                                  duration: 4,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                              />
                            )}
                            <ProjectCard
                              id={project.id}
                              title={project.title}
                              description={project.description}
                              image={project.image}
                              category={project.category}
                              technologies={project.technologies}
                              url={project.url}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation Indicators */}
            <div className="flex justify-center mt-6 space-x-3">
              {projectsData.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    if (isRotating) return;
                    setIsRotating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsRotating(false), 600);
                  }}
                  disabled={isRotating}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                    } disabled:opacity-50`}
                  aria-label={`Ir al proyecto ${index + 1}`}
                  whileHover={{ scale: index === currentIndex ? 1.25 : 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <motion.div
              className="text-center mt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button
                to="/projects"
                className="btn-primary"
              >
                {t('home.projects.viewAll')}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      ---

      {/* Video Demo Section */}
      <motion.section
        className="section bg-gradient-to-br from-secondary-50/50 via-accent-50/30 to-primary-50/50 relative overflow-hidden"
        id="video-demo"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-accent-400/20 to-primary-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-lg mb-6">
              {t('home.videoDemo.title')}
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              {t('home.videoDemo.subtitle')}
            </p>
          </motion.div>

          <motion.div
            className="relative aspect-video max-w-5xl mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Glowing Border Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-2xl blur-sm opacity-75" />

            <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <VideoPlayer
                youtubeId="WPKjrxEI4Ko"
                title="Soluciones Mike - Demo de Proyectos"
                thumbnail="https://img.youtube.com/vi/WPKjrxEI4Ko/maxresdefault.jpg"
                className="relative z-10"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      ---

      {/* Testimonials Section */}
      <motion.section
        className="section bg-gradient-to-b from-primary-50/30 to-secondary-50/30 relative overflow-hidden"
        id="testimonials"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #0ea5e9 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, #d946ef 0%, transparent 50%)`,
          }} />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-lg mb-6">{t('home.testimonials.title')}</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">{t('home.testimonials.subtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Juan Pérez",
                company: "Empresa ABC",
                text: "Excelente trabajo, superó todas mis expectativas. El sitio web quedó perfecto y en tiempo récord.",
                rating: 5
              },
              {
                name: "María García",
                company: "Startup XYZ",
                text: "La mejor inversión que hemos hecho. Nuestras ventas aumentaron un 30% desde que lanzamos la nueva web.",
                rating: 5
              },
              {
                name: "Carlos Rodríguez",
                company: "Corporación 123",
                text: "Profesionalismo y calidad en cada detalle. Recomiendo ampliamente sus servicios.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="card group hover:shadow-2xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                {/* Gradient Border Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

                <div className="relative bg-white rounded-2xl p-8">
                  {/* Stars Rating */}
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.svg
                        key={i}
                        className="w-5 h-5 text-accent-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                  </div>

                  <blockquote className="text-text-primary mb-6 text-lg leading-relaxed italic">
                    "{testimonial.text}"
                  </blockquote>

                  <div className="flex items-center">
                    <motion.div
                      className="w-14 h-14 rounded-full mr-4 overflow-hidden bg-gradient-to-br from-primary-400 to-secondary-400 p-0.5"
                      whileHover={{ scale: 1.1 }}
                    >
                      <img
                        src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 10}.jpg`}
                        alt={testimonial.name}
                        className="w-full h-full object-cover rounded-full bg-white"
                      />
                    </motion.div>
                    <div>
                      <h4 className="font-bold text-text-primary text-lg">{testimonial.name}</h4>
                      <p className="text-text-secondary">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      ---

      {/* CTA Section */}
      <motion.section
        className="section relative overflow-hidden"
        id="cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="relative bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 rounded-3xl p-12 md:p-16 text-white text-center overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white/10"
                  style={{
                    width: `${Math.random() * 100 + 20}px`,
                    height: `${Math.random() * 100 + 20}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <motion.h2
                className="text-4xl md:text-6xl font-bold mb-6 font-display"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {t('home.cta.title')}
              </motion.h2>

              <motion.p
                className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed opacity-90"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {t('home.cta.subtitle')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Button
                  to="/contact"
                  className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  {t('home.cta.button')}
                </Button>

                <Button
                  to="/projects"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
                >
                  Ver Proyectos
                </Button>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute top-4 right-4 w-20 h-20 border-2 border-white/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute bottom-4 left-4 w-16 h-16 border-2 border-white/30 rounded-lg"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;