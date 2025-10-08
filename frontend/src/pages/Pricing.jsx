import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';

const pricingPlans = [
  {
    id: 'basic',
    nameKey: 'pricing.plans.basic.name',
    name: 'Básico',
    price: 499000,
    originalPrice: 699000,
    descriptionKey: 'pricing.plans.basic.description',
    description: 'Perfecto para pequeños negocios que necesitan presencia online',
    featuresKeys: [
      'Diseño responsive',
      'Hasta 5 páginas',
      'Formulario de contacto',
      'Optimización SEO básica',
      'Hosting por 1 año'
    ],
    popular: false,
    color: 'primary',
    icon: '🚀'
  },
  {
    id: 'professional',
    nameKey: 'pricing.plans.professional.name',
    name: 'Profesional',
    price: 990000,
    originalPrice: 1290000,
    descriptionKey: 'pricing.plans.professional.description',
    description: 'Ideal para empresas que buscan destacar en el mercado digital',
    featuresKeys: [
      'Todo lo del plan Básico',
      'Hasta 10 páginas',
      'Panel de administración',
      'Integración con redes sociales',
      'Analytics avanzado',
      'Chat en vivo',
      'Soporte prioritario'
    ],
    popular: true,
    color: 'secondary',
    icon: '⭐'
  },
  {
    id: 'enterprise',
    nameKey: 'pricing.plans.enterprise.name',
    name: 'Empresarial',
    price: 1490000,
    originalPrice: 1990000,
    descriptionKey: 'pricing.plans.enterprise.description',
    description: 'Solución completa para grandes empresas y proyectos complejos',
    featuresKeys: [
      'Todo lo del plan Profesional',
      'Páginas ilimitadas',
      'E-commerce completo',
      'Múltiples idiomas',
      'API personalizada',
      'Backup automático',
      'Soporte 24/7',
      'Consultoría digital'
    ],
    popular: false,
    color: 'accent',
    icon: '👑'
  }
];

