import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importar traducciones
import translationES from './locales/es.json';
import translationEN from './locales/en.json';

// Recursos de idiomas
const resources = {
  es: {
    translation: translationES
  },
  en: {
    translation: translationEN
  }
};

// Configuración de i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'es', // Idioma por defecto
    fallbackLng: 'es', // Idioma de respaldo
    interpolation: {
      escapeValue: false // No es necesario para React
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

// Función para cambiar el idioma
export const changeLanguage = (language) => {
  i18n.changeLanguage(language);
  localStorage.setItem('language', language);
};

export default i18n;