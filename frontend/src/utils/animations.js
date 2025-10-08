// Configuraciones de animación optimizadas para rendimiento
export const ANIMATION_CONFIG = {
  // Reducir animaciones en dispositivos de bajo rendimiento
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  
  // Configuraciones base optimizadas
  spring: {
    type: "spring",
    stiffness: 100,
    damping: 15,
    mass: 0.8
  },
  
  easeOut: {
    type: "tween",
    ease: [0.25, 0.46, 0.45, 0.94],
    duration: 0.3
  },
  
  easeInOut: {
    type: "tween", 
    ease: [0.4, 0, 0.2, 1],
    duration: 0.4
  }
};

// Variantes de animación reutilizables y optimizadas
export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 20,
    transition: ANIMATION_CONFIG.easeOut
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: ANIMATION_CONFIG.easeOut
  }
};

export const fadeIn = {
  hidden: { 
    opacity: 0,
    transition: ANIMATION_CONFIG.easeOut
  },
  visible: { 
    opacity: 1,
    transition: ANIMATION_CONFIG.easeOut
  }
};

export const scaleIn = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    transition: ANIMATION_CONFIG.easeOut
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: ANIMATION_CONFIG.spring
  }
};

export const slideInLeft = {
  hidden: { 
    opacity: 0, 
    x: -30,
    transition: ANIMATION_CONFIG.easeOut
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: ANIMATION_CONFIG.easeOut
  }
};

export const slideInRight = {
  hidden: { 
    opacity: 0, 
    x: 30,
    transition: ANIMATION_CONFIG.easeOut
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: ANIMATION_CONFIG.easeOut
  }
};

// Configuración de viewport optimizada
export const VIEWPORT_CONFIG = {
  once: true,
  margin: "-50px",
  amount: 0.3
};

// Throttle para eventos de scroll/mouse optimizado
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
};

// Debounce para resize events
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};