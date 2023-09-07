import { createI18n } from 'vue-i18n'
import AR from './locales/ar.json'
import EN from './locales/en.json'
import RU from './locales/ru.json'

const availableLocales = ['AR', 'EN', 'RU'];

let initialLocale = localStorage.getItem('userLocale');
if (!initialLocale) {
  var browserLanguage = window.navigator.language; 
  browserLanguage = browserLanguage.split('-')[0].toUpperCase()
  if(availableLocales.includes(browserLanguage))
    initialLocale = browserLanguage
  else
    initialLocale = 'EN'
  localStorage.setItem("userLocale", browserLanguage);
}

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    availableLocales: availableLocales,
    locale: initialLocale,
    fallbackLocale: 'EN',
    messages: {EN,AR,RU},
  });

export default i18n;