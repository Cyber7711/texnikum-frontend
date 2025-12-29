import { useState } from "react";
import axiosClient from "../../api/axiosClient";
import {
  Send,
  CheckCircle,
  Loader2,
  User,
  Phone,
  BookOpen,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

const Apply = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "+998",
    direction: "Dasturiy injiniring",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const directions = [
    "Dasturiy injiniring",
    "Kompyuter injiniringi",
    "Axborot xavfsizligi",
    "Logistika",
    "Buxgalteriya",
    "Iqtisodiyot",
    "Bank ishi",
  ];

  const handlePhoneChange = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    if (!input.startsWith("998")) input = "998" + input;
    input = input.substring(0, 12);

    let formatted = "+";
    if (input.length > 0) formatted += input.substring(0, 3);
    if (input.length > 3) formatted += " " + input.substring(3, 5);
    if (input.length > 5) formatted += " " + input.substring(5, 8);
    if (input.length > 8) formatted += " " + input.substring(8, 10);
    if (input.length > 10) formatted += " " + input.substring(10, 12);

    setFormData({ ...formData, phone: formatted });
    if (error) setError("");
  };

  const validateForm = () => {
    if (formData.fullname.trim().length < 5) {
      setError("Iltimos, to'liq ism-sharifingizni kiriting");
      return false;
    }
    if (formData.phone.replace(/\s/g, "").length < 13) {
      setError("Telefon raqami to'liq kiritilmagan");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        ...formData,
        phone: formData.phone.replace(/\s/g, ""),
      };

      await axiosClient.post("/applicant", payload);
      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Xatolik yuz berdi. Internetni tekshiring."
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl text-center max-w-lg w-full animate-in zoom-in duration-300">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase">
            Muvaffaqiyatli!
          </h2>
          <p className="text-gray-600 mb-8 font-medium">
            Arizangiz qabul qilindi. Qabul komissiyasi operatorlari tez orada
            siz bilan bog'lanishadi.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            <ArrowLeft size={20} /> BOSH SAHIFA
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] relative overflow-hidden py-16 px-4 flex items-center justify-center">
      {/* Dizayn uchun dekorativ blur doiralar */}
      <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-blue-600/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-purple-600/20 rounded-full blur-[100px]"></div>

      <div className="bg-white/95 backdrop-blur-md p-8 md:p-12 rounded-[3rem] shadow-2xl max-w-xl w-full relative z-10 border border-white/20">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
            Onlayn Hujjat Topshirish
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Kelajagingizni biz bilan quring
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100 animate-shake">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-black text-gray-500 uppercase ml-1">
              <User size={14} /> To'liq Ism-sharifingiz
            </label>
            <input
              required
              placeholder="Masalan: Alisher Fayzullaev"
              className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
              value={formData.fullname}
              onChange={(e) =>
                setFormData({ ...formData, fullname: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-black text-gray-500 uppercase ml-1">
              <Phone size={14} /> Aloqa uchun telefon
            </label>
            <input
              type="text"
              required
              className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-mono font-bold"
              value={formData.phone}
              onChange={handlePhoneChange}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-black text-gray-500 uppercase ml-1">
              <BookOpen size={14} /> Tanlangan yo'nalish
            </label>
            <select
              className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:border-blue-500 outline-none transition-all font-medium appearance-none cursor-pointer"
              value={formData.direction}
              onChange={(e) =>
                setFormData({ ...formData, direction: e.target.value })
              }
            >
              {directions.map((dir) => (
                <option key={dir} value={dir}>
                  {dir}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-4">
            <button
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-[1.5rem] flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-70 shadow-xl shadow-blue-500/20"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Send size={20} />
              )}
              {loading ? "YUBORILMOQDA..." : "ARIZANI YUBORISH"}
            </button>
          </div>

          <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest mt-4">
            Hujjat topshirish orqali texnikum qoidalariga rozilik bildirasiz
          </p>
        </form>
      </div>
    </div>
  );
};

export default Apply;
