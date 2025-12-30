import { Link, useNavigate } from "react-router-dom";
import { MoveLeft, Home, Leaf, SearchX } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
      {/* Orqa fon bezaklari (Agro style) */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="relative z-10 max-w-lg w-full">
        {/* Ikonka va 404 yozuvi */}
        <div className="relative flex justify-center mb-8">
          <div className="absolute inset-0 bg-emerald-200/50 blur-2xl rounded-full"></div>
          <SearchX
            size={120}
            className="text-emerald-600 relative z-10 animate-bounce-slow"
          />
        </div>

        <h1 className="text-8xl font-black text-slate-800 tracking-tighter mb-2">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-slate-700 mb-4">
          Opss! Sahifa topilmadi.
        </h2>

        <p className="text-slate-500 mb-8 text-lg">
          Siz qidirayotgan sahifa o'chirilgan, nomi o'zgartirilgan yoki
          vaqtincha mavjud emas. Manzilni tekshirib ko'ring.
        </p>

        {/* Tugmalar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 transition flex items-center justify-center gap-2"
          >
            <MoveLeft size={20} /> Orqaga qaytish
          </button>

          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition flex items-center justify-center gap-2"
          >
            <Home size={20} /> Bosh sahifa
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
