import datetimeFormats from './date-time-formats';
import numberFormats from './number-formats';
import en from './messages/en.json';
import ptBR from './messages/pt-BR.json';
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: {
    en,
    'pt-BR': ptBR,
  },
  // @ts-expect-error for some reason flow types aren't being recognized by ts
  datetimeFormats,
  numberFormats,
});

export default i18n;
