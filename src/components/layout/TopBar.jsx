import { useState, useEffect, useRef } from "react";
import { Phone, Mail, Music, Eye, ChevronDown } from "lucide-react";

const TopBar = () => {
  const [fontSize, setFontSize] = useState(100);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState({
    code: "uz",
    name: "O'zbekcha",
  });
  const langRef = useRef(null);

  // Shrift hajmini o'zgartirish
  const changeFontSize = (delta) => {
    setFontSize((prev) => {
      const newSize = Math.min(Math.max(prev + delta, 80), 130);
      document.documentElement.style.fontSize = `${newSize}%`;
      return newSize;
    });
  };

  // Grayscale (Oq-qora) rejimini yoqish
  const toggleGrayscale = () => {
    setIsGrayscale(!isGrayscale);
    if (!isGrayscale) {
      document.body.classList.add("grayscale-mode");
      // CSS orqali filtr berish: filter: grayscale(1) contrast(1.1);
    } else {
      document.body.classList.remove("grayscale-mode");
    }
  };

  // Til menyusidan tashqariga bosilganda yopish
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
    <div className="bg-white border-b border-gray-100 py-1.5 hidden lg:block z-[9999] relative">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* CHAP TOMON: Ramzlar va Aloqa */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 pr-4 border-r border-gray-200 h-6">
            <SymbolLink
              href="https://www.gov.uz/uz/pages/symbols_flag"
              img="https://flagcdn.com/w40/uz.png"
              title="Bayroq"
            />
            <SymbolLink
              href="https://www.gov.uz/uz/pages/symbols_gerb"
              img="https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Emblem_of_Uzbekistan.svg/512px-Emblem_of_Uzbekistan.svg.png"
              title="Gerb"
            />
            <a
              href="https://www.gov.uz/uz/pages/symbols_anthem"
              target="_blank"
              rel="noreferrer"
              title="Madhiya"
            >
              <Music
                size={16}
                className="text-blue-500 hover:text-blue-700 transition"
              />
            </a>
          </div>

          <div className="flex items-center gap-5 text-[10px] font-black text-blue-900 uppercase tracking-tighter">
            <a
              href="mailto:info@texnikum.uz"
              className="flex items-center gap-1.5 hover:text-blue-600 transition"
            >
              <Mail size={13} className="text-blue-400" /> Pochta
            </a>
            <div className="flex items-center gap-1.5 cursor-default">
              <Phone size={13} className="text-blue-400" /> 71-###-##-##
            </div>
            <div className="h-3 w-px bg-gray-200"></div>
            <a href="#" className="text-red-600 font-black animate-pulse">
              Qabul-2026
            </a>
          </div>
        </div>

        {/* O'NG TOMON: Accessibility va Til */}
        <div className="flex items-center gap-6 h-6">
          {/* Shrift nazorati */}
          <div className="flex items-center gap-3 border-r border-gray-100 pr-5 h-full">
            <button
              onClick={() => changeFontSize(-5)}
              className="text-gray-400 hover:text-blue-600 font-black text-xs"
            >
              A-
            </button>
            <span className="text-[10px] text-gray-300 font-bold">
              {fontSize}%
            </span>
            <button
              onClick={() => changeFontSize(5)}
              className="text-gray-800 hover:text-blue-600 font-black text-xs"
            >
              A+
            </button>
          </div>

          {/* Ko'rish rejimi */}
          <div className="flex items-center gap-3 border-r border-gray-100 pr-5 h-full">
            <button
              onClick={toggleGrayscale}
              className={`transition-colors ${
                isGrayscale
                  ? "text-blue-600"
                  : "text-gray-400 hover:text-blue-600"
              }`}
              title="Oq-qora rejim"
            >
              <Eye size={18} />
            </button>
          </div>

          {/* Til tanlash Dropdown */}
          <div className="relative h-full" ref={langRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 h-full px-2 hover:bg-gray-50 rounded transition"
            >
              <img
                src={`https://flagcdn.com/w20/${
                  currentLang.code === "en" ? "gb" : currentLang.code
                }.png`}
                className="w-4 h-2.5 object-cover rounded-sm"
                alt="flag"
              />
              <span className="text-[10px] font-black text-gray-700 uppercase">
                {currentLang.name}
              </span>
              <ChevronDown
                size={12}
                className={`text-gray-400 transition-transform duration-300 ${
                  isLangOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isLangOpen && (
              <div className="absolute top-full right-0 mt-1 w-32 bg-white border border-gray-100 shadow-xl rounded-lg py-1 overflow-hidden animate-in fade-in slide-in-from-top-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang);
                      setIsLangOpen(false);
                      // Bu yerda i18n.changeLanguage(lang.code) chaqirilishi mumkin
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-blue-50 transition text-left"
                  >
                    <img
                      src={`https://flagcdn.com/w20/${lang.flag}.png`}
                      className="w-4 h-2.5 object-cover"
                      alt={lang.code}
                    />
                    <span className="text-[10px] font-bold text-gray-700">
                      {lang.name}
                    </span>
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

const SymbolLink = ({ href, img, title }) => (
  <a href={href} target="_blank" rel="noreferrer" title={title}>
    <img
      src={img}
      alt={title}
      className="w-5 h-auto object-contain hover:scale-110 transition brightness-95 hover:brightness-110"
    />
  </a>
);

export default TopBar;
