import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import {
  Link2,
  Plus,
  Trash2,
  Globe,
  ExternalLink,
  Hash,
  Loader2,
} from "lucide-react";
import { toast } from "react-hot-toast";

const AdminQuickLinks = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    icon: "Link",
    isExternal: false,
    order: 0,
  });

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/quicklinks");

      // Konsolda ma'lumot qanday kelyotganini ko'ring
      console.log("Backend response:", res.data);

      // Agar backend { success: true, data: [...] } qaytarsa:
      if (res.data && Array.isArray(res.data.data)) {
        setLinks(res.data.data);
      }
      // Agar backend to'g'ridan-to'g'ri [...] qaytarsa:
      else if (Array.isArray(res.data)) {
        setLinks(res.data);
      }
      // Agar kutilmagan format bo'lsa, bo'sh massiv beramiz
      else {
        setLinks([]);
        console.error("Backenddan kutilmagan ma'lumot keldi:", res.data);
      }
    } catch (err) {
      console.error("Xatolik tafsiloti:", err);
      toast.error("Ma'lumotlarni yuklashda xato!");
      setLinks([]); // Xato bo'lsa ham undefined bo'lib qolmasin
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post("/quicklinks", formData);
      toast.success("Yangi havola qo'shildi!");
      setShowModal(false);
      fetchLinks();
    } catch (err) {
      toast.error("Saqlashda xatolik!");
    }
  };

  const deleteLink = async (id) => {
    if (window.confirm("Ushbu havolani o'chirmoqchimisiz?")) {
      try {
        await axiosClient.delete(`/quicklinks/${id}`);
        toast.success("O'chirildi");
        fetchLinks();
      } catch (err) {
        toast.error("O'chirishda xatolik!");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Tezkor havolalar boshqaruvi
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <Plus size={20} /> Yangi havola
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                Tartib
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                Sarlavha / Havola
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                Turi
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
              links.map((link) => (
                <tr key={link._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-mono text-gray-400">
                    #{link.order}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-800">{link.title}</div>
                    <div className="text-xs text-gray-400 truncate max-w-xs">
                      {link.url}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {link.isExternal ? (
                      <span className="flex items-center gap-1 text-orange-600 bg-orange-50 px-2 py-0.5 rounded text-[10px] font-bold uppercase w-fit">
                        <ExternalLink size={10} /> Tashqi
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-[10px] font-bold uppercase w-fit">
                        <Globe size={10} /> Ichki
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => deleteLink(link._id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition"
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

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h2 className="text-xl font-bold mb-6">Yangi havola qo'shish</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                placeholder="Sarlavha (masalan: HEMIS)"
                className="w-full border p-2 rounded-lg outline-none focus:border-blue-500"
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
              <input
                placeholder="URL (masalan: https://...)"
                className="w-full border p-2 rounded-lg outline-none focus:border-blue-500"
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                required
              />
              <div className="flex gap-4">
                <input
                  type="number"
                  placeholder="Tartib"
                  className="w-1/2 border p-2 rounded-lg outline-none"
                  onChange={(e) =>
                    setFormData({ ...formData, order: e.target.value })
                  }
                />
                <label className="w-1/2 flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      setFormData({ ...formData, isExternal: e.target.checked })
                    }
                  />
                  Tashqi havola
                </label>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-100 py-2 rounded-lg"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminQuickLinks;
