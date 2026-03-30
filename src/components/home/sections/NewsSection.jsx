import { motion } from "framer-motion";
import { ArrowRight, Newspaper, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NewsCard from "../../../components/ui/NewsCard";

// Rasmiy va toza Skeleton Loader
const NewsSkeleton = () => (
  <div className="bg-white rounded-2xl border border-slate-200 p-5 animate-pulse h-[420px] flex flex-col shadow-sm">
    <div className="w-full h-52 bg-slate-100 rounded-xl mb-6 border border-slate-50"></div>
    <div className="space-y-4 px-2">
      <div className="h-3 bg-slate-200 rounded w-1/4"></div>
      <div className="h-5 bg-slate-200 rounded w-full"></div>
      <div className="h-5 bg-slate-200 rounded w-3/4"></div>
    </div>
    <div className="mt-auto h-4 bg-slate-200 rounded w-1/3 mx-2 mb-2"></div>
  </div>
);

const NewsSection = ({ newsList, loading }) => {
  const { t } = useTranslation();

  const data = Array.isArray(newsList) ? newsList : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <section className="py-24 bg-white relative z-30 border-t border-slate-200 font-sans">
      {/* Orqa fon bezagi (Juda yengil va rasmiy) */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-slate-50 to-transparent pointer-events-none -z-10"></div>

      <div className="container mx-auto px-6 max-w-7xl">
        {/* HEADER QISMI */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            {/* Rasmiy Kichik Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-extrabold uppercase tracking-widest mb-6 shadow-sm">
              <Globe size={14} className="text-blue-600" />
              {t("latest_events", "SO'NGGI XABARLAR")}
            </div>

            {/* Asosiy Sarlavha */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0a1930] uppercase tracking-tight leading-[1.1]">
              {t("technical_news_title_1", "MUASSASA")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                {t("technical_news_title_2", "YANGILIKLARI")}
              </span>
            </h2>

            {/* O'zbekona tilla chiziq */}
            <div className="w-16 h-1.5 bg-amber-400 mt-6 rounded-full"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-auto"
          >
            <Link
              to="/news"
              className="group flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-blue-600 text-white font-extrabold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-600/20 active:scale-95 w-full md:w-auto"
            >
              {t("see_all", "BARCHA YANGILIKLAR")}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </div>

        {/* --- ASOSIY MANTIQ --- */}
        {loading ? (
          /* 1. YUKLANMOQDA (Skeleton) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <NewsSkeleton />
            <NewsSkeleton />
            <NewsSkeleton />
          </div>
        ) : data.length > 0 ? (
          /* 2. YANGILIKLAR BOR (NewsCard ishlatiladigan joy) */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Faqat eng so'nggi 3 ta yangilikni ko'rsatamiz */}
            {data.slice(0, 3).map((news, index) => (
              <motion.div
                key={news._id || index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <NewsCard news={news} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* 3. BO'SH HOLAT (Empty State) */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-24 text-center bg-slate-50 rounded-3xl border border-slate-200 flex flex-col items-center justify-center shadow-sm"
          >
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center mb-6 text-blue-600">
              <Newspaper size={28} strokeWidth={2} />
            </div>
            <h3 className="text-[#0a1930] font-extrabold text-lg uppercase tracking-wide px-6 mb-2">
              {t("no_news_available", "HOZIRCHA YANGILIKLAR KIRITILMAGAN")}
            </h3>
            <p className="text-slate-500 text-sm font-medium">
              Yaqin orada tizimga yangi ma'lumotlar qo'shiladi.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
