import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import {
  FileText,
  Search,
  Download,
  File,
  ChevronRight,
  Calendar,
  Loader2,
} from "lucide-react";

// Fayl ikonkasini aniqlash uchun yordamchi funksiya
const getFileIcon = (type) => {
  if (type === "pdf") return <FileText className="text-red-500" size={24} />;
  if (type.includes("doc"))
    return <FileText className="text-blue-500" size={24} />;
  if (type.includes("xls"))
    return <FileText className="text-green-500" size={24} />;
  return <File className="text-gray-500" size={24} />;
};

const Documents = () => {
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

  // Kategoriyalar ro'yxati
  const categories = [
    { id: "all", label: "Barchasi" },
    { id: "nizom", label: "Nizomlar" },
    { id: "qaror", label: "Qarorlar" },
    { id: "buyruq", label: "Buyruqlar" },
    { id: "metodik", label: "Metodik qo'llanmalar" },
  ];

  // Filtrlash
  const filteredDocs = documents.filter((doc) => {
    const matchesCategory =
      activeCategory === "all" || doc.category === activeCategory;
    const matchesSearch = doc.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Fayl hajmini chiroyli formatlash (MB, KB)
  const formatSize = (bytes) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-6">
        {/* Sarlavha */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 uppercase">
            Me'yoriy Hujjatlar
          </h1>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Universitet faoliyatiga oid barcha rasmiy nizomlar, qarorlar va
            buyruqlar bilan shu yerda tanishishingiz va yuklab olishingiz
            mumkin.
          </p>
        </div>

        {/* Qidiruv va Tablar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
          {/* Tablar (Kategoriyalar) */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Qidiruv */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Hujjat nomini qidirish..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Hujjatlar Ro'yxati */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-blue-600" size={40} />
          </div>
        ) : filteredDocs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map((doc) => (
              <div
                key={doc._id}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                    {getFileIcon(doc.fileType)}
                  </div>
                  <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-bold uppercase rounded-lg">
                    {doc.fileType.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {doc.title}
                </h3>

                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                  </div>
                  <span>{formatSize(doc.fileSize)}</span>
                </div>

                {/* Yuklab olish tugmasi */}
                <a
                  href={`http://localhost:4000${doc.file}`} // Backend URLni to'g'irlang
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full bg-gray-50 hover:bg-blue-600 hover:text-white text-gray-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all group-hover:shadow-md"
                >
                  <Download size={18} /> Yuklab olish
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="inline-flex p-4 bg-gray-50 rounded-full mb-4">
              <FileText className="text-gray-300" size={48} />
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              Hujjatlar topilmadi
            </h3>
            <p className="text-gray-500 mt-2">
              Boshqa kategoriya yoki qidiruv so'zini sinab ko'ring.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;
