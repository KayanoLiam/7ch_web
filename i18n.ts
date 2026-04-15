import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './lib/i18n/resources';
import { defaultLocale, isLocale } from './lib/i18n/dictionaries';

const readStoredLanguage = () => {
      if (typeof window === 'undefined') return defaultLocale;

      const pathnameLocale = window.location.pathname.split('/')[1];
      if (isLocale(pathnameLocale)) return pathnameLocale;

      const fromHtml = document.documentElement.lang;
      if (isLocale(fromHtml)) return fromHtml;

      const fromLocalStorage = localStorage.getItem('7ch_lang');
      if (isLocale(fromLocalStorage)) return fromLocalStorage;

      const fromCookie = document.cookie
            .split('; ')
            .find((item) => item.startsWith('7ch_lang='))
            ?.split('=')[1];
      const decodedCookie = fromCookie ? decodeURIComponent(fromCookie) : null;
      return isLocale(decodedCookie) ? decodedCookie : defaultLocale;
};

// 国际化资源集中维护：保持 key 稳定，避免破坏已有翻译。
// Centralized i18n resources: keep keys stable to avoid breaking translations.
i18n
      .use(initReactI18next)
      .init({
            resources,
            // 语言优先级：URL locale > html lang > localStorage > cookie > 默认中文。
            // Language priority: URL locale > html lang > localStorage > cookie > default zh-CN.
            lng: readStoredLanguage(),
            fallbackLng: defaultLocale,
            interpolation: {
                  escapeValue: false
            }
      });

export default i18n;
