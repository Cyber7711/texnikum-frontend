import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Server manzili (Rasmlarni to'g'ri ko'rsatish uchun)
// Agar serveringiz 5000 da bo'lsa, shuni o'zgartiring
const SERVER_URL = "http://localhost:4000";

const NewsCard = ({ news }) => {
  // Agar rasm bo'lmasa, default rasm qo'yamiz
  const imageUrl = news.image
    ? `${SERVER_URL}${news.image}`
    : "https://via.placeholder.com/400x250?text=Texnikum+Yangiliklari";

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100 group">
      {/* Rasm qismi */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={imageUrl}
          alt={news.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
        />
        <div className="absolute top-4 left-4 bg-tatu-blue text-white text-xs font-bold px-3 py-1 rounded shadow-lg">
          YANGILIK
        </div>
      </div>

      {/* Matn qismi */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Sana */}
        <div className="flex items-center text-gray-400 text-sm mb-3">
          <Calendar size={16} className="mr-2" />
          {new Date(news.createdAt || news.date).toLocaleDateString("uz-UZ", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>

        {/* Sarlavha */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-tatu-blue transition">
          {news.title}
        </h3>

        {/* Qisqacha mazmuni (faqat 100 ta harf) */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {news.content}
        </p>

        {/* Tugma */}
        <Link
          to={`/news/${news._id}`}
          className="inline-flex items-center text-tatu-blue font-semibold hover:text-tatu-gold transition mt-auto"
        >
          Batafsil o'qish <ArrowRight size={16} className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
