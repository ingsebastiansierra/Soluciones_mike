import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSelector from '../ui/LanguageSelector';

const Navbar = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detectar scroll para cambiar estilo de navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: t('common.menu.home'), path: '/' },
    { name: t('common.menu.projects'), path: '/projects' },
    { name: t('common.menu.pricing'), path: '/pricing' },
    { name: t('common.menu.contact'), path: '/contact' },
  ];

  return (
    <motion.nav
      className="sticky top-0 z-50 w-full bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm border-b border-border-light dark:border-border-dark"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">  
        <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-5">
          <Link to="/">
            <div className="flex items-center gap-4 hover:opacity-80 transition-opacity">
              <img src="/images/logito.png" alt="Soluciones Mike Logo" className="h-11 w-auto text-primary" />
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-2">
          <LanguageSelector />
          {/* Botón de hamburguesa para móviles */}
          <button 
            className="md:hidden ml-2 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Menú"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>
      
      {/* Menú móvil desplegable */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-border-light dark:border-border-dark"
          >
            <div className="py-3 px-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>


    </motion.nav>
  );
};

export default Navbar;