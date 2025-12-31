import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NewsCard = ({ news }) => {
  const { t, i18n } = useTranslation();

  // Server manzili (rasm uchun)
  const SERVER_URL = "http://localhost:4000";

  // Rasm URL manzili
  const imageUrl = news.image
    ? news.image.startsWith("http")
      ? news.image
      : `${SERVER_URL}${news.image}`
    : null;

  return (
    <div className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 flex flex-col h-full">
      {/* Rasm qismi */}
      <div className="relative h-60 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
            {/* Rasm bo'lmasa bo'sh joy */}
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
            {t("news")}
          </span>
        </div>
      </div>

      {/* Kontent qismi */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-4">
          <Calendar size={14} className="text-emerald-500" />
          {new Date(news.createdAt).toLocaleDateString(
            i18n.language === "en"
              ? "en-US"
              : i18n.language === "ru"
              ? "ru-RU"
              : "uz-UZ"
          )}
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2 group-hover:text-emerald-600 transition-colors leading-snug">
          {news.title}
        </h3>

        <div className="mt-auto pt-6 border-t border-slate-50">
          <Link
            to={`/news/${news._id || news.id}`}
            className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest group/btn"
          >
            {t("see_all")}
            <ArrowRight
              size={16}
              className="group-hover/btn:translate-x-2 transition-transform"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
