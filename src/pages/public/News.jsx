import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import {
  ArrowRight,
  ImageOff,
  Newspaper,
  CalendarDays,
  Globe,
  Landmark,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import GlobalNews from "../../components/home/sections/GlobalNews";

const News = () => {
  const { t } = useTranslation();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("internal");

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchInternalNews = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get("/news");
        const data = res.data?.data || res.data?.result || res.data;
        setNewsList(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Yangiliklarni yuklashda xato:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInternalNews();
  }, []);

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-32 font-sans relative z-0">
      {/* 1. RASMIY HEADER SECTION */}
      <section className="relative bg-[#0a1930] pt-32 pb-40 overflow-hidden z-10">
        {/* Orqa fon naqshi (Rasmiy yorug'lik) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-[#0a1930] to-[#0a1930] pointer-events-none" />

        <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay">
          <img
            src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086"
            className="w-full h-full object-cover grayscale"
            alt="Background"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 md:mt-10"
          >
            {/* Tepadagi kichik badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-[10px] font-extrabold uppercase tracking-widest mb-8 backdrop-blur-md shadow-lg">
              <Newspaper size={14} className="text-amber-400" />
              {t("news_badge", "AXBOROT XIZMATI")}
            </div>

            {/* Asosiy Sarlavha */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 uppercase tracking-tight leading-[1.1]">
              MUASSASA{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 drop-shadow-lg">
                YANGILIKLARI
              </span>
            </h1>

            <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed mb-12">
              {t(
                "news_subtitle",
                "Ta'lim dargohimizdagi eng so'nggi xabarlar, tadbirlar va e'lonlar bilan tanishing.",
              )}
            </p>

            {/* Tab Tugmalar (Rasmiy) */}
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setActiveTab("internal")}
                className={`flex items-center gap-3 px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
                  activeTab === "internal"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-500"
                    : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Landmark size={16} /> {t("technical_life", "TEXNIKUM HAYOTI")}
              </button>

              <button
                onClick={() => setActiveTab("global")}
                className={`flex items-center gap-3 px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
                  activeTab === "global"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-500"
                    : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Globe size={16} /> {t("world_news", "DUNYO XABARLARI")}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. KONTENT QISMI */}
      <div className="container mx-auto px-6 -mt-16 relative z-20 max-w-7xl">
        <AnimatePresence mode="wait">
          {/* MAHALLIY YANGILIKLAR (TEXNIKUM) */}
          {activeTab === "internal" ? (
            <motion.div
              key="internal-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {loading ? (
                // SKELETON (YUKLANISH)
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div
                      key={n}
                      className="bg-white rounded-2xl h-[400px] animate-pulse border border-slate-200 shadow-sm"
                    />
                  ))}
                </div>
              ) : newsList.length > 0 ? (
                // YANGILIKLAR KARTOCHKALARI
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {newsList.map((news) => (
                    <motion.article
                      key={news._id}
                      whileHover={{ y: -5 }}
                      className="group flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 overflow-hidden"
                    >
                      {/* Rasm qismi */}
                      <div className="h-56 relative overflow-hidden bg-slate-100 border-b border-slate-100">
                        {news.imageUrl ? (
                          <img
                            src={news.imageUrl}
                            alt={news.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50">
                            <ImageOff size={40} />
                          </div>
                        )}

                        {/* Sana (Burchakda) */}
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[10px] font-bold text-[#0a1930] border border-slate-200/50 shadow-sm flex items-center gap-1.5 uppercase tracking-widest">
                          <CalendarDays size={12} className="text-blue-600" />
                          {news.date || "Kiritilmagan"}
                        </div>
                      </div>

                      {/* Ma'lumot qismi */}
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="mb-3">
                          <span className="text-[9px] font-extrabold text-amber-500 uppercase tracking-widest bg-amber-50 px-2 py-1 rounded">
                            Rasmiy Xabar
                          </span>
                        </div>

                        <h3 className="text-lg md:text-xl font-bold text-[#0a1930] mb-3 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                          {news.title}
                        </h3>

                        <p className="text-slate-500 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
                          {news.content}
                        </p>

                        <div className="pt-4 border-t border-slate-100 mt-auto">
                          <Link
                            to={`/news/${news._id}`}
                            className="inline-flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest group/link hover:text-blue-800 transition-colors"
                          >
                            {t("read_more", "BATAFSIL O'QISH")}
                            <ChevronRight
                              size={14}
                              className="group-hover/link:translate-x-1 transition-transform"
                            />
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              ) : (
                // BO'SH HOLAT (Xabar yo'q)
                <div className="text-center py-24 bg-white rounded-3xl border border-slate-200 shadow-sm">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                    <Newspaper className="text-slate-400" size={32} />
                  </div>
                  <h3 className="text-[#0a1930] font-bold text-lg mb-2 uppercase tracking-wide">
                    Ma'lumot topilmadi
                  </h3>
                  <p className="text-slate-500 text-sm">
                    {t(
                      "no_news_available",
                      "Hozircha tizimga yangiliklar kiritilmagan.",
                    )}
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            // DUNYO YANGILIKLARI Tabi
            <motion.div
              key="global-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white p-6 md:p-10 rounded-3xl shadow-lg border border-slate-200"
            >
              <GlobalNews isPage={true} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default News;
