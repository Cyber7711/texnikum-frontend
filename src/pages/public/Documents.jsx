import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import {
  FileText,
  Search,
  Download,
  File,
  Calendar,
  Loader2,
} from "lucide-react";
import { useTranslation } from "react-i18next"; // i18n hook

const getFileIcon = (type = "") => {
  const fileType = type.toLowerCase();
  if (fileType.includes("pdf"))
    return <FileText className="text-red-500" size={24} />;
  if (fileType.includes("doc"))
    return <FileText className="text-blue-500" size={24} />;
  if (fileType.includes("xls"))
    return <FileText className="text-green-500" size={24} />;
  return <File className="text-gray-500" size={24} />;
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
        setDocuments(res.data.data || res.data);
      } catch (err) {
        console.error("Hujjatlarni yuklashda xatolik:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, []);

  const categories = [
    { id: "all", label: t("doc_cat_all") },
    { id: "nizom", label: t("doc_cat_nizom") },
    { id: "qaror", label: t("doc_cat_qaror") },
    { id: "buyruq", label: t("doc_cat_buyruq") },
    { id: "metodik", label: t("doc_cat_metodik") },
  ];

  const filteredDocs = documents.filter((doc) => {
    const matchesCategory =
      activeCategory === "all" || doc.category === activeCategory;
    const matchesSearch = doc.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Fayl URL manzili (Uploadcare UUID bo'lsa CDN linkini qaytaradi)
  const getFileUrl = (fileId) => {
    if (!fileId) return "#";
    if (fileId.startsWith("http")) return fileId;
    return `https://5nezpc68d1.ucarecd.net/${fileId}/-/inline/yes/`;
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tight">
            {t("doc_page_title")}
          </h1>
          <div className="w-24 h-2 bg-emerald-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto font-medium leading-relaxed">
            {t("doc_page_subtitle")}
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-emerald-600 text-white shadow-xl shadow-emerald-200 scale-105"
                    : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder={t("doc_search_placeholder")}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="animate-spin text-emerald-600" size={48} />
            <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">
              {t("loading")}
            </span>
          </div>
        ) : filteredDocs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDocs.map((doc) => (
              <div
                key={doc._id}
                className="bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500 border border-gray-100 group flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-emerald-50 transition-colors duration-500">
                    {getFileIcon(doc.fileType || "pdf")}
                  </div>
                  <span className="px-4 py-1.5 bg-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-full">
                    {doc.fileType || "PDF"}
                  </span>
                </div>

                <h3 className="text-xl font-black text-gray-800 mb-4 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-tight">
                  {doc.title}
                </h3>

                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-emerald-500" />
                    <span>
                      {new Date(doc.createdAt).toLocaleDateString(
                        i18n.language === "en"
                          ? "en-US"
                          : i18n.language === "ru"
                          ? "ru-RU"
                          : "uz-UZ"
                      )}
                    </span>
                  </div>
                </div>

                <a
                  href={getFileUrl(doc.file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full bg-emerald-600 text-white font-black text-xs uppercase tracking-[0.2em] py-4 rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-emerald-700 shadow-lg shadow-emerald-200 active:scale-95"
                >
                  <Download size={18} /> {t("doc_download_btn")}
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
            <FileText className="mx-auto text-gray-200 mb-6" size={64} />
            <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tight">
              {t("doc_not_found_title")}
            </h3>
            <p className="text-gray-400 mt-2 font-medium">
              {t("doc_not_found_desc")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;
