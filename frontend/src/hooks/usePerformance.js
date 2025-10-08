import { useState, useEffect } from 'react';

export const usePerformance = () => {
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Detectar preferencia de movimiento reducido
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    // Detectar dispositivos de bajo rendimiento
    const detectLowPerformance = () => {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      const memory = navigator.deviceMemory;
      const cores = navigator.hardwareConcurrency;

      // Criterios para dispositivos de bajo rendimiento
      const slowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
      const lowMemory = memory && memory < 4;
      const fewCores = cores && cores < 4;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      setIsLowPerformance(slowConnection || lowMemory || fewCores || (isMobile && (lowMemory || fewCores)));
    };

    detectLowPerformance();

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return {
    isLowPerformance,
    prefersReducedMotion,
    shouldReduceAnimations: isLowPerformance || prefersReducedMotion
  };
};

export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return [setRef, isIntersecting];
};