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
  AlertCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";

const AdminDocuments = () => {
  // 1. Boshlang'ich holat har doim bo'sh massiv bo'lishi shart
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("nizom");
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/doc");

      // 2. Xavfsiz ma'lumot olish: res.data.data yoki res.data ni tekshirish
      const incomingData = res.data?.data || res.data?.result || res.data;

      if (Array.isArray(incomingData)) {
        setDocuments(incomingData);
      } else {
        setDocuments([]); // Agar massiv kelmasa, xato bermasligi uchun
      }
    } catch (err) {
      console.error("Hujjat yuklashda xato:", err);
      toast.error("Ma'lumotlarni yuklab bo'lmadi");
      setDocuments([]);
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
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Hujjat muvaffaqiyatli yuklandi!");
      setShowModal(false);
      resetForm();
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Yuklashda xatolik");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Ushbu hujjatni o'chirishni tasdiqlaysizmi?")) {
      try {
        await axiosClient.delete(`/doc/${id}`);
        toast.success("Hujjat o'chirildi");
        // Optimistic update: UI-dan darhol o'chirish (massiv ekanligini tekshirib)
        setDocuments((prev) =>
          Array.isArray(prev) ? prev.filter((d) => d._id !== id) : []
        );
      } catch (err) {
        toast.error("O'chirishda xatolik");
      }
    }
  };

  const resetForm = () => {
    setTitle("");
    setCategory("nizom");
    setSelectedFile(null);
  };

  // 3. Filtrlashdan oldin har doim documents massiv ekanligini tekshirish
  const filteredDocs = Array.isArray(documents)
    ? documents.filter((doc) =>
        doc.title?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
            Hujjatlar <span className="text-emerald-500">Boshqaruvi</span>
          </h1>
          <p className="text-slate-500 font-medium">
            Texnikumning me'yoriy va o'quv fayllari
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-[1.5rem] transition-all shadow-xl shadow-emerald-200 font-black uppercase text-xs tracking-widest active:scale-95"
        >
          <FilePlus size={18} /> Yangi qo'shish
        </button>
      </div>

      {/* Search Input */}
      <div className="bg-white p-2 rounded-[1.5rem] shadow-sm mb-6 flex items-center gap-3 border border-slate-100 focus-within:border-emerald-500 transition-all">
        <div className="p-3 bg-slate-50 rounded-xl text-slate-400">
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Hujjat nomini yozing..."
          className="flex-1 outline-none text-slate-700 font-bold bg-transparent px-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Desktop Table & Mobile Cards */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="py-32 text-center">
            <Loader2
              className="animate-spin mx-auto text-emerald-500"
              size={48}
            />
            <p className="mt-4 text-slate-400 font-black uppercase tracking-widest text-xs">
              Yuklanmoqda...
            </p>
          </div>
        ) : filteredDocs.length === 0 ? (
          <div className="py-32 text-center">
            <AlertCircle className="mx-auto text-slate-200 mb-4" size={64} />
            <p className="text-slate-400 font-bold uppercase tracking-widest">
              Hujjatlar topilmadi
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/50 border-b border-slate-100 text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">
                  <tr>
                    <th className="p-6">Hujjat nomi</th>
                    <th className="p-6">Kategoriya</th>
                    <th className="p-6">Sana</th>
                    <th className="p-6 text-right">Amal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredDocs.map((doc) => (
                    <tr
                      key={doc._id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center font-black">
                            PDF
                          </div>
                          <span className="font-bold text-slate-700 text-lg leading-tight">
                            {doc.title}
                          </span>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-tighter italic border border-emerald-100">
                          {doc.category}
                        </span>
                      </td>
                      <td className="p-6 text-xs font-bold text-slate-400 font-mono">
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-6 text-right">
                        <button
                          onClick={() => handleDelete(doc._id)}
                          className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile List */}
            <div className="md:hidden divide-y divide-slate-50">
              {filteredDocs.map((doc) => (
                <div
                  key={doc._id}
                  className="p-6 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center font-black text-[10px]">
                      DOC
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm leading-tight line-clamp-1">
                        {doc.title}
                      </h4>
                      <p className="text-[10px] font-black text-emerald-600 uppercase mt-1 italic">
                        {doc.category}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(doc._id)}
                    className="p-2 text-rose-300 hover:text-rose-500"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* MODAL - Zamonaviy Agro Style */}
      {showModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
          <div className="bg-white rounded-[3rem] w-full max-w-md p-8 relative shadow-2xl animate-in zoom-in duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16" />

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-8 right-8 text-slate-300 hover:text-slate-600 transition-colors"
            >
              <X />
            </button>

            <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase italic tracking-tighter">
              Hujjat <span className="text-emerald-500">Yuklash</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Sarlavha
                </label>
                <input
                  type="text"
                  placeholder="Fayl nomini kiriting"
                  className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-700"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Kategoriya
                </label>
                <select
                  className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-700 appearance-none cursor-pointer"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="nizom">Nizomlar</option>
                  <option value="qaror">Qarorlar</option>
                  <option value="buyruq">Buyruqlar</option>
                  <option value="metodik">Metodik qo'llanmalar</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Faylni tanlang
                </label>
                <div className="relative border-2 border-dashed border-slate-200 rounded-[2rem] p-10 text-center hover:border-emerald-500 hover:bg-emerald-50/30 transition-all cursor-pointer bg-slate-50 group">
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    accept=".pdf,.doc,.docx"
                  />
                  <div className="flex flex-col items-center gap-3">
                    {selectedFile ? (
                      <>
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                          <FileCheck size={32} />
                        </div>
                        <span className="text-xs text-emerald-600 font-black uppercase truncate max-w-[200px]">
                          {selectedFile.name}
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 bg-slate-100 text-slate-300 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <UploadCloud size={32} />
                        </div>
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                          Bosing yoki faylni tanlang
                        </span>
                        <span className="text-[9px] text-slate-300 uppercase font-black">
                          PDF, DOC (Max 10MB)
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitLoading}
                className="w-full py-5 bg-emerald-600 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs italic shadow-xl shadow-emerald-900/10 active:scale-95 disabled:opacity-50 transition-all"
              >
                {submitLoading ? (
                  <Loader2 className="animate-spin mx-auto" />
                ) : (
                  "Faylni Saqlash"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDocuments;
