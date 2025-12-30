import { useEffect, useState } from "react";
import { Plus, Trash2, ImageIcon, Loader2, Save, X } from "lucide-react";
import newsApi from "../../api/newsApi"; // Yoki axiosClient

const AdminNews = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false); // Saqlash tugmasi uchun

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });

  // --- HELPER: Rasm URL yasovchi ---
  const getImageUrl = (image, size = "100x100") => {
    // Agar rasm yo'q bo'lsa
    if (!image) return null;
    // Agar rasm allaqachon to'liq link bo'lsa (http...)
    if (image.includes("http")) return image;
    // Uploadcare UUID bo'lsa -> CDN link yasaymiz
    return `https://ucarecdn.com/${image}/-/scale_crop/${size}/center/-/quality/smart/`;
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await newsApi.getAll(); // Yoki axiosClient.get('/news')
      // Backenddan keladigan strukturaga qarab moslang (res.data.data yoki res.data)
      setNewsList(res.data.data || res.data || []);
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
      // Backenddagi Multer 'image' nomini kutmoqda
      data.append("image", formData.image);
    }

    try {
      // Backend o'zi Uploadcarega yuklab, UUID ni bazaga saqlaydi
      await newsApi.create(data);

      alert("Yangilik muvaffaqiyatli qo'shildi! 🚀");
      setShowForm(false);
      setFormData({ title: "", content: "", image: null });
      fetchNews(); // Ro'yxatni yangilash
    } catch (error) {
      console.error(error);
      alert("Xatolik yuz berdi. Iltimos qayta urinib ko'ring.");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Rostdan ham o'chirmoqchimisiz?")) {
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
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">
            Yangiliklar Boshqaruvi
          </h1>
          <p className="text-sm text-gray-500">
            Saytdagi barcha maqolalar ro'yxati
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center px-5 py-2.5 rounded-xl font-bold transition shadow-lg ${
            showForm
              ? "bg-red-50 text-red-600 hover:bg-red-100"
              : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-300"
          }`}
        >
          {showForm ? (
            <X size={20} className="mr-2" />
          ) : (
            <Plus size={20} className="mr-2" />
          )}
          {showForm ? "Bekor qilish" : "Yangilik qo'shish"}
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-white p-8 rounded-2xl shadow-xl mb-8 border border-gray-100 animate-in fade-in slide-in-from-top-5">
          <h2 className="text-xl font-bold mb-6 text-gray-800">
            Yangi maqola yaratish
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Sarlavha
              </label>
              <input
                type="text"
                name="title"
                placeholder="Yangilik mavzusi..."
                className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Matn
              </label>
              <textarea
                name="content"
                placeholder="Batafsil ma'lumot..."
                rows="5"
                className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={formData.content}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Rasm yuklash
              </label>
              <div className="border-2 border-dashed border-gray-300 p-6 rounded-xl text-center hover:bg-blue-50 hover:border-blue-400 transition cursor-pointer relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <ImageIcon size={32} className="mb-2" />
                  <span className="text-sm font-medium">
                    {formData.image
                      ? formData.image.name
                      : "Rasmni tanlash uchun bosing"}
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    JPG, PNG (Max 5MB)
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={btnLoading}
              className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {btnLoading ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                <Save className="mr-2" size={20} />
              )}
              {btnLoading ? "Yuklanmoqda..." : "SAQLASH"}
            </button>
          </form>
        </div>
      )}

      {/* LIST TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Rasm
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Ma'lumot
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Sana
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Amal
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-20 text-center text-gray-500">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-500" />
                    Yuklanmoqda...
                  </td>
                </tr>
              ) : newsList.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-20 text-center text-gray-400">
                    Hozircha yangiliklar mavjud emas.
                  </td>
                </tr>
              ) : (
                newsList.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-blue-50/30 transition group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-14 w-14 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-gray-100 flex items-center justify-center">
                        {item.image ? (
                          <img
                            // BU YERDA UPLOADCARE URL ISHLATILYAPTI
                            src={getImageUrl(item.image, "150x150")}
                            alt="news"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <ImageIcon size={20} className="text-gray-400" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-gray-900 line-clamp-1">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {item.content}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition"
                        title="O'chirish"
                      >
                        <Trash2 size={18} />
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
