import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, Globe, Flag } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../Logo";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Scroll effektini ulash
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const languages = [
    { code: "uz", name: "O'zbek", short: "UZ", flag: "uz" },
    { code: "ru", name: "Русский", short: "RU", flag: "ru" },
    { code: "en", name: "English", short: "EN", flag: "gb" },
  ];

  const currentLang =
    languages.find((l) => l.code === i18n.language) || languages[0];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const navLinks = [
    { to: "/", label: t("nav_home", "BOSH SAHIFA") },
    { to: "/news", label: t("nav_news", "YANGILIKLAR") },
    { to: "/management", label: t("nav_management", "RAHBARIYAT") },
    { to: "/teachers", label: t("nav_teachers", "O'QITUVCHILAR") },
    { to: "/documents", label: t("nav_documents", "HUJJATLAR") },
  ];

  return (
    <nav
      className={`sticky top-0 z-[900] transition-all duration-300 border-b border-white/10 ${
        scrolled
          ? "bg-[#0a1930]/95 backdrop-blur-md shadow-lg py-2"
          : "bg-[#0a1930] py-4"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-14">
          {/* LOGO */}
          <Link
            to="/"
            className="hover:opacity-90 transition-opacity z-50 shrink-0"
          >
            <Logo />
          </Link>

          {/* DESKTOP MENYU */}
          <div className="hidden lg:flex items-center space-x-8 text-[11px] font-extrabold uppercase tracking-widest">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative py-2 transition-colors ${isActive ? "text-amber-400" : "text-white hover:text-amber-400"}`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 rounded-full"
                    />
                  )}
                </Link>
              );
            })}

            {/* Login Tugmasi */}
            <Link
              to="/login"
              className="flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-500 transition-all text-xs tracking-widest uppercase shadow-md active:scale-95 ml-4"
            >
              <User className="w-4 h-4 mr-2" />
              {t("nav_login", "TIZIMGA KIRISH")}
            </Link>
          </div>

          {/* MOBILE TOGGLE BUTTON */}
          <div className="lg:hidden flex items-center gap-4 z-50">
            {/* Mobil uchun tezkor til tugmasi */}
            <button
              onClick={() =>
                changeLanguage(currentLang.code === "uz" ? "ru" : "uz")
              }
              className="text-white/80 font-bold text-xs uppercase"
            >
              {currentLang.code === "uz" ? "RU" : "UZ"}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENYU (To'liq ekran) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 top-[76px] bg-[#0a1930] z-40 overflow-y-auto lg:hidden pb-20"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col h-full">
              {/* Menyu elementlari */}
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.to;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className={`px-5 py-4 rounded-xl font-extrabold text-sm uppercase tracking-widest transition-colors flex items-center justify-between border ${
                        isActive
                          ? "bg-blue-600/10 text-blue-400 border-blue-500/20"
                          : "text-white border-transparent hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              {/* Mobil Til va Ramzlar */}
              <div className="mt-8 bg-white/5 rounded-2xl p-5 border border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Globe size={14} className="text-amber-400" /> Tilni tanlang
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`flex flex-col items-center justify-center gap-2 py-3 rounded-xl transition-all ${
                        i18n.language === lang.code
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-[#0f2341] text-slate-400 border border-white/5 hover:bg-white/10"
                      }`}
                    >
                      <img
                        src={`https://flagcdn.com/w40/${lang.flag}.png`}
                        className="w-6 h-4 object-cover rounded-sm"
                        alt={lang.code}
                      />
                      <span className="text-[10px] font-extrabold">
                        {lang.short}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobil Login Tugmasi */}
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="mt-8 w-full flex justify-center items-center py-4 rounded-xl bg-blue-600 text-white font-extrabold text-xs tracking-widest uppercase shadow-lg active:scale-95"
              >
                <User className="w-4 h-4 mr-2" />
                {t("nav_login", "TIZIMGA KIRISH")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
