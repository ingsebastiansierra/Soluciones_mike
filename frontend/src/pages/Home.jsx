import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import ProjectCard from '../components/projects/ProjectCard';

// Se eliminaron las animaciones de framer-motion

// Se eliminaron las animaciones de texto con efecto de escritura

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



const Home = () => {
  const { t } = useTranslation();
  
  // Estado para el carrusel 3D
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [direction, setDirection] = useState(null);
  
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

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white bg-cover bg-center overflow-hidden" 
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAiI_L6VJurcvFqto6d8EImdEFsaT427Sj7wbqyQrXFs24PPo8DOe_AStpmWaBf_YiLZf85eO2AKrerhHJBsWt6BuUSg8aWy3Zk2RON3MoQ2-bVc7EsgOVdu55Nkfkfy--T1MgplwmBPJ7j9vtW6P9r5DJmxWgsoSGNIvoHXrmnlxWmP6nOJDjdEws69fBaT4j-FTku_v7u1mZj8dS5WHARjUkRm8lrjcTPrBPyeLMpkLRdHrj_grXS8YodXjpNaDcYAW6SkU45fHep')"
        }}
        id="hero"
      >
        {/* Elementos decorativos */}
        <div 
          className="absolute inset-0 w-full h-full opacity-30"
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/20 backdrop-blur-sm"
              style={{
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div 
          className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10"
        >
          <div className="overflow-hidden px-4">
            <h1 
              className="text-4xl md:text-6xl font-black tracking-tighter p-4"
            >
              {t('home.hero.title')}
            </h1>
          </div>
          
          <div className="overflow-hidden">
            <p 
              className="max-w-2xl mx-auto text-lg md:text-xl text-white/90"
            >
              {t('home.hero.subtitle')}
            </p>
          </div>
          
          <div
          >
            <Button 
              to="/projects" 
              variant="primary" 
              size="lg"
              className="py-3 px-8 text-lg"
            >
              {t('home.hero.viewProjects')}
            </Button>
          </div>
        </div>
      </section>



      {/* Projects Carousel Section */}
      <section id="projects" className="py-16 sm:py-24 relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div 
          className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none"
        >
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-gradient-to-r from-primary/30 to-accent/30 rounded-full filter blur-3xl"
              style={{
                width: `${Math.random() * 500 + 300}px`,
                height: `${Math.random() * 500 + 300}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div 
            className="text-center mb-12"
          >
            <h2 
              className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent inline-block"
            >
              {t('home.projects.title')}
            </h2>
            <p 
              className="mt-4 text-lg text-foreground-light/70 dark:text-foreground-dark/70 max-w-2xl mx-auto"
            >
              {t('home.projects.subtitle')}
            </p>
          </div>

          {/* Carrusel 3D de proyectos */}
          <div className="relative overflow-hidden w-full py-12">
            <div className="w-full max-w-5xl mx-auto relative perspective-1000 h-[500px]">
              {/* Botón de navegación izquierdo */}
              <button 
                onClick={prevSlide}
                disabled={isRotating}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-white dark:bg-black border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors disabled:opacity-50 shadow-lg"
                aria-label="Proyecto anterior"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Botón de navegación derecho */}
              <button 
                onClick={nextSlide}
                disabled={isRotating}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-white dark:bg-black border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors disabled:opacity-50 shadow-lg"
                aria-label="Proyecto siguiente"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="absolute inset-0 flex items-center justify-center">
                {/* Carrusel 3D */}
                <div 
                  className="relative w-full h-full flex items-center justify-center"
                  style={{
                    perspective: '1500px',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.4s ease'
                  }}
                >
                  {projectsData.map((project, index) => {
                    // Calcular la posición de cada tarjeta en el carrusel 3D
                    let position = index - currentIndex;
                    
                    // Ajustar para el efecto circular
                    if (position < -1) {
                      position += projectsData.length;
                    } else if (position > 1) {
                      position -= projectsData.length;
                    }
                    
                    // Calcular las transformaciones 3D
                    const rotateY = position * 45; // Rotación en el eje Y
                    const translateZ = position === 0 ? 0 : -300; // Profundidad
                    const translateX = position * 350; // Posición horizontal
                    const scale = position === 0 ? 1 : 0.8; // Escala
                    const opacity = position === 0 ? 1 : 0.7; // Opacidad
                    const zIndex = position === 0 ? 10 : 5; // z-index
                    
                    return (
                      <div 
                        key={project.id}
                        className="absolute w-full max-w-md transition-all duration-100 ease-in-out"
                        style={{
                          transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                          opacity,
                          zIndex,
                          transition: 'all 0.4s ease'
                        }}
                      >
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
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Indicadores de navegación */}
            <div className="flex justify-center mt-8 space-x-3">
              {projectsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (isRotating) return;
                    setIsRotating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsRotating(false), 600);
                  }}
                  disabled={isRotating}
                  className={`w-4 h-4 rounded-full transition-all ${index === currentIndex ? 'bg-black dark:bg-white scale-125' : 'bg-gray-300 dark:bg-gray-600'} disabled:opacity-50`}
                  aria-label={`Ir al proyecto ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="text-center mt-6">
              <Button to={projectsData[currentIndex].url} variant="primary" size="md" className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                Ver proyecto
              </Button>
            </div>
          </div>

          <div 
            className="text-center mt-12"
          >
            <div>
              <Button 
                to="/projects" 
                variant="primary" 
                size="lg"
                className="py-3 px-8 text-lg relative overflow-hidden group"
              >
                <span 
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100"
                />
                {t('home.projects.viewAll')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-subtle-light to-white dark:from-subtle-dark dark:to-background-dark relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div 
          className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none"
        >
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="0.5"/>
              </pattern>
              <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect width="100" height="100" fill="url(#smallGrid)"/>
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div 
            className="text-center mb-12"
          >
            <h2 
              className="text-3xl md:text-4xl font-bold"
            >
              {t('home.videoDemo.title')}
            </h2>
            <p 
              className="mt-4 text-lg text-foreground-light/70 dark:text-foreground-dark/70 max-w-2xl mx-auto"
            >
              {t('home.videoDemo.subtitle')}
            </p>
          </div>
          
          <div 
            className="relative aspect-video rounded-xl overflow-hidden shadow-2xl max-w-4xl mx-auto"
          >
            {/* Efecto de brillo en los bordes */}
            <div 
              className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-xl blur-sm opacity-70 z-0"
            />
            
            <div className="relative z-10 rounded-xl overflow-hidden">
              <video 
                src="https://thetestdata.com/videos/1080p/5MB.mp4" 
                poster="https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                className="absolute inset-0 w-full h-full object-cover"
                controls
                autoPlay
                muted
                loop
              >
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <Section className="py-16 sm:py-24 bg-subtle-light dark:bg-subtle-dark" id="testimonials">
        <div className="container mx-auto px-4 md:px-6">
          <div 
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.testimonials.title')}</h2>
            <p className="text-lg max-w-3xl mx-auto">{t('home.testimonials.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="bg-card-light dark:bg-card-dark rounded-lg shadow-lg p-8"
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
                    <p className="text-sm text-foreground-light/70 dark:text-foreground-dark/70">{index === 1 ? "Empresa ABC" : index === 2 ? "Startup XYZ" : "Corporación 123"}</p>
                  </div>
                </div>
                <p className="text-foreground-light/80 dark:text-foreground-dark/80 italic">"{index === 1 ? "Excelente trabajo, superó todas mis expectativas. El sitio web quedó perfecto y en tiempo récord." : index === 2 ? "La mejor inversión que hemos hecho. Nuestras ventas aumentaron un 30% desde que lanzamos la nueva web." : "Profesionalismo y calidad en cada detalle. Recomiendo ampliamente sus servicios."}"</p>
              </div>
            ))}
          </div>
        </div>
      </Section>



      {/* CTA Section */}
      <Section className="py-12" id="cta">
        <div className="container mx-auto px-4 md:px-6">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.cta.title')}</h2>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">{t('home.cta.subtitle')}</p>
            <Button 
              to="/contact" 
              variant="light" 
              size="lg"
              className="inline-block"
            >
              {t('home.cta.button')}
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Home;