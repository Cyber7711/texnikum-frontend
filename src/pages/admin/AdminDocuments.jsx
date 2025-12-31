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
} from "lucide-react";
import { toast } from "react-hot-toast";

const AdminDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Form holati
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("nizom");
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/doc");
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

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("file", selectedFile); // Fayl ob'ekti

    setSubmitLoading(true);
    try {
      // POST so'rovi (Multer backendda buni qabul qiladi)
      await axiosClient.post("/doc", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Hujjat muvaffaqiyatli yuklandi!");
      setShowModal(false);
      setTitle("");
      setSelectedFile(null);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header va Table qismi o'zgarishsiz qoladi... */}
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl"
      >
        <FilePlus size={20} /> Yangi hujjat
      </button>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-md p-8 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4"
            >
              <X />
            </button>
            <h2 className="text-xl font-bold mb-6">Yangi hujjat qo'shish</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Sarlavha"
                className="w-full p-4 bg-gray-50 rounded-2xl outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <select
                className="w-full p-4 bg-gray-50 rounded-2xl outline-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="nizom">Nizom</option>
                <option value="qaror">Qaror</option>
                <option value="buyruq">Buyruq</option>
              </select>

              <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-emerald-500 transition-colors">
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <div className="flex flex-col items-center gap-2">
                  <UploadCloud className="text-gray-400" size={32} />
                  <span className="text-sm text-gray-500 font-medium">
                    {selectedFile
                      ? selectedFile.name
                      : "Faylni tanlang yoki shu yerga tashlang"}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitLoading}
                className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold disabled:opacity-50"
              >
                {submitLoading ? "Yuklanmoqda..." : "Saqlash"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDocuments;
