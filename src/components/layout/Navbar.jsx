import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#0a1128] text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-full">
              <span className="text-tatu-blue font-bold text-xl">TEX</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none uppercase">
                Texnikum
              </span>
              <span className="text-xs text-blue-200 uppercase tracking-widest">
                Axborot Tizimi
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium uppercase">
            <Link to="/" className="hover:text-tatu-gold transition">
              Asosiy
            </Link>
            <Link to="/news" className="hover:text-tatu-gold transition">
              Yangiliklar
            </Link>
            <Link to="/teachers" className="hover:text-tatu-gold transition">
              O'qituvchilar
            </Link>
            <Link to="/documents" className="hover:text-tatu-gold transition">
              Hujjatlar
            </Link>

            <Link
              to="/login"
              className="flex items-center bg-white text-tatu-blue px-4 py-2 rounded font-bold hover:bg-tatu-gold hover:text-white transition"
            >
              <User className="w-4 h-4 mr-2" />
              Kirish
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-tatu-dark pb-4">
          <Link to="/" className="block px-4 py-2 hover:bg-white/10">
            Asosiy
          </Link>
          <Link to="/news" className="block px-4 py-2 hover:bg-white/10">
            Yangiliklar
          </Link>
          <Link to="/teachers" className="block px-4 py-2 hover:bg-white/10">
            O'qituvchilar
          </Link>
          <Link
            to="/login"
            className="block px-4 py-2 bg-tatu-gold text-center mt-2 mx-4 rounded"
          >
            Kirish
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
