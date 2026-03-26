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
  ShieldCheck,
  RefreshCw,
  Landmark,
  FileText,
  Clock,
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
    { key: "dir_software", label: t("dir_software", "Dasturiy injiniring") },
    {
      key: "dir_computer_eng",
      label: t("dir_computer_eng", "Kompyuter injiniringi"),
    },
    { key: "dir_security", label: t("dir_security", "Axborot xavfsizligi") },
    { key: "dir_logistics", label: t("dir_logistics", "Logistika") },
    { key: "dir_accounting", label: t("dir_accounting", "Buxgalteriya") },
    { key: "dir_economy", label: t("dir_economy", "Iqtisodiyot") },
    { key: "dir_banking", label: t("dir_banking", "Bank ishi") },
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

  const handleResetApplication = () => {
    localStorage.removeItem("texnikum_applied");
    setSuccess(false);
    setAlreadyApplied(false);
    setFormData({ fullname: "", phone: "+998 ", direction: "" });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.fullname.trim().length < 5) {
      setError(
        t("apply_error_name", "Iltimos, to'liq ism-sharifingizni kiriting"),
      );
      return;
    }
    setLoading(true);
    setError("");

    try {
      const payload = { ...formData, phone: formData.phone.replace(/\s/g, "") };
      await axiosClient.post("/applicant", payload);

      localStorage.setItem("texnikum_applied", "true");
      setSuccess(true);
      toast.success(
        t("apply_success_toast", "Arizangiz muvaffaqiyatli yuborildi"),
      );
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          t(
            "apply_error_server",
            "Serverda xatolik yuz berdi. Iltimos qayta urinib ko'ring.",
          ),
      );
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS OR ALREADY APPLIED STATE
  if (success || alreadyApplied) {
    return (
      <div className="min-h-screen bg-[#0a1930] flex items-center justify-center p-4 md:p-6 relative overflow-hidden font-sans">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-white p-8 md:p-14 rounded-3xl shadow-2xl text-center max-w-lg w-full relative z-10 border border-slate-100"
        >
          <div
            className={`w-20 h-20 md:w-24 md:h-24 ${
              success
                ? "bg-emerald-50 text-emerald-600"
                : "bg-blue-50 text-blue-600"
            } rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner border border-slate-100`}
          >
            {success ? (
              <CheckCircle
                className="w-10 h-10 md:w-12 md:h-12"
                strokeWidth={2}
              />
            ) : (
              <ShieldCheck
                className="w-10 h-10 md:w-12 md:h-12"
                strokeWidth={2}
              />
            )}
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0a1930] mb-4 uppercase tracking-wide leading-tight">
            {success
              ? t("apply_success_title", "ARIZANGIZ QABUL QILINDI")
              : t("apply_already_title", "ARIZA YUBORILGAN")}
          </h2>
          <div className="w-12 h-1 bg-amber-400 mx-auto rounded-full mb-6" />

          <p className="text-slate-500 mb-10 font-medium text-sm md:text-base leading-relaxed px-4">
            {success
              ? t(
                  "apply_success_desc",
                  "Ma'lumotlaringiz bazaga tushdi. Qabul komissiyasi tez orada siz bilan bog'lanadi.",
                )
              : t(
                  "apply_already_desc",
                  "Siz allaqachon ariza yuborgansiz. Natijalar bo'yicha mutaxassislarimiz aloqaga chiqishadi.",
                )}
          </p>

          <div className="flex flex-col gap-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-3 bg-[#0a1930] text-white px-8 py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-emerald-600 transition-colors shadow-md active:scale-95"
            >
              <ArrowLeft size={16} /> {t("nav_home", "Bosh sahifaga qaytish")}
            </Link>

            <button
              onClick={handleResetApplication}
              className="inline-flex items-center justify-center gap-3 bg-white text-slate-500 border border-slate-200 px-8 py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-slate-50 hover:text-blue-600 transition-colors active:scale-95"
            >
              <RefreshCw size={14} />
              {t("apply_new_application", "Yangi ariza yuborish")}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- ASOSIY FORM SAHIFASI ---
  return (
    <div className="min-h-screen bg-[#f8fafc] relative overflow-hidden font-sans">
      {/* Rasmiy fon */}
      <div className="absolute top-0 left-0 w-full h-[40vh] bg-[#0a1930] z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-[#0a1930] to-[#0a1930]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 pt-24 pb-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Sarlavha */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest mb-6 backdrop-blur-sm shadow-sm">
              <Landmark size={14} className="text-amber-400" />
              {t("apply_badge", "QABUL KOMISSIYASI")}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight leading-tight">
              {t("apply_title", "ONLAYN ARIZA TOPSHIRISH")}
            </h1>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-slate-200">
            {/* CHAP TOMON: Ma'lumot qismi (Informativ va salobatli) */}
            <div className="w-full lg:w-5/12 bg-slate-50 p-8 md:p-12 border-r border-slate-100 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600" />

              <h3 className="text-xl font-extrabold text-[#0a1930] uppercase tracking-wide mb-6">
                {t("apply_info_title", "Abituriyentlar uchun eslatma")}
              </h3>

              <div className="space-y-6 flex-grow">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 text-blue-700 rounded-lg shrink-0 mt-1">
                    <FileText size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 mb-1">
                      {t("apply_info_1_title", "Ma'lumotlar aniqligi")}
                    </p>
                    <p className="text-xs font-medium text-slate-500 leading-relaxed">
                      {t(
                        "apply_info_1_desc",
                        "Ism-sharifingiz va telefon raqamingizni pasportingizdagi kabi aniq kiriting.",
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 text-blue-700 rounded-lg shrink-0 mt-1">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 mb-1">
                      {t("apply_info_2_title", "Bog'lanish vaqti")}
                    </p>
                    <p className="text-xs font-medium text-slate-500 leading-relaxed">
                      {t(
                        "apply_info_2_desc",
                        "Arizangiz qabul qilingandan so'ng, mutaxassislarimiz ish vaqtida (09:00 - 17:00) aloqaga chiqishadi.",
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 text-blue-700 rounded-lg shrink-0 mt-1">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 mb-1">
                      {t("apply_info_3_title", "Xavfsizlik kafolati")}
                    </p>
                    <p className="text-xs font-medium text-slate-500 leading-relaxed">
                      {t(
                        "apply_info_3_desc",
                        "Shaxsiy ma'lumotlaringiz uchinchi shaxslarga berilmaydi va faqat qabul uchun ishlatiladi.",
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-200">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Aloqa markazi:
                </p>
                <p className="text-lg font-extrabold text-[#0a1930]">
                  +998 66 123 45 67
                </p>
              </div>
            </div>

            {/* O'NG TOMON: Ariza Formasi */}
            <div className="w-full lg:w-7/12 p-8 md:p-12 bg-white flex flex-col justify-center">
              <div className="mb-8">
                <h2 className="text-2xl font-extrabold text-[#0a1930] mb-2">
                  {t("apply_form_title", "Ma'lumotlarni to'ldiring")}
                </h2>
                <p className="text-sm font-medium text-slate-500">
                  {t(
                    "apply_form_subtitle",
                    "Barcha maydonlarni to'ldirish majburiy",
                  )}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-rose-50 text-rose-600 p-4 rounded-xl text-xs font-bold border border-rose-200 flex items-center gap-3 overflow-hidden"
                    >
                      <AlertTriangle size={18} className="shrink-0" /> {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-5">
                  {/* Fullname */}
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-2 ml-1">
                      {t("apply_fullname_label", "F.I.SH (To'liq ismingiz)")}{" "}
                      <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <User size={18} />
                      </div>
                      <input
                        required
                        type="text"
                        placeholder={t(
                          "apply_fullname_placeholder",
                          "Masalan: Aliyev Vali",
                        )}
                        className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-[#0a1930] outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:font-medium placeholder:text-slate-400"
                        value={formData.fullname}
                        onChange={(e) =>
                          setFormData({ ...formData, fullname: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-2 ml-1">
                      {t("apply_phone_label", "Telefon raqamingiz")}{" "}
                      <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <Phone size={18} />
                      </div>
                      <input
                        required
                        type="tel"
                        className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm font-extrabold text-[#0a1930] outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all tracking-wide"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                      />
                    </div>
                  </div>

                  {/* Direction */}
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-2 ml-1">
                      {t("apply_direction_label", "Ta'lim yo'nalishi")}{" "}
                      <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <BookOpen size={18} />
                      </div>
                      <select
                        required
                        className="w-full pl-11 pr-10 py-3.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-[#0a1930] outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer"
                        value={formData.direction}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            direction: e.target.value,
                          })
                        }
                      >
                        <option
                          value=""
                          disabled
                          className="text-slate-400 font-medium"
                        >
                          {t(
                            "apply_direction_placeholder",
                            "Yo'nalishni tanlang",
                          )}
                        </option>
                        {directions.map((dir) => (
                          <option
                            key={dir.key}
                            value={dir.label}
                            className="font-bold"
                          >
                            {dir.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    disabled={loading}
                    className="w-full bg-[#0a1930] hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-70 shadow-lg hover:shadow-blue-700/30 uppercase tracking-widest text-xs"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <Send size={18} />
                    )}
                    {loading
                      ? t("apply_btn_sending", "YUBORILMOQDA...")
                      : t("apply_btn_submit", "ARIZANI YUBORISH")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Apply;
