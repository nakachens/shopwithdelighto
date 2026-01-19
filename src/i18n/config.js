import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import ja from './locales/ja.json';
import fr from './locales/fr.json';
import ko from './locales/ko.json';
import de from './locales/de.json';
import es from './locales/es.json';
import hi from './locales/hi.json';
import ms from './locales/ms.json';
import ru from './locales/ru.json';
import ur from './locales/ur.json';
import zh from './locales/zh.json';
import ar from './locales/ar.json';

i18n
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ja: { translation: ja },
      fr: { translation: fr },
      ko: { translation: ko },
      de: { translation: de},
      es: { translation: es},
      hi: { translation: hi},
      ms: { translation: ms},
      ru: { translation: ru},
      ur: { translation: ur},
      zh: { translation: zh},
      ar: { translation: ar},
    },
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false // React already escapes values
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;