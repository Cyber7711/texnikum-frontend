import { ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom"; // Link import qilindi
import NewsCard from "../../../components/ui/NewsCard";

const NewsSection = ({ newsList, loading }) => (
  <section className="py-24 bg-white relative z-30 -mt-12 rounded-t-[3rem] md:rounded-t-[5rem] shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.1)]">
    <div className="container mx-auto px-6">
      {/* Header qismi */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
        <div>
          <span className="text-emerald-600 font-bold uppercase tracking-[0.2em] text-xs mb-3 block flex items-center gap-2">
            <span className="w-8 h-0.5 bg-emerald-600 inline-block"></span>
            So'nggi voqealar
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Texnikum{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              Yangiliklari
            </span>
          </h2>
        </div>

        <Link
          to="/news"
          className="group flex items-center gap-3 px-6 py-3 rounded-full border border-slate-200 text-slate-500 font-bold hover:border-emerald-500 hover:text-emerald-600 transition-all duration-300"
        >
          Barchasini ko'rish{" "}
          <div className="bg-slate-100 group-hover:bg-emerald-100 p-1.5 rounded-full transition-colors">
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </div>
        </Link>
      </div>

      {/* Grid qismi */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-emerald-600" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.slice(0, 3).map((news) => (
            <NewsCard key={news._id} news={news} />
          ))}
        </div>
      )}
    </div>
  </section>
);

export default NewsSection;
