import { ArrowRight, Loader2 } from "lucide-react";
import NewsCard from "../../../components/ui/NewsCard";

const NewsSection = ({ newsList, loading }) => (
  <section className="py-24 bg-white relative z-30 -mt-12 rounded-t-[4rem] shadow-2xl">
    <div className="container mx-auto px-6">
      <div className="flex justify-between items-end mb-16">
        <div>
          <span className="text-blue-600 font-bold uppercase tracking-[0.3em] text-xs mb-2 block">
            So'nggi voqealar
          </span>
          <h2 className="text-4xl font-black text-gray-900">Yangiliklar</h2>
        </div>
        <a
          href="/news"
          className="group flex items-center gap-2 text-gray-400 font-bold hover:text-blue-600 transition-all"
        >
          Barchasini ko'rish{" "}
          <ArrowRight size={20} className="group-hover:translate-x-2" />
        </a>
      </div>
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {newsList.slice(0, 3).map((news) => (
            <NewsCard key={news._id} news={news} />
          ))}
        </div>
      )}
    </div>
  </section>
);

export default NewsSection;
