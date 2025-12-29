import { useEffect, useState } from "react"; // Reactning "miyasi" va "xotirasi"
import { Plus, Trash2, Eye, Image as ImageIcon } from "lucide-react"; // Chiroyli iconlar
import newsApi from "../../api/newsApi"; // Boyagi yozgan "elchi"miz

const AdminNews = () => {
  // --- STATE (XOTIRA) QISMI ---

  // 1. Yangiliklar ro'yxatini saqlash uchun
  // Boshida bo'sh massiv [] bo'ladi, serverdan kelgach to'ladi.
  const [newsList, setNewsList] = useState([]);

  // 2. Yuklanish holatini bilish uchun (Loading...)
  // Foydalanuvchi zerikib qolmasligi uchun "aylanayotgan g'ildirak" ko'rsatamiz.
  const [loading, setLoading] = useState(true);

  // 3. Yangilik qo'shish formasi ochiq yoki yopiqligini bilish uchun
  const [showForm, setShowForm] = useState(false);

  // 4. Formaga yozilayotgan ma'lumotlarni vaqtincha saqlash uchun
  const [formData, setFormData] = useState({
    title: "", // Sarlavha
    content: "", // Matn
    image: null, // Rasm fayli (boshida yo'q)
  });

  // --- MANTIQ (FUNKSIYALAR) QISMI ---

  // 1. Sahifa ochilishi bilan ishlash (useEffect)
  useEffect(() => {
    fetchNews(); // Sahifa ochildi -> darrov yangiliklarni olib kel!
  }, []);

  // Serverdan ma'lumot olish funksiyasi
  const fetchNews = async () => {
    try {
      setLoading(true); // Yuklashni boshladik
      const res = await newsApi.getAll(); // API ga so'rov ketdi
      // Backenddan kelgan javob tuzilishiga qarab (res.data.data bo'lishi mumkin)
      setNewsList(res.data || []);
    } catch (error) {
      console.error("Yangiliklarni olishda xato:", error);
      alert("Internet yoki Serverda xatolik bor!");
    } finally {
      setLoading(false); // Yuklash tugadi (xato bo'lsa ham, o'xshasa ham)
    }
  };

  // Inputlarga yozganda state'ni o'zgartirish
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Eski ma'lumotlarni (...formData) saqlab qolgan holda,
    // faqat o'zgargan poleni yangilaymiz.
    setFormData({ ...formData, [name]: value });
  };

  // Rasmni tanlaganda ishlash
  const handleFileChange = (e) => {
    // Fayl inputida 'files' massivi bo'ladi. Bizga birinchisi ([0]) kerak.
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // FORM YUBORILGANDA (SUBMIT)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Sahifa yangilanib ketishini to'xtatamiz (Refresh bo'lmasin)

    // FormData obyekti yaratamiz.
    // Nega oddiy JSON emas? Chunki Rasm (fayl) bor. JSON faylni tushunmaydi.
    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    if (formData.image) {
      data.append("image", formData.image); // Rasmni qo'shamiz
    }

    try {
      await newsApi.create(data); // Backendga yuboramiz
      alert("Yangilik muvaffaqiyatli qo'shildi! ✅");
      setShowForm(false); // Formani yopamiz
      setFormData({ title: "", content: "", image: null }); // Inputlarni tozalaymiz
      fetchNews(); // Ro'yxatni yangilaymiz (yangi qo'shilgan ko'rinishi uchun)
    } catch (error) {
      console.error(error);
      alert("Xatolik! Balki barcha maydonlarni to'ldirmagandirsiz?");
    }
  };

  // O'CHIRISH FUNKSIYASI
  const handleDelete = async (id) => {
    // Birdan o'chirib yubormasdan, so'raymiz
    if (window.confirm("Rostdan ham o'chirmoqchimisiz?")) {
      try {
        await newsApi.delete(id); // Backenddan o'chdi
        // Frontenddagi ro'yxatdan ham olib tashlaymiz (Serverga qayta so'rov yubormaslik uchun)
        setNewsList(newsList.filter((item) => item._id !== id));
      } catch (error) {
        alert("O'chirishda xatolik bo'ldi!");
      }
    }
  };

  // --- KO'RINISH (JSX) QISMI ---
  return (
    <div>
      {/* Tepa qism: Sarlavha va Tugma */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Yangiliklar Boshqaruvi
        </h1>
        <button
          onClick={() => setShowForm(!showForm)} // Bosganda forma ochiladi/yopiladi
          className="bg-tatu-blue text-white px-4 py-2 rounded flex items-center hover:bg-blue-800 transition"
        >
          <Plus size={18} className="mr-2" />
          Yangi qo'shish
        </button>
      </div>

      {/* QO'SHISH FORMASI (Faqat showForm=true bo'lsa ko'rinadi) */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
          <h2 className="text-lg font-bold mb-4">Yangi maqola yaratish</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              {/* Sarlavha Input */}
              <input
                type="text"
                name="title"
                placeholder="Yangilik sarlavhasi (masalan: Yangi bino ochildi)"
                className="border p-2 rounded w-full focus:ring-2 focus:ring-tatu-blue outline-none"
                value={formData.title}
                onChange={handleInputChange}
                required
              />

              {/* Matn Input (Textarea) */}
              <textarea
                name="content"
                placeholder="Batafsil ma'lumot..."
                rows="4"
                className="border p-2 rounded w-full focus:ring-2 focus:ring-tatu-blue outline-none"
                value={formData.content}
                onChange={handleInputChange}
                required
              ></textarea>

              {/* Rasm Input */}
              <div className="border border-dashed border-gray-400 p-4 rounded text-center cursor-pointer hover:bg-gray-50">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*" // Faqat rasmlarni qabul qiladi
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Faqat JPG, PNG formatlar
                </p>
              </div>

              {/* Saqlash tugmasi */}
              <button
                type="submit"
                className="bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700"
              >
                SAQLASH
              </button>
            </div>
          </form>
        </div>
      )}

      {/* JADVAL QISMI (List) */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rasm
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sarlavha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sana
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amallar
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              // Agar yuklanayotgan bo'lsa
              <tr>
                <td colSpan="4" className="text-center py-10">
                  Yuklanmoqda...
                </td>
              </tr>
            ) : newsList.length === 0 ? (
              // Agar yangilik bo'lmasa
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-500">
                  Hozircha yangiliklar yo'q
                </td>
              </tr>
            ) : (
              // Agar ma'lumot bor bo'lsa, map qilib aylanamiz
              newsList.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.image ? (
                      // Agar rasm bo'lsa (backend statik papkasidan)
                      <img
                        src={`http://localhost:4000${item.image}`}
                        alt="news"
                        className="h-10 w-10 rounded object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                        <ImageIcon size={16} className="text-gray-500" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {item.title}
                    </div>
                    <div className="text-sm text-gray-500 truncate w-64">
                      {item.content}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-900 ml-4"
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
  );
};

export default AdminNews;
