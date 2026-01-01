import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import {
  FileText,
  Trash2,
  Search,
  Loader2,
  FilePlus,
  X,
  UploadCloud,
  FileCheck,
} from "lucide-react";
import { toast } from "react-hot-toast";

const AdminDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Form holati
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("nizom");
  const [selectedFile, setSelectedFile] = useState(null);

  // Ma'lumotlarni yuklash
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/doc");
      // Backend sendResponse orqali data: { data: [] } qaytarayotgan bo'lsa
      setDocuments(res.data || []);
    } catch (err) {
      toast.error("Hujjatlarni yuklashda xatolik!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return toast.error("Iltimos, fayl tanlang!");

    const data = new FormData();
    data.append("title", title);
    data.append("category", category);
    data.append("file", selectedFile);

    setSubmitLoading(true);
    try {
      await axiosClient.post("/doc", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Hujjat yuklandi!");
      setShowModal(false);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setSubmitLoading(false);
    }
  };

  // Hujjatni o'chirish
  const handleDelete = async (id) => {
    if (window.confirm("Hujjatni o'chirishga aminmisiz?")) {
      try {
        await axiosClient.delete(`/doc/${id}`);
        toast.success("Hujjat o'chirildi");
        fetchData();
      } catch (err) {
        toast.error("O'chirishda xatolik yuz berdi");
      }
    }
  };

  const resetForm = () => {
    setTitle("");
    setCategory("nizom");
    setSelectedFile(null);
  };

  // Filtrlash (Qidiruv)
  const filteredDocs = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Sarlavha qismi */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Hujjatlar boshqaruvi
          </h1>
          <p className="text-gray-500">Tizimdagi barcha fayllarni boshqarish</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl transition-all shadow-lg shadow-emerald-200 active:scale-95 font-semibold"
        >
          <FilePlus size={20} /> Yangi hujjat qo'shish
        </button>
      </div>

      {/* Qidiruv */}
      <div className="bg-white p-4 rounded-2xl shadow-sm mb-6 flex items-center gap-3 border border-gray-100">
        <Search className="text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Hujjat sarlavhasi bo'yicha qidirish..."
          className="flex-1 outline-none text-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Jadval */}
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Hujjat nomi
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Kategoriya
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Sana
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td
                    colSpan="4"
                    className="py-20 text-center text-emerald-600"
                  >
                    <Loader2 className="animate-spin mx-auto" size={40} />
                  </td>
                </tr>
              ) : filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-20 text-center text-gray-400">
                    Hujjatlar topilmadi
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => (
                  <tr
                    key={doc._id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-50 text-red-500 rounded-xl">
                          <FileText size={20} />
                        </div>
                        <span className="font-semibold text-gray-700">
                          {doc.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold uppercase">
                        {doc.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(doc._id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
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

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md p-8 relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
            >
              <X />
            </button>
            <h2 className="text-2xl font-bold mb-8 text-gray-800">
              Hujjat yuklash
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Sarlavha
                </label>
                <input
                  type="text"
                  placeholder="Hujjat nomini kiriting"
                  className="w-full mt-2 p-4 bg-gray-50 border border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl outline-none transition-all"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Kategoriya
                </label>
                <select
                  className="w-full mt-2 p-4 bg-gray-50 border border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl outline-none transition-all"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="nizom">Nizomlar</option>
                  <option value="qaror">Qarorlar</option>
                  <option value="buyruq">Buyruqlar</option>
                  <option value="metodik">Metodik qo'llanmalar</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Fayl tanlash
                </label>
                <div className="relative mt-2 border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-emerald-500 transition-all cursor-pointer bg-gray-50/50">
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                  <div className="flex flex-col items-center gap-2">
                    {selectedFile ? (
                      <>
                        <FileCheck className="text-emerald-500" size={32} />
                        <span className="text-sm text-emerald-600 font-bold">
                          {selectedFile.name}
                        </span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="text-gray-400" size={32} />
                        <span className="text-sm text-gray-500">
                          Bosing yoki faylni buraqa tashlang
                        </span>
                        <span className="text-[10px] text-gray-400 uppercase">
                          PDF, JPG, PNG (Max 10MB)
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-200 transition-all"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-100 disabled:opacity-50 transition-all"
                >
                  {submitLoading ? (
                    <Loader2 className="animate-spin mx-auto" size={24} />
                  ) : (
                    "Saqlash"
                  )}
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
