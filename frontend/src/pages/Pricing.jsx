import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';

const pricingPlans = [
  {
    id: 'basic',
    nameKey: 'pricing.plans.basic.name',
    price: 499000,
    descriptionKey: 'pricing.plans.basic.description',
    featuresKeys: [
      'pricing.plans.basic.features.0',
      'pricing.plans.basic.features.1',
      'pricing.plans.basic.features.2',
      'pricing.plans.basic.features.3',
      'pricing.plans.basic.features.4'
    ],
    popular: false
  },
  {
    id: 'standard',
    nameKey: 'pricing.plans.professional.name',
    price: 990000,
    descriptionKey: 'pricing.plans.professional.description',
    featuresKeys: [
      'pricing.plans.professional.features.0',
      'pricing.plans.professional.features.1',
      'pricing.plans.professional.features.2',
      'pricing.plans.professional.features.3',
      'pricing.plans.professional.features.4',
      'pricing.plans.professional.features.5',
      'pricing.plans.professional.features.6'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    nameKey: 'pricing.plans.enterprise.name',
    price: 1490000,
    descriptionKey: 'pricing.plans.enterprise.description',
    featuresKeys: [
      'pricing.plans.enterprise.features.0',
      'pricing.plans.enterprise.features.1',
      'pricing.plans.enterprise.features.2',
      'pricing.plans.enterprise.features.3',
      'pricing.plans.enterprise.features.4',
      'pricing.plans.enterprise.features.5',
      'pricing.plans.enterprise.features.6',
      'pricing.plans.enterprise.features.7'
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

// Variantes para animación de tarjetas
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({ 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      delay: i * 0.15,
      ease: [0.22, 1, 0.36, 1]
    } 
  }),
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

// Variantes para animaciones de elementos
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 260,
      damping: 20,
      duration: 0.5
    } 
  }
};

// Variantes para contenedor con efecto stagger
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      ease: "easeOut"
    }
  }
};

// Variantes para animación de imágenes
const imageAnimation = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 200,
      damping: 20,
      duration: 0.8
    } 
  }
};

// Variantes para animación de texto con efecto de escritura
const textReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 0.8
    } 
  }
};

