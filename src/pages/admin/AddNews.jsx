import { useEffect, useState, useMemo } from "react";
import {
  Plus,
  Trash2,
  ImageIcon,
  Save,
  X,
  ImagePlus,
  AlertCircle,
  Pencil,
  Eye,
  Search,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Loader2,
} from "lucide-react";
import newsApi from "../../api/newsApi"; // Yangi qo'shish (POST) va o'chirish (DELETE) uchun
import axiosClient from "../../api/axiosClient"; // Tahrirlash (PUT) uchun to'g'ridan-to'g'ri chaqiramiz
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

// --- CONFIG ---
const ITEMS_PER_PAGE = 9;

const AdminNews = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState({
    _id: null,
    title: "",
    content: "",
    image: null,
    imagePreview: null,
  });

  // --- DATA FETCHING ---
  const fetchNews = async () => {
    try {
      setLoading(true);
      // Agar newsApi.getAll() to'g'ri ishlayotgan bo'lsa teginmaymiz
      const res = await newsApi.getAll();
      const data = res.data?.data || res.data?.result || res.data;
      setNewsList(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Yangiliklarni yuklab bo'lmadi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // --- FILTER & PAGINATION ---
  const filteredNews = useMemo(() => {
    return newsList.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [newsList, searchTerm]);

  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
  const paginatedNews = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredNews.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredNews, currentPage]);

  // --- HANDLERS ---
  const handleOpenModal = (item = null) => {
    if (item) {
      setFormData({
        _id: item._id,
        title: item.title,
        content: item.content,
        image: null,
        imagePreview: item.imageUrl || null,
      });
    } else {
      setFormData({
        _id: null,
        title: "",
        content: "",
        image: null,
        imagePreview: null,
      });
    }
    setIsOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        return toast.error("Rasm hajmi 10MB dan oshmasligi kerak!");
      }
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, image: null, imagePreview: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.title.length < 5) return toast.error("Sarlavha juda qisqa");

    setBtnLoading(true);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);

    // Rasm bo'lsa uni ham qo'shamiz (Backend kutadigan "image" nomi bilan)
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      if (formData._id) {
        // ⚠️ MUHIM O'ZGARISH: Tahrirlash uchun PATCH emas, aniq PUT so'rovini yuboramiz.
        // Agar backend faqat PATCH olsa, "put" so'zini "patch" ga o'zgartiring.
        await axiosClient.put(`/news/${formData._id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Muvaffaqiyatli yangilandi");
      } else {
        // Yangi qo'shish (POST) - oldingidek ishlayveradi
        await newsApi.create(data);
        toast.success("Yangi maqola qo'shildi! 🚀");
      }

      setIsOpen(false);
      fetchNews();
    } catch (error) {
      console.error("News Submit Error:", error);
      toast.error(error.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Haqiqatan ham o'chirmoqchimisiz?")) return;

    const oldList = [...newsList];
    setNewsList(newsList.filter((item) => item._id !== id));

    try {
      // O'chirish (DELETE)
      await axiosClient.delete(`/news/${id}`);
      toast.success("O'chirildi");
    } catch (error) {
      setNewsList(oldList);
      toast.error("O'chirishda xatolik!");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-10 font-sans text-slate-900 pb-20">
      {/* HEADER */}
      <div className="max-w-[1600px] mx-auto mb-12">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-[#0F172A]">
              Yangiliklar <span className="text-emerald-500">Markazi</span>
            </h1>
            <p className="mt-2 text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              Jami maqolalar:{" "}
              <span className="text-emerald-600">{newsList.length}</span>
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto">
            <div className="group flex items-center bg-white px-5 py-4 rounded-2xl border border-slate-200 shadow-sm focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all w-full md:w-80">
              <Search
                size={20}
                className="text-slate-400 group-focus-within:text-emerald-500 transition-colors"
              />
              <input
                type="text"
                placeholder="Qidiruv..."
                className="bg-transparent border-none outline-none text-sm font-bold ml-3 w-full placeholder:text-slate-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
              onClick={() => handleOpenModal()}
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#0F172A] hover:bg-emerald-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-xl shadow-slate-900/20 active:scale-95"
            >
              <Plus
                size={18}
                className="group-hover:rotate-90 transition-transform duration-300"
              />
              Yangi Maqola
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className="max-w-[1600px] mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-[2.5rem] h-[400px] border border-slate-100 p-4 animate-pulse"
              >
                <div className="w-full h-48 bg-slate-100 rounded-[2rem] mb-6"></div>
                <div className="h-6 bg-slate-100 rounded-full w-3/4 mb-4"></div>
                <div className="h-4 bg-slate-100 rounded-full w-full mb-2"></div>
                <div className="h-4 bg-slate-100 rounded-full w-2/3"></div>
              </div>
            ))}
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <AlertCircle size={40} className="text-slate-300" />
            </div>
            <h3 className="text-xl font-black text-slate-800 uppercase italic tracking-tight">
              Topilmadi
            </h3>
            <p className="text-slate-400 text-sm font-medium mt-1">
              So'rovingiz bo'yicha hech narsa yo'q.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedNews.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={item._id}
                  className="group bg-white rounded-[2.5rem] p-4 border border-slate-100 shadow-sm hover:shadow-2xl hover:border-emerald-100 transition-all duration-500 hover:-translate-y-2 flex flex-col"
                >
                  <div className="relative h-60 w-full rounded-[2rem] overflow-hidden bg-slate-100">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        onError={(e) =>
                          (e.target.src =
                            "https://via.placeholder.com/800x600?text=Rasm+Topilmadi")
                        }
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <ImageIcon size={48} />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="p-3 bg-white text-slate-900 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all transform hover:scale-110 shadow-lg"
                        title="Tahrirlash"
                      >
                        <Pencil size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-3 bg-white text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all transform hover:scale-110 shadow-lg"
                        title="O'chirish"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-2xl shadow-sm">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">
                        {new Date(
                          item.date || item.createdAt,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-black text-slate-800 leading-tight line-clamp-2 italic uppercase tracking-tight mb-3 mt-2 group-hover:text-emerald-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-xs font-medium line-clamp-3 leading-relaxed mb-6 flex-1">
                      {item.content}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <Eye size={14} className="text-emerald-500" />
                        {item.views || 0}
                      </div>
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="flex items-center gap-1 text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:gap-2 transition-all"
                      >
                        Tahrirlash <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-16">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-xs font-black uppercase tracking-widest text-slate-400 bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm">
                  Sahifa {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                <div>
                  <h2 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900">
                    {formData._id ? "Tahrirlash" : "Yangi Maqola"}
                  </h2>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
                    Ma'lumotlarni to'ldiring
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-3 bg-slate-50 hover:bg-rose-50 hover:text-rose-500 rounded-full transition-colors text-slate-500"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-8 md:p-10 scrollbar-hide">
                <form
                  id="newsForm"
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-10 h-full"
                >
                  {/* Left: Inputs */}
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                        Sarlavha
                      </label>
                      <input
                        required
                        className="w-full p-5 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-[1.5rem] outline-none transition-all font-bold text-slate-800 placeholder:text-slate-300 text-sm shadow-inner"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        placeholder="Maqola sarlavhasi..."
                      />
                    </div>

                    <div className="space-y-3 h-full flex flex-col">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                        Asosiy Matn
                      </label>
                      <textarea
                        required
                        className="w-full p-5 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-[1.5rem] outline-none transition-all font-medium text-slate-600 placeholder:text-slate-300 text-sm resize-none flex-1 min-h-[250px] shadow-inner"
                        value={formData.content}
                        onChange={(e) =>
                          setFormData({ ...formData, content: e.target.value })
                        }
                        placeholder="Batafsil ma'lumot..."
                      />
                    </div>
                  </div>

                  {/* Right: Image Upload */}
                  <div className="space-y-3 flex flex-col">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Muqova Rasmi
                    </label>
                    <div className="flex-1 relative border-4 border-dashed border-slate-100 rounded-[2.5rem] overflow-hidden group min-h-[300px] flex flex-col items-center justify-center bg-slate-50 hover:bg-emerald-50/30 hover:border-emerald-200 transition-all shadow-inner">
                      {formData.imagePreview ? (
                        <div className="relative w-full h-full">
                          <img
                            src={formData.imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />

                          {/* Image Actions Overlay */}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                            <label className="cursor-pointer p-4 bg-white text-emerald-600 rounded-2xl shadow-xl hover:bg-emerald-600 hover:text-white transition-all transform hover:scale-110">
                              <RefreshCw size={24} />
                              <input
                                type="file"
                                className="hidden"
                                onChange={handleImageChange}
                                accept="image/*"
                              />
                            </label>
                            <button
                              type="button"
                              onClick={handleRemoveImage}
                              className="p-4 bg-white text-rose-500 rounded-2xl shadow-xl hover:bg-rose-500 hover:text-white transition-all transform hover:scale-110"
                            >
                              <Trash2 size={24} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full p-6 text-center">
                          <div className="w-24 h-24 bg-white rounded-[2rem] shadow-sm flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                            <ImagePlus size={40} />
                          </div>
                          <span className="text-sm font-black text-slate-600 uppercase tracking-widest">
                            Rasmni yuklang
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 mt-2 uppercase">
                            Max 10MB (JPEG, PNG, WEBP)
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            onChange={handleImageChange}
                            accept="image/*"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </form>
              </div>

              {/* Modal Footer */}
              <div className="p-6 md:p-8 border-t border-slate-100 bg-slate-50 shrink-0 flex items-center justify-end gap-4 rounded-b-[3rem]">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-8 py-4 rounded-2xl font-bold uppercase text-xs tracking-widest text-slate-500 hover:bg-white hover:shadow-sm transition-all"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  form="newsForm"
                  disabled={btnLoading}
                  className="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-emerald-200 active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {btnLoading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <Save size={18} />
                  )}
                  {formData._id
                    ? "O'zgarishlarni Saqlash"
                    : "Yangilikni Saqlash"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminNews;
