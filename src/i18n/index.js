import { createI18n } from 'vue-i18n'
import AR from './locales/ar.json'
import EN from './locales/en.json'
import RU from './locales/ru.json'

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    availableLocales: ['AR', 'EN', 'RU'],
    locale: 'AR',
    fallbackLocale: 'EN',
    messages: {EN,AR,RU},
  });

export default i18n;
