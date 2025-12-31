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
} from "lucide-react";
import { useTranslation } from "react-i18next"; // i18n
import axiosClient from "../../api/axiosClient";

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); // t va i18n obyekti
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- UPLOADCARE IMAGE HELPER (Kafolatlangan variant) ---
  const getImageUrl = (image) => {
    if (!image) return null;
    if (image.includes("http")) return image;

    const CUSTOM_DOMAIN = "5nezpc68d1.ucarecd.net";
    // Ba'zida image ID oxirida slesh bilan kelishi mumkin, shuni tozalaymiz
    const cleanId = image.replace(/^\/+|\/+$/g, "");

    return `https://${CUSTOM_DOMAIN}/${cleanId}/-/preview/1200x800/-/quality/best/-/format/auto/-/progressive/yes/`;
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
    window.scrollTo(0, 0);
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
          {t("news_not_found")}
        </h2>
        <Link
          to="/news"
          className="text-emerald-600 font-bold flex items-center gap-2"
        >
          <ArrowLeft size={20} /> {t("back_to_all_news")}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* 1. BREADCRUMBS */}
      <div className="bg-slate-50 border-b border-slate-100 py-4 mb-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
            <Link to="/" className="hover:text-emerald-600 transition">
              {t("home")}
            </Link>
            <ChevronRight size={14} />
            <Link to="/news" className="hover:text-emerald-600 transition">
              {t("news")}
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
          {/* 2. HEADER */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-6 tracking-tight">
              {news.title}
            </h1>
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-100">
              <div className="flex items-center gap-6 text-sm text-slate-500 font-bold">
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg">
                  <Calendar size={16} />
                  {new Date(news.date || news.createdAt).toLocaleDateString(
                    i18n.language === "en"
                      ? "en-US"
                      : i18n.language === "ru"
                      ? "ru-RU"
                      : "uz-UZ",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} /> {t("reading_time")}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2">
                  {t("share")}:
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

          {/* 3. ASOSIY RASM - Joylashish kafolatlangan */}
          <div className="relative rounded-[2rem] overflow-hidden mb-10 shadow-2xl shadow-slate-200 aspect-video bg-slate-200">
            {news.image ? (
              <img
                src={getImageUrl(news.image)}
                alt={news.title}
                className="w-full h-full object-cover block"
                onLoad={() => console.log("Rasm yuklandi!")}
                onError={(e) => {
                  console.error("Rasm yuklanmadi!");
                  e.target.src =
                    "https://via.placeholder.com/1200x800?text=Rasm+topilmadi";
                }}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                <ImageOff size={64} strokeWidth={1} />
                <span className="mt-4 font-medium">
                  {t("no_image_attached")}
                </span>
              </div>
            )}
          </div>

          {/* 4. MATN */}
          <article className="prose prose-lg prose-slate max-w-none">
            {news.content?.split("\n").map(
              (p, i) =>
                p && (
                  <p
                    key={i}
                    className="text-slate-700 leading-relaxed mb-6 text-lg md:text-xl font-normal whitespace-pre-line"
                  >
                    {p}
                  </p>
                )
            )}
          </article>

          {/* 5. FOOTER */}
          <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-500 font-bold hover:text-emerald-600 transition group"
            >
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-2 transition-transform"
              />
              {t("go_back")}
            </button>
            <span className="text-slate-400 text-sm italic">
              {t("source_info")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
