import { Calendar, ArrowRight, ImageOff } from "lucide-react";
import { Link } from "react-router-dom";

const NewsCard = ({ news }) => {
  // --- UPLOADCARE IMAGE HELPER (Sizning domeningiz bilan) ---
  const getImageUrl = (image) => {
    // 1. Agar rasm bo'lmasa
    if (!image) return null;

    // 2. Agar tayyor http link bo'lsa (tashqi manbalar uchun)
    if (image.includes("http")) return image;

    // 3. Sizda ishlayotgan Uploadcare maxsus domini
    const CUSTOM_DOMAIN = "5nezpc68d1.ucarecd.net";

    // UUID orqali URL yasash (Optimization qo'shildi)
    // -/preview/600x400/ -> Sifatni tushirmagan holda hajmini optimallashtiradi
    return `https://${CUSTOM_DOMAIN}/${image}/-/preview/600x400/-/quality/smart/-/format/auto/`;
  };

  const finalImageUrl = getImageUrl(news.image);

  return (
    <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full border border-slate-100 group relative">
      {/* Rasm qismi */}
      <div className="relative h-60 overflow-hidden bg-slate-100">
        {finalImageUrl ? (
          <img
            src={finalImageUrl}
            alt={news.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
            <ImageOff size={48} strokeWidth={1} />
            <span className="text-xs mt-2 font-medium">Tasvir mavjud emas</span>
          </div>
        )}

        {/* Badge (Yashil Agro Style) */}
        <div className="absolute top-4 left-4 bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-xl shadow-lg uppercase tracking-widest border border-white/20 z-10">
          Yangilik
        </div>
      </div>

      {/* Matn qismi */}
      <div className="p-7 flex flex-col flex-grow relative">
        {/* Orqa fon bezagi (Hoverda ko'rinadi) */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Sana */}
        <div className="flex items-center text-emerald-600 font-bold text-xs mb-4 z-10">
          <Calendar size={15} className="mr-2" />
          {new Date(news.createdAt || news.date).toLocaleDateString("uz-UZ", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>

        {/* Sarlavha */}
        <h3 className="text-xl font-extrabold text-slate-800 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors duration-300 z-10 leading-tight">
          {news.title}
        </h3>

        {/* Qisqacha mazmuni */}
        <p className="text-slate-500 text-sm mb-6 line-clamp-3 flex-grow z-10 leading-relaxed">
          {news.content}
        </p>

        {/* Tugma */}
        <Link
          to={`/news/${news._id}`}
          className="inline-flex items-center text-emerald-600 font-black text-xs uppercase tracking-wider group/btn z-10"
        >
          <span className="border-b-2 border-transparent group-hover/btn:border-emerald-600 transition-all pb-1">
            Batafsil o'qish
          </span>
          <ArrowRight
            size={16}
            className="ml-2 transform group-hover/btn:translate-x-2 transition-transform duration-300"
          />
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
