import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Music, Eye, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const SYMBOLS = {
  flag: "https://president.uz/uz/pages/symbols?menu_id=12",
  emblem: "https://president.uz/uz/pages/symbols?menu_id=13",
  anthem: "https://president.uz/uz/pages/symbols?menu_id=14",
};

const TopBar = () => {
  const { t, i18n } = useTranslation();
  const [fontSize, setFontSize] = useState(100);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef(null);

  const languages = [
    { code: "uz", name: "O'zbekcha", flag: "uz" },
    { code: "ru", name: "Русский", flag: "ru" },
    { code: "en", name: "English", flag: "gb" },
  ];

  const currentLang =
    languages.find((l) => l.code === i18n.language) || languages[0];

  // Shrift o'lchamini o'zgartirish
  const changeFontSize = (delta) => {
    setFontSize((prev) => {
      const newSize = Math.min(Math.max(prev + delta, 80), 130);
      document.documentElement.style.fontSize = `${newSize}%`;
      return newSize;
    });
  };

  // Qora-oq rejim
  const toggleGrayscale = () => {
    setIsGrayscale(!isGrayscale);
    if (!isGrayscale) {
      document.documentElement.classList.add("grayscale");
    } else {
      document.documentElement.classList.remove("grayscale");
    }
  };

  // Tashqariga bosganda til menyusi yopilishi
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
  };

  return (
    <div className="bg-slate-50 border-b border-slate-200 py-1.5 hidden lg:block relative z-[1000] transition-colors duration-300">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* CHAP TOMON: Ramzlar va Kontaktlar */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 pr-5 border-r border-slate-300 h-5">
            <SymbolLink
              href={SYMBOLS.flag}
              img="https://flagcdn.com/w40/uz.png"
              title={t("flag", "Davlat bayrog'i")}
            />
            <SymbolLink
              href={SYMBOLS.emblem}
              img="https://upload.wikimedia.org/wikipedia/commons/7/77/Emblem_of_Uzbekistan.svg"
              title={t("emblem", "Davlat gerbi")}
            />
            <a
              href={SYMBOLS.anthem}
              target="_blank"
              rel="noreferrer"
              title={t("anthem", "Davlat madhiyasi")}
              className="group p-1 bg-white border border-slate-200 hover:bg-blue-50 rounded transition-colors"
            >
              <Music
                size={12}
                className="text-blue-600 group-hover:text-blue-800 transition-colors"
              />
            </a>
          </div>

          <div className="flex items-center gap-5 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            <a
              href="mailto:info@texnikum.uz"
              className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
            >
              <Mail size={12} className="text-blue-500" /> info@texnikum.uz
            </a>
            <a
              href="tel:+998661234567"
              className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
            >
              <Phone size={12} className="text-blue-500" /> +998 66 123 45 67
            </a>

            <div className="h-3 w-px bg-slate-300"></div>

            {/* Qabul Linki (Rasmiy Amber/Blue rangda pulsatsiya) */}
            <Link
              to="/qabul"
              className="flex items-center gap-1.5 text-amber-600 font-extrabold group"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="group-hover:text-blue-600 transition-colors">
                {t("admission", "QABUL 2025")}
              </span>
            </Link>
          </div>
        </div>

        {/* O'NG TOMON: Maxsus imkoniyatlar va Til */}
        <div className="flex items-center gap-5 h-5">
          {/* Shrift o'lchami */}
          <div className="flex items-center gap-2 border-r border-slate-300 pr-5 h-full select-none">
            <button
              onClick={() => changeFontSize(-5)}
              className="text-slate-400 hover:text-blue-600 font-black text-xs px-1"
              title="Kichraytirish"
            >
              A-
            </button>
            <span className="text-[10px] text-slate-500 font-extrabold w-10 text-center bg-white border border-slate-200 rounded py-0.5">
              {fontSize}%
            </span>
            <button
              onClick={() => changeFontSize(5)}
              className="text-slate-700 hover:text-blue-600 font-black text-xs px-1"
              title="Kattalashtirish"
            >
              A+
            </button>
          </div>

          {/* Qora-Oq Rejim */}
          <div className="flex items-center border-r border-slate-300 pr-5 h-full">
            <button
              onClick={toggleGrayscale}
              title="Zaif ko'ruvchilar uchun"
              className={`transition-all duration-300 px-2 py-1 rounded flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest ${
                isGrayscale
                  ? "text-white bg-[#0a1930] shadow-inner"
                  : "text-slate-500 hover:text-blue-600 hover:bg-white border border-transparent hover:border-slate-200"
              }`}
            >
              <Eye size={12} /> {isGrayscale ? "O'chirish" : "Maxsus rejim"}
            </button>
          </div>

          {/* TIL TANLASH (Smooth Dropdown) */}
          <div className="relative h-full flex items-center" ref={langRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 h-full px-2 hover:bg-white rounded border border-transparent hover:border-slate-200 transition-all"
            >
              <img
                src={`https://flagcdn.com/w20/${currentLang.flag}.png`}
                className="w-4 h-2.5 object-cover rounded-sm shadow-sm"
                alt="flag"
              />
              <span className="text-[10px] font-extrabold text-slate-700 uppercase tracking-widest">
                {currentLang.name}
              </span>
              <ChevronDown
                size={12}
                className={`text-slate-400 transition-transform duration-300 ${isLangOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-[150%] right-0 w-40 bg-white border border-slate-100 shadow-xl rounded-xl py-1.5 overflow-hidden z-[9999]"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-blue-50 transition-colors text-left ${
                        i18n.language === lang.code
                          ? "text-blue-600 bg-blue-50/50"
                          : "text-slate-600"
                      }`}
                    >
                      <img
                        src={`https://flagcdn.com/w20/${lang.flag}.png`}
                        className="w-5 h-3 object-cover rounded shadow-sm border border-slate-100"
                        alt={lang.code}
                      />
                      <span className="text-[10px] font-extrabold uppercase tracking-widest">
                        {lang.name}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

const SymbolLink = ({ href, img, title }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    title={title}
    className="block transition-transform hover:scale-110 active:scale-95 duration-200"
  >
    <img
      src={img}
      alt={title}
      className="w-[18px] h-[18px] object-contain drop-shadow-sm"
    />
  </a>
);

export default TopBar;
