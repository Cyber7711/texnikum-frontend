import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Music, Eye, ChevronDown, X, Info } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

// 1. Davlat ramzlari bo'yicha to'liq ma'lumotlar bazasi (Static Data)
const SYMBOL_DATA = {
  flag: {
    title: "O'zbekiston Respublikasining Davlat Bayrog'i",
    icon: "🇺🇿",
    date: "1991-yil 18-noyabrda qabul qilingan",
    content: (
      <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
        <p>
          <strong>To'q moviy rang</strong> — tiriklik mazmuni aks etgan mangu
          osmon va obihayot ramzi. Bu Amir Temur davlati bayrog'ining rangidir.
        </p>
        <p>
          <strong>Oq rang</strong> — muqaddas tinchlik ramzi bo'lib, u kun
          charog'onligi va koinot yoritqichlari bilan uyg'unlashib ketadi. Oq
          rang — poklik, beg'uborlik, soflikni, orzu va xayollar tozaligini,
          ichki go'zallikka intilishning timsoli.
        </p>
        <p>
          <strong>Yashil rang</strong> — tabiatning yangilanish ramzi. U
          ko'pgina xalqlarda navqironlik, umid va shodumonlik timsoli
          hisoblanadi.
        </p>
        <p>
          <strong>Qizil chiziqlar</strong> — vujudimizda jo'sh urib oqayotgan
          hayotiy qudrat irmoqlaridir.
        </p>
        <p>
          <strong>Yarim oy va 12 yulduz</strong> — O'zbekiston xalqining ko'p
          asrlik an'analari, qadimgi quyosh taqvimi hamda madaniyatimizning
          qadimiyligi va komillik belgisidir.
        </p>
      </div>
    ),
  },
  emblem: {
    title: "O'zbekiston Respublikasining Davlat Gerbi",
    icon: "🦚", // Yoki gerb rasmini qoyish mumkin
    img: "https://upload.wikimedia.org/wikipedia/commons/7/77/Emblem_of_Uzbekistan.svg",
    date: "1992-yil 2-iyulda qabul qilingan",
    content: (
      <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
        <p>
          Gerbning markazida himmat, olijanoblik va fidoyilik timsoli bo'lgan
          afsonaviy <strong>Humo qushi</strong> qanotlarini yozib turibdi. Ushbu
          ramz va timsollar xalqimizning tinchlik, yaxshilik, baxt-saodat,
          farovonlik yo'lidagi orzu-umidlarini ifodalaydi.
        </p>
        <p>
          <strong>Tog'lar uzra charaqlab turgan quyosh</strong> —
          mamlakatimizning serquyosh ekanligini, xalqimizning nurlarga burkangan
          go'zal makonda yashayotganini bildiradi.
        </p>
        <p>
          Gerbning o'ng tomonida o'zbek xalqining rizq-ro'zi, boyligi bo'lgan{" "}
          <strong>paxta chanoqlari</strong>, chap tomonida esa hayot manbai —{" "}
          <strong>bug'doy boshoqlari</strong> tasvirlangan.
        </p>
        <p>
          Yuqori qismida respublika jipsligining ramzi sifatida{" "}
          <strong>sakkiz qirrali yulduz (musamman)</strong>, uning ichida esa
          yarim oy va yulduz tasvirlangan.
        </p>
      </div>
    ),
  },
  anthem: {
    title: "O'zbekiston Respublikasining Davlat Madhiyasi",
    icon: "🎵",
    date: "1992-yil 10-dekabrda qabul qilingan",
    content: (
      <div className="space-y-4 text-sm text-slate-700">
        <div className="bg-slate-100 p-3 rounded-lg flex justify-between items-center text-xs font-bold text-slate-500">
          <span>Musiqasi: Mutal Burhonov</span>
          <span>So'zi: Abdulla Oripov</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 italic text-center text-slate-800 font-medium">
          <div>
            <p>Serquyosh hur o'lkam, elga baxt, najot,</p>
            <p>Sen o'zing do'stlarga yo'ldosh, mehribon!</p>
            <p>Yashnagay to abad ilmu fan, ijod,</p>
            <p>Shuhrating porlasin toki bor jahon!</p>
            <br />
            <p className="font-bold text-blue-700">Naqorat:</p>
            <p>Oltin bu vodiylar — jon O'zbekiston,</p>
            <p>Ajdodlar mardona ruhi senga yor!</p>
            <p>Ulug' xalq qudrati jo'sh urgan zamon,</p>
            <p>Olamni mahliyo aylagan diyor!</p>
          </div>
          <div>
            <p>Bag'ri keng o'zbekning o'chmas iymoni,</p>
            <p>Erkin, yosh avlodlar senga zo'r qanot!</p>
            <p>Istiqlol mash'ali, tinchlik posboni,</p>
            <p>Haqsevar, ona yurt, mangu bo'l obod!</p>
            <br />
            <p className="font-bold text-blue-700">Naqorat:</p>
            <p>Oltin bu vodiylar — jon O'zbekiston,</p>
            <p>Ajdodlar mardona ruhi senga yor!</p>
            <p>Ulug' xalq qudrati jo'sh urgan zamon,</p>
            <p>Olamni mahliyo aylagan diyor!</p>
          </div>
        </div>
      </div>
    ),
  },
};

