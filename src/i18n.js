import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend"; // JSON fayllarni yuklash uchun

i18n
  .use(HttpApi) // Backenddan fayllarni o'qish
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "uz",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      // JSON fayllar qayerda joylashganini ko'rsatamiz
      loadPath: "/locales/{{lng}}/translation.json",
    },
  });

export default i18n;
