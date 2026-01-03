import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  ImageIcon,
  Loader2,
  Save,
  X,
  Calendar,
  ArrowUpRight,
  AlertCircle,
  ImagePlus,
} from "lucide-react";
import newsApi from "../../api/newsApi";
import { toast } from "react-hot-toast";

const AdminNews = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });

  // --- IMAGE URL HELPER ---
  const getImageUrl = (image) => {
    if (!image) return null;
    if (image.includes("http")) return image;
    const CUSTOM_DOMAIN = "5nezpc68d1.ucarecd.net";
    return `https://${CUSTOM_DOMAIN}/${image}/-/scale_crop/200x200/smart/`;
  };

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await newsApi.getAll();
      const data = res.data?.data || res.data?.result || res.data;
      setNewsList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Xatolik:", error);
      setNewsList([]);
      toast.error("Yangiliklarni yuklab bo'lmadi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      await newsApi.create(data);
      toast.success("Yangilik muvaffaqiyatli qo'shildi! 🚀");
      setShowForm(false);
      setFormData({ title: "", content: "", image: null });
      fetchNews();
    } catch (error) {
      toast.error("Xatolik yuz berdi. Iltimos qayta urinib ko'ring.");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Ushbu yangilikni o'chirib yubormoqchimisiz?")) {
      try {
        await newsApi.delete(id);
        setNewsList((prev) =>
          Array.isArray(prev) ? prev.filter((item) => item._id !== id) : []
        );
        toast.success("Yangilik o'chirildi");
      } catch (error) {
        toast.error("O'chirishda xatolik!");
      }
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto bg-slate-50 min-h-screen pb-24">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#0a1128] p-6 md:p-10 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <h1 className="text-2xl md:text-4xl font-black tracking-tighter uppercase italic">
            Yangiliklar <span className="text-emerald-400">Markazi</span>
          </h1>
          <p className="text-slate-400 text-[10px] md:text-sm font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
            <Plus size={14} className="text-emerald-500" /> Jami:{" "}
            {newsList.length} ta maqola
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`relative z-10 mt-6 md:mt-0 w-full md:w-auto flex items-center justify-center space-x-2 px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-lg active:scale-95 ${
            showForm
              ? "bg-rose-500 text-white shadow-rose-900/20"
              : "bg-emerald-500 text-white shadow-emerald-900/20 hover:bg-emerald-400"
          }`}
        >
          {showForm ? <X size={20} /> : <Plus size={20} />}
          <span>{showForm ? "Yopish" : "Yangi Qo'shish"}</span>
        </button>
      </div>

      {/* FORM SECTION */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 md:p-12 rounded-[3rem] shadow-2xl border border-slate-100 grid grid-cols-1 gap-8 animate-in zoom-in duration-300 relative overflow-hidden"
        >
          <div className="flex items-center gap-3 text-slate-900 font-black text-xl uppercase tracking-tighter italic border-b border-slate-100 pb-6">
            <Plus className="text-emerald-500" /> Yangi maqola yaratish
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Maqola Sarlavhasi
                </label>
                <input
                  type="text"
                  required
                  placeholder="Sarlavhani kiriting..."
                  className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-700"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Maqola Matni
                </label>
                <textarea
                  required
                  rows="6"
                  placeholder="Batafsil ma'lumot..."
                  className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl outline-none transition-all font-medium text-slate-600 resize-none"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Muqova Rasmi
              </label>
              <div className="relative border-4 border-dashed border-slate-100 rounded-[2.5rem] p-10 h-full flex flex-col items-center justify-center gap-4 bg-slate-50/50 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all group cursor-pointer">
                <input
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files[0] })
                  }
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                  {formData.image ? (
                    <ImagePlus size={40} />
                  ) : (
                    <ImageIcon size={40} />
                  )}
                </div>
                <div className="text-center">
                  <span className="text-xs font-black text-slate-600 uppercase tracking-widest block mb-1">
                    {formData.image ? formData.image.name : "Rasmni yuklang"}
                  </span>
                  <p className="text-[10px] text-slate-400 font-bold">
                    PNG, JPG (Max 5MB)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={btnLoading}
            className="w-full py-5 bg-emerald-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs italic shadow-xl shadow-emerald-900/10 active:scale-[0.98] transition-all flex justify-center items-center gap-3 disabled:opacity-50"
          >
            {btnLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Save size={20} />
            )}
            {btnLoading ? "SAQLANMOQDA..." : "YANGILIKNI E'LON QILISH"}
          </button>
        </form>
      )}

      {/* LIST SECTION */}
      <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="py-32 text-center">
            <Loader2
              className="animate-spin mx-auto text-emerald-500"
              size={48}
            />
          </div>
        ) : newsList.length === 0 ? (
          <div className="py-32 text-center">
            <AlertCircle className="mx-auto text-slate-200 mb-4" size={64} />
            <p className="text-slate-400 font-black uppercase tracking-widest text-xs">
              Yangiliklar topilmadi
            </p>
          </div>
        ) : (
          <>
            {/* DESKTOP TABLE */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">
                  <tr>
                    <th className="p-8">Muqova</th>
                    <th className="p-8">Maqola</th>
                    <th className="p-8">Sana</th>
                    <th className="p-8 text-right">Boshqaruv</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {newsList.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-emerald-50/20 transition-colors group"
                    >
                      <td className="p-8">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-white group-hover:scale-110 transition-transform">
                          {item.image ? (
                            <img
                              src={getImageUrl(item.image)}
                              alt="news"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full bg-slate-100 flex items-center justify-center text-slate-300">
                              <ImageIcon size={24} />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-8">
                        <div className="font-black text-slate-800 text-lg leading-tight tracking-tight mb-2 line-clamp-1 italic">
                          {item.title}
                        </div>
                        <div className="text-xs text-slate-400 font-medium line-clamp-1 max-w-md">
                          {item.content}
                        </div>
                      </td>
                      <td className="p-8">
                        <span className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg text-[10px] font-black text-slate-500 w-fit">
                          <Calendar size={12} className="text-emerald-500" />
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="p-8 text-right">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="bg-rose-50 text-rose-500 p-4 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE VIEW */}
            <div className="md:hidden divide-y divide-slate-50">
              {newsList.map((item) => (
                <div
                  key={item._id}
                  className="p-6 flex flex-col gap-4 relative group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-[1.5rem] overflow-hidden shadow-md flex-shrink-0 border-2 border-white">
                      {item.image ? (
                        <img
                          src={getImageUrl(item.image)}
                          alt="news"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-slate-100 flex items-center justify-center text-slate-300">
                          <ImageIcon size={24} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                      <h4 className="font-black text-slate-800 text-sm leading-tight tracking-tighter line-clamp-2 italic">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-50">
                    <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase">
                      Batafsil <ArrowUpRight size={12} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="flex items-center gap-2 bg-rose-50 text-rose-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase"
                    >
                      <Trash2 size={14} /> O'chirish
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminNews;
