import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import {
  Calendar,
  ArrowRight,
  ImageOff,
  Newspaper,
  Clock,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const News = () => {
  const { t } = useTranslation();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get("/news");
        const data = res.data?.data || res.data?.result || res.data;
        setNewsList(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Yangiliklarni yuklashda xato:", error);
        setNewsList([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAllNews();
  }, []);

  const getImageUrl = (image) => {
    if (!image) return null;
    if (image.includes("http")) return image;
    const CUSTOM_DOMAIN = "5nezpc68d1.ucarecd.net";
    return `https://${CUSTOM_DOMAIN}/${image}/-/preview/1000x560/-/quality/smart/-/format/auto/`;
  };

  return (
    <div className="bg-[#fafbfc] min-h-screen pb-32">
      {/* 1. Dinamik Header - Dark Mode uslubida */}
      <section className="relative bg-[#0a1128] pt-32 pb-40 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -mr-40 -mt-40 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -ml-20 -mb-20"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
          >
            <Zap size={14} fill="currentColor" />{" "}
            {t("news_badge") || "O'quv yurtimiz hayoti"}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-8xl font-black text-white mb-6 uppercase italic tracking-tighter leading-tight"
          >
            {t("all_news_title")} <br />
            <span className="text-emerald-500 not-italic">Lentasi</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto font-medium text-lg md:text-xl"
          >
            {t("news_subtitle")}
          </motion.p>
        </div>
      </section>

      {/* 2. Yangiliklar Paneli */}
      <div className="container mx-auto px-6 -mt-16 relative z-20">
        {loading ? (
          /* SKELETON LOADERS */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white rounded-[3rem] h-[500px] animate-pulse border border-slate-100 shadow-sm"
              ></div>
            ))}
          </div>
        ) : newsList.length === 0 ? (
          /* EMPTY STATE */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-40 bg-white rounded-[4rem] border-4 border-dashed border-slate-50 flex flex-col items-center justify-center"
          >
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <Newspaper className="text-slate-200" size={48} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter italic">
              {t("no_news_available")}
            </h3>
            <p className="text-slate-400 mt-2 font-bold uppercase text-[10px] tracking-[0.2em]">
              Hozircha ma'lumotlar mavjud emas
            </p>
          </motion.div>
        ) : (
          /* NEWS GRID */
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {newsList.map((news) => (
              <motion.article
                key={news._id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                className="group flex flex-col bg-white rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden relative"
              >
                {/* Image Section */}
                <div className="h-64 relative overflow-hidden bg-slate-50">
                  {news.image ? (
                    <img
                      src={getImageUrl(news.image)}
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-200">
                      <ImageOff size={48} />
                    </div>
                  )}

                  {/* Badge: Sana */}
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black text-slate-900 shadow-xl flex items-center gap-2 border border-slate-100">
                    <Clock size={14} className="text-emerald-600" />
                    {new Date(news.date || news.createdAt).toLocaleDateString(
                      "uz-UZ"
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 md:p-10 flex flex-col flex-grow relative">
                  <h3 className="text-2xl font-black text-slate-900 mb-4 line-clamp-2 tracking-tighter leading-tight italic uppercase group-hover:text-emerald-600 transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-slate-500 text-sm font-medium line-clamp-3 mb-8 flex-grow leading-relaxed">
                    {news.content}
                  </p>

                  <Link
                    to={`/news/${news._id}`}
                    className="mt-auto inline-flex items-center gap-3 text-emerald-600 font-black text-[10px] uppercase tracking-[0.2em] group/btn italic"
                  >
                    {t("read_more")}
                    <div className="w-10 h-10 rounded-full border border-emerald-100 flex items-center justify-center group-hover/btn:bg-emerald-600 group-hover/btn:text-white transition-all duration-300">
                      <ArrowRight size={16} />
                    </div>
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default News;
