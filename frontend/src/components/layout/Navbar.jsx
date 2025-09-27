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
        <div className="flex items-center gap-4">
          <Link to="/">
            <div className="flex items-center gap-4 hover:opacity-80 transition-opacity">
              <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
              <h2 className="text-xl font-bold">Soluciones Mike</h2>
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
        </div>

      </div>
      </div>


    </motion.nav>
  );
};

export default Navbar;