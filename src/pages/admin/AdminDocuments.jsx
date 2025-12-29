import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import {
  FileText,
  Plus,
  Trash2,
  Edit,
  Download,
  Search,
  Loader2,
  FilePlus,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";

const AdminDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Yangi hujjat uchun state
  const [formData, setFormData] = useState({
    title: "",
    category: "nizom",
    file: null,
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/doc");
      setDocuments(res.data.data || res.data);
    } catch (err) {
      toast.error("Hujjatlarni yuklashda xatolik!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!formData.file) return toast.error("Faylni tanlang!");

    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("file", formData.file);

    try {
      await axiosClient.post("/doc", data);
      toast.success("Hujjat muvaffaqiyatli qo'shildi");
      setShowModal(false);
      setFormData({ title: "", category: "nizom", file: null });
      fetchData();
    } catch (err) {
      toast.error("Yuklashda xatolik yuz berdi");
    }
  };

  const deleteDoc = async (id) => {
    if (window.confirm("Hujjatni o'chirishni xohlaysizmi?")) {
      try {
        await axiosClient.delete(`/doc/${id}`);
        toast.success("O'chirildi");
        fetchData();
      } catch (err) {
        toast.error("O'chirishda xatolik");
      }
    }
  };

  const filteredDocs = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Hujjatlar boshqaruvi
          </h1>
          <p className="text-sm text-gray-500">
            Nizomlar, qarorlar va me'yoriy hujjatlarni tahrirlash
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-lg shadow-blue-200"
        >
          <FilePlus size={20} /> Yangi hujjat qo'shish
        </button>
      </div>

      {/* Qidiruv */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex items-center gap-3">
        <Search className="text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Hujjat nomini yozing..."
          className="flex-1 outline-none text-gray-700 bg-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Jadval */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                Hujjat nomi
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                Kategoriya
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                Sana
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">
                Amallar
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="4" className="py-10 text-center">
                  <Loader2 className="animate-spin mx-auto text-blue-600" />
                </td>
              </tr>
            ) : (
              filteredDocs.map((doc) => (
                <tr key={doc._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                        <FileText size={20} />
                      </div>
                      <span className="font-medium text-gray-700">
                        {doc.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase">
                      {doc.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        className="p-2 text-gray-400 hover:text-blue-600 transition"
                        title="Tahrirlash"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => deleteDoc(doc._id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition"
                        title="O'chirish"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL (Qo'shish formasi) */}
      {showModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in duration-300">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Plus className="text-blue-600" /> Yangi hujjat yuklash
            </h2>
            <form onSubmit={handleFileUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Hujjat sarlavhasi
                </label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-blue-500 transition"
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Kategoriya
                </label>
                <select
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none"
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="nizom">Nizomlar</option>
                  <option value="qaror">Qarorlar</option>
                  <option value="buyruq">Buyruqlar</option>
                  <option value="metodik">Metodik qo'llanmalar</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Faylni tanlang (PDF, DOCX)
                </label>
                <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-blue-400 transition cursor-pointer group">
                  <input
                    type="file"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, file: e.target.files[0] })
                    }
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <FilePlus
                    className="mx-auto text-gray-400 group-hover:text-blue-500 mb-2"
                    size={32}
                  />
                  <p className="text-xs text-gray-500">
                    {formData.file
                      ? formData.file.name
                      : "Faylni shu yerga tashlang yoki tanlang"}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg font-bold"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold shadow-lg shadow-blue-200"
                >
                  Yuklash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDocuments;
