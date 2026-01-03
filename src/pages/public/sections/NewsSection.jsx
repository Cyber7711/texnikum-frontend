import { motion } from "framer-motion";
import { ArrowRight, Newspaper, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NewsCard from "../../../components/ui/NewsCard";

// Skeleton Loader komponenti (Ma'lumot kelguncha ko'rsatiladi)
const NewsSkeleton = () => (
  <div className="bg-slate-50 rounded-[2.5rem] p-6 animate-pulse h-[450px] flex flex-col justify-between">
    <div className="w-full h-56 bg-slate-200 rounded-[2rem] mb-6"></div>
    <div className="space-y-4">
      <div className="h-4 bg-slate-200 rounded w-1/4"></div>
      <div className="h-8 bg-slate-200 rounded w-full"></div>
      <div className="h-20 bg-slate-200 rounded w-full"></div>
    </div>
    <div className="h-10 bg-slate-200 rounded-full w-1/2 mt-4"></div>
  </div>
);

const NewsSection = ({ newsList, loading }) => {
  const { t } = useTranslation();
  const data = Array.isArray(newsList) ? newsList : [];

  // Animatsiya variantlari
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <section className="py-24 bg-white relative z-30 -mt-16 md:-mt-24 rounded-t-[4rem] md:rounded-t-[6rem] shadow-[0_-30px_60px_-15px_rgba(0,0,0,0.08)]">
      {/* Dekorativ element - fon uchun xira nur */}
      <div className="absolute top-40 right-0 w-96 h-96 bg-emerald-50 blur-[120px] rounded-full -z-10 opacity-60"></div>

      <div className="container mx-auto px-6">
        {/* Header qismi */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-3 text-emerald-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 bg-emerald-50 px-4 py-2 rounded-full italic">
              <Newspaper size={14} />
              {t("latest_events") || "So'nggi voqealar"}
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.9] italic uppercase">
              {t("technical_news_title_1")}{" "}
              <span className="text-emerald-500 not-italic">
                {t("technical_news_title_2")}
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Link
              to="/news"
              className="group flex items-center gap-4 px-8 py-4 rounded-2xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all duration-500 shadow-xl shadow-slate-900/10 italic"
            >
              {t("see_all") || "Barcha yangiliklar"}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-2 transition-transform duration-300"
              />
            </Link>
          </motion.div>
        </div>

        {/* Ma'lumotlarni ko'rsatish mantiqi */}
        {loading ? (
          /* 1. Yuklanayotgan holat (Skeleton) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <NewsSkeleton />
            <NewsSkeleton />
            <NewsSkeleton />
          </div>
        ) : data.length > 0 ? (
          /* 2. Ma'lumot bor holat (Staggered Animation) */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {data.slice(0, 3).map((news, index) => (
              <NewsCard key={news._id || news.id} item={news} index={index} />
            ))}
          </motion.div>
        ) : (
          /* 3. Bo'sh holat (Empty State) */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 text-center bg-slate-50 rounded-[4rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center"
          >
            <div className="p-8 bg-white rounded-full shadow-inner mb-6 text-slate-200">
              <LayoutGrid size={64} />
            </div>
            <p className="text-slate-400 font-black text-xs uppercase tracking-[0.4em]">
              {t("no_news_available") || "Hozircha yangiliklar yo'q"}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