const TopBar = () => {
  const { t, i18n } = useTranslation();
  const [fontSize, setFontSize] = useState(100);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  // Modal uchun state
  const [activeSymbol, setActiveSymbol] = useState(null);
  const langRef = useRef(null);

  const languages = [
    { code: "uz", name: "O'zbekcha", flag: "🇺🇿" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "en", name: "English", flag: "🇬🇧" },
  ];

  const currentLang =
    languages.find((l) => l.code === i18n.language) || languages[0];

  const changeFontSize = (delta) => {
    setFontSize((prev) => {
      const newSize = Math.min(Math.max(prev + delta, 80), 130);
      document.documentElement.style.fontSize = `${newSize}%`;
      return newSize;
    });
  };

  const toggleGrayscale = () => {
    setIsGrayscale(!isGrayscale);
    document.documentElement.classList.toggle("grayscale");
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

  // Escape bosilganda modalni yopish
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setActiveSymbol(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Modal komponenti
  const SymbolModal = () => {
    if (!activeSymbol) return null;
    const data = SYMBOL_DATA[activeSymbol];

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
          onClick={() => setActiveSymbol(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()} // Ichiga bosganda yopilib ketmasligi uchun
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-xl border border-slate-200">
                  {data.img ? (
                    <img
                      src={data.img}
                      alt="icon"
                      className="w-6 h-6 object-contain"
                    />
                  ) : (
                    data.icon
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">
                    {data.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                    <Info size={12} /> {data.date}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveSymbol(null)}
                className="w-8 h-8 flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto custom-scrollbar">
              {data.content}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <>
      <div className="bg-slate-50 border-b border-slate-200 py-2 hidden lg:block relative z-[1000] font-sans">
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* CHAP TOMON: Ramzlar va Kontaktlar */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 pr-5 border-r border-slate-300 h-6">
              <button
                onClick={() => setActiveSymbol("flag")}
                className="flex items-center justify-center w-8 h-8 bg-white border border-slate-200 rounded-md shadow-sm hover:border-blue-300 transition-all hover:scale-110 text-lg"
                title={t("flag", "Davlat bayrog'i")}
              >
                🇺🇿
              </button>

              <button
                onClick={() => setActiveSymbol("emblem")}
                className="flex items-center justify-center w-8 h-8 bg-white border border-slate-200 rounded-md shadow-sm hover:border-blue-300 transition-all hover:scale-110 overflow-hidden"
                title={t("emblem", "Davlat gerbi")}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/77/Emblem_of_Uzbekistan.svg"
                  alt="Gerb"
                  className="w-5 h-5 object-contain flex-shrink-0"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </button>

              <button
                onClick={() => setActiveSymbol("anthem")}
                title={t("anthem", "Davlat madhiyasi")}
                className="flex items-center justify-center w-8 h-8 bg-white border border-slate-200 hover:bg-blue-50 hover:border-blue-200 rounded-md transition-all hover:scale-110 shadow-sm"
              >
                <Music size={15} strokeWidth={2.5} className="text-blue-600" />
              </button>
            </div>

            {/* Kontaktlar qismi (O'zgarishsiz) */}
            <div className="flex items-center gap-6 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
              <a
                href="mailto:info@texnikum.uz"
                className="flex items-center gap-2 hover:text-blue-600 transition-colors group"
              >
                <Mail
                  size={14}
                  strokeWidth={2.5}
                  className="text-blue-500 group-hover:scale-110 transition-transform"
                />
                <span>info@texnikum.uz</span>
              </a>
              <a
                href="tel:+998661234567"
                className="flex items-center gap-2 hover:text-blue-600 transition-colors group"
              >
                <Phone
                  size={14}
                  strokeWidth={2.5}
                  className="text-blue-500 group-hover:scale-110 transition-transform"
                />
                <span>+998 66 123 45 67</span>
              </a>

              <div className="h-4 w-px bg-slate-300"></div>

              <Link
                to="/qabul"
                className="flex items-center gap-2 text-amber-600 font-extrabold group"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
                </span>
                <span className="group-hover:text-blue-700 transition-colors tracking-tighter">
                  {t("admission", "QABUL 2025")}
                </span>
              </Link>
            </div>
          </div>

          {/* O'NG TOMON: Maxsus imkoniyatlar va Til (O'zgarishsiz) */}
          <div className="flex items-center gap-4 h-6">
            <div className="flex items-center gap-1 border-r border-slate-300 pr-4 h-full">
              <button
                onClick={() => changeFontSize(-5)}
                className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all text-xs font-black"
              >
                A-
              </button>
              <div className="text-[10px] text-blue-700 px-2 py-0.5 bg-blue-50 border border-blue-100 rounded min-w-[40px] text-center font-black">
                {fontSize}%
              </div>
              <button
                onClick={() => changeFontSize(5)}
                className="w-7 h-7 flex items-center justify-center text-slate-700 hover:text-blue-600 transition-all text-xs font-black"
              >
                A+
              </button>
            </div>

            <button
              onClick={toggleGrayscale}
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all duration-300 border ${
                isGrayscale
                  ? "bg-slate-800 text-white border-slate-800 shadow-lg"
                  : "bg-white border-slate-200 text-slate-500 hover:border-blue-300 shadow-sm"
              }`}
            >
              <Eye size={14} strokeWidth={2.5} />
              <span>{isGrayscale ? "Oddiy" : "Maxsus"}</span>
            </button>

            <div className="relative h-full flex items-center" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 h-full px-2 hover:bg-white rounded-md border border-transparent hover:border-slate-200 transition-all group"
              >
                <span className="text-lg leading-none flex-shrink-0">
                  {currentLang.flag}
                </span>
                <span className="text-[10px] font-black text-slate-700 uppercase group-hover:text-blue-600">
                  {currentLang.code}
                </span>
                <motion.div animate={{ rotate: isLangOpen ? 180 : 0 }}>
                  <ChevronDown
                    size={14}
                    strokeWidth={3}
                    className="text-slate-400"
                  />
                </motion.div>
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 6 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 w-44 bg-white border border-slate-100 shadow-2xl rounded-xl py-2 z-[10000]"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          i18n.changeLanguage(lang.code);
                          setIsLangOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-2.5 transition-colors ${i18n.language === lang.code ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg leading-none">
                            {lang.flag}
                          </span>
                          <span className="text-[11px] font-bold uppercase">
                            {lang.name}
                          </span>
                        </div>
                        {i18n.language === lang.code && (
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* MODALNI RENDER QILISH */}
      <SymbolModal />
    </>
  );
};

export default TopBar;
