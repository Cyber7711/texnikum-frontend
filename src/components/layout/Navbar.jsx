import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next"; // 1. i18n hookini import qilamiz

const Navbar = () => {
  const { t } = useTranslation(); // 2. t funksiyasini chaqiramiz
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#0a1128] text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-full">
              <span className="text-[#0a1128] font-bold text-xl">TEX</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none uppercase">
                {t("navbar_brand_name")}
              </span>
              <span className="text-xs text-blue-200 uppercase tracking-widest">
                {t("navbar_brand_sub")}
              </span>
            </div>
          </Link>

          {/* Desktop Menyu */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium uppercase">
            <Link to="/" className="hover:text-emerald-400 transition">
              {t("nav_home")}
            </Link>
            <Link to="/news" className="hover:text-emerald-400 transition">
              {t("nav_news")}
            </Link>
            <Link to="/teachers" className="hover:text-emerald-400 transition">
              {t("nav_teachers")}
            </Link>
            <Link to="/documents" className="hover:text-emerald-400 transition">
              {t("nav_documents")}
            </Link>

            <Link
              to="/login"
              className="flex items-center bg-white text-[#0a1128] px-4 py-2 rounded font-bold hover:bg-emerald-500 hover:text-white transition"
            >
              <User className="w-4 h-4 mr-2" />
              {t("nav_login")}
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menyu */}
      {isOpen && (
        <div className="md:hidden bg-[#0d1633] pb-4 animate-in slide-in-from-top duration-300">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 hover:bg-white/10"
          >
            {t("nav_home")}
          </Link>
          <Link
            to="/news"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 hover:bg-white/10"
          >
            {t("nav_news")}
          </Link>
          <Link
            to="/teachers"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 hover:bg-white/10"
          >
            {t("nav_teachers")}
          </Link>
          <Link
            to="/documents"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 hover:bg-white/10"
          >
            {t("nav_documents")}
          </Link>
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 bg-emerald-600 text-center mt-2 mx-4 rounded font-bold"
          >
            {t("nav_login")}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
