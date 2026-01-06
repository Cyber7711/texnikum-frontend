import { Link } from "react-router-dom";
import { Menu, X, User, Globe, Eye, Music, ShieldCheck } from "lucide-react"; // ShieldCheck qo'shildi
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from "../Logo";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // Til ma'lumotlari
  const languages = [
    { code: "uz", name: "UZ", flag: "uz" },
    { code: "ru", name: "RU", flag: "ru" },
    { code: "en", name: "EN", flag: "gb" },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="bg-[#0a1128] text-white shadow-lg sticky top-0 z-50 border-b border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="hover:opacity-90 transition-opacity">
            <Logo />
          </Link>

          {/* Desktop Menyu */}
          <div className="hidden md:flex items-center space-x-8 text-[13px] font-bold uppercase tracking-wider">
            <Link to="/" className="hover:text-emerald-400 transition-colors">
              {t("nav_home")}
            </Link>
            <Link
              to="/news"
              className="hover:text-emerald-400 transition-colors"
            >
              {t("nav_news")}
            </Link>

            {/* RAHBARIYAT LINKI QO'SHILDI */}
            <Link
              to="/management"
              className="hover:text-emerald-400 transition-colors"
            >
              {t("nav_management") || "Rahbariyat"}
            </Link>

            <Link
              to="/teachers"
              className="hover:text-emerald-400 transition-colors"
            >
              {t("nav_teachers")}
            </Link>
            <Link
              to="/documents"
              className="hover:text-emerald-400 transition-colors"
            >
              {t("nav_documents")}
            </Link>

            <Link
              to="/login"
              className="flex items-center bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/20 active:scale-95"
            >
              <User className="w-4 h-4 mr-2" />
              {t("nav_login")}
            </Link>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENYU */}
      {isOpen && (
        <div className="md:hidden bg-[#0d1633] border-t border-white/5 pb-10 animate-in slide-in-from-top duration-300 h-[calc(100vh-80px)] overflow-y-auto custom-scrollbar">
          <div className="flex flex-col space-y-1 mt-4 px-4">
            <div className="grid grid-cols-1 gap-1">
              {[
                { to: "/", label: "nav_home" },
                { to: "/news", label: "nav_news" },
                { to: "/management", label: "nav_management" }, // Mobil menyuga qo'shildi
                { to: "/teachers", label: "nav_teachers" },
                { to: "/documents", label: "nav_documents" },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-4 hover:bg-white/5 rounded-2xl transition-colors font-bold text-sm uppercase tracking-widest flex items-center justify-between group"
                >
                  {t(item.label) ||
                    (item.label === "nav_management"
                      ? "Rahbariyat"
                      : item.label)}
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>

            {/* TIL TANLASH BLOKI */}
            <div className="mt-6 p-5 bg-[#162145] rounded-[2.5rem] border border-white/5 shadow-inner">
              <div className="flex items-center justify-between mb-4 px-1">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                  {t("select_language")}
                </span>
                <Globe size={14} className="text-emerald-500" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`flex flex-col items-center justify-center gap-2 py-4 rounded-2xl transition-all ${
                      i18n.language === lang.code
                        ? "bg-emerald-600 text-white shadow-xl shadow-emerald-900/40 translate-y-[-2px]"
                        : "bg-[#0a1128] text-slate-400 border border-white/5"
                    }`}
                  >
                    <img
                      src={`https://flagcdn.com/w40/${lang.flag}.png`}
                      className="w-7 h-4.5 object-cover rounded-sm shadow-sm"
                      alt={lang.code}
                    />
                    <span className="text-[10px] font-black">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* QO'SHIMCHA FUNKSIYALAR */}
            <div className="mt-4 grid grid-cols-2 gap-3 px-1">
              <button className="flex items-center justify-center gap-3 py-4 bg-white/5 rounded-2xl border border-white/5 text-slate-300 hover:text-white transition-colors">
                <Eye size={18} />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Rejim
                </span>
              </button>
              <a
                href="https://president.uz/uz/pages/symbols?menu_id=12"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 py-4 bg-white/5 rounded-2xl border border-white/5 text-slate-300 hover:text-white transition-colors"
              >
                <Music size={18} />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  {t("symbols")}
                </span>
              </a>
            </div>

            {/* Login Tugmasi */}
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="mt-8 flex items-center justify-center bg-emerald-600 text-white py-5 rounded-[2rem] font-black shadow-2xl shadow-emerald-900/40 active:scale-95 transition-all text-sm tracking-[0.1em]"
            >
              <User className="w-5 h-5 mr-3" />
              {t("nav_login")}
            </Link>

            {/* Footer school info */}
            <div className="mt-10 py-6 border-t border-white/5 text-center">
              <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">
                © 2026 {t("footer_school_name")}
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
