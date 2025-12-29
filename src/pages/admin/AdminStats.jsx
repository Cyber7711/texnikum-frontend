import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import { Save, Loader2, BarChart3 } from "lucide-react";

const AdminStats = () => {
  const [formData, setFormData] = useState({
    students: "",
    teachers: "",
    graduates: "",
    year: "2025",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchCurrentStats = async () => {
      try {
        const res = await axiosClient.get("/statistics");
        
        const stats = res.data.data || res.data;

        if (stats) {
          setFormData({
            students: stats.students || "",
            teachers: stats.teachers || "",
            graduates: stats.graduates || "",
            year: stats.year || "2025",
          });
        }
      } catch (err) {
        console.error("Statistika yuklashda xato:", err);
      } finally {
        setFetching(false);
      }
    };
    fetchCurrentStats();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosClient.post("/statistics", formData);
      alert("Statistika muvaffaqiyatli yangilandi! ✅");
    } catch (err) {
      console.error(err);
      alert("Xatolik yuz berdi! Backend ishlayotganini tekshiring.");
    } finally {
      setLoading(false);
    }
  };

 
  if (fetching)
    return (
      <div className="p-10 text-center">
        <Loader2 className="animate-spin mx-auto" />
      </div>
    );

  return (
    
    <div className="max-w-4xl mx-auto">
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-blue-600 p-6 text-white flex items-center space-x-3">
          <BarChart3 size={24} />
          <h2 className="text-xl font-bold">
            Asosiy ko'rsatkichlarni tahrirlash
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Talabalar soni
              </label>
              <input
                type="number"
                required
                value={formData.students}
                onChange={(e) =>
                  setFormData({ ...formData, students: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                O'qituvchilar soni
              </label>
              <input
                type="number"
                required
                value={formData.teachers}
                onChange={(e) =>
                  setFormData({ ...formData, teachers: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Bitiruvchilar soni
              </label>
              <input
                type="number"
                required
                value={formData.graduates}
                onChange={(e) =>
                  setFormData({ ...formData, graduates: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                O'quv yili
              </label>
              <input
                type="text"
                required
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="pt-4 border-t flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Save size={20} />
              )}
              <span>SAQLASH</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminStats;
