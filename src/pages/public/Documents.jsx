import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import {
  FileText,
  Search,
  Download,
  File,
  Calendar,
  Loader2,
  Filter,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const getFileIcon = (type = "") => {
  const fileType = type.toLowerCase();
  if (fileType.includes("pdf"))
    return <FileText className="text-rose-500" size={28} />;
  if (fileType.includes("doc"))
    return <FileText className="text-blue-500" size={28} />;
  if (fileType.includes("xls"))
    return <FileText className="text-emerald-500" size={28} />;
  return <File className="text-slate-400" size={28} />;
};

const Documents = () => {
  const { t, i18n } = useTranslation();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDocs = async () => {
      try {
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
  }, []);

  const categories = [
    { id: "all", label: t("doc_cat_all") || "Barchasi" },
    { id: "nizom", label: t("doc_cat_nizom") || "Nizomlar" },
    { id: "qaror", label: t("doc_cat_qaror") || "Qarorlar" },
    { id: "buyruq", label: t("doc_cat_buyruq") || "Buyruqlar" },
    { id: "metodik", label: t("doc_cat_metodik") || "Metodik" },
  ];

  const filteredDocs = Array.isArray(documents)
    ? documents.filter((doc) => {
        const matchesCategory =
          activeCategory === "all" || doc.category === activeCategory;
        const matchesSearch = doc.title
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      })
    : [];

  const getFileUrl = (fileId) => {
    if (!fileId) return "#";
    if (fileId.startsWith("http")) return fileId;
    return `https://5nezpc68d1.ucarecd.net/${fileId}/-/inline/yes/`;
  };

  return (
    <div className="bg-[#fafbfc] min-h-screen pb-32">
      {/* 1. Header Section - Dynamic Background */}
      <div className="bg-[#0a1128] pt-32 pb-40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full -mr-40 -mt-40"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
          >
            <ShieldCheck size={14} />{" "}
            {t("doc_badge") || "Rasmiy hujjatlar ombori"}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-7xl font-black text-white mb-6 uppercase italic tracking-tighter"
          >
            {t("doc_page_title") || "Hujjatlar"}{" "}
            <span className="text-emerald-500 not-italic">Bazasi</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto font-medium text-lg md:text-xl"
          >
            {t("doc_page_subtitle") ||
              "Texnikum faoliyatiga doir barcha me'yoriy va o'quv hujjatlarini yuklab oling."}
          </motion.p>
        </div>
      </div>

      {/* 2. Controls Section (Sticky Search & Filter) */}
      <div className="container mx-auto px-6 -mt-12 relative z-20">
        <div className="bg-white p-4 md:p-6 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col lg:flex-row gap-6">
          <div className="flex flex-wrap gap-2 flex-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? "bg-emerald-600 text-white shadow-xl shadow-emerald-200"
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100"
                }`}
              >
                {activeCategory === cat.id && <Filter size={12} />}
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-96 group">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder={t("doc_search_placeholder") || "Qidirish..."}
              className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-slate-700 shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 3. Grid Section */}
      <div className="container mx-auto px-6 mt-16">
        {loading ? (
          <div className="py-40 text-center">
            <Loader2
              className="animate-spin text-emerald-600 mx-auto"
              size={56}
            />
            <p className="mt-4 text-slate-400 font-black uppercase tracking-[0.3em] text-xs">
              Ma'lumotlar yuklanmoqda...
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          >
            <AnimatePresence>
              {filteredDocs.map((doc, idx) => (
                <motion.div
                  layout
                  key={doc._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group bg-white p-8 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-12 -mt-12 transition-all group-hover:scale-[3] duration-700"></div>

                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div className="p-5 bg-slate-50 rounded-[1.5rem] text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 shadow-inner">
                      {getFileIcon(doc.fileType || "pdf")}
                    </div>
                    <span className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl border border-slate-100">
                      <File size={12} /> {doc.fileType || "PDF"}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-800 mb-6 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-[1.2] italic uppercase tracking-tighter relative z-10">
                    {doc.title}
                  </h3>

                  <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <Calendar size={14} className="text-emerald-500" />
                      <span>
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <a
                    href={getFileUrl(doc.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 w-full bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] py-5 rounded-[1.5rem] flex items-center justify-center gap-3 transition-all hover:bg-emerald-600 shadow-xl shadow-slate-900/10 active:scale-95 relative z-10 italic"
                  >
                    <Download size={18} />{" "}
                    {t("doc_download_btn") || "Yuklab olish"}{" "}
                    <ArrowRight size={14} className="opacity-50" />
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filteredDocs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-40 bg-white rounded-[4rem] border-4 border-dashed border-slate-50"
          >
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="text-slate-200" size={48} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter italic">
              Hujjatlar topilmadi
            </h3>
            <p className="text-slate-400 mt-2 font-bold uppercase text-[10px] tracking-[0.2em]">
              Qidiruv shartlarini o'zgartirib ko'ring
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Documents;