const Pricing = () => {
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState('professional');
  const [isAnnual, setIsAnnual] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking para efectos interactivos ultra suave
  useEffect(() => {
    let ticking = false;
    let lastTime = 0;
    const throttleDelay = 300; // Extremadamente lento para Pricing

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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getDiscountedPrice = (price) => {
    return isAnnual ? Math.floor(price * 0.8) : price;
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
            className="absolute inset-0 opacity-15"
            animate={{
              background: `radial-gradient(350px circle at ${mousePosition.x}% ${mousePosition.y}%, 
                rgba(14, 165, 233, 0.06), 
                rgba(217, 70, 239, 0.06), 
                transparent 70%)`,
            }}
            transition={{
              type: "spring",
              stiffness: 1,
              damping: 60,
              mass: 5,
              duration: 8
            }}
          />

          {/* Floating Price Tags */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: Math.random() * 12 + 18,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 6,
              }}
            >
              <div className={`w-10 h-10 ${i % 3 === 0 ? 'bg-primary-400/12' :
                i % 3 === 1 ? 'bg-secondary-400/12' : 'bg-accent-400/12'
                } rounded-full flex items-center justify-center text-lg opacity-50`}>
                {i % 3 === 0 ? '💰' : i % 3 === 1 ? '💎' : '🎯'}
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
              Planes y Precios
            </motion.h1>

            <motion.p
              className="text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Elige el plan perfecto para tu proyecto. Todos incluyen diseño profesional y soporte completo.
            </motion.p>

            {/* Billing Toggle */}
            <motion.div
              className="flex items-center justify-center mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
                <div className="flex items-center space-x-4">
                  <span className={`px-4 py-2 text-lg font-medium transition-colors ${!isAnnual ? 'text-primary-600' : 'text-gray-500'}`}>
                    Mensual
                  </span>
                  <motion.button
                    className="relative w-16 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full p-1 focus:outline-none"
                    onClick={() => setIsAnnual(!isAnnual)}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="w-6 h-6 bg-white rounded-full shadow-md"
                      animate={{ x: isAnnual ? 32 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </motion.button>
                  <span className={`px-4 py-2 text-lg font-medium transition-colors ${isAnnual ? 'text-primary-600' : 'text-gray-500'}`}>
                    Anual
                  </span>
                  {isAnnual && (
                    <motion.span
                      className="bg-success-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      20% OFF
                    </motion.span>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Pricing Cards Section */}
      <motion.section
        className="section bg-gradient-to-b from-transparent to-primary-50/30 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                className={`relative group cursor-pointer ${plan.popular ? 'lg:scale-110 lg:-mt-8' : ''
                  }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-gradient-to-r from-secondary-500 to-accent-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      MÁS POPULAR
                    </div>
                  </motion.div>
                )}

                {/* Card */}
                <div className={`card relative overflow-hidden h-full ${selectedPlan === plan.id ? 'ring-4 ring-primary-500/50' : ''
                  } ${plan.popular ? 'border-2 border-secondary-500/30' : ''}`}>

                  {/* Gradient Border Effect */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${plan.color === 'primary' ? 'from-primary-500 to-primary-600' :
                    plan.color === 'secondary' ? 'from-secondary-500 to-secondary-600' :
                      'from-accent-500 to-accent-600'
                    } rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`} />

                  <div className="relative bg-white rounded-2xl p-8 h-full flex flex-col">
                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      <div className="text-6xl mb-4">{plan.icon}</div>
                      <h3 className="text-2xl font-bold text-text-primary mb-2">{plan.name}</h3>
                      <p className="text-text-secondary leading-relaxed">{plan.description}</p>
                    </div>

                    {/* Pricing */}
                    <div className="text-center mb-8">
                      <div className="flex items-center justify-center mb-2">
                        {isAnnual && (
                          <span className="text-lg text-gray-400 line-through mr-2">
                            {formatPrice(plan.price)}
                          </span>
                        )}
                        <span className={`text-4xl font-bold gradient-text`}>
                          {formatPrice(getDiscountedPrice(plan.price))}
                        </span>
                      </div>
                      <span className="text-text-secondary">
                        {isAnnual ? 'por año' : 'por mes'}
                      </span>
                      {isAnnual && (
                        <div className="text-success-600 font-semibold mt-1">
                          Ahorras {formatPrice(plan.price - getDiscountedPrice(plan.price))}
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <div className="flex-grow mb-8">
                      <ul className="space-y-4">
                        {plan.featuresKeys.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                            viewport={{ once: true }}
                          >
                            <motion.div
                              className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 ${plan.color === 'primary' ? 'bg-primary-100 text-primary-600' :
                                plan.color === 'secondary' ? 'bg-secondary-100 text-secondary-600' :
                                  'bg-accent-100 text-accent-600'
                                }`}
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              transition={{ duration: 0.3 }}
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </motion.div>
                            <span className="text-text-primary leading-relaxed">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <Button
                      to="/contact"
                      className={`w-full text-lg py-4 ${plan.popular ? 'btn-secondary' :
                        plan.color === 'primary' ? 'btn-primary' : 'btn-accent'
                        } group relative overflow-hidden`}
                    >
                      <span className="relative z-10">
                        {plan.popular ? 'Empezar Ahora' : 'Elegir Plan'}
                      </span>
                      <motion.div
                        className={`absolute inset-0 ${plan.color === 'primary' ? 'bg-gradient-to-r from-primary-600 to-primary-700' :
                          plan.color === 'secondary' ? 'bg-gradient-to-r from-secondary-600 to-secondary-700' :
                            'bg-gradient-to-r from-accent-600 to-accent-700'
                          } transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300`}
                      />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="section bg-gradient-to-br from-secondary-50/50 to-accent-50/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-lg mb-6">Preguntas Frecuentes</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Resolvemos las dudas más comunes sobre nuestros servicios
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {[
              {
                question: "¿Qué incluye el hosting por 1 año?",
                answer: "Incluye alojamiento web profesional, certificado SSL, copias de seguridad automáticas y soporte técnico durante todo el año."
              },
              {
                question: "¿Puedo cambiar de plan después?",
                answer: "Sí, puedes actualizar tu plan en cualquier momento. Te ayudamos con la migración sin costo adicional."
              },
              {
                question: "¿Cuánto tiempo toma desarrollar mi sitio web?",
                answer: "El tiempo varía según el plan: Básico (1-2 semanas), Profesional (2-4 semanas), Empresarial (4-8 semanas)."
              },
              {
                question: "¿Ofrecen soporte después de la entrega?",
                answer: "Sí, todos los planes incluyen soporte. El tipo y duración varía según el plan elegido."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="card mb-6 group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-primary-600 transition-colors">
                    {faq.question}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
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
                ¿Listo para empezar?
              </motion.h2>

              <motion.p
                className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Contáctanos hoy y recibe una consulta gratuita para tu proyecto
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Button
                  to="/contact"
                  className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Solicitar Cotización Gratuita
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Pricing;