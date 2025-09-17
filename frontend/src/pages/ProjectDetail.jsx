import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';

// Mock data for projects (will be replaced with Supabase data later)
const mockProjects = [
  {
    id: 1,
    title: 'Plataforma de Comercio Electrónico',
    description: 'Una plataforma moderna de comercio electrónico con funcionalidad de carrito e integración de pagos.',
    fullDescription: 'Esta solución integral de comercio electrónico proporciona a las empresas una plataforma robusta para vender productos en línea. Las características incluyen gestión de catálogo de productos, funcionalidad de carrito de compras, procesamiento seguro de pagos, gestión de pedidos y cuentas de clientes. La plataforma está construida pensando en la escalabilidad, permitiendo a las empresas hacer crecer su presencia en línea sin limitaciones técnicas.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    category: 'custom',
    technologies: ['React', 'Node.js', 'MongoDB'],
    client: 'RetailCorp Inc.',
    date: '2023-05-15',
    url: 'https://example.com'
  },
  {
    id: 2,
    title: 'Aplicación de Gestión de Tareas',
    description: 'Una aplicación de productividad para gestionar tareas y proyectos con colaboración en equipo.',
    fullDescription: 'Esta aplicación de gestión de tareas ayuda a los equipos a organizar su trabajo de manera eficiente. Incluye características como creación y asignación de tareas, organización de proyectos, seguimiento de plazos, monitoreo de progreso y herramientas de colaboración en equipo. La interfaz intuitiva facilita a los equipos mantenerse al día con su carga de trabajo y asegurarse de que nada se quede sin atender.',
    image: 'https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607706189992-eae578626c86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    category: 'custom',
    technologies: ['React Native', 'Firebase', 'Redux'],
    client: 'ProductivityTech',
    date: '2023-07-22',
    url: 'https://example.com'
  },
  {
    id: 3,
    title: 'Sitio Web de Portafolio',
    description: 'Un sitio web de portafolio responsivo que muestra trabajo creativo y experiencia profesional.',
    fullDescription: 'Este sitio web de portafolio fue diseñado para mostrar el trabajo creativo y la experiencia profesional del cliente de una manera visualmente atractiva e interactiva. El diseño responsivo garantiza una experiencia de visualización óptima en todos los dispositivos. Las características incluyen galerías de proyectos, transiciones animadas, formularios de contacto e integración con plataformas de redes sociales.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545235617-7a424c1a60cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    category: 'simple',
    technologies: ['HTML/CSS', 'JavaScript', 'GSAP'],
    client: 'Creative Studio',
    date: '2023-03-10',
    url: 'https://example.com'
  },
];

const ProjectDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  
  // Find the project with the matching ID
  const project = mockProjects.find(p => p.id === parseInt(id)) || mockProjects[0];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <Section className="py-20" id="project-hero">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-8">
            <motion.div 
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-lg overflow-hidden h-[400px] relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
              
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mr-2">
                  {project.category === 'web' ? t('projects.filters.web') : t('projects.filters.mobile')}
                </span>
                {project.technologies.map((tech, index) => (
                  <span key={index} className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium mr-2 mb-2">
                    {tech}
                  </span>
                ))}
              </div>
              
              <p className="text-lg mb-6">{project.fullDescription}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-bold text-gray-700 dark:text-gray-300">{t('projects.detail.client')}</h3>
                  <p>{project.client}</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-700 dark:text-gray-300">{t('projects.detail.date')}</h3>
                  <p>{new Date(project.date).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button as="a" href={project.url} target="_blank" variant="primary">
                  {t('projects.detail.viewLive')}
                </Button>
                <Button to="/projects" variant="outline">
                  {t('projects.detail.backToProjects')}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>
      
      {/* Gallery Section */}
      <Section className="py-20" id="project-gallery" dark>
        <div className="container mx-auto px-4 md:px-6">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('projects.detail.gallery')}
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.gallery.map((image, index) => (
              <motion.div 
                key={index}
                className="rounded-lg overflow-hidden h-[250px] relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img 
                  src={image} 
                  alt={`${project.title} - ${t('projects.imageAlt')} ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
      
      {/* Related Projects Section */}
      <Section className="py-20" id="related-projects">
        <div className="container mx-auto px-4 md:px-6">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('projects.detail.relatedProjects')}
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockProjects
              .filter(p => p.id !== project.id)
              .slice(0, 3)
              .map((relatedProject, index) => (
                <motion.div 
                  key={relatedProject.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={relatedProject.image} 
                      alt={relatedProject.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{relatedProject.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{relatedProject.description}</p>
                    <Link 
                      to={`/projects/${relatedProject.id}`} 
                      className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                    >
                      {t('projects.viewProject')} →
                    </Link>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default ProjectDetail;