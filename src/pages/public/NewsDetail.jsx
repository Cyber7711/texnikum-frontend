import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, ArrowLeft, User, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next"; // i18n
import axiosClient from "../../api/axiosClient";

const SERVER_URL = "http://localhost:4000";

const NewsDetail = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation(); // i18n chaqirildi
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get(`/news/${id}`);
        // Ma'lumotni xavfsiz qabul qilish
        const actualData = res.data?.data || res.data || res;
        setNews(actualData);
      } catch (error) {
        console.error("Xatolik:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
    window.scrollTo(0, 0); // Sahifa ochilganda tepaga qaytarish
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-emerald-600" size={48} />
      </div>
    );

  if (!news)
    return (
      <div className="text-center py-20 text-red-500 font-bold">
        {t("news_not_found")}
      </div>
    );

  const imageUrl = news.image ? `${SERVER_URL}${news.image}` : null;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="h-64 md:h-96 w-full bg-[#0a1128] relative overflow-hidden">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={news.title}
            className="w-full h-full object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white container mx-auto">
          <Link
            to="/"
            className="text-emerald-400 hover:text-white flex items-center mb-4 transition font-bold"
          >
            <ArrowLeft size={20} className="mr-2" /> {t("go_back")}
          </Link>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4 tracking-tight">
            {news.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-sm md:text-base text-gray-300">
            <span className="flex items-center font-medium">
              <Calendar size={18} className="mr-2 text-emerald-400" />
              {new Date(news.createdAt).toLocaleDateString(
                i18n.language === "uz"
                  ? "uz-UZ"
                  : i18n.language === "ru"
                  ? "ru-RU"
                  : "en-US"
              )}
            </span>
            <span className="flex items-center font-medium">
              <User size={18} className="mr-2 text-emerald-400" /> Admin
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl text-lg text-slate-700 leading-relaxed whitespace-pre-wrap border border-slate-100">
          {news.content}
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
