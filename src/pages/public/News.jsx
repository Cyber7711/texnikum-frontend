import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { Calendar, ArrowRight, ImageOff } from "lucide-react";
import { Link } from "react-router-dom";

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        const res = await axiosClient.get("/news");
        // Backenddan keladigan ma'lumotni formatlash
        const data = res.data.data || res.data.result || res.data;
        setNewsList(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Yangiliklarni yuklashda xato:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllNews();
  }, []);

  // --- UPLOADCARE IMAGE HELPER (Sizning maxsus domeningiz bilan) ---
  const getImageUrl = (image) => {
    if (!image) return null;
    if (image.includes("http")) return image;

    // Sizda ishlayotgan maxsus domen
    const CUSTOM_DOMAIN = "5nezpc68d1.ucarecd.net";

    // UUID dan keyin slesh (/) bo'lishi va CDN parametrlarining to'g'ri tartibi muhim
    return `https://${CUSTOM_DOMAIN}/${image}/-/preview/1000x560/-/quality/smart/-/format/auto/`;
  };

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 tracking-tight uppercase">
            So'nggi Yangiliklar
          </h1>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-slate-500 text-lg">
            Texnikum hayotidagi eng muhim voqea va hodisalar
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-gray-100 rounded-3xl h-96 animate-pulse"
              ></div>
            ))}
          </div>
        ) : newsList.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl">
            <p className="text-slate-400 text-xl font-medium">
              Hozircha yangiliklar yo'q.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsList.map((news) => (
              <article
                key={news._id}
                className="flex flex-col bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group"
              >
                <div className="h-56 relative overflow-hidden bg-slate-100">
                  {news.image ? (
                    <img
                      src={getImageUrl(news.image)}
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <ImageOff size={48} strokeWidth={1} />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-slate-800 shadow-lg flex items-center gap-2">
                    <Calendar size={14} className="text-blue-600" />
                    {new Date(news.date || news.createdAt).toLocaleDateString(
                      "uz-UZ"
                    )}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-grow">
                    {news.content}
                  </p>

                  <Link
                    to={`/news/${news._id}`}
                    className="mt-auto flex items-center text-blue-600 font-bold text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform"
                  >
                    Batafsil o'qish <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