// Variantes para animación de características
const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut"
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
  const titleText = t('pricing.title');
  const titleArray = titleText.split("");

  return (
    <div className="w-full">
      {/* Hero Section */}
      <Section className="py-20 pt-20 overflow-hidden relative bg-gradient-to-b from-subtle-light to-white dark:from-subtle-dark dark:to-background-dark" id="pricing-hero">
        {/* Elementos decorativos de fondo */}
        <motion.div 
          className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 30 - 15],
                x: [0, Math.random() * 30 - 15],
                rotate: [0, Math.random() * 10 - 5],
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

        <div ref={heroRef} className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            className="text-center mb-20"
            style={{ opacity }}
            ref={titleRef}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <div className="overflow-hidden mb-6">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
                style={{ y: titleY }}
                variants={textReveal}
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
              <p className="text-xl max-w-3xl mx-auto text-foreground-light/80 dark:text-foreground-dark/80">{t('pricing.subtitle')}</p>
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
              return (
                <motion.div
                  key={plan.id}
                  custom={index}
                  className={`bg-card-light dark:bg-card-dark rounded-xl shadow-lg overflow-hidden relative ${plan.popular ? 'ring-2 ring-accent/50 transform md:-translate-y-4 z-10 shadow-xl' : ''}`}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  {/* Efecto de brillo en los bordes para el plan popular */}
                  {plan.popular && (
                    <motion.div 
                      className="absolute -inset-0.5 bg-gradient-to-r  to-accent/60 rounded-xl blur-sm opacity-50 z-0"
                      animate={{ 
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      transition={{ 
                        duration: 8, 
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    />
                  )}
                  
                  {plan.popular && (
                    <motion.div 
                      className="bg-gradient-to-r from-accent to-primary text-white text-sm font-medium px-4 py-1 rounded-t-lg text-center relative z-10 shadow-md"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                    >
                      <motion.span
                        animate={{
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="inline-block"
                      >
                        {t('pricing.mostPopular')}
                      </motion.span>
                    </motion.div>
                  )}
                  <div className="p-6 md:p-8">
                    <div className="relative z-10">
                      <motion.h3 
                        className={`text-2xl font-bold mb-2 ${plan.popular ? 'bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent' : 'text-foreground-light dark:text-foreground-dark'}`}
                        variants={textReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {t(plan.nameKey)}
                      </motion.h3>
                      
                      <motion.p 
                        className="text-foreground-light/70 dark:text-foreground-dark/70 mb-6"
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {t(plan.descriptionKey)}
                      </motion.p>
                      
                      <motion.div 
                        className="mb-6"
                        variants={imageAnimation}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        <span className="text-4xl font-bold text-primary">COP ${plan.price.toLocaleString('es-CO')}</span>
                        <span className="text-foreground-light/60 dark:text-foreground-dark/60 ml-2">{t('pricing.perProject')}</span>
                      </motion.div>
                      
                      <motion.ul 
                        className="space-y-3 mb-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {plan.featuresKeys.map((featureKey, i) => (
                          <motion.li 
                            key={i} 
                            className="flex items-start"
                            custom={i}
                            variants={featureVariants}
                            viewport={{ once: true }}
                          >
                            <motion.div
                              whileHover={{ rotate: 360, scale: 1.2 }}
                              transition={{ type: "spring", stiffness: 300, damping: 10 }}
                              className="mr-2"
                            >
                              <svg className="h-5 w-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                            </motion.div>
                            <span className="text-foreground-light/80 dark:text-foreground-dark/80">{t(featureKey)}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                      
                      <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        >
                          <Button 
                            to="/contact" 
                            variant={plan.popular ? 'primary' : 'outline'}
                            className="w-full justify-center relative overflow-hidden group"
                          >
                            {plan.popular && (
                              <motion.span 
                                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.5 }}
                              />
                            )}
                            {t('pricing.selectPlan')}
                          </Button>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section className="py-20 bg-white dark:bg-slate-900 relative" id="pricing-faq">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`faq-bg-${i}`}
              className="absolute rounded-full bg-gradient-to-r from-primary/10 to-accent/10 blur-xl"
              style={{
                width: Math.random() * 200 + 100,
                height: Math.random() * 200 + 100,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 50 - 25],
                y: [0, Math.random() * 50 - 25],
                scale: [1, Math.random() * 0.3 + 0.9, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 md:px-6 overflow-hidden">
          <div className="relative">
            <motion.div 
              className="text-center mb-16 relative z-10"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h2 
                className="text-3xl md:text-5xl font-bold mb-4 relative inline-block text-foreground-light dark:text-foreground-dark overflow-hidden"
                variants={textReveal}
              >
                {t('pricing.faq.title')}
                <motion.span 
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.h2>
              <motion.p 
                className="text-lg md:text-xl max-w-3xl mx-auto mt-6 text-foreground-light/80 dark:text-foreground-dark/80"
                variants={itemVariants}
              >
                {t('pricing.faq.subtitle')}
              </motion.p>
            </motion.div>

            <motion.div 
              className="max-w-4xl mx-auto space-y-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[1, 2, 3, 4, 5].map((item) => {
                // Variantes para animación de cada FAQ
                const faqVariants = {
                  hidden: { opacity: 0, y: 50 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: item * 0.1,
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
                    className="bg-card-light dark:bg-card-dark rounded-lg shadow-md overflow-hidden relative"
                    variants={faqVariants}
                    whileHover="hover"
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    {/* Animated border gradient */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 opacity-0 rounded-lg"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <div className="p-6 md:p-8 relative z-10">
                      <motion.h3 
                        className="text-xl md:text-2xl font-bold mb-3 text-foreground-light dark:text-foreground-dark overflow-hidden"
                        variants={textReveal}
                        viewport={{ once: true }}
                      >
                        {item === 1 ? t('pricing.faq.items.1.question') :
                          item === 2 ? t('pricing.faq.items.2.question') :
                          item === 3 ? t('pricing.faq.items.3.question') :
                          item === 4 ? t('pricing.faq.items.4.question') :
                           t('pricing.faq.items.5.question')}
                      </motion.h3>
                      <motion.div 
                        className="overflow-hidden"
                        variants={itemVariants}
                        viewport={{ once: true }}
                      >
                        <motion.p 
                          className="text-foreground-light/80 dark:text-foreground-dark/80"
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
                          viewport={{ once: true }}
                        >
                          {item === 1 ? t('pricing.faq.items.1.answer') :
                            item === 2 ? t('pricing.faq.items.2.answer') :
                            item === 3 ? t('pricing.faq.items.3.answer') :
                            item === 4 ? t('pricing.faq.items.4.answer') :
                            t('pricing.faq.items.5.answer')}
                        </motion.p>
                       </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="py-20 bg-subtle-light dark:bg-subtle-dark" id="pricing-cta">
        <div className="container mx-auto px-4 md:px-6 overflow-hidden">
          <motion.div 
            className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-10 md:p-16 text-white text-center relative overflow-hidden"
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
                {t('pricing.cta.title')}
              </motion.h2>
              
              <motion.p 
                className="text-lg md:text-xl mb-10 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {t('pricing.cta.subtitle')}
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
                  {t('pricing.cta.button')}
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