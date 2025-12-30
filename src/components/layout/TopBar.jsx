import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Music, Eye, ChevronDown } from "lucide-react";

// --- SOZLAMALAR ---
const CONTACT_INFO = {
  email: "info@texnikum.uz",
  phone: "+998 71 123 45 67",
  phoneLink: "tel:+998711234567",
  admissionPath: "/qabul",
  admissionText: "Qabul-2025",
};

const SYMBOLS = {
  // Prezident portalidagi maxsus bo'limlarga aniq linklar
  flag: "https://president.uz/uz/pages/symbols?menu_id=12",
  emblem: "https://president.uz/uz/pages/symbols?menu_id=13",
  anthem: "https://president.uz/uz/pages/symbols?menu_id=14",
};
// ------------------

const TopBar = () => {
  const [fontSize, setFontSize] = useState(100);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState({
    code: "uz",
    name: "O'zbekcha",
  });
  const langRef = useRef(null);

  // Shrift hajmini boshqarish
  const changeFontSize = (delta) => {
    setFontSize((prev) => {
      const newSize = Math.min(Math.max(prev + delta, 80), 130);
      document.documentElement.style.fontSize = `${newSize}%`;
      return newSize;
    });
  };

  // Maxsus imkoniyatlar (Oq-qora rejim)
  const toggleGrayscale = () => {
    setIsGrayscale(!isGrayscale);
    if (!isGrayscale) {
      document.documentElement.classList.add("grayscale-mode");
    } else {
      document.documentElement.classList.remove("grayscale-mode");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languages = [
    { code: "uz", name: "O'zbekcha", flag: "uz" },
    { code: "ru", name: "Русский", flag: "ru" },
    { code: "en", name: "English", flag: "gb" },
  ];

  return (
    <div className="bg-white border-b border-gray-100 py-1.5 hidden lg:block z-[50] relative transition-all duration-300">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* CHAP TOMON: Davlat ramzlari va Kontaktlar */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 pr-4 border-r border-gray-200 h-6">
            <SymbolLink
              href={SYMBOLS.flag}
              img="https://flagcdn.com/w40/uz.png"
              title="O'zbekiston Respublikasi Davlat bayrog'i haqida ma'lumot"
            />
            <SymbolLink
              href={SYMBOLS.emblem}
              img="https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Emblem_of_Uzbekistan.svg/512px-Emblem_of_Uzbekistan.svg.png"
              title="O'zbekiston Respublikasi Davlat gerbi haqida ma'lumot"
            />
            <a
              href={SYMBOLS.anthem}
              target="_blank"
              rel="noreferrer"
              title="O'zbekiston Respublikasi Davlat madhiyasi (Audio va Matn)"
              className="group"
            >
              <Music
                size={18}
                className="text-blue-500 group-hover:text-blue-700 group-hover:scale-110 transition-all duration-300"
              />
            </a>
          </div>

          <div className="flex items-center gap-5 text-[10px] font-black text-slate-800 uppercase tracking-tighter">
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="flex items-center gap-1.5 hover:text-emerald-600 transition-colors group"
            >
              <Mail size={13} className="text-emerald-500" />
              {CONTACT_INFO.email}
            </a>

            <a
              href={CONTACT_INFO.phoneLink}
              className="flex items-center gap-1.5 hover:text-emerald-600 transition-colors group"
            >
              <Phone size={13} className="text-emerald-500" />
              {CONTACT_INFO.phone}
            </a>

            <div className="h-3 w-px bg-gray-200"></div>

            <Link
              to={CONTACT_INFO.admissionPath}
              className="flex items-center gap-1 text-rose-600 hover:text-rose-700 font-black animate-pulse hover:animate-none transition-all"
            >
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              {CONTACT_INFO.admissionText}
            </Link>
          </div>
        </div>

        {/* O'NG TOMON: Maxsus imkoniyatlar va Til */}
        <div className="flex items-center gap-6 h-6">
          {/* Shrift nazorati */}
          <div className="flex items-center gap-3 border-r border-gray-100 pr-5 h-full select-none">
            <button
              onClick={() => changeFontSize(-5)}
              className="text-gray-400 hover:text-emerald-600 font-black text-xs px-1 transition-colors"
              title="Shriftni kichiklashtirish"
            >
              A-
            </button>
            <span className="text-[10px] text-slate-400 font-bold w-10 text-center bg-slate-50 rounded py-0.5">
              {fontSize}%
            </span>
            <button
              onClick={() => changeFontSize(5)}
              className="text-slate-800 hover:text-emerald-600 font-black text-xs px-1 transition-colors"
              title="Shriftni kattalashtirish"
            >
              A+
            </button>
          </div>

          {/* Ko'rish rejimi (Oq-qora) */}
          <div className="flex items-center gap-3 border-r border-gray-100 pr-5 h-full">
            <button
              onClick={toggleGrayscale}
              className={`transition-all duration-300 p-1.5 rounded-lg ${
                isGrayscale
                  ? "text-white bg-slate-800 shadow-inner"
                  : "text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
              }`}
              title="Maxsus imkoniyatlar: Oq-qora rejim"
            >
              <Eye size={16} />
            </button>
          </div>

          {/* Til Dropdown */}
          <div className="relative h-full flex items-center" ref={langRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 h-full px-3 hover:bg-slate-50 rounded-lg transition-all"
            >
              <img
                src={`https://flagcdn.com/w20/${
                  currentLang.code === "en" ? "gb" : currentLang.code
                }.png`}
                className="w-4 h-2.5 object-cover rounded-sm shadow-sm"
                alt="lang-flag"
              />
              <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider">
                {currentLang.name}
              </span>
              <ChevronDown
                size={12}
                className={`text-slate-400 transition-transform duration-300 ${
                  isLangOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isLangOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-slate-100 shadow-2xl rounded-2xl py-1.5 overflow-hidden animate-in fade-in slide-in-from-top-2 z-[60]">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang);
                      setIsLangOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-emerald-50 transition-colors text-left ${
                      currentLang.code === lang.code
                        ? "text-emerald-600 bg-emerald-50/50"
                        : "text-slate-600"
                    }`}
                  >
                    <img
                      src={`https://flagcdn.com/w20/${lang.flag}.png`}
                      className="w-5 h-3 object-cover rounded shadow-sm"
                      alt={lang.code}
                    />
                    <span className="text-[11px] font-bold">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Ramzlar uchun yordamchi komponent
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
      className="w-5 h-auto object-contain brightness-100 hover:brightness-110"
    />
  </a>
);

export default TopBar;
