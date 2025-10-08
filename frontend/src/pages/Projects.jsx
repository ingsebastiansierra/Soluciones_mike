import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import ProjectCard from '../components/projects/ProjectCard';

// Mock data for projects with enhanced information
const mockProjects = [
  {
    id: 1,
    title: 'Bufete de Abogados',
    description: 'Sitio web profesional para un bufete de abogados con secciones para servicios, equipo legal, testimonios y contacto.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'simple',
    technologies: ['React', 'CSS', 'Responsive Design'],
    url: '/paginas_simples/abogado',
    status: 'completed',
    client: 'Estudio Jurídico',
    duration: '2 semanas',
    features: ['Diseño profesional', 'Formulario de contacto', 'Sección de servicios', 'Galería de equipo']
  },
  {
    id: 2,
    title: 'Barbería Moderna',
    description: 'Sitio web moderno para una barbería con secciones para servicios, galería, precios, testimonios y reserva de citas.',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'simple',
    technologies: ['React', 'CSS', 'JavaScript'],
    url: '/paginas_simples/barberia',
    status: 'completed',
    client: 'Barbería Premium',
    duration: '3 semanas',
    features: ['Galería interactiva', 'Sistema de reservas', 'Lista de precios', 'Testimonios']
  },
  {
    id: 3,
    title: 'Restaurante Gourmet',
    description: 'Sitio web elegante para un restaurante con menú interactivo, reservas online y galería de platos.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'simple',
    technologies: ['React', 'CSS', 'Bootstrap', 'jQuery'],
    url: '/paginas_simples/restaurante',
    status: 'completed',
    client: 'Restaurante Gourmet',
    duration: '4 semanas',
    features: ['Menú digital', 'Reservas online', 'Galería de platos', 'Información nutricional']
  },
  {
    id: 4,
    title: 'Sitio Corporativo',
    description: 'Plataforma web corporativa completa con múltiples secciones, blog y panel administrativo.',
    image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'corporate',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    status: 'in-progress',
    client: 'Empresa Tecnológica',
    duration: '8 semanas',
    features: ['Panel administrativo', 'Blog integrado', 'Sistema de usuarios', 'Analytics avanzado']
  },
  {
    id: 5,
    title: 'Portal de Noticias',
    description: 'Portal de noticias dinámico con sistema de gestión de contenido y múltiples categorías.',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'corporate',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    status: 'completed',
    client: 'Medio Digital',
    duration: '12 semanas',
    features: ['CMS personalizado', 'Múltiples categorías', 'Sistema de comentarios', 'SEO optimizado']
  },
  {
    id: 6,
    title: 'E-commerce Fashion',
    description: 'Tienda online completa para moda con carrito de compras, pagos integrados y gestión de inventario.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'ecommerce',
    technologies: ['React', 'Node.js', 'Stripe', 'MongoDB'],
    status: 'completed',
    client: 'Boutique Online',
    duration: '16 semanas',
    features: ['Carrito de compras', 'Pagos seguros', 'Gestión de inventario', 'Panel de vendedor']
  },
  {
    id: 7,
    title: 'App de Delivery',
    description: 'Aplicación web para delivery de comida con seguimiento en tiempo real y múltiples restaurantes.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'webapp',
    technologies: ['React', 'Node.js', 'Socket.io', 'Google Maps API'],
    status: 'in-progress',
    client: 'Startup Delivery',
    duration: '20 semanas',
    features: ['Seguimiento en tiempo real', 'Múltiples restaurantes', 'Sistema de calificaciones', 'Notificaciones push']
  },
  {
    id: 8,
    title: 'Dashboard Analytics',
    description: 'Panel de control avanzado para análisis de datos con gráficos interactivos y reportes automáticos.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'webapp',
    technologies: ['React', 'D3.js', 'Python', 'FastAPI'],
    status: 'completed',
    client: 'Empresa de Analytics',
    duration: '14 semanas',
    features: ['Gráficos interactivos', 'Reportes automáticos', 'Filtros avanzados', 'Exportación de datos']
  }
];

const categories = [
  { id: 'all', name: 'Todos', icon: '🌟', color: 'primary' },
  { id: 'simple', name: 'Sitios Simples', icon: '🚀', color: 'secondary' },
  { id: 'corporate', name: 'Corporativo', icon: '🏢', color: 'accent' },
  { id: 'ecommerce', name: 'E-commerce', icon: '🛒', color: 'success' },
  { id: 'webapp', name: 'Web Apps', icon: '⚡', color: 'warning' }
];

