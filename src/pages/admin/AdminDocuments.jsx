import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import {
  FileText,
  Trash2,
  Edit,
  Search,
  Loader2,
  FilePlus,
  X,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { Widget } from "@uploadcare/react-widget"; // Uploadcare widgetini import qilamiz

const AdminDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "nizom",
    fileUrl: "", // Fayl UUID yoki URL manzili
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fileUrl) return toast.error("Fayl hali yuklanmadi!");

    setSubmitLoading(true);
    try {
      // Backend'ga FormData emas, oddiy JSON yuboramiz (chunki fayl allaqachon bulutda)
      await axiosClient.post("/doc", {
        title: formData.title,
        category: formData.category,
        file: formData.fileUrl, // Uploadcare'dan kelgan UUID
      });

      toast.success("Hujjat muvaffaqiyatli saqlandi");
      setShowModal(false);
      setFormData({ title: "", category: "nizom", fileUrl: "" });
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Saqlashda xatolik");
    } finally {
      setSubmitLoading(false);
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
      {/* Header qismi */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Hujjatlar boshqaruvi
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Nizomlar va me'yoriy hujjatlar
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-emerald-200 font-bold active:scale-95"
        >
          <FilePlus size={20} /> Yangi hujjat qo'shish
        </button>
      </div>

      {/* Qidiruv paneli */}
      <div className="bg-white p-4 rounded-2xl shadow-sm mb-6 flex items-center gap-3 border border-gray-100">
        <Search className="text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Hujjat nomini yozing..."
          className="flex-1 outline-none text-gray-700 font-medium"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Hujjatlar jadvali */}
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                Hujjat nomi
              </th>
              <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                Kategoriya
              </th>
              <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                Sana
              </th>
              <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">
                Amallar
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="4" className="py-20 text-center">
                  <Loader2
                    className="animate-spin mx-auto text-emerald-600"
                    size={32}
                  />
                </td>
              </tr>
            ) : filteredDocs.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="py-20 text-center text-gray-400 font-medium"
                >
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
                      <div className="p-3 bg-red-50 text-red-500 rounded-xl group-hover:scale-110 transition-transform">
                        <FileText size={20} />
                      </div>
                      <span className="font-bold text-gray-700">
                        {doc.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-wider">
                      {doc.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2.5 text-gray-400 hover:bg-white hover:text-emerald-600 hover:shadow-md rounded-xl transition-all">
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => deleteDoc(doc._id)}
                        className="p-2.5 text-gray-400 hover:bg-white hover:text-red-600 hover:shadow-md rounded-xl transition-all"
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

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl animate-in fade-in zoom-in duration-300 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-400" />
            </button>

            <h2 className="text-2xl font-black mb-8 text-gray-800 uppercase tracking-tight">
              Yangi hujjat
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
                  Hujjat sarlavhasi
                </label>
                <input
                  type="text"
                  required
                  placeholder="Hujjat nomini kiriting..."
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
                  Kategoriya
                </label>
                <select
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 outline-none focus:bg-white font-medium appearance-none"
                  value={formData.category}
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

              <div className="space-y-2">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
                  Fayl yuklash (PDF, DOCX)
                </label>
                <div className="upload-wrapper">
                  <Widget
                    publicKey="YOUR_PUBLIC_KEY" // <--- BU YERGA O'ZINGIZNI KEYINGIZNI QO'YING
                    id="file"
                    onFileSelect={async (file) => {
                      if (file) {
                        file.done((info) => {
                          setFormData({ ...formData, fileUrl: info.uuid });
                          toast.success("Fayl yuklandi!");
                        });
                      }
                    }}
                    tabs="file url"
                    clearable
                    locale="uz"
                  />
                </div>
                {formData.fileUrl && (
                  <p className="text-[10px] text-emerald-600 font-bold ml-1 flex items-center gap-1">
                    ✓ Fayl tayyor: {formData.fileUrl.substring(0, 15)}...
                  </p>
                )}
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-100 text-gray-500 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={submitLoading || !formData.fileUrl}
                  className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95 disabled:opacity-50"
                >
                  {submitLoading ? "Saqlanmoqda..." : "Saqlash"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CSS: Uploadcare tugmasini dizaynga moslashtirish */}
      <style jsx>{`
        .upload-wrapper :global(.uploadcare--widget__button_type_open) {
          background-color: #f9fafb;
          border: 1px solid #f3f4f6;
          color: #6b7280;
          padding: 12px;
          border-radius: 16px;
          width: 100%;
          font-weight: 600;
        }
        .upload-wrapper :global(.uploadcare--widget__button_type_open:hover) {
          background-color: #f3f4f6;
          color: #10b981;
        }
      `}</style>
    </div>
  );
};

export default AdminDocuments;
