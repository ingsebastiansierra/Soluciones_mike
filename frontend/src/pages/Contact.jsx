import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';

// Variantes para la animación letra por letra
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

// Componente para animar texto letra por letra
const AnimatedText = ({ text, className }) => {
  return (
    <span className={`inline-block ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          custom={index}
          variants={letterVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

const Contact = () => {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Efectos de parallax
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus({ submitted: true, success: true, message: t('contact.form.successMessage') });
    // In a real implementation, you would send the form data to your backend
    // and handle success/error responses
    
    // Reset form after successful submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <Section className="py-12 pt-4 relative overflow-hidden" id="contact-hero">
        {/* Elementos decorativos de fondo */}
        <motion.div 
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 15, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-accent/10 blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, -15, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            ref={heroRef}
            className="text-center mb-16 relative"
            style={{ y, opacity }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 relative inline-block">
              <AnimatedText text="Contacto" className="relative" />
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-1 bg-accent"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              />
            </h1>
            <motion.p 
              className="text-lg max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Estamos aquí para ayudarte con tu próximo proyecto
            </motion.p>
            
            {/* Elemento decorativo SVG */}
            <motion.div 
              className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-accent/30"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
              </svg>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto relative z-10">
            {/* Contact Form */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8 relative overflow-hidden border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ 
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              {/* Elemento decorativo */}
              <motion.div 
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-blue-500/10 blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
              
              <motion.h2 
                className="text-2xl font-bold mb-6 relative inline-block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                Envíanos un mensaje
                <motion.span 
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
              </motion.h2>
              
              {formStatus.submitted && formStatus.success ? (
                <motion.div 
                  className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 rounded-lg p-4 mb-6"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <p>{formStatus.message}</p>
                </motion.div>
              ) : null}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Nombre
                    </label>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ duration: 0.2 }}
                    >
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent bg-white dark:bg-gray-900 transition-all duration-300"
                      />
                    </motion.div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Correo electrónico
                    </label>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ duration: 0.2 }}
                    >
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent bg-white dark:bg-gray-900 transition-all duration-300"
                      />
                    </motion.div>
                  </motion.div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Teléfono
                    </label>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ duration: 0.2 }}
                    >
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent bg-white dark:bg-gray-900 transition-all duration-300"
                      />
                    </motion.div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Asunto
                    </label>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ duration: 0.2 }}
                    >
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent bg-white dark:bg-gray-900 transition-all duration-300"
                      />
                    </motion.div>
                  </motion.div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Mensaje
                  </label>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.2 }}
                  >
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent bg-white dark:bg-gray-900 transition-all duration-300"
                    ></textarea>
                  </motion.div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Button 
                    type="submit" 
                    variant="primary"
                    className="w-full md:w-auto justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Enviar mensaje
                  </Button>
                </motion.div>
              </form>
            </motion.div>
            
            {/* Contact Information */}
            <motion.div
              className="flex flex-col justify-between"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
                whileHover={{ 
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                  y: -5,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Elemento decorativo */}
                <motion.div 
                  className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-accent/10 blur-xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
                
                <motion.h2 
                  className="text-2xl font-bold mb-6 relative inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  Información de contacto
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  />
                </motion.h2>
                
                <div className="space-y-6">
                  <motion.div 
                    className="flex items-start"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <motion.div 
                      className="flex-shrink-0 bg-accent/20 dark:bg-accent/30 p-3 rounded-full mr-4"
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: 15,
                        backgroundColor: "rgba(var(--color-accent), 0.3)"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg className="h-6 w-6 text-accent dark:text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-medium">Teléfono</h3>
                      <p className="mt-1">+34 612 345 678</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <motion.div 
                      className="flex-shrink-0 bg-accent/20 dark:bg-accent/30 p-3 rounded-full mr-4"
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: 15,
                        backgroundColor: "rgba(var(--color-accent), 0.3)"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg className="h-6 w-6 text-accent dark:text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-medium">Correo electrónico</h3>
                      <p className="mt-1">info@solucionesmike.com</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <motion.div 
                      className="flex-shrink-0 bg-accent/20 dark:bg-accent/30 p-3 rounded-full mr-4"
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: 15,
                        backgroundColor: "rgba(var(--color-accent), 0.3)"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg className="h-6 w-6 text-accent dark:text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-medium">Dirección</h3>
                      <p className="mt-1">Calle Principal 123, 28001 Madrid, España</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                whileHover={{ 
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                  y: -5,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Elemento decorativo */}
                <motion.div 
                  className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-accent/10 blur-xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
                
                <motion.h2 
                  className="text-2xl font-bold mb-6 relative inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Horario de atención
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  />
                </motion.h2>
                
                <div className="space-y-4">
                  <motion.div 
                    className="flex justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    whileHover={{ x: 5 }}
                  >
                    <span className="font-medium">Lunes - Viernes</span>
                    <span>9:00 - 18:00</span>
                  </motion.div>
                  <motion.div 
                    className="flex justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    whileHover={{ x: 5 }}
                  >
                    <span className="font-medium">Sábado</span>
                    <span>10:00 - 14:00</span>
                  </motion.div>
                  <motion.div 
                    className="flex justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    whileHover={{ x: 5 }}
                  >
                    <span className="font-medium">Domingo</span>
                    <span>Cerrado</span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Map Section */}
      <Section className="py-20 relative overflow-hidden" id="contact-map" dark>
        {/* Elementos decorativos de fondo */}
        <motion.div 
          className="absolute top-20 right-10 w-64 h-64 rounded-full bg-accent/10 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 15, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, -15, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4 relative inline-block">
              <AnimatedText text="Nuestra Ubicación" className="relative" />
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-1 bg-accent"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              />
            </h2>
          </motion.div>
          
          <motion.div 
            className="rounded-xl overflow-hidden shadow-xl h-96 w-full border border-gray-700/30"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ 
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
              y: -10,
              transition: { duration: 0.4 }
            }}
          >
            {/* This would be replaced with an actual map component in a real implementation */}
            <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center relative overflow-hidden">
              {/* Elementos decorativos dentro del mapa */}
              <motion.div 
                className="absolute top-10 left-10 w-20 h-20 rounded-full bg-accent/20 blur-xl"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
              <motion.div 
                className="absolute bottom-10 right-10 w-20 h-20 rounded-full bg-blue-500/20 blur-xl"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-col items-center"
              >
                <motion.div 
                  className="w-16 h-16 bg-accent/90 rounded-full flex items-center justify-center mb-4 text-white"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                  </svg>
                </motion.div>
                <p className="text-lg font-medium bg-white/90 dark:bg-gray-800/90 px-6 py-3 rounded-lg shadow-lg">
                  {t('contact.map.placeholder')}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default Contact;