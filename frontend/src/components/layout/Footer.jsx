import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: t('common.menu.home'), path: '/' },
    { name: t('common.menu.projects'), path: '/projects' },
    { name: t('common.menu.pricing'), path: '/pricing' },
    { name: t('common.menu.contact'), path: '/contact' },
  ];

  return (
    <footer className="bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Soluciones Mike</h2>
          </div>
          
          <p className="mt-4 max-w-md text-slate-500 dark:text-slate-400">
            {t('footer.description')}
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-6">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
              <span className="text-slate-600 dark:text-slate-400">{t('footer.location')}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
              <span className="text-slate-600 dark:text-slate-400">{t('footer.phone')}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
              <span className="text-slate-600 dark:text-slate-400">{t('footer.email')}</span>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center space-x-6">
            <motion.a 
              className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary" 
              href="https://wa.me/573121310650"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">WhatsApp</span>
              <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.001 2.002a9.99 9.99 0 0 0-6.924 16.63l.006-.005.005.005-1.51 5.342 5.46-1.488a9.99 9.99 0 1 0-3.955-16.598.01.01 0 0 0 .002.001.002.002 0 0 0 .002 0h.001zm0 18.002a8.004 8.004 0 1 1 0-16.008 8.004 8.004 0 0 1 0 16.008zm-3.15-5.547l-.196-.115a.999.999 0 0 0-1.127.32l-.505.864a1.002 1.002 0 0 0 .138 1.31l.002.001c.219.18 1.083.51 2.22.01.12-.05.23-.11.33-.18.01 0 .01-.01.02-.01.02-.01.03-.02.05-.03a7.22 7.22 0 0 0 2.2-1.6.01.01 0 0 0 .01-.01 5.92 5.92 0 0 0 1.51-2.2l.06-.21a1.004 1.004 0 0 0-.42-1.06l-.88-.51a1.001 1.001 0 0 0-1.28.31l-.22.38c-.08.14-.24.2-.4.12l-1.4-.82a.992.992 0 0 1-.58-.92v-.23c.03-.22.2-.4.4-.5l.5-.29c.4-.23.54-.78.3-1.18l-.51-.88a1.004 1.004 0 0 0-1.06-.42l-1.07.24a1.002 1.002 0 0 0-.74.95v.02c0 .12.02.24.06.35l.01.02z"></path>
              </svg>
            </motion.a>
            
            <motion.a 
              className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary" 
              href="https://www.facebook.com/profile.php?id=100092532574465"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">Facebook</span>
              <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fillRule="evenodd"></path>
              </svg>
            </motion.a>
          </div>
        </div>
        
        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>© {currentYear} Soluciones Mike. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;