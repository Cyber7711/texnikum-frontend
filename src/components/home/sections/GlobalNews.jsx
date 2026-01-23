import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Newspaper, ArrowUpRight, Clock, Zap } from "lucide-react";

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
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    // isPage bo'lsa section va bg-fafbfc'ni olib tashlaymiz
    <div
      className={`${!isPage ? "py-24 bg-[#fafbfc] overflow-hidden relative" : "w-full"}`}
    >
      <div className={`${!isPage ? "container mx-auto px-6" : "w-full"}`}>
        {/* HEADER: Sahifada bo'lsa bu qism yashiriladi */}
        {!isPage && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
              >
                <Zap size={14} className="fill-emerald-600" /> DUNYO VA
                O'ZBEKISTON
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
                Tashqi <span className="text-emerald-500">Yangiliklar</span>
              </h2>
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
              className="group relative bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 flex flex-col h-full overflow-hidden"
            >
              {/* Bezaklar */}
              <div className="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors duration-700" />

              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <Newspaper size={24} />
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[10px] italic uppercase tracking-widest">
                  <Clock size={12} className="text-blue-500" />
                  {new Date(item.pubDate).toLocaleDateString("uz-UZ")}
                </div>
              </div>

              <h3 className="text-lg font-black text-slate-800 uppercase italic leading-tight mb-4 group-hover:text-blue-600 transition-colors line-clamp-3 relative z-10">
                {item.title}
              </h3>

              <p className="text-slate-500 text-xs font-medium leading-relaxed italic line-clamp-4 mb-8 opacity-70 group-hover:opacity-100 transition-opacity relative z-10">
                {item.description.replace(/<[^>]*>?/gm, "").substring(0, 150)}
                ...
              </p>

              <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50 relative z-10">
                <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">
                  Batafsil manbada
                </span>
                <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                  <ArrowUpRight size={16} />
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
