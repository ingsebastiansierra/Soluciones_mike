import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { changeLanguage } from '../../i18n/i18n';

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const handleLanguageChange = (language) => {
    changeLanguage(language);
  };

  const languages = [
    { code: 'es', label: 'ES', flag: '🇪🇸', name: 'Español' },
    { code: 'en', label: 'EN', flag: '🇺🇸', name: 'English' }
  ];

  return (
    <div className="relative inline-block">
      <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-primary-200/50">
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            className={`relative px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 ${
              currentLanguage === lang.code
                ? 'text-white bg-gradient-to-r from-primary-500 to-secondary-500 shadow-md'
                : 'text-text-primary hover:text-primary-600 hover:bg-primary-50'
            }`}
            onClick={() => handleLanguageChange(lang.code)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={lang.name}
          >
            {/* Active indicator */}
            {currentLanguage === lang.code && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg"
                layoutId="activeLanguage"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            
            <span className="relative z-10 text-lg">{lang.flag}</span>
            <span className="relative z-10">{lang.label}</span>
            
            {/* Hover effect */}
            {currentLanguage !== lang.code && (
              <motion.div
                className="absolute inset-0 bg-primary-100 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-200"
                whileHover={{ opacity: 1 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;