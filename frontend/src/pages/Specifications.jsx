import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../components/ui/Section';

// Variantes para la animación de texto letra por letra
const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

const Specifications = () => {
  const { t } = useTranslation();
  

  
  // Función para animar el texto letra por letra
  const AnimatedText = ({ text, className }) => {
    return (
      <motion.span className={`inline-block ${className}`}>
        {Array.from(text).map((letter, index) => (
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
      </motion.span>
    );
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <Section className="py-32 relative overflow-hidden" id="specs-hero">
        <motion.div 
          className="absolute inset-0 w-full h-full z-0"
        >
          <div className="absolute top-20 right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </motion.div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            className="text-center mb-16 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 overflow-hidden">
              <AnimatedText text={t('specs.title')} />
            </h1>
            
            <motion.p 
              className="text-lg md:text-xl max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {t('specs.subtitle')}
            </motion.p>
            
            {/* Elemento decorativo animado */}
            <motion.div
              className="absolute left-1/2 -bottom-16 transform -translate-x-1/2"
              animate={{ 
                y: [0, -15, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5L12 19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </motion.div>

          {/* Work Process */}
          <div className="mb-32 relative overflow-hidden">
            <motion.div
              className="text-center mb-16 relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-3 relative inline-block">
                {t('specs.process.title')}
                <motion.span 
                  className="absolute -bottom-2 left-0 w-full h-1 bg-accent"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </h2>
              <motion.p 
                className="text-lg max-w-2xl mx-auto mt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Metodología estructurada para garantizar resultados de calidad en cada proyecto
              </motion.p>
            </motion.div>
            
            {/* Línea de tiempo conectora */}
            <motion.div 
              className="absolute left-1/2 top-32 bottom-0 w-1 bg-gradient-to-b from-accent to-transparent hidden lg:block"
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 relative z-10">
              {Array.from({ length: 6 }).map((_, index) => (
                <motion.div 
                  key={index}
                  className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 relative overflow-hidden group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: 0.1 * index, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* Fondo decorativo */}
                  <motion.div 
                    className="absolute -right-10 -top-10 w-40 h-40 bg-accent/5 rounded-full"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + 0.1 * index }}
                  />
                  
                  <motion.div 
                    className="flex items-center justify-center w-16 h-16 bg-accent/10 text-accent rounded-full mb-6 relative z-10"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      delay: 0.3 + 0.1 * index 
                    }}
                  >
                    <span className="font-bold text-2xl">{index + 1}</span>
                  </motion.div>
                  
                  <motion.h3 
                    className="text-xl font-bold mb-3 relative z-10"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + 0.1 * index }}
                  >
                    {t(`specs.process.steps.${index}.title`, `Paso ${index + 1}`)}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-600 dark:text-gray-300 relative z-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + 0.1 * index }}
                  >
                    {t(`specs.process.steps.${index}.description`, 'Descripción del paso')}
                  </motion.p>
                  
                  {/* Línea conectora */}
                  <motion.div 
                    className="absolute top-1/2 -right-4 w-4 h-1 bg-accent/50 hidden lg:block"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.6 + 0.1 * index }}
                    style={{ display: (index + 1) % 3 === 0 ? 'none' : 'block' }}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-32 relative overflow-hidden">
            <motion.div
              className="text-center mb-16 relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-3 relative inline-block">
                {t('specs.requirements.title')}
                <motion.span 
                  className="absolute -bottom-2 left-0 w-full h-1 bg-accent"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </h2>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-10 max-w-4xl mx-auto relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ 
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              {/* Elemento decorativo */}
              <motion.div 
                className="absolute -right-20 -top-20 w-80 h-80 bg-accent/5 rounded-full"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              
              <ul className="space-y-6 relative z-10">
                {Array.from({ length: 5 }).map((_, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.2 * index,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        type: "spring",
                        stiffness: 300,
                        delay: 0.3 + 0.2 * index 
                      }}
                      className="flex-shrink-0"
                    >
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 mr-4">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </motion.div>
                    
                    <div>
                      <motion.span 
                        className="text-lg font-medium"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 + 0.2 * index }}
                      >
                        {t(`specs.requirements.items.${index}`, `Requisito ${index + 1}`)}
                      </motion.span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Deliverables */}
          <div className="mb-20 relative overflow-hidden">
            <motion.div
              className="text-center mb-16 relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-3 relative inline-block">
                {t('specs.deliverables.title')}
                <motion.span 
                  className="absolute -bottom-2 left-0 w-full h-1 bg-accent"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </h2>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-accent/10 to-transparent rounded-xl shadow-lg p-10 max-w-4xl mx-auto relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ 
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {Array.from({ length: 4 }).map((_, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.2 * index,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        type: "spring",
                        stiffness: 300,
                        delay: 0.3 + 0.2 * index 
                      }}
                      className="flex-shrink-0"
                    >
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent/20 text-accent mr-4">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                    </motion.div>
                    
                    <div>
                      <motion.span 
                        className="text-lg font-medium"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 + 0.2 * index }}
                      >
                        {t(`specs.deliverables.items.${index}`, `Entregable ${index + 1}`)}
                      </motion.span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Elementos decorativos */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-accent/5"
                  style={{
                    width: `${Math.random() * 200 + 50}px`,
                    height: `${Math.random() * 200 + 50}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.3
                  }}
                  animate={{
                    y: [0, Math.random() * 20 - 10],
                    x: [0, Math.random() * 20 - 10],
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
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Specifications;