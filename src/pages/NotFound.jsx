import { Link, useNavigate } from "react-router-dom";
import { MoveLeft, Home, SearchX, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#0a1128] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* 1. Orqa fon bezaklari (Dinamik nur effektlari) */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-2xl w-full"
      >
        {/* 2. Visual Badge */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
        >
          <Zap size={14} fill="currentColor" /> Xatolik yuz berdi
        </motion.div>

        {/* 3. 404 Visual Effect */}
        <div className="relative flex justify-center mb-4">
          <motion.h1
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-[10rem] md:text-[15rem] font-black text-white leading-none tracking-tighter italic opacity-10 select-none"
          >
            404
          </motion.h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                y: [0, -10, 0],
              }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="p-8 bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-2xl"
            >
              <SearchX
                size={100}
                className="text-emerald-500"
                strokeWidth={1.5}
              />
            </motion.div>
          </div>
        </div>

        {/* 4. Text Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase italic tracking-tighter">
            Sahifa{" "}
            <span className="text-emerald-500 not-italic">Topilmadi</span>
          </h2>

          <p className="text-slate-400 mb-12 text-lg md:text-xl font-medium max-w-md mx-auto leading-relaxed">
            Siz qidirayotgan manzil vaqtincha o'chirilgan yoki ko'chirilgan
            bo'lishi mumkin. Keling, birga yo'lni topamiz.
          </p>
        </motion.div>

        {/* 5. Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <motion.button
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-widest border border-white/10 transition-all flex items-center justify-center gap-3 italic"
          >
            <MoveLeft size={18} /> Ortga qaytish
          </motion.button>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <Link
              to="/"
              className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-emerald-600 text-white font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 shadow-2xl shadow-emerald-900/40 transition-all flex items-center justify-center gap-3 italic"
            >
              <Home size={18} /> {t("nav_home") || "Bosh sahifa"}{" "}
              <Sparkles size={14} />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Dekorativ pastki chiziq */}
      <div className="absolute bottom-10 left-0 w-full flex justify-center opacity-20">
        <div className="flex gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-emerald-500"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
