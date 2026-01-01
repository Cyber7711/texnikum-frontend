import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from "../Logo"; // Logo yo'li to'g'ri ekanligini tekshiring

const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#0a1128] text-white shadow-lg sticky top-0 z-50 border-b border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* LOGO QISMI - Oq doira olib tashlandi, Logo o'zi yetarli */}
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

      {/* Mobile Menyu */}
      {isOpen && (
        <div className="md:hidden bg-[#0d1633] border-t border-white/5 pb-6 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-1 mt-2 px-4">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="px-4 py-4 hover:bg-white/5 rounded-xl transition-colors"
            >
              {t("nav_home")}
            </Link>
            <Link
              to="/news"
              onClick={() => setIsOpen(false)}
              className="px-4 py-4 hover:bg-white/5 rounded-xl transition-colors"
            >
              {t("nav_news")}
            </Link>
            <Link
              to="/teachers"
              onClick={() => setIsOpen(false)}
              className="px-4 py-4 hover:bg-white/5 rounded-xl transition-colors"
            >
              {t("nav_teachers")}
            </Link>
            <Link
              to="/documents"
              onClick={() => setIsOpen(false)}
              className="px-4 py-4 hover:bg-white/5 rounded-xl transition-colors"
            >
              {t("nav_documents")}
            </Link>
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="mt-4 flex items-center justify-center bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-900/20"
            >
              <User className="w-4 h-4 mr-2" />
              {t("nav_login")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
