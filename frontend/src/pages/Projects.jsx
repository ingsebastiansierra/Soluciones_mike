import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Section from '../components/ui/Section';
import ProjectCard from '../components/projects/ProjectCard';

// Mock data for projects (will be replaced with Supabase data later)
const mockProjects = [
  {
    id: 1,
    titleKey: 'projects.examples.simple.lawyer.title',
    descriptionKey: 'projects.examples.simple.lawyer.description',
    image: '/images/websites/lawyer.svg',
    category: 'simple',
    technologies: ['React', 'CSS'],
    url: '/paginas_simples/abogado'
  },
  {
    id: 2,
    titleKey: 'projects.examples.simple.barbershop.title',
    descriptionKey: 'projects.examples.simple.barbershop.description',
    image: '/images/websites/barbershop.svg',
    category: 'simple',
    technologies: ['React', 'CSS'],
    url: '/paginas_simples/barberia'
  },
  {
    id: 3,
    titleKey: 'projects.examples.corporate.website.title',
    descriptionKey: 'projects.examples.corporate.website.description',
    image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'corporate',
    technologies: ['React', 'Bootstrap', 'Node.js']
  },
  {
    id: 4,
    titleKey: 'projects.examples.corporate.news.title',
    descriptionKey: 'projects.examples.corporate.news.description',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'corporate',
    technologies: ['React', 'Node.js', 'MongoDB']
  },
  {
    id: 5,
    titleKey: 'projects.examples.custom.ecommerce.title',
    descriptionKey: 'projects.examples.custom.ecommerce.description',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'custom',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe']
  },
  {
    id: 6,
    titleKey: 'projects.examples.custom.realestate.title',
    descriptionKey: 'projects.examples.custom.realestate.description',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'custom',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS']
  },
];

const Projects = () => {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Efectos de parallax y transformación basados en scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Filter projects by category
  const simpleProjects = mockProjects.filter(project => project.category === 'simple');
  const corporateProjects = mockProjects.filter(project => project.category === 'corporate');
  const customProjects = mockProjects.filter(project => project.category === 'custom');

  // Variantes para animación de letras
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  // Texto para animar letra por letra
  const titleText = t('projects.title');

  return (
    <div className="w-full">
      {/* Hero Section */}
      <Section className="py-20 min-h-[40vh] flex items-center" id="projects-hero">
        <motion.div 
          ref={heroRef}
          className="text-center mb-16 relative z-10 w-full"
          style={{ y, opacity }}
        >
          <div className="overflow-hidden mb-6">
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4 flex justify-center">
                {titleText.split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    custom={index}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block"
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </h1>
            </motion.div>
          </div>
          
          {/* Subtítulo eliminado según solicitud del cliente */}
          
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="w-16 h-16 mx-auto">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="animate-bounce"
              >
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </Section>

      {/* Simple Websites Section */}
      <Section className="py-20 bg-gray-50" id="simple-websites">
        <div className="container mx-auto px-4">
          <div className="overflow-hidden mb-12">
            <motion.div 
              className="text-center"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-3 relative inline-block">
                {t('projects.sections.simple.title')}
                <motion.span 
                  className="absolute -bottom-2 left-0 w-full h-1 bg-accent"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </h2>
              <motion.p 
                className="text-lg max-w-3xl mx-auto mt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {t('projects.sections.simple.description')}
              </motion.p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {simpleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <ProjectCard 
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  titleKey={project.titleKey}
                  descriptionKey={project.descriptionKey}
                  image={project.image}
                  category={project.category}
                  technologies={project.technologies}
                  url={project.url}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Corporate Websites Section */}
      <Section className="py-20" id="corporate-websites">
        <div className="container mx-auto px-4">
          <div className="overflow-hidden mb-12">
            <motion.div 
              className="text-center"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-3 relative inline-block">
                {t('projects.sections.corporate.title')}
                <motion.span 
                  className="absolute -bottom-2 left-0 w-full h-1 bg-accent"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </h2>
              <motion.p 
                className="text-lg max-w-3xl mx-auto mt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {t('projects.sections.corporate.description')}
              </motion.p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {corporateProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <ProjectCard 
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  titleKey={project.titleKey}
                  descriptionKey={project.descriptionKey}
                  image={project.image}
                  category={project.category}
                  technologies={project.technologies}
                  url={project.url}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Custom Websites Section */}
      <Section className="py-20 bg-gray-50" id="custom-websites">
        <div className="container mx-auto px-4">
          <div className="overflow-hidden mb-12">
            <motion.div 
              className="text-center"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-3 relative inline-block">
                {t('projects.sections.custom.title')}
                <motion.span 
                  className="absolute -bottom-2 left-0 w-full h-1 bg-accent"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </h2>
              <motion.p 
                className="text-lg max-w-3xl mx-auto mt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {t('projects.sections.custom.description')}
              </motion.p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {customProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <ProjectCard 
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  titleKey={project.titleKey}
                  descriptionKey={project.descriptionKey}
                  image={project.image}
                  category={project.category}
                  technologies={project.technologies}
                  url={project.url}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Projects;