import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../../i18n/i18n';

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const handleLanguageChange = (language) => {
    changeLanguage(language);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">{t('common.language')}:</span>
        <div className="flex space-x-2">
          <button
            className={`px-2 py-1 text-sm rounded-md transition-all ${currentLanguage === 'es' ? 'bg-accent text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
            onClick={() => handleLanguageChange('es')}
          >
            {t('common.spanish')}
          </button>
          <button
            className={`px-2 py-1 text-sm rounded-md transition-all ${currentLanguage === 'en' ? 'bg-accent text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
            onClick={() => handleLanguageChange('en')}
          >
            {t('common.english')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;