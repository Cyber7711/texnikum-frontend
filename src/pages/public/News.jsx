import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import {
  ArrowRight,
  ImageOff,
  Newspaper,
  Clock,
  Zap,
  Globe,
  School,
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

  const getImageUrl = (image) => {
    if (!image) return null;
    if (image.includes("http")) return image;
    const CUSTOM_DOMAIN = "5nezpc68d1.ucarecd.net";
    return `https://${CUSTOM_DOMAIN}/${image}/-/preview/1000x560/-/quality/smart/-/format/auto/`;
  };

  return (
    <div className="bg-[#fafbfc] min-h-screen pb-32 relative z-0">
      {/* 1. Header Section */}
      <section className="relative bg-[#0a1128] pt-32 pb-48 overflow-hidden z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -mr-40 -mt-40"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
          >
            <Zap size={14} fill="currentColor" />{" "}
            {t("news_badge") || "MA'LUMOTLAR MARKAZI"}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-8xl font-black text-white mb-6 uppercase italic tracking-tighter"
          >
            {t("all_news_title") || "YANGILIKLAR"} <br />
            <span className="text-emerald-500 not-italic">LENTASI</span>
          </motion.h1>

          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <button
              onClick={() => setActiveTab("internal")}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                activeTab === "internal"
                  ? "bg-emerald-500 text-white shadow-xl shadow-emerald-500/30"
                  : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
              }`}
            >
              <School size={16} /> {t("technical_life") || "Texnikum Hayoti"}
            </button>
            <button
              onClick={() => setActiveTab("global")}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                activeTab === "global"
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-600/30"
                  : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
              }`}
            >
              <Globe size={16} /> {t("world_news") || "Dunyo Yangiliklari"}
            </button>
          </div>
        </div>
      </section>

      {/* 2. Content Section */}
      <div className="container mx-auto px-6 -mt-16 relative z-20">
        <AnimatePresence mode="wait">
          {activeTab === "internal" ? (
            <motion.div
              key="internal-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {[1, 2, 3].map((n) => (
                    <div
                      key={n}
                      className="bg-white rounded-[3rem] h-[500px] animate-pulse border border-slate-100 shadow-sm"
                    />
                  ))}
                </div>
              ) : newsList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {newsList.map((news) => (
                    <motion.article
                      key={news._id}
                      whileHover={{ y: -10 }}
                      className="group flex flex-col bg-white rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
                    >
                      <div className="h-64 relative overflow-hidden bg-slate-50">
                        {news.image ? (
                          <img
                            src={getImageUrl(news.image)}
                            alt={news.title}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-200">
                            <ImageOff size={48} />
                          </div>
                        )}
                        <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black text-slate-900 border border-slate-100 z-20 flex items-center gap-2">
                          <Clock size={14} className="text-emerald-600" />
                          {new Date(
                            news.date || news.createdAt,
                          ).toLocaleDateString("uz-UZ")}
                        </div>
                      </div>
                      <div className="p-10 flex flex-col flex-grow">
                        <h3 className="text-2xl font-black text-slate-900 mb-4 line-clamp-2 italic uppercase group-hover:text-emerald-600 transition-colors">
                          {news.title}
                        </h3>
                        <p className="text-slate-500 text-sm mb-8 line-clamp-3 leading-relaxed flex-grow">
                          {news.content}
                        </p>
                        <Link
                          to={`/news/${news._id}`}
                          className="inline-flex items-center gap-3 text-emerald-600 font-black text-[10px] uppercase tracking-[0.2em] italic"
                        >
                          {t("read_more")} <ArrowRight size={16} />
                        </Link>
                      </div>
                    </motion.article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-[4rem] border-4 border-dashed border-slate-100">
                  <Newspaper
                    className="mx-auto text-slate-200 mb-4"
                    size={48}
                  />
                  <p className="text-slate-400 font-bold uppercase tracking-widest">
                    {t("no_news_available") || "Hozircha ma'lumot yo'q"}
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="global-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white p-4 md:p-10 rounded-[3rem] md:rounded-[4rem] shadow-xl border border-slate-100"
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