const Projects = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(mockProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });


  // Mouse tracking para efectos interactivos ultra suave
  useEffect(() => {
    let ticking = false;
    let lastTime = 0;
    const throttleDelay = 250; // Mucho más lento para Projects

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

  // Filter projects based on category and search term
  useEffect(() => {
    let filtered = mockProjects;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredProjects(filtered);
  }, [selectedCategory, searchTerm]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      case 'planning': return 'primary';
      default: return 'gray';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completado';
      case 'in-progress': return 'En Progreso';
      case 'planning': return 'Planificación';
      default: return 'Desconocido';
    }
  };

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
            className="absolute inset-0 opacity-20"
            animate={{
              background: `radial-gradient(400px circle at ${mousePosition.x}% ${mousePosition.y}%, 
                rgba(14, 165, 233, 0.08), 
                rgba(217, 70, 239, 0.08), 
                transparent 60%)`,
            }}
            transition={{
              type: "spring",
              stiffness: 1.5,
              damping: 50,
              mass: 4,
              duration: 6
            }}
          />

          {/* Floating Project Icons */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: Math.random() * 15 + 20,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 8,
              }}
            >
              <div className={`w-10 h-10 ${i % 4 === 0 ? 'bg-primary-400/15' :
                i % 4 === 1 ? 'bg-secondary-400/15' :
                  i % 4 === 2 ? 'bg-accent-400/15' : 'bg-success-400/15'
                } rounded-full flex items-center justify-center text-lg opacity-60`}>
                {i % 4 === 0 ? '💻' : i % 4 === 1 ? '🎨' : i % 4 === 2 ? '⚡' : '🚀'}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="heading-xl mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Nuestros Proyectos
            </motion.h1>

            <motion.p
              className="text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Explora nuestra colección de proyectos web, desde sitios simples hasta aplicaciones complejas
            </motion.p>

            {/* Search Bar */}
            <motion.div
              className="max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar proyectos por nombre, descripción o tecnología..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pl-14 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 bg-white/80 backdrop-blur-sm transition-all duration-300"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${selectedCategory === category.id
                    ? `bg-${category.color}-500 text-white shadow-lg scale-105`
                    : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Grid Section */}
      <motion.section
        className="section bg-gradient-to-b from-transparent to-primary-50/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Counter */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-xl text-text-secondary">
              {filteredProjects.length === 0
                ? 'No se encontraron proyectos'
                : `${filteredProjects.length} proyecto${filteredProjects.length !== 1 ? 's' : ''} encontrado${filteredProjects.length !== 1 ? 's' : ''}`
              }
            </p>
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              layout
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <div className="card relative overflow-hidden h-full">
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(project.status) === 'success' ? 'bg-success-100 text-success-800' :
                        getStatusColor(project.status) === 'warning' ? 'bg-warning-100 text-warning-800' :
                          'bg-primary-100 text-primary-800'
                        }`}>
                        {getStatusText(project.status)}
                      </span>
                    </div>

                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden rounded-t-2xl">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        whileHover={{ scale: 1.1 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-primary-600 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-text-secondary mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Project Details */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-sm text-text-secondary">
                          <span className="font-semibold mr-2">Cliente:</span>
                          {project.client}
                        </div>
                        <div className="flex items-center text-sm text-text-secondary">
                          <span className="font-semibold mr-2">Duración:</span>
                          {project.duration}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                            whileHover={{ scale: 1.1 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-text-primary mb-2">Características:</h4>
                        <ul className="space-y-1">
                          {project.features?.slice(0, 3).map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-sm text-text-secondary">
                              <div className="w-2 h-2 bg-primary-500 rounded-full mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        {project.url && (
                          <Button
                            to={project.url}
                            className="btn-primary flex-1 text-center"
                          >
                            Ver Proyecto
                          </Button>
                        )}
                        <Button
                          to={`/projects/${project.id}`}
                          className="btn-outline flex-1 text-center"
                        >
                          Detalles
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-8xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                No se encontraron proyectos
              </h3>
              <p className="text-text-secondary mb-8 max-w-md mx-auto">
                Intenta cambiar los filtros o el término de búsqueda para encontrar más proyectos.
              </p>
              <Button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                }}
                className="btn-primary"
              >
                Mostrar Todos los Proyectos
              </Button>
            </motion.div>
          )}
        </div>
      </motion.section>

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
                ¿Tienes un proyecto en mente?
              </motion.h2>

              <motion.p
                className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Trabajemos juntos para crear algo increíble. Contáctanos y hagamos realidad tu visión digital.
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
                  Iniciar Proyecto
                </Button>

                <Button
                  to="/pricing"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
                >
                  Ver Precios
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Projects;