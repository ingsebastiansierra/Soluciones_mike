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
    { name: t('common.menu.specs'), path: '/specifications' },
    { name: t('common.menu.contact'), path: '/contact' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-light-bg/90 dark:bg-dark-bg/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}
    >
      <div className="container-custom flex justify-between items-center">
        {/* Logo with split animation */}
        <Link to="/" className="text-2xl font-bold tracking-tight relative overflow-hidden">
          {/* Logo normal state */}
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            whileHover={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-accent">Mike</span>
            <span className="text-text-primary dark:text-text-light">Dev</span>
          </motion.div>
          
          {/* Logo split animation */}
          <motion.div 
            className="absolute top-0 left-0 w-full flex justify-between items-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="overflow-hidden"
              initial={{ x: 0 }}
              whileHover={[
                { x: -20, transition: { duration: 0.3 } },
                { x: 0, transition: { duration: 0.3, delay: 0.5 } }
              ]}
              animate={{
                x: [0, -20, 0],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut"
                }
              }}
            >
              <span className="text-accent inline-block">Mike</span>
            </motion.div>
            
            <motion.div
              className="overflow-hidden"
              initial={{ x: 0 }}
              whileHover={[
                { x: 20, transition: { duration: 0.3 } },
                { x: 0, transition: { duration: 0.3, delay: 0.5 } }
              ]}
              animate={{
                x: [0, 20, 0],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut"
                }
              }}
            >
              <span className="text-text-primary dark:text-text-light inline-block">Dev</span>
            </motion.div>
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-text-primary dark:text-text-light hover:text-accent dark:hover:text-accent transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <LanguageSelector />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-text-primary dark:text-text-light"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden bg-light-bg dark:bg-dark-bg shadow-lg"
        >
          <div className="container-custom py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-text-primary dark:text-text-light hover:text-accent dark:hover:text-accent transition-colors py-2 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2">
              <LanguageSelector />
            </div>
          </div>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;