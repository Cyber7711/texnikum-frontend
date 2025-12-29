import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import NewsCard from "../../components/ui/NewsCard";

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        const res = await axiosClient.get("/news");
        setNewsList(res.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllNews();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-3xl font-bold text-tatu-blue mb-8 border-b pb-4">
        Barcha Yangiliklar
      </h1>

      {loading ? (
        <div className="text-center py-20">Yuklanmoqda...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.map((news) => (
            <NewsCard key={news._id} news={news} />
          ))}
          {newsList.length === 0 && <p>Yangiliklar yo'q.</p>}
        </div>
      )}
    </div>
  );
};

export default News;
