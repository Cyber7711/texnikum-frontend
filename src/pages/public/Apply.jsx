import { useState, useEffect } from "react";
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
  Sparkles,
  ShieldCheck,
  RefreshCw, // Yangilash ikonkasini qo'shamiz
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";

const Apply = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "+998 ",
    direction: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const applied = localStorage.getItem("texnikum_applied");
    if (applied) setAlreadyApplied(true);
    window.scrollTo(0, 0);
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

  // --- YANGI QO'SHILGAN FUNKSIYA: Qaytadan ariza topshirish ---
  const handleResetApplication = () => {
    // LocalStorage ni tozalaymiz
    localStorage.removeItem("texnikum_applied");
    // State larni boshlang'ich holatga qaytaramiz
    setSuccess(false);
    setAlreadyApplied(false);
    setFormData({
      fullname: "",
      phone: "+998 ",
      direction: "",
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.fullname.trim().length < 5) {
      setError(t("apply_error_name"));
      return;
    }
    setLoading(true);
    setError(""); // Oldingi xatoliklarni tozalash

    try {
      const payload = { ...formData, phone: formData.phone.replace(/\s/g, "") };
      await axiosClient.post("/applicant", payload);

      // Muvaffaqiyatli bo'lsa localStorage ga yozamiz
      localStorage.setItem("texnikum_applied", "true");
      setSuccess(true);
      toast.success(t("apply_success_title"));
    } catch (err) {
      // Agar server xato qaytarsa (masalan: bu raqam allaqachon bor)
      console.error(err);
      setError(err.response?.data?.message || t("apply_error_server"));
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS OR ALREADY APPLIED STATE
  if (success || alreadyApplied) {
    return (
      <div className="min-h-screen bg-[#0a1128] flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 md:p-16 rounded-[3.5rem] shadow-2xl text-center max-w-xl w-full relative z-10"
        >
          <div
            className={`w-24 h-24 ${
              success ? "bg-emerald-50" : "bg-amber-50"
            } rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner`}
          >
            {success ? (
              <CheckCircle className="w-12 h-12 text-emerald-500" />
            ) : (
              <ShieldCheck className="w-12 h-12 text-amber-500" />
            )}
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#0a1128] mb-6 uppercase italic tracking-tighter leading-tight">
            {success
              ? t("apply_success_title")
              : t("apply_already_title") || "Arizangiz Qabul Qilingan"}
          </h2>
          <p className="text-slate-500 mb-10 font-medium text-lg leading-relaxed italic">
            {success
              ? t("apply_success_desc")
              : t("apply_already_desc") ||
                "Mutaxassislarimiz tez orada siz bilan bog'lanishadi."}
          </p>

          <div className="flex flex-col gap-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-3 bg-[#0a1128] text-white px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-emerald-600 transition-all shadow-2xl active:scale-95"
            >
              <ArrowLeft size={18} /> {t("nav_home")}
            </Link>

            {/* --- YANGI TUGMA: Qayta ariza yuborish --- */}
            <button
              onClick={handleResetApplication}
              className="inline-flex items-center justify-center gap-3 bg-white text-slate-500 border-2 border-slate-100 px-12 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-50 hover:text-slate-700 transition-all active:scale-95"
            >
              <RefreshCw size={14} />
              {t("apply_new_application") || "Yangi ariza yuborish"}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1128] relative overflow-hidden py-20 px-6 flex items-center justify-center font-sans">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-sky-600/10 rounded-full blur-[120px]"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/[0.03] backdrop-blur-2xl p-1 md:p-1 rounded-[4rem] shadow-2xl max-w-2xl w-full relative z-10 border border-white/10"
      >
        <div className="bg-white rounded-[3.5rem] p-8 md:p-14 shadow-inner">
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-500/10 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6"
            >
              <Sparkles size={14} />{" "}
              {t("apply_badge") || "Kelajak Sari Bir Qadam"}
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black text-[#0a1128] uppercase tracking-tighter italic leading-none mb-4">
              {t("apply_title")}
            </h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest italic">
              {t("apply_subtitle")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-rose-50 text-rose-600 p-5 rounded-2xl text-[11px] font-black border border-rose-100 flex items-center gap-3 overflow-hidden"
                >
                  <AlertTriangle size={18} /> {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 gap-8">
              {/* Fullname */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  <User size={14} className="text-emerald-500" />{" "}
                  {t("apply_fullname_label")}
                </label>
                <input
                  required
                  placeholder={t("apply_fullname_placeholder")}
                  className="w-full p-5 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none transition-all font-bold text-slate-700 placeholder:text-slate-300"
                  value={formData.fullname}
                  onChange={(e) =>
                    setFormData({ ...formData, fullname: e.target.value })
                  }
                />
              </div>

              {/* Phone */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  <Phone size={14} className="text-emerald-500" />{" "}
                  {t("apply_phone_label")}
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-5 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none transition-all font-black text-slate-700 font-mono tracking-wider"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                />
              </div>

              {/* Direction */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  <BookOpen size={14} className="text-emerald-500" />{" "}
                  {t("apply_direction_label")}
                </label>
                <select
                  required
                  className="w-full p-5 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none transition-all font-black text-slate-700 appearance-none cursor-pointer"
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
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-6 rounded-[2rem] flex items-center justify-center gap-4 transition-all active:scale-95 disabled:opacity-70 shadow-2xl shadow-emerald-900/40 uppercase tracking-widest text-xs italic"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Send size={20} />
              )}
              {loading ? t("apply_btn_sending") : t("apply_btn_submit")}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Apply;
