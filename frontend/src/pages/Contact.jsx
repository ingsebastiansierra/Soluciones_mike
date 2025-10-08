import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import { sendContactEmail, validateForm } from '../services/emailService';

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

  // Mouse tracking para efectos interactivos ultra suave
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let ticking = false;
    let lastTime = 0;
    const throttleDelay = 400; // Súper lento para Contact

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
    loading: false,
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar formulario
    const validation = validateForm(formData);

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      setFormStatus({
        submitted: true,
        success: false,
        loading: false,
        message: 'Por favor corrige los errores en el formulario'
      });
      return;
    }

    // Limpiar errores y mostrar loading
    setFormErrors({});
    setFormStatus({
      submitted: false,
      success: false,
      loading: true,
      message: 'Enviando mensaje...'
    });

    try {
      // Enviar email
      const result = await sendContactEmail(formData);

      if (result.success) {
        setFormStatus({
          submitted: true,
          success: true,
          loading: false,
          message: result.message
        });

        // Limpiar formulario después del éxito
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setFormStatus({
          submitted: true,
          success: false,
          loading: false,
          message: result.message
        });
      }
    } catch (error) {
      setFormStatus({
        submitted: true,
        success: false,
        loading: false,
        message: 'Error inesperado. Por favor intenta de nuevo.'
      });
    }
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <motion.section
        className="section relative overflow-hidden bg-gradient-to-br from-primary-50/50 via-secondary-50/30 to-accent-50/50"
        id="contact-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Interactive Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-12"
            animate={{
              background: `radial-gradient(300px circle at ${mousePosition.x}% ${mousePosition.y}%, 
                rgba(14, 165, 233, 0.04), 
                rgba(217, 70, 239, 0.04), 
                transparent 80%)`,
            }}
            transition={{
              type: "spring",
              stiffness: 0.8,
              damping: 80,
              mass: 6,
              duration: 10
            }}
          />

          {/* Floating Geometric Shapes */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -18, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.06, 1],
              }}
              transition={{
                duration: Math.random() * 16 + 22,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 8,
              }}
            >
              <div
                className={`w-6 h-6 ${i % 4 === 0 ? 'bg-primary-400/10' :
                  i % 4 === 1 ? 'bg-secondary-400/10' :
                    i % 4 === 2 ? 'bg-accent-400/10' : 'bg-success-400/10'
                  } ${i % 3 === 0 ? 'rounded-full' :
                    i % 3 === 1 ? 'rounded-lg rotate-45' : 'rounded-sm'
                  } opacity-40`}
              />
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="text-center mb-20 relative"
          >
            <motion.h1
              className="heading-xl mb-8 relative inline-block"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Contacto
              <motion.div
                className="absolute -bottom-4 left-0 w-full h-2 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 1, ease: "easeOut" }}
              />
            </motion.h1>

            <motion.p
              className="text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Estamos aquí para ayudarte a hacer realidad tu próximo proyecto digital
            </motion.p>

            {/* Animated Icons */}
            <motion.div
              className="flex justify-center space-x-8 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {[
                { icon: "💬", label: "Chat" },
                { icon: "📧", label: "Email" },
                { icon: "📱", label: "Llamada" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center"
                  whileHover={{ scale: 1.1, y: -5 }}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                >
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <span className="text-sm text-text-secondary">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-6 h-10 border-2 border-primary-500 rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-3 bg-primary-500 rounded-full mt-2"
                />
              </div>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto relative z-10">
            {/* Contact Form */}
            <motion.div
              className="card relative overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Gradient Border Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

              {/* Animated Background Elements */}
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <div className="relative bg-white rounded-2xl p-8 md:p-10">
                <motion.h2
                  className="heading-md mb-8 relative inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <span className="gradient-text">Envíanos un mensaje</span>
                  <motion.div
                    className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  />
                </motion.h2>

                {/* Status Messages */}
                <AnimatePresence>
                  {formStatus.loading && (
                    <motion.div
                      className="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 text-primary-800 rounded-xl p-6 mb-8 relative overflow-hidden"
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <div className="relative flex items-center">
                        <motion.div
                          className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mr-3"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <p className="font-medium">{formStatus.message}</p>
                      </div>
                    </motion.div>
                  )}

                  {formStatus.submitted && formStatus.success && (
                    <motion.div
                      className="bg-gradient-to-r from-success-50 to-success-100 border border-success-200 text-success-800 rounded-xl p-6 mb-8 relative overflow-hidden"
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-success-400/10 to-success-600/10"
                        animate={{ x: [-100, 100] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <div className="relative flex items-center">
                        <motion.div
                          className="w-8 h-8 bg-success-500 rounded-full flex items-center justify-center mr-3"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.5 }}
                        >
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </motion.div>
                        <p className="font-medium">{formStatus.message}</p>
                      </div>
                    </motion.div>
                  )}

                  {formStatus.submitted && !formStatus.success && !formStatus.loading && (
                    <motion.div
                      className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 text-red-800 rounded-xl p-6 mb-8 relative overflow-hidden"
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <div className="relative flex items-center">
                        <motion.div
                          className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 0.3 }}
                        >
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </motion.div>
                        <p className="font-medium">{formStatus.message}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                      className="group"
                    >
                      <label htmlFor="name" className="block text-lg font-semibold mb-3 text-text-primary group-focus-within:text-primary-600 transition-colors">
                        Nombre *
                      </label>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileFocus={{ scale: 1.02 }}
                        className="relative"
                      >
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Tu nombre completo"
                          className={`w-full px-6 py-4 border-2 rounded-xl focus:ring-4 bg-gray-50 focus:bg-white transition-all duration-300 text-lg placeholder-gray-400 ${formErrors.name
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-gray-200 focus:border-primary-500 focus:ring-primary-500/20'
                            }`}
                        />
                        {formErrors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-2 flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {formErrors.name}
                          </motion.p>
                        )}
                        <motion.div
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"
                        />
                      </motion.div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="group"
                    >
                      <label htmlFor="email" className="block text-lg font-semibold mb-3 text-text-primary group-focus-within:text-secondary-600 transition-colors">
                        Correo electrónico *
                      </label>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileFocus={{ scale: 1.02 }}
                        className="relative"
                      >
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="tu@email.com"
                          className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-secondary-500/20 focus:border-secondary-500 bg-gray-50 focus:bg-white transition-all duration-300 text-lg placeholder-gray-400"
                        />
                        <motion.div
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-secondary-500/10 to-accent-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"
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
                      className="group"
                    >
                      <label htmlFor="phone" className="block text-lg font-semibold mb-3 text-text-primary group-focus-within:text-accent-600 transition-colors">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+57 300 123 4567"
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-accent-500/20 focus:border-accent-500 bg-gray-50 focus:bg-white transition-all duration-300 text-lg placeholder-gray-400"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="group"
                    >
                      <label htmlFor="subject" className="block text-lg font-semibold mb-3 text-text-primary group-focus-within:text-primary-600 transition-colors">
                        Asunto *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="¿En qué podemos ayudarte?"
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 bg-gray-50 focus:bg-white transition-all duration-300 text-lg placeholder-gray-400"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="group"
                  >
                    <label htmlFor="message" className="block text-lg font-semibold mb-3 text-text-primary group-focus-within:text-secondary-600 transition-colors">
                      Mensaje *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Cuéntanos sobre tu proyecto. ¿Qué necesitas? ¿Cuáles son tus objetivos?"
                      rows="6"
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-secondary-500/20 focus:border-secondary-500 bg-gray-50 focus:bg-white transition-all duration-300 text-lg placeholder-gray-400 resize-none"
                    ></textarea>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Button
                      type="submit"
                      disabled={formStatus.loading}
                      className={`flex-1 text-lg py-4 relative overflow-hidden group ${formStatus.loading
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'btn-primary'
                        }`}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {formStatus.loading ? (
                          <>
                            <motion.div
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            Enviar Mensaje
                          </>
                        )}
                      </span>
                      {!formStatus.loading && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
                        />
                      )}
                    </Button>

                    <Button
                      type="button"
                      onClick={() => setFormData({ name: '', email: '', phone: '', subject: '', message: '' })}
                      className="btn-outline text-lg py-4"
                    >
                      Limpiar
                    </Button>
                  </motion.div>
                </form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              className="flex flex-col space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Contact Info Card */}
              <motion.div
                className="card relative overflow-hidden group"
                whileHover={{ y: -10 }}
              >
                <div className="p-8">
                  <h2 className="heading-md mb-6">
                    <span className="gradient-text">Información de Contacto</span>
                  </h2>

                  <div className="space-y-6">
                    <motion.div
                      className="flex items-start group/item"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex-shrink-0 bg-primary-100 p-3 rounded-xl mr-4 group-hover/item:bg-primary-200 transition-colors">
                        <svg className="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary">Teléfono</h3>
                        <p className="text-text-secondary">+57 312 131 0650</p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-start group/item"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex-shrink-0 bg-secondary-100 p-3 rounded-xl mr-4 group-hover/item:bg-secondary-200 transition-colors">
                        <svg className="h-6 w-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary">Email</h3>
                        <p className="text-text-secondary">solucionesmike@gmail.com</p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-start group/item"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex-shrink-0 bg-accent-100 p-3 rounded-xl mr-4 group-hover/item:bg-accent-200 transition-colors">
                        <svg className="h-6 w-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary">Ubicación</h3>
                        <p className="text-text-secondary">Calle 5 #4-22, Samacá, Boyacá, Colombia</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Schedule Card */}
              <motion.div
                className="card relative overflow-hidden group"
                whileHover={{ y: -10 }}
              >
                <div className="p-8">
                  <h2 className="text-xl font-bold text-text-primary mb-6">
                    Horario de Atención
                  </h2>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-lg hover:bg-primary-50 transition-colors">
                      <span className="font-semibold text-text-primary">Lunes - Viernes</span>
                      <span className="text-text-secondary">9:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg hover:bg-primary-50 transition-colors">
                      <span className="font-semibold text-text-primary">Sábado</span>
                      <span className="text-text-secondary">10:00 - 14:00</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg hover:bg-primary-50 transition-colors">
                      <span className="font-semibold text-text-primary">Domingo</span>
                      <span className="text-text-secondary">Cerrado</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Map Section */}
      <motion.section
        className="section bg-gradient-to-br from-accent-50/50 to-primary-50/30 relative overflow-hidden"
        id="contact-map"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-md mb-4">Nuestra Ubicación</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Nos encontramos en Samacá, Boyacá. ¡Ven a visitarnos!
            </p>
          </motion.div>

          <motion.div
            className="card max-w-5xl mx-auto overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -5 }}
          >
            <div className="h-96 w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31792.02246908!2d-73.50000917910158!3d5.513333899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6a3f0ca12f6173%3A0x3812f974d3ae202!2sSamac%C3%A1%2C%20Boyac%C3%A1!5e0!3m2!1ses!2sco!4v1695123456789!5m2!1ses!2sco"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de Samacá, Boyacá"
                className="w-full h-full rounded-2xl"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;