import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NewsCard = ({ news }) => {
  const { t, i18n } = useTranslation();

  // --- UPLOADCARE IMAGE HELPER (Sizning kodingiz asosida) ---
  const getImageUrl = (image) => {
    if (!image) return null;
    if (image.includes("http")) return image;

    const CUSTOM_DOMAIN = "5nezpc68d1.ucarecd.net";
    // Card uchun rasm hajmini biroz kichikroq (800x600) qilish tezlikni oshiradi
    return `https://${CUSTOM_DOMAIN}/${image}/-/preview/800x600/-/quality/best/-/format/auto/-/progressive/yes/`;
  };

  const imageUrl = getImageUrl(news.image);

  return (
    <div className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 flex flex-col h-full">
      {/* Rasm qismi */}
      <div className="relative h-60 overflow-hidden bg-slate-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/800x600?text=No+Image";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300 italic text-xs">
            {t("no_image_attached")}
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
          {new Date(news.createdAt || news.date).toLocaleDateString(
            i18n.language === "en"
              ? "en-US"
              : i18n.language === "ru"
              ? "ru-RU"
              : "uz-UZ",
            { year: "numeric", month: "long", day: "numeric" }
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
