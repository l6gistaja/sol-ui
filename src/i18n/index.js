import { createI18n } from "vue-i18n";

const messages = {
    en: {
        common: {
            logout: "Logout"
        },
        plants: {
            title: "Plants"
        }
    }
}

export default createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  legacy: false,
  globalInjection: true,
  messages
})