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
} from "lucide-react";
import newsApi from "../../api/newsApi";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

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

  const fetchNews = async () => {
    try {
      setLoading(true);
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

  const handleOpenModal = (item = null) => {
    if (item) {
      setFormData({
        _id: item._id,
        title: item.title,
        content: item.content,
        image: null,
        imagePreview: item.imageUrl, // Backenddan kelgan tayyor URL
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
      if (file.size > 5 * 1024 * 1024)
        return toast.error("Rasm hajmi 5MB dan oshmasligi kerak!");
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleRemoveImage = () =>
    setFormData({ ...formData, image: null, imagePreview: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.title.length < 5) return toast.error("Sarlavha juda qisqa");
    setBtnLoading(true);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    if (formData.image) data.append("image", formData.image);

    try {
      if (formData._id) {
        await newsApi.update(formData._id, data);
        toast.success("Muvaffaqiyatli yangilandi");
      } else {
        await newsApi.create(data);
        toast.success("Yangi maqola qo'shildi! 🚀");
      }
      setIsOpen(false);
      fetchNews();
    } catch (error) {
      toast.error("Xatolik yuz berdi");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Haqiqatan ham o'chirmoqchimisiz?")) return;
    const oldList = [...newsList];
    setNewsList(newsList.filter((item) => item._id !== id));
    try {
      await newsApi.delete(id);
      toast.success("O'chirildi");
    } catch (error) {
      setNewsList(oldList);
      toast.error("O'chirishda xatolik!");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-10 font-sans text-slate-900 pb-20">
      <div className="max-w-[1600px] mx-auto mb-12">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-[#0F172A]">
              Yangiliklar <span className="text-emerald-500">Markazi</span>
            </h1>
            <p className="mt-2 text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              Jami: <span className="text-emerald-600">{newsList.length}</span>
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto">
            <div className="group flex items-center bg-white px-5 py-4 rounded-2xl border border-slate-200 shadow-sm focus-within:border-emerald-500 w-full md:w-80">
              <Search
                size={20}
                className="text-slate-400 group-focus-within:text-emerald-500"
              />
              <input
                type="text"
                placeholder="Qidiruv..."
                className="bg-transparent border-none outline-none text-sm font-bold ml-3 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#0F172A] hover:bg-emerald-600 text-white rounded-2xl font-black uppercase text-xs"
            >
              <Plus size={18} /> Yangi Maqola
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-[2.5rem] h-[400px] border border-slate-100 p-4 animate-pulse"
              ></div>
            ))}
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200">
            <AlertCircle size={40} className="text-slate-300 mb-6" />
            <h3 className="text-xl font-black text-slate-800 uppercase italic">
              Topilmadi
            </h3>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedNews.map((item) => (
                <motion.div
                  layout
                  key={item._id}
                  className="group bg-white rounded-[2.5rem] p-4 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
                >
                  <div className="relative h-60 w-full rounded-[2rem] overflow-hidden bg-slate-100">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <ImageIcon size={48} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="p-3 bg-white text-slate-900 rounded-2xl hover:bg-emerald-500 hover:text-white"
                      >
                        <Pencil size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-3 bg-white text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-black text-slate-800 line-clamp-2 uppercase mt-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-xs font-medium line-clamp-3 mb-6 flex-1">
                      {item.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Pagination (Xuddi o'zidek) */}
          </>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
            <div className="bg-white rounded-[3rem] w-full max-w-4xl p-8 relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-8 right-8"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-black uppercase mb-8">
                Maqola tahriri
              </h2>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                <div className="space-y-4">
                  <input
                    required
                    className="w-full p-4 bg-slate-50 rounded-2xl"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Sarlavha"
                  />
                  <textarea
                    required
                    className="w-full p-4 bg-slate-50 rounded-2xl h-48"
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    placeholder="Matn"
                  />
                </div>
                <div className="relative border-4 border-dashed rounded-[2.5rem] overflow-hidden flex items-center justify-center min-h-[250px] bg-slate-50">
                  {formData.imagePreview ? (
                    <img
                      src={formData.imagePreview}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="font-bold text-slate-400">
                      Rasm yuklash
                    </span>
                  )}
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </div>
                <button
                  type="submit"
                  disabled={btnLoading}
                  className="lg:col-span-2 py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase"
                >
                  SAQLASH
                </button>
              </form>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default AdminNews;
