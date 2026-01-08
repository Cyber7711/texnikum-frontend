import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Newspaper, ArrowUpRight, Globe, Clock, Zap } from "lucide-react";

const GlobalNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const RSS_URL =
    "https://api.rss2json.com/v1/api.json?rss_url=https://kun.uz/uz/news/rss";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(RSS_URL);
        const data = await response.json();
        if (data.status === "ok") {
          setNews(data.items.slice(0, 3));
        }
      } catch (error) {
        console.error("Yangiliklarni yuklashda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20 bg-[#fafbfc]">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="py-24 bg-[#fafbfc] overflow-hidden relative">
      <div className="container mx-auto px-6">
        {/* Header qismi */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
            >
              <Zap size={14} className="fill-emerald-600" /> Dunyo va
              O'zbekiston
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
              Tashqi <span className="text-emerald-500">Yangiliklar</span>
            </h2>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">
              Manba: Kun.uz RSS
            </p>
          </div>
        </div>

        {/* Yangiliklar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
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
              className="group relative bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 flex flex-col h-full overflow-hidden"
            >
              {/* Rasmsiz Card uchun Abstrakt fon (nur effekti) */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-700"></div>

              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 shadow-inner">
                  <Newspaper size={28} />
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1 italic">
                    Vaqt
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs italic">
                    <Clock size={12} className="text-emerald-500" />
                    {new Date(item.pubDate).getHours()}:
                    {new Date(item.pubDate)
                      .getMinutes()
                      .toString()
                      .padStart(2, "0")}
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-black text-slate-800 uppercase italic leading-tight mb-6 group-hover:text-emerald-600 transition-colors line-clamp-3 relative z-10">
                {item.title}
              </h3>

              <p className="text-slate-500 text-sm font-medium leading-relaxed italic line-clamp-4 mb-10 opacity-70 group-hover:opacity-100 transition-opacity relative z-10">
                {item.description.replace(/<[^>]*>?/gm, "")}
              </p>

              <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50 relative z-10">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover:text-emerald-500 transition-colors">
                  To'liq o'qish
                </span>
                <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all duration-500">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalNews;
