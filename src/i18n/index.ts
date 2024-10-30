import { createI18n } from "vue-i18n";

const messages = {
  en: {
    app: {
      "Special Offers": "Special Offers",
    },
  },
  ru: {
    app: {
      "Special Offers": "Специальные предложения",
    },
  },
};

export const i18n = createI18n({
  legacy: false,
  fallbackLocale: "en",
  locale: "ru",
  messages,
});
