import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

/**
 * Configuration of the localization service.
 */
i18next
  .use(initReactI18next)
  .use(HttpApi) // Loads the language files via lazy loading.
  .use(LanguageDetector) // Detects the current browser language.
  .init({
    interpolation: {
      escapeValue: false,
    },
    supportedLngs: ['en', 'de'],
    // Default Language set to english.
    fallbackLng: 'en',
    // To improve logging when debugging.
    debug: process.env.NODE_ENV === 'development',
  });

export default i18next;
