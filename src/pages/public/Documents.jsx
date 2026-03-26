import { useEffect, useState, useMemo } from "react";
import axiosClient from "../../api/axiosClient";
import {
  FileText,
  Search,
  Download,
  File,
  Calendar,
  Loader2,
  Filter,
  Landmark,
  FileArchive,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

// Rasmiy hujjat turiga qarab ikonka va rang tanlash
const getFileIcon = (type = "") => {
  const fileType = type.toLowerCase();
  if (fileType.includes("pdf"))
    return <FileText className="text-rose-600" size={24} />;
  if (fileType.includes("doc") || fileType.includes("docx"))
    return <FileText className="text-blue-600" size={24} />;
  if (fileType.includes("xls") || fileType.includes("xlsx"))
    return <FileText className="text-emerald-600" size={24} />;
  return <File className="text-slate-500" size={24} />;
};

const Documents = () => {
  const { t } = useTranslation();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get("/doc");
        const data = res.data?.data || res.data;
        setDocuments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Xatolik:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: "all", label: t("doc_cat_all", "Barchasi") },
    { id: "nizom", label: t("doc_cat_nizom", "Nizomlar") },
    { id: "qaror", label: t("doc_cat_qaror", "Qarorlar") },
    { id: "buyruq", label: t("doc_cat_buyruq", "Buyruqlar") },
    { id: "metodik", label: t("doc_cat_metodik", "Metodik Qo'llanmalar") },
  ];

  const filteredDocs = useMemo(() => {
    if (!Array.isArray(documents)) return [];
    return documents.filter((doc) => {
      const matchesCategory =
        activeCategory === "all" || doc.category === activeCategory;
      const matchesSearch = (doc.title || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [documents, activeCategory, searchTerm]);

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-32 font-sans">
      {/* 1. Rasmiy Header Section */}
      <section className="bg-[#0a1930] pt-32 pb-48 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/50 via-[#0a1930] to-[#0a1930] pointer-events-none" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-[10px] font-extrabold uppercase tracking-widest mb-8 backdrop-blur-md shadow-lg"
          >
            <Landmark size={14} className="text-amber-400" />
            {t("doc_badge", "RASMIY HUJJATLAR OMBORI")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white uppercase tracking-tight leading-[1.1] mb-6"
          >
            ME'YORIY <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 drop-shadow-lg">
              HUJJATLAR BAZASI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-slate-400 max-w-2xl mx-auto font-medium text-base md:text-lg"
          >
            {t(
              "doc_page_subtitle",
              "Texnikum faoliyatiga doir barcha qarorlar, buyruqlar, nizomlar va o'quv-metodik hujjatlar to'plami.",
            )}
          </motion.p>
        </div>
      </section>

      {/* 2. Controls & Search Section */}
      <div className="container mx-auto px-6 -mt-24 relative z-20">
        <div className="bg-white p-4 md:p-6 rounded-[1.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col lg:flex-row gap-5 max-w-6xl mx-auto">
          {/* Kategoriyalar Filteri */}
          <div className="flex flex-wrap gap-2 flex-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-3.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? "bg-[#0a1930] text-white shadow-md transform scale-[1.02]"
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200/60"
                }`}
              >
                {activeCategory === cat.id && (
                  <Filter size={14} className="text-amber-400" />
                )}
                {cat.label}
              </button>
            ))}
          </div>

          {/* Qidiruv tizimi (TUZATILDI) */}
          <div className="w-full lg:w-[400px] shrink-0 group">
            <div className="relative flex items-center w-full h-full">
              {/* Ikonka markazlashtirildi */}
              <div className="absolute left-4 text-slate-400 group-focus-within:text-blue-600 transition-colors z-10">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder={t(
                  "doc_search_placeholder",
                  "Hujjat nomini kiriting...",
                )}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-full min-h-[48px] bg-slate-50 border border-slate-200 text-[#0a1930] text-sm font-bold rounded-xl pl-12 pr-4 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:font-medium placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Grid Section (Hujjatlar ro'yxati) */}
      <div className="container mx-auto px-6 mt-12 max-w-7xl mx-auto">
        {loading ? (
          <div className="min-h-[40vh] flex flex-col items-center justify-center bg-white rounded-[2rem] shadow-sm border border-slate-100 py-20">
            <Loader2 className="animate-spin text-blue-600 mb-6" size={48} />
            <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-slate-400">
              Hujjatlar bazasi yuklanmoqda...
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
          >
            {/* SMOOTH ANIMATION UCHUN popLayout qoshildi */}
            <AnimatePresence mode="popLayout">
              {filteredDocs.map((doc, idx) => (
                <motion.div
                  layout // Kartalar joylashuvini silliq o'zgartiradi
                  key={doc._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    transition: { duration: 0.2 },
                  }}
                  transition={{
                    layout: { type: "spring", stiffness: 300, damping: 30 },
                    duration: 0.4,
                  }}
                  className="group bg-white p-6 md:p-8 rounded-[1.5rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(10,25,48,0.08)] transition-all duration-300 border border-slate-200 flex flex-col h-full relative overflow-hidden"
                >
                  {/* Rasmiy Hover Tepadan tushuvchi chiziq */}
                  <div className="absolute top-0 left-0 w-full h-1 z-20 transition-all duration-500 bg-blue-600 scale-x-0 group-hover:scale-x-100 origin-left" />

                  {/* Header: Ikonka va File turi */}
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="p-3.5 bg-slate-50 rounded-xl text-slate-400 border border-slate-100 group-hover:bg-[#0a1930] transition-colors duration-300 shadow-sm flex items-center justify-center">
                      {getFileIcon(doc.fileType || "pdf")}
                    </div>
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-500 text-[10px] font-extrabold uppercase tracking-widest rounded-lg border border-slate-200 shadow-sm">
                      <FileArchive size={12} /> {doc.fileType || "DOC"}
                    </span>
                  </div>

                  {/* Hujjat Nomi */}
                  <h3 className="text-lg font-extrabold text-[#0a1930] mb-6 group-hover:text-blue-600 transition-colors line-clamp-3 leading-snug break-words">
                    {doc.title}
                  </h3>

                  {/* Bottom: Sana va Yuklab olish tugmasi */}
                  <div className="mt-auto flex flex-col gap-4">
                    <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                      <Calendar size={14} className="text-amber-500" />
                      <span>
                        {new Date(doc.createdAt).toLocaleDateString("uz-UZ")}
                      </span>
                    </div>

                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-slate-50 text-[#0a1930] font-extrabold text-[10px] uppercase tracking-[0.2em] py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-blue-600 hover:text-white border border-slate-200 hover:border-blue-600 shadow-sm group/btn"
                    >
                      <Download
                        size={16}
                        className="group-hover/btn:-translate-y-0.5 transition-transform"
                      />{" "}
                      {t("doc_download_btn", "YUKLAB OLISH")}
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State (Qidiruv natija bermasa) */}
        {!loading && filteredDocs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-32 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm max-w-4xl mx-auto flex flex-col items-center"
          >
            <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-6 shadow-inner border border-slate-100">
              <FileText
                className="text-slate-300"
                size={40}
                strokeWidth={1.5}
              />
            </div>
            <h3 className="text-2xl font-extrabold text-[#0a1930] uppercase tracking-wide mb-2">
              Hujjatlar topilmadi
            </h3>
            <p className="text-slate-500 font-medium text-sm">
              Siz qidirayotgan hujjat bazadan topilmadi. Boshqa so'z bilan
              qidirib ko'ring yoki filterni tozalang.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Documents;
