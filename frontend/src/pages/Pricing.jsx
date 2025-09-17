import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';

const pricingPlans = [
  {
    id: 'basic',
    name: 'Páginas Básicas',
    price: 499000,
    description: 'Perfecto para pequeñas empresas y proyectos personales',
    features: [
      'Diseño responsive',
      'Hasta 5 páginas',
      'Formulario de contacto',
      'Optimización SEO básica',
      '1 mes de soporte'
    ],
    popular: false
  },
  {
    id: 'professional',
    name: 'Páginas Corporativas',
    price: 990000,
    description: 'Ideal para empresas en crecimiento y comercio electrónico',
    features: [
      'Todo lo de Páginas Básicas',
      'Funcionalidad de comercio electrónico',
      'Hasta 10 páginas',
      'Sistema de gestión de contenido',
      'Optimización SEO avanzada',
      '3 meses de soporte',
      'Optimización de rendimiento'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Páginas a la Medida',
    price: 1490000,
    description: 'Para empresas grandes con requisitos complejos',
    features: [
      'Todo lo de Páginas Corporativas',
      'Páginas ilimitadas',
      'Funcionalidad personalizada',
      'Integración de base de datos',
      'Desarrollo de API',
      'Analítica avanzada',
      '6 meses de soporte',
      'Respuesta prioritaria'
    ],
    popular: false
  }
];

// Variantes para animación de texto letra por letra
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

const Pricing = () => {
  const { t } = useTranslation();
  
  // Referencias para efectos de parallax
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  
  // Configuración de efectos de parallax
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Texto para animación letra por letra
  const titleText = "Nuestros Planes de Precios";
  const titleArray = titleText.split("");

  return (
    <div className="w-full">
      {/* Hero Section */}
      <Section className="py-20 pt-16 overflow-hidden relative" id="pricing-hero">
        <div ref={heroRef} className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            className="text-center mb-20"
            style={{ opacity }}
            ref={titleRef}
          >
            <div className="overflow-hidden mb-6">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-4 inline-block"
                style={{ y: titleY }}
              >
                {titleArray.map((letter, index) => (
                  <motion.span
                    key={index}
                    custom={index}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block"
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </motion.h1>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="text-xl max-w-3xl mx-auto">Elige el plan perfecto para las necesidades de tu proyecto</p>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-10 left-1/2 transform -translate-x-1/2"
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </motion.div>

          {/* Pricing Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => {
              // Variantes para animación de cada plan
              const cardVariants = {
                hidden: { opacity: 0, y: 50 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.6, 
                    delay: index * 0.15,
                    ease: [0.22, 1, 0.36, 1]
                  } 
                },
                hover: { 
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20 
                  }
                }
              };
              
              return (
                <motion.div
                  key={plan.id}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden relative ${plan.popular ? 'ring-2 ring-accent transform md:-translate-y-4 z-10' : ''}`}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  {plan.popular && (
                    <motion.div 
                      className="bg-accent text-white text-sm font-medium px-4 py-1 text-center"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                    >
                      Más Popular
                    </motion.div>
                  )}
                  <div className="p-6 md:p-8">
                    <motion.h3 
                      className="text-2xl font-bold mb-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.15 + 0.2, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      {plan.name}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-gray-600 dark:text-gray-300 mb-6"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      {plan.description}
                    </motion.p>
                    
                    <motion.div 
                      className="mb-6"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.15 + 0.4, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-4xl font-bold">COP ${plan.price.toLocaleString('es-CO')}</span>
                      <span className="text-gray-500 dark:text-gray-400 ml-2">por proyecto</span>
                    </motion.div>
                    
                    <motion.ul 
                      className="space-y-3 mb-8"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.15 + 0.5, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      {plan.features.map((feature, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 + i * 0.05 + 0.5, duration: 0.3 }}
                          viewport={{ once: true }}
                        >
                          <svg className="h-5 w-5 text-accent mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 + 0.7, duration: 0.5 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        to="/contact" 
                        variant={plan.popular ? 'primary' : 'outline'}
                        className="w-full justify-center"
                      >
                        Seleccionar Plan
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section className="py-20" id="pricing-faq" dark>
        <div className="container mx-auto px-4 md:px-6 overflow-hidden">
          <div className="relative">
            <motion.div 
              className="text-center mb-16 relative z-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 relative inline-block">
                Preguntas Frecuentes
                <motion.span 
                  className="absolute -bottom-2 left-0 h-1 bg-accent rounded-full w-0"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </h2>
              <motion.p 
                className="text-lg md:text-xl max-w-3xl mx-auto mt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Encuentra respuestas a preguntas comunes sobre nuestros servicios y precios
              </motion.p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-6">
              {[1, 2, 3, 4, 5].map((item) => {
                // Variantes para animación de cada FAQ
                const faqVariants = {
                  hidden: { opacity: 0, x: -50 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: { 
                      duration: 0.6, 
                      delay: item * 0.1,
                      ease: [0.22, 1, 0.36, 1]
                    } 
                  },
                  hover: { 
                    scale: 1.02,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    transition: { 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 20 
                    }
                  }
                };
                
                return (
                  <motion.div 
                    key={item}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                    variants={faqVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    <div className="p-6 md:p-8">
                      <motion.h3 
                        className="text-xl md:text-2xl font-bold mb-3"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: item * 0.1 + 0.2, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        {item === 1 ? '¿Qué incluye la consulta inicial?' :
                          item === 2 ? '¿Cuánto tiempo toma completar un sitio web?' :
                          item === 3 ? '¿Ofrecen servicios de mantenimiento continuo?' :
                          item === 4 ? '¿Puedo actualizar mi plan más adelante?' :
                          '¿Proporcionan servicios de hosting?'}
                      </motion.h3>
                      <motion.p 
                        className="text-gray-600 dark:text-gray-300"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: item * 0.1 + 0.3, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        {item === 1 ? 'Nuestra consulta inicial incluye una discusión detallada de los requisitos, objetivos, cronograma y presupuesto de tu proyecto. Proporcionaremos recomendaciones y una propuesta detallada adaptada a tus necesidades.' :
                          item === 2 ? 'Los plazos del proyecto varían según la complejidad. Un sitio web básico generalmente toma de 2 a 4 semanas, mientras que proyectos más complejos con funcionalidades personalizadas pueden tomar de 6 a 12 semanas o más.' :
                          item === 3 ? 'Sí, ofrecemos servicios de mantenimiento continuo para asegurar que tu sitio web permanezca actualizado, seguro y funcionando correctamente.' :
                          item === 4 ? '¡Absolutamente! Puedes actualizar tu plan en cualquier momento a medida que tu negocio crece y evolucionan tus necesidades. Te ayudaremos a hacer la transición sin problemas a una solución más completa.' :
                          'Sí, ofrecemos soluciones de hosting confiables optimizadas para rendimiento y seguridad. Sin embargo, si prefieres usar tu propio proveedor de hosting, también podemos adaptarnos a eso.'}
                      </motion.p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="py-20" id="pricing-cta">
        <div className="container mx-auto px-4 md:px-6 overflow-hidden">
          <motion.div 
            className="bg-gradient-to-r from-accent to-accent/80 rounded-2xl p-10 md:p-16 text-white text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Elementos decorativos de fondo */}
            <motion.div 
              className="absolute top-0 left-0 w-full h-full opacity-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.2 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: `${Math.random() * 300 + 50}px`,
                    height: `${Math.random() * 300 + 50}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.3
                  }}
                  animate={{
                    y: [0, Math.random() * 30 - 15],
                    x: [0, Math.random() * 30 - 15],
                    scale: [1, Math.random() * 0.2 + 0.9]
                  }}
                  transition={{
                    duration: Math.random() * 5 + 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
            
            <div className="relative z-10">
              <motion.h2 
                className="text-3xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                ¿Listo para comenzar tu proyecto?
              </motion.h2>
              
              <motion.p 
                className="text-lg md:text-xl mb-10 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Contáctanos hoy para una consulta gratuita y descubre cómo podemos ayudarte a alcanzar tus objetivos
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  to="/contact" 
                  variant="light" 
                  size="lg"
                  className="inline-block px-8 py-4 text-lg font-bold shadow-lg"
                >
                  Contactar Ahora
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default Pricing;