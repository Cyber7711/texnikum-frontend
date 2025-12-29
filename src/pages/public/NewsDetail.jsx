import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, ArrowLeft, User } from "lucide-react";
import axiosClient from "../../api/axiosClient";

const SERVER_URL = "http://localhost:4000"; // Server manzili

const NewsDetail = () => {
  const { id } = useParams(); // URL dagi ID ni olamiz
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axiosClient.get(`/news/${id}`);
        setNews(res.data || res); // Backend javobiga qarab
      } catch (error) {
        console.error("Xatolik:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [id]);

  if (loading) return <div className="text-center py-20">Yuklanmoqda...</div>;
  if (!news)
    return (
      <div className="text-center py-20 text-red-500">Yangilik topilmadi!</div>
    );

  const imageUrl = news.image ? `${SERVER_URL}${news.image}` : null;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Tepa fon rasmi (agar rasm bo'lsa) */}
      <div className="h-64 md:h-96 w-full bg-tatu-blue relative overflow-hidden">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={news.title}
            className="w-full h-full object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>

        {/* Sarlavha rasm ustida */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white container mx-auto">
          <Link
            to="/"
            className="text-blue-200 hover:text-white flex items-center mb-4 transition"
          >
            <ArrowLeft size={20} className="mr-2" /> Asosiyga qaytish
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            {news.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-sm md:text-base text-gray-300">
            <span className="flex items-center">
              <Calendar size={18} className="mr-2" />{" "}
              {new Date(news.createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center">
              <User size={18} className="mr-2" /> Admin
            </span>
          </div>
        </div>
      </div>

      {/* Asosiy matn qismi */}
      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
          {news.content}
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
