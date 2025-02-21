// i18n.js
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import fa from '../languages/Persian/fa';
import en from '../languages/English/en';

// Function to detect RTL (simulating I18nManager.isRTL)
const isRTL = () => {
  // You can implement more sophisticated RTL detection here
  // For now, we'll check the document direction or default to language
  return document.documentElement.dir === 'rtl';
};

// Initialize i18next
i18next
  .use(initReactI18next)
  .init({
    resources: {
      fa: {
        translation: fa
      },
      en: {
        translation: en
      }
    },
    fallbackLng: 'en', // Equivalent to fallbacks: true with a default
    lng: isRTL() ? 'fa' : 'en', // Default language based on RTL
    interpolation: {
      escapeValue: false // React already escapes by default
    }
  });

// Export utility functions
export const setLocale = (locale) => {
  i18next.changeLanguage(locale);
};

export const getCurrentLocale = () => i18next.language;

export const translateHeaderText = (langKey) => ({ screenProps }) => {
  const title = i18next.t(langKey, screenProps?.language);
  return { title };
};

// Default export is the translation function
export default i18next.t.bind(i18next);