import { motion } from "framer-motion";
import { ArrowRight, Newspaper, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NewsCard from "../../../components/ui/NewsCard";

// Skeleton Loader - Ma'lumot yuklanguncha chiroyli blok ko'rsatib turadi
const NewsSkeleton = () => (
  <div className="bg-slate-50 rounded-[3rem] p-6 animate-pulse h-[500px] flex flex-col">
    <div className="w-full h-64 bg-slate-200 rounded-[2.5rem] mb-6"></div>
    <div className="space-y-4 px-2">
      <div className="h-3 bg-slate-200 rounded w-1/4"></div>
      <div className="h-8 bg-slate-200 rounded w-full"></div>
      <div className="h-20 bg-slate-200 rounded w-full"></div>
    </div>
    <div className="mt-auto h-10 bg-slate-200 rounded-full w-1/3 mx-2 mb-2"></div>
  </div>
);

const NewsSection = ({ newsList, loading }) => {
  const { t } = useTranslation();

  // newsList massiv ekanligini va ichi bo'sh emasligini tekshiramiz
  const data = Array.isArray(newsList) ? newsList : [];

  // Animatsiya variantlari (Stagger effect - birin ketin chiqishi uchun)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <section className="py-32 bg-white relative z-30 -mt-20 md:-mt-28 rounded-t-[5rem] shadow-[0_-40px_80px_-20px_rgba(0,0,0,0.1)]">
      {/* Orqa fon bezagi */}
      <div className="absolute top-60 right-0 w-[500px] h-[500px] bg-emerald-500/[0.03] blur-[120px] rounded-full -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6">
        {/* HEADER QISMI */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl text-center md:text-left mx-auto md:mx-0"
          >
            <span className="inline-flex items-center gap-3 text-emerald-600 font-black uppercase tracking-[0.4em] text-[10px] mb-6 bg-emerald-50 px-5 py-2.5 rounded-full italic border border-emerald-100/50">
              <Newspaper size={14} className="animate-bounce" />
              {t("latest_events") || "SO'NGGI VOQEALAR"}
            </span>
            <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.85] italic uppercase">
              {t("technical_news_title_1") || "TEXNIKUM"}{" "}
              <span className="text-emerald-500 not-italic block md:inline">
                {t("technical_news_title_2") || "YANGILIKLARI"}
              </span>
            </h2>
            <div className="w-24 h-2 bg-emerald-500 mt-8 rounded-full hidden md:block"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full md:w-auto"
          >
            <Link
              to="/news"
              className="group flex items-center justify-center gap-5 px-10 py-5 rounded-[2rem] bg-slate-900 text-white font-black text-[11px] uppercase tracking-widest hover:bg-emerald-600 transition-all duration-500 shadow-2xl shadow-slate-900/20 italic w-full md:w-auto"
            >
              {t("see_all") || "BARCHA YANGILIKLAR"}
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-2 transition-transform duration-500">
                <ArrowRight size={18} />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* 3. Bo'sh holat (Yangilik yo'q bo'lganda chiqadigan qism) */}
        {!loading && data.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-24 text-center bg-slate-50/50 rounded-[4rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center group"
          >
            {/* Animatsiyali belgi */}
            <div className="w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center mb-8 text-slate-300 group-hover:text-emerald-500 transition-colors duration-500">
              <LayoutGrid
                size={40}
                strokeWidth={1.5}
                className="animate-pulse"
              />
            </div>

            {/* Asosiy matn */}
            <h3 className="text-xl md:text-2xl font-black text-slate-400 uppercase tracking-widest italic leading-tight px-6">
              {t("no_news_available")}
            </h3>

            <p className="text-slate-400 mt-4 text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">
              Yaqin orada yangi ma'lumotlar qo'shiladi
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
