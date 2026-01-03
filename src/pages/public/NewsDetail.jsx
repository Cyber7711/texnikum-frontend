import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  ChevronRight,
  ImageOff,
  Loader2,
  Facebook,
  Send,
  Zap,
  Bookmark,
} from "lucide-react";
import { motion } from "framer-motion";
import axiosClient from "../../api/axiosClient";
import { toast } from "react-hot-toast";

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (image) => {
    if (!image) return null;
    if (image.includes("http")) return image;
    const CUSTOM_DOMAIN = "5nezpc68d1.ucarecd.net";
    return `https://${CUSTOM_DOMAIN}/${image}/-/preview/1200x800/-/quality/best/-/format/auto/`;
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = news?.title;

    const shares = {
      telegram: `https://t.me/share/url?url=${url}&text=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      toast.success("Havola nusxalandi!");
      return;
    }
    window.open(shares[platform], "_blank");
  };

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get(`/news/${id}`);
        const data = res.data.data || res.data.result || res.data;
        setNews(data);
      } catch (err) {
        console.error("Xato:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNewsDetail();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-16 h-16 text-emerald-600 animate-spin mb-4" />
        <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">
          Maqola yuklanmoqda...
        </p>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-6 bg-slate-50">
        <div className="p-10 bg-white rounded-[3rem] shadow-xl text-center">
          <Zap size={64} className="text-slate-200 mx-auto mb-6" />
          <h2 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter">
            Yangilik topilmadi
          </h2>
          <button
            onClick={() => navigate("/news")}
            className="mt-8 flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest italic mx-auto transition-all hover:bg-emerald-600"
          >
            <ArrowLeft size={16} /> Barcha yangiliklar
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white min-h-screen pb-32"
    >
      {/* 1. BREADCRUMBS - Minimal & Modern */}
      <nav className="bg-slate-50/50 border-b border-slate-100 py-6 mb-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <Link to="/" className="hover:text-emerald-600 transition-colors">
              BOSH SAHIFA
            </Link>
            <ChevronRight size={12} className="text-slate-300" />
            <Link
              to="/news"
              className="hover:text-emerald-600 transition-colors"
            >
              YANGILIKLAR
            </Link>
            <ChevronRight size={12} className="text-slate-300" />
            <span className="text-slate-900 truncate max-w-[150px] italic">
              {news.title}
            </span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* 2. HEADER - Bold & Impactful */}
          <header className="mb-12">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
            >
              <Bookmark size={14} fill="currentColor" /> Dolzarb xabar
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter italic uppercase"
            >
              {news.title}
            </motion.h1>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-8 border-y border-slate-100">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 bg-slate-50 px-5 py-2.5 rounded-2xl border border-slate-100 shadow-sm">
                  <Calendar size={18} className="text-emerald-500" />
                  <span className="text-xs font-black text-slate-700 uppercase italic tracking-wider">
                    {new Date(news.date || news.createdAt).toLocaleDateString(
                      "uz-UZ",
                      { day: "numeric", month: "long", year: "numeric" }
                    )}
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  <Clock size={16} className="text-slate-300" /> 3 daqiqa
                  mutolaa
                </div>
              </div>

              {/* Social Share */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleShare("telegram")}
                  className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:bg-sky-500 hover:text-white transition-all shadow-sm"
                >
                  <Send size={18} />
                </button>
                <button
                  onClick={() => handleShare("facebook")}
                  className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                >
                  <Facebook size={18} />
                </button>
                <button
                  onClick={() => handleShare("copy")}
                  className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </header>

          {/* 3. MAIN IMAGE - Cinematic Depth */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative rounded-[3rem] overflow-hidden mb-16 shadow-2xl shadow-emerald-900/10 aspect-video bg-slate-50 group"
          >
            {news.image ? (
              <img
                src={getImageUrl(news.image)}
                alt={news.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-200">
                <ImageOff size={80} strokeWidth={1} />
              </div>
            )}
          </motion.div>

          {/* 4. CONTENT - High Readability Typography */}
          <article className="max-w-3xl mx-auto">
            <div className="prose prose-emerald lg:prose-xl">
              {news.content?.split("\n").map(
                (paragraph, index) =>
                  paragraph && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      key={index}
                      className="text-slate-700 leading-[1.8] mb-8 text-lg md:text-xl font-medium tracking-tight"
                    >
                      {paragraph}
                    </motion.p>
                  )
              )}
            </div>
          </article>

          {/* 5. FOOTER */}
          <footer className="mt-24 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest italic transition-all hover:bg-emerald-600 active:scale-95"
            >
              <ArrowLeft size={16} /> Ortga qaytish
            </button>

            <div className="flex items-center gap-4 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] italic opacity-50">
              Manba: Texnikum axborot xizmati
            </div>
          </footer>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsDetail;
