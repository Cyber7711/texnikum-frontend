import { useEffect, useState } from "react";
import { Plus, Trash2, ImageIcon, Loader2, Save, X } from "lucide-react";
import newsApi from "../../api/newsApi";

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

  // --- HELPER: Rasm URL yasovchi (Admin uchun kichik hajmda) ---
  const getImageUrl = (image) => {
    if (!image) return null;
    if (image.includes("http")) return image;

    const CUSTOM_DOMAIN = "5nezpc68d1.ucarecd.net";
    // scale_crop bilan rasmni kvadrat shaklda markazdan qirqib olamiz
    return `https://${CUSTOM_DOMAIN}/${image}/-/scale_crop/150x150/smart/`;
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await newsApi.getAll();
      const data = res.data.data || res.data.result || res.data;
      setNewsList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

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
      alert("Yangilik muvaffaqiyatli qo'shildi! 🚀");
      setShowForm(false);
      setFormData({ title: "", content: "", image: null });
      fetchNews();
    } catch (error) {
      console.error(error);
      alert("Xatolik yuz berdi. Iltimos qayta urinib ko'ring.");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Haqiqatdan ham ushbu yangilikni o'chirmoqchimisiz?")) {
      try {
        await newsApi.delete(id);
        setNewsList((prev) => prev.filter((item) => item._id !== id));
      } catch (error) {
        alert("O'chirishda xatolik!");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tight uppercase">
            Yangiliklar Boshqaruvi
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Jami: {newsList.length} ta maqola
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center px-6 py-3 rounded-2xl font-bold transition shadow-lg ${
            showForm
              ? "bg-rose-50 text-rose-600 border border-rose-100"
              : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200"
          }`}
        >
          {showForm ? (
            <X size={20} className="mr-2" />
          ) : (
            <Plus size={20} className="mr-2" />
          )}
          {showForm ? "Yopish" : "Yangi qo'shish"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-8 rounded-3xl shadow-xl mb-8 border border-gray-100 animate-in fade-in zoom-in duration-300">
          <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-4">
            Yangi maqola yaratish
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                  Sarlavha
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Yangilik sarlavhasini kiriting..."
                  className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                  Batafsil matn
                </label>
                <textarea
                  name="content"
                  placeholder="Yangilik matnini yozing..."
                  rows="5"
                  className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                  Rasm
                </label>
                <div className="relative border-2 border-dashed border-gray-200 p-8 rounded-3xl text-center hover:bg-blue-50 hover:border-blue-300 transition-all cursor-pointer group">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="flex flex-col items-center justify-center">
                    <div className="bg-blue-100 p-4 rounded-2xl text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                      <ImageIcon size={30} />
                    </div>
                    <span className="text-sm font-bold text-gray-600">
                      {formData.image
                        ? formData.image.name
                        : "Rasmni tanlang yoki shu yerga tashlang"}
                    </span>
                    <p className="text-xs text-gray-400 mt-2">
                      Tavsiya etilgan o'lcham: 1200x800px (Max 5MB)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={btnLoading}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all flex items-center justify-center disabled:opacity-70"
            >
              {btnLoading ? (
                <Loader2 className="animate-spin mr-3" />
              ) : (
                <Save className="mr-3" size={22} />
              )}
              {btnLoading ? "SAQLANMOQDA..." : "YANGILIKNI E'LON QILISH"}
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">
                  Muqova
                </th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">
                  Ma'lumot
                </th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">
                  Sana
                </th>
                <th className="px-8 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">
                  Boshqaruv
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-20 text-center">
                    <Loader2 className="w-10 h-10 animate-spin mx-auto text-blue-500" />
                  </td>
                </tr>
              ) : newsList.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="py-20 text-center text-gray-400 font-medium"
                  >
                    Hozircha yangiliklar bazasi bo'sh.
                  </td>
                </tr>
              ) : (
                newsList.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-blue-50/20 transition-colors group"
                  >
                    <td className="px-8 py-5">
                      <div className="h-16 w-16 rounded-2xl overflow-hidden shadow-md border border-white">
                        {item.image ? (
                          <img
                            src={getImageUrl(item.image)}
                            alt="preview"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                            <ImageIcon size={20} className="text-gray-300" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="font-bold text-gray-800 line-clamp-1">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-400 mt-1 line-clamp-1 font-medium">
                        {item.content}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
                        {new Date(
                          item.date || item.createdAt
                        ).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-3 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminNews;
