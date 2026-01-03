import { useState, useEffect } from "react"; // useEffect qo'shildi
import axiosClient from "../../api/axiosClient";
import {
  Send,
  CheckCircle,
  Loader2,
  User,
  Phone,
  BookOpen,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Apply = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "+998 ",
    direction: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false); // Takroriy ariza holati
  const [error, setError] = useState("");

  // Sahifa yuklanganda foydalanuvchi avval ariza yuborganini tekshiramiz
  useEffect(() => {
    const applied = localStorage.getItem("texnikum_applied");
    if (applied) {
      setAlreadyApplied(true);
    }
  }, []);

  const directions = [
    { key: "dir_software", label: t("dir_software") },
    { key: "dir_computer_eng", label: t("dir_computer_eng") },
    { key: "dir_security", label: t("dir_security") },
    { key: "dir_logistics", label: t("dir_logistics") },
    { key: "dir_accounting", label: t("dir_accounting") },
    { key: "dir_economy", label: t("dir_economy") },
    { key: "dir_banking", label: t("dir_banking") },
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Oddiy validatsiya
    if (formData.fullname.trim().length < 5) {
      setError(t("apply_error_name"));
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        phone: formData.phone.replace(/\s/g, ""), // Bo'shliqlarni olib tashlaymiz
      };

      await axiosClient.post("/applicant", payload);

      // Muvaffaqiyatli yuborilgach, brauzer xotirasiga belgi qo'yamiz
      localStorage.setItem("texnikum_applied", "true");
      setSuccess(true);
    } catch (err) {
      // Agar backend 400 xato bersa (duplikatsiya bo'lsa)
      const errorMsg = err.response?.data?.message || t("apply_error_server");
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // 1. Agar foydalanuvchi allaqachon ariza yuborgan bo'lsa
  if (alreadyApplied && !success) {
    return (
      <div className="min-h-screen bg-[#0a1128] flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl text-center max-w-lg w-full">
          <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3">
            <AlertTriangle className="w-10 h-10 text-amber-500" />
          </div>
          <h2 className="text-2xl font-black text-[#0a1128] mb-4">
            {t("apply_already_title") || "Siz allaqachon ariza yuborgansiz!"}
          </h2>
          <p className="text-slate-500 mb-8 font-medium italic">
            {t("apply_already_desc") ||
              "Sizning arizangiz qabul qilingan. Operatorlarimiz tez orada siz bilan bog'lanishadi."}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/20"
          >
            <ArrowLeft size={18} /> {t("nav_home")}
          </Link>
        </div>
      </div>
    );
  }

  // 2. Muvaffaqiyatli yuborilgan holat
  if (success) {
    return (
      <div className="min-h-screen bg-[#0a1128] flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl text-center max-w-lg w-full animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-6 -rotate-6">
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-black text-[#0a1128] mb-4 tracking-tighter italic">
            {t("apply_success_title")}
          </h2>
          <p className="text-slate-500 mb-8 font-medium">
            {t("apply_success_desc")}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#0a1128] text-white px-10 py-4 rounded-2xl font-black hover:bg-slate-800 transition-all shadow-xl"
          >
            <ArrowLeft size={20} /> {t("nav_home")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1128] relative overflow-hidden py-16 px-4 flex items-center justify-center">
      {/* Dekorativ elementlar */}
      <div className="absolute top-[-5%] left-[-5%] w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>

      <div className="bg-white/95 backdrop-blur-xl p-8 md:p-12 rounded-[3.5rem] shadow-2xl max-w-xl w-full relative z-10 border border-white/20">
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            Qabul 2026
          </div>
          <h1 className="text-3xl font-black text-[#0a1128] uppercase tracking-tighter italic">
            {t("apply_title")}
          </h1>
          <p className="text-slate-400 mt-2 font-bold text-sm">
            {t("apply_subtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-rose-50 text-rose-600 p-4 rounded-2xl text-xs font-black border border-rose-100 flex items-center gap-3 animate-shake">
              <AlertTriangle size={18} /> {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              <User size={14} className="text-emerald-500" />{" "}
              {t("apply_fullname_label")}
            </label>
            <input
              required
              placeholder={t("apply_fullname_placeholder")}
              className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
              value={formData.fullname}
              onChange={(e) =>
                setFormData({ ...formData, fullname: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              <Phone size={14} className="text-emerald-500" />{" "}
              {t("apply_phone_label")}
            </label>
            <input
              type="text"
              required
              className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none transition-all font-mono font-black text-slate-700"
              value={formData.phone}
              onChange={handlePhoneChange}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              <BookOpen size={14} className="text-emerald-500" />{" "}
              {t("apply_direction_label")}
            </label>
            <div className="relative">
              <select
                required
                className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none transition-all font-bold text-slate-700 appearance-none cursor-pointer"
                value={formData.direction}
                onChange={(e) =>
                  setFormData({ ...formData, direction: e.target.value })
                }
              >
                <option value="" disabled>
                  {t("apply_direction_placeholder")}
                </option>
                {directions.map((dir) => (
                  <option key={dir.key} value={dir.label}>
                    {dir.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 rounded-3xl flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-70 shadow-xl shadow-emerald-900/20 uppercase tracking-widest text-sm italic"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
            {loading ? t("apply_btn_sending") : t("apply_btn_submit")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Apply;
