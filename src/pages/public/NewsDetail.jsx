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
  MessageCircle,
  Facebook,
  Send, // Telegram uchun
} from "lucide-react";
import axiosClient from "../../api/axiosClient";

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- UPLOADCARE IMAGE HELPER (Sizning domeningiz bilan) ---
  const getImageUrl = (image) => {
    if (!image) return null;
    if (image.includes("http")) return image;
    const CUSTOM_DOMAIN = "5nezpc68d1.ucarecd.net";
    // Batafsil sahifada rasm katta va maksimal sifatda bo'lishi kerak
    return `https://${CUSTOM_DOMAIN}/${image}/-/preview/1200x800/-/quality/best/-/format/auto/-/progressive/yes/`;
  };

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get(`/news/${id}`);
        const data = res.data.data || res.data.result || res.data;
        setNews(data);
      } catch (err) {
        console.error("Yangilikni yuklashda xato:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNewsDetail();
    window.scrollTo(0, 0); // Sahifa ochilganda tepaga qaytarish
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">
          Yangilik topilmadi
        </h2>
        <Link
          to="/news"
          className="text-emerald-600 font-bold flex items-center gap-2"
        >
          <ArrowLeft size={20} /> Barcha yangiliklarga qaytish
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* 1. BREADCRUMBS (Navigatsiya yo'li) */}
      <div className="bg-slate-50 border-b border-slate-100 py-4 mb-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
            <Link to="/" className="hover:text-emerald-600 transition">
              Bosh sahifa
            </Link>
            <ChevronRight size={14} />
            <Link to="/news" className="hover:text-emerald-600 transition">
              Yangiliklar
            </Link>
            <ChevronRight size={14} />
            <span className="text-slate-800 truncate max-w-[200px] md:max-w-md">
              {news.title}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* 2. SARLAVHA VA META MA'LUMOTLAR */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-6 tracking-tight">
              {news.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-100">
              <div className="flex items-center gap-6 text-sm text-slate-500 font-bold">
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg">
                  <Calendar size={16} />
                  {new Date(news.date || news.createdAt).toLocaleDateString(
                    "uz-UZ",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />3 daqiqa o'qish
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2">
                  Ulashish:
                </span>
                <button className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-emerald-500 hover:text-white transition-all">
                  <Send size={18} />
                </button>
                <button className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-blue-600 hover:text-white transition-all">
                  <Facebook size={18} />
                </button>
                <button className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-emerald-400 hover:text-white transition-all">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </header>

          {/* 3. ASOSIY RASM (MUHIM QISM) */}
          <div className="relative rounded-[2rem] overflow-hidden mb-10 shadow-2xl shadow-slate-200 aspect-video bg-slate-100">
            {news.image ? (
              <img
                src={getImageUrl(news.image)}
                alt={news.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                <ImageOff size={64} strokeWidth={1} />
                <span className="mt-4 font-medium">
                  Ushbu xabar uchun tasvir biriktirilmagan
                </span>
              </div>
            )}
          </div>

          {/* 4. YANGILIK MATNI */}
          <article className="prose prose-lg prose-slate max-w-none">
            {/* Matnni paragraflarga bo'lish */}
            {news.content?.split("\n").map(
              (paragraph, index) =>
                paragraph && (
                  <p
                    key={index}
                    className="text-slate-700 leading-relaxed mb-6 text-lg md:text-xl font-normal whitespace-pre-line"
                  >
                    {paragraph}
                  </p>
                )
            )}
          </article>

          {/* 5. FOOTER / TAGS */}
          <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-500 font-bold hover:text-emerald-600 transition group"
            >
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-2 transition-transform"
              />
              Ortga qaytish
            </button>

            <div className="flex items-center gap-4">
              <span className="text-slate-400 text-sm italic">
                Manba: 3-sonli texnikum axborot xizmati
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
