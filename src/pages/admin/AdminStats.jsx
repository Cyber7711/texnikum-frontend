import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import {
  Save,
  Loader2,
  BarChart3,
  AlertCircle,
  CheckCircle2,
  History,
} from "lucide-react";

const AdminStats = () => {
  const [formData, setFormData] = useState({
    students: "",
    teachers: "",
    graduates: "",
    year: new Date().getFullYear().toString(),
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" }); // Xabarlar uchun

  // Ma'lumotlarni yuklash
  useEffect(() => {
    const fetchCurrentStats = async () => {
      try {
        const res = await axiosClient.get("/statistics");
        // Backenddan kelgan strukturaga moslash (res.data.data yoki res.data)
        const stats = res.data?.data || res.data;

        if (stats && !Array.isArray(stats)) {
          setFormData({
            students: stats.students || "",
            teachers: stats.teachers || "",
            graduates: stats.graduates || "",
            year: stats.year || new Date().getFullYear().toString(),
          });
        }
      } catch (err) {
        console.error("Statistika yuklashda xato:", err);
        showStatus("error", "Ma'lumotlarni yuklashda xatolik yuz berdi.");
      } finally {
        setFetching(false);
      }
    };
    fetchCurrentStats();
  }, []);

  // Status xabarlarini ko'rsatish funksiyasi
  const showStatus = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validatsiya
    if (Object.values(formData).some((val) => val === "")) {
      return showStatus("error", "Barcha maydonlarni to'ldiring!");
    }

    setLoading(true);
    try {
      const res = await axiosClient.post("/statistics", formData);
      const updatedData = res.data?.data || res.data;

      setFormData((prev) => ({ ...prev, ...updatedData }));
      showStatus("success", "Statistika muvaffaqiyatli yangilandi! ✅");
    } catch (err) {
      console.error("Update error:", err);
      showStatus(
        "error",
        err.response?.data?.message || "Server bilan aloqa uzildi.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="text-slate-500 font-bold animate-pulse">
          MA'LUMOTLAR YUKLANMOQDA...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Sahifa sarlavhasi */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
            Tizim Statistikasi
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Asosiy ko'rsatkichlarni real vaqtda yangilang
          </p>
        </div>
        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
          <BarChart3 size={28} />
        </div>
      </div>

      {/* Xabarlar paneli (Toast o'rniga) */}
      {message.text && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${
            message.type === "success"
              ? "bg-emerald-50 border-emerald-100 text-emerald-700"
              : "bg-rose-50 border-rose-100 text-rose-700"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <span className="text-sm font-bold">{message.text}</span>
        </div>
      )}

      <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 lg:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Inputlar bloki */}
            <StatInput
              label="Talabalar umumiy soni"
              value={formData.students}
              onChange={(v) => setFormData({ ...formData, students: v })}
              icon={<UsersIcon />}
            />

            <StatInput
              label="Malakali o'qituvchilar"
              value={formData.teachers}
              onChange={(v) => setFormData({ ...formData, teachers: v })}
              icon={<TeacherIcon />}
            />

            <StatInput
              label="Muvaffaqiyatli bitiruvchilar"
              value={formData.graduates}
              onChange={(v) => setFormData({ ...formData, graduates: v })}
              icon={<GraduationIcon />}
            />

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">
                <History size={14} /> O'quv yili
              </label>
              <input
                type="text"
                placeholder="Masalan: 2024-2025"
                required
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent outline-none focus:border-blue-500 focus:bg-white transition-all font-bold text-slate-700 shadow-inner"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-8 border-t border-slate-100">
            <p className="text-xs text-slate-400 font-medium max-w-[250px]">
              * Ma'lumotlarni saqlashdan oldin raqamlar to'g'riligini qayta
              tekshiring.
            </p>
            <button
              type="submit"
              disabled={loading}
              className={`
                relative flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-sm tracking-widest transition-all
                ${
                  loading
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-[#0f172a] text-white hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-500/40 active:scale-95"
                }
              `}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Save size={20} />
              )}
              <span>{loading ? "SAQLANMOQDA..." : "SAQLASH"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Yordamchi Kichik Komponent (Input uchun) ---
const StatInput = ({ label, value, onChange, icon }) => (
  <div className="space-y-3 group">
    <label className="flex items-center gap-2 text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1 group-focus-within:text-blue-600 transition-colors">
      {icon} {label}
    </label>
    <div className="relative">
      <input
        type="number"
        required
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent outline-none focus:border-blue-500 focus:bg-white transition-all font-black text-xl text-slate-800 shadow-inner"
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-xs uppercase tracking-tighter">
        Soni
      </div>
    </div>
  </div>
);

// Ikonkalar
const UsersIcon = () => <span className="text-blue-500">●</span>;
const TeacherIcon = () => <span className="text-emerald-500">●</span>;
const GraduationIcon = () => <span className="text-amber-500">●</span>;

export default AdminStats;
