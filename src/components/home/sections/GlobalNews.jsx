import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Newspaper, ArrowUpRight, Clock, Globe } from "lucide-react";

const GlobalNews = ({ isPage = false }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // RSS ma'lumotlarini olish (Kun.uz o'rniga ta'limga oid RSS'lar ham qo'shish mumkin)
  const RSS_URL =
    "https://api.rss2json.com/v1/api.json?rss_url=https://kun.uz/uz/news/rss";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(RSS_URL);
        const data = await response.json();
        if (data.status === "ok") {
          // Sahifada ko'proq (9 ta), Home'da esa (3 ta) yangilik ko'rsatamiz
          setNews(data.items.slice(0, isPage ? 9 : 3));
        }
      } catch (error) {
        console.error("Yangiliklarni yuklashda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [isPage]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-[300px]">
        <div className="w-12 h-12 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div
      className={`${!isPage ? "py-24 bg-slate-50 overflow-hidden relative border-t border-slate-200" : "w-full"}`}
    >
      {/* BOSH SAHIFA UCHUN ORQA FON BEZAGI */}
      {!isPage && (
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-100 to-transparent pointer-events-none" />
      )}

      <div
        className={`${!isPage ? "container mx-auto px-6 max-w-7xl" : "w-full"}`}
      >
        {/* HEADER: Sahifada bo'lsa bu qism yashiriladi */}
        {!isPage && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 relative z-10">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-extrabold uppercase tracking-widest mb-6 shadow-sm"
              >
                <Globe size={14} className="text-blue-600" />
                DUNYO VA O'ZBEKISTON
              </motion.div>

              <h2 className="text-3xl md:text-5xl font-extrabold text-[#0a1930] uppercase tracking-tight leading-[1.1]">
                XALQARO{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                  YANGILIKLAR
                </span>
              </h2>

              {/* O'zbekona tilla chiziq */}
              <div className="h-1.5 w-16 bg-amber-400 mt-6 rounded-full"></div>
            </div>
          </div>
        )}

        {/* YANGILIKLAR GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {news.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl hover:border-blue-200 transition-all duration-300 flex flex-col h-full overflow-hidden block"
            >
              {/* Rasmiy Hover effekti - Tepadan tushadigan to'q ko'k chiziq */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />

              <div className="flex justify-between items-start mb-8 relative z-10">
                {/* Ikonka bloki */}
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-blue-600 border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                  <Newspaper size={20} strokeWidth={2} />
                </div>

                {/* Sana bloki */}
                <div className="flex items-center gap-1.5 text-slate-500 font-bold text-[10px] uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm">
                  <Clock size={12} className="text-amber-500" />
                  {new Date(item.pubDate).toLocaleDateString("uz-UZ")}
                </div>
              </div>

              {/* Sarlavha: Salobatli va aniq */}
              <h3 className="text-lg md:text-xl font-extrabold text-[#0a1930] leading-snug mb-4 group-hover:text-blue-600 transition-colors line-clamp-3 relative z-10">
                {item.title}
              </h3>

              {/* Matn: O'qilishi oson font */}
              <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-3 mb-8 relative z-10">
                {item.description.replace(/<[^>]*>?/gm, "").substring(0, 150)}
                ...
              </p>

              {/* Tugma qismi (Eng pastda, tekislangan) */}
              <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-100 relative z-10">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">
                  BATAFSIL O'QISH
                </span>
                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:translate-x-1 shadow-sm">
                  <ArrowUpRight size={16} strokeWidth={2.5} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalNews;
