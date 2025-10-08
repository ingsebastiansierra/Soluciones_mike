import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSelector from '../ui/LanguageSelector';

const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Detectar scroll para cambiar estilo de navbar con throttling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: t('common.menu.home'), path: '/', icon: '🏠' },
    { name: t('common.menu.projects'), path: '/projects', icon: '💼' },
    { name: t('common.menu.pricing'), path: '/pricing', icon: '💰' },
    { name: t('common.menu.contact'), path: '/contact', icon: '📞' },
  ];

  // Función para verificar si la ruta está activa
  const isActiveRoute = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <motion.nav
      className="sticky top-0 z-50 w-full glass backdrop-blur-xl bg-white/85 shadow-lg border-b border-white/20"
      style={{
        backdropFilter: isScrolled ? 'blur(20px)' : 'blur(12px)',
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.85)',
        boxShadow: isScrolled
          ? '0 10px 40px rgba(0, 0, 0, 0.1)'
          : '0 4px 20px rgba(0, 0, 0, 0.05)',
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-5">
            <Link to="/">
              <motion.div
                className="flex items-center gap-4 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <motion.img
                    src="/images/logito.png"
                    alt="Soluciones Mike Logo"
                    className="h-12 w-auto relative z-10"
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full blur-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <motion.div
                  className="hidden md:block"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >

                </motion.div>
              </motion.div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link, index) => {
              const isActive = isActiveRoute(link.path);
              return (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(link.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    to={link.path}
                    className={`relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${isActive
                      ? 'text-white bg-gradient-to-r from-primary-600 to-secondary-600 shadow-lg'
                      : 'text-text-primary hover:text-primary-600'
                      }`}
                  >
                    {/* Ticket bite effect for active item */}
                    {isActive && (
                      <>
                        <motion.div
                          className="absolute -left-2 top-1/2 w-4 h-4 bg-white rounded-full transform -translate-y-1/2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
                        />
                        <motion.div
                          className="absolute -right-2 top-1/2 w-4 h-4 bg-white rounded-full transform -translate-y-1/2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, type: "spring", stiffness: 500 }}
                        />
                        {/* Dotted line effect */}
                        <motion.div
                          className="absolute top-0 left-0 right-0 h-full border-t-2 border-b-2 border-dashed border-white/30 rounded-xl"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        />
                      </>
                    )}

                    {/* Hover effect for non-active items */}
                    <AnimatePresence>
                      {!isActive && hoveredItem === link.path && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-xl"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                          layoutId={`hover-${link.path}`}
                        />
                      )}
                    </AnimatePresence>

                    <span className="relative z-10 text-lg">{link.icon}</span>
                    <span className="relative z-10">{link.name}</span>

                    {/* Animated underline for hover */}
                    {!isActive && (
                      <motion.div
                        className="absolute -bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                        initial={{ width: 0, x: '-50%' }}
                        animate={{
                          width: hoveredItem === link.path ? '80%' : '0%',
                        }}
                        transition={{
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        style={{ left: '50%', transform: 'translateX(-50%)' }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <LanguageSelector />
            </motion.div>

            {/* Botón de hamburguesa para móviles mejorado */}
            <motion.button
              className="md:hidden relative p-3 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={toggleMobileMenu}
              aria-label="Menú"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"
              />
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 relative z-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ rotate: isMobileMenuOpen ? 45 : 0 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.path
                      key="close"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      exit={{ pathLength: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  ) : (
                    <motion.g key="menu">
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16"
                        initial={{ pathLength: 0, y: -2 }}
                        animate={{ pathLength: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 12h16"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      />
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 18h16"
                        initial={{ pathLength: 0, y: 2 }}
                        animate={{ pathLength: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      />
                    </motion.g>
                  )}
                </AnimatePresence>
              </motion.svg>
            </motion.button>
          </div>

        </div>

        {/* Menú móvil mejorado */}
        <AnimatePresence mode="wait">
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              className="md:hidden border-t border-gradient-to-r from-primary-200 to-secondary-200 bg-gradient-to-br from-white/98 to-primary-50/98 backdrop-blur-2xl"
            >
              <div className="py-8 px-6 space-y-3">
                {navLinks.map((link, index) => {
                  const isActive = isActiveRoute(link.path);
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -30, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{
                        delay: index * 0.1,
                        duration: 0.4,
                        type: "spring",
                        stiffness: 100
                      }}
                    >
                      <Link
                        to={link.path}
                        className={`relative block py-4 px-6 text-lg font-semibold rounded-2xl transition-all duration-300 flex items-center gap-3 ${isActive
                          ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg transform scale-105'
                          : 'text-text-primary hover:text-white hover:bg-gradient-to-r hover:from-primary-500 hover:to-secondary-500 hover:shadow-md'
                          }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {/* Ticket effect for active mobile item */}
                        {isActive && (
                          <>
                            <motion.div
                              className="absolute -left-3 top-1/2 w-6 h-6 bg-white rounded-full transform -translate-y-1/2"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                            />
                            <motion.div
                              className="absolute -right-3 top-1/2 w-6 h-6 bg-white rounded-full transform -translate-y-1/2"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                            />
                          </>
                        )}

                        <motion.span
                          className="text-2xl"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {link.icon}
                        </motion.span>
                        <span className="relative z-10">{link.name}</span>

                        {/* Arrow indicator for active item */}
                        {isActive && (
                          <motion.div
                            className="ml-auto text-white"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </motion.div>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Decorative element */}
                <motion.div
                  className="mt-6 pt-6 border-t border-primary-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.1 + 0.2 }}
                >
                  <div className="text-center">
                    <p className="text-sm text-text-secondary mb-2">¿Listo para tu proyecto?</p>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>🚀</span>
                      Empezar Ahora
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>


    </motion.nav>
  );
};

export default Navbar;