import { Calendar, ArrowRight, ImageOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const NewsCard = ({ news }) => {
  const { t, i18n } = useTranslation();

  // --- 1. XAVFSIZ IMAGE HELPER ---
  const getImageUrl = (image) => {
    // news.image undefined bo'lsa xato bermasligi uchun tekshiruv
    if (!image) return null;
    if (typeof image !== "string") return null;
    if (image.includes("http")) return image;

    const CUSTOM_DOMAIN = "5nezpc68d1.ucarecd.net";
    return `https://${CUSTOM_DOMAIN}/${image}/-/preview/800x600/-/quality/best/-/format/auto/-/progressive/yes/`;
  };

  // news?.image ishlatish orqali undefined xatosidan qutulamiz
  const imageUrl = getImageUrl(news?.image);

  // --- 2. XAVFSIZ SANA FORMATLASH ---
  const formattedDate = () => {
    try {
      const dateValue = news?.createdAt || news?.date;
      if (!dateValue) return "";

      return new Date(dateValue).toLocaleDateString(
        i18n.language === "en"
          ? "en-US"
          : i18n.language === "ru"
          ? "ru-RU"
          : "uz-UZ",
        { year: "numeric", month: "long", day: "numeric" }
      );
    } catch (err) {
      return "";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-[0_30px_60px_-15px_rgba(16,185,129,0.15)] transition-all duration-500 flex flex-col h-full"
    >
      {/* Rasm qismi */}
      <div className="relative h-64 overflow-hidden bg-slate-50">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={news?.title || "News"}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/800x600?text=Image+Error";
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 gap-2 bg-slate-50">
            <ImageOff size={40} strokeWidth={1} />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              {t("no_image_attached")}
            </span>
          </div>
        )}

        {/* News Badge */}
        <div className="absolute top-6 left-6">
          <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg border border-white/20">
            {t("news") || "YANGILIK"}
          </span>
        </div>
      </div>

      {/* Kontent qismi */}
      <div className="p-8 md:p-10 flex flex-col flex-grow">
        <div className="flex items-center gap-3 text-slate-400 text-[11px] font-black uppercase tracking-widest mb-5">
          <Calendar size={16} className="text-emerald-500" />
          {formattedDate()}
        </div>

        <h3 className="text-2xl font-black text-slate-900 mb-6 line-clamp-2 group-hover:text-emerald-600 transition-colors leading-[1.2] tracking-tighter italic uppercase">
          {news?.title || "..."}
        </h3>

        {/* Ma'lumot qisqacha (Content) */}
        <p className="text-slate-500 text-sm font-medium line-clamp-3 mb-8 leading-relaxed italic">
          {news?.content || news?.description || ""}
        </p>

        <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center">
          <Link
            to={`/news/${news?._id || news?.id}`}
            className="flex items-center gap-3 text-emerald-600 font-black text-[10px] uppercase tracking-[0.2em] group/btn italic"
          >
            {t("see_all") || "BATAFSIL"}
            <div className="w-8 h-8 rounded-full border border-emerald-100 flex items-center justify-center group-hover/btn:bg-emerald-600 group-hover/btn:text-white transition-all duration-300">
              <ArrowRight
                size={14}
                className="group-hover/btn:translate-x-1 transition-transform"
              />
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;
