import { useState, useEffect } from "react"; // useEffect qo'shildi
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  GraduationCap,
  Phone,
  Clock,
  ShieldCheck,
  X,
  Target,
  Wrench,
  BookOpen,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "../../components/common/SEO"; // SEO qo'shildi

const Admission = () => {
  const { t } = useTranslation();
  const [selectedDir, setSelectedDir] = useState(null);

  // Modal ochilganda scrollni bloklash
  useEffect(() => {
    if (selectedDir) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedDir]);

  const ADMISSION_CONFIG = {
    year: "2025-2026",
    startDate: "20.06.2026",
    endDate: "25.08.2026",
    phone: "+998 ## ### ## ##",
    applyLink: "https://my.uzbmb.uz",
  };

  const DIRECTIONS = [
    {
      id: "software",
      title: t("dir_software") || "Dasturiy injiniring",
      code: "5330200",
      quota: 60,
      duration: "2 yil",
      lang: t("lang_uz_ru") || "O'zb / Rus",
      type: t("edu_type_grant") || "Grant / Shartnoma",
      learn:
        t("dir_software_learn") ||
        "Zamonaviy dasturlash tillari va tizimlarini o'rganasiz.",
      work:
        t("dir_software_work") ||
        "IT kompaniyalarda dasturchi va ma'lumotlar tahlilchisi bo'lib ishlaysiz.",
      skills: ["Frontend", "Python", "IT-Support"],
    },

    {
      id: "accounting",
      title: t("dir_accounting"),
      code: "5230900",
      quota: 30,
      duration: "1.5 yil",
      lang: t("lang_uz"),
      type: t("edu_type_grant"),
      learn: t("dir_accounting_learn"),
      work: t("dir_accounting_work"),
      skills: ["1C", "Audit", "Soliq"],
    },
    {
      id: "logistics",
      title: t("dir_logistics"),
      code: "5410500",
      quota: 45,
      duration: "1.5 yil",
      lang: t("lang_uz"),
      type: t("edu_type_grant"),
      learn: t("dir_logistics_learn"),
      work: t("dir_logistics_work"),
      skills: ["Logistika", "Eksport", "Ombor"],
    },
    {
      id: "mechanization",
      title: t("dir_mechanization"),
      code: "5410100",
      quota: 50,
      duration: "2 yil",
      lang: t("lang_uz"),
      type: t("edu_type_grant"),
      learn: t("dir_mechanization_learn"),
      work: t("dir_mechanization_work"),
      skills: ["Texnika", "Avtomatika", "Servis"],
    },
  ];

  const DOCUMENT_KEYS = [
    "doc_passport",
    "doc_diploma",
    "doc_photo",
    "doc_medical",
    "doc_application",
  ];

  return (
    <div className="bg-[#0f172a] min-h-screen pb-20 font-sans overflow-x-hidden">
      <SEO
        title="Qabul 2026"
        description="3-sonli texnikum qabul jarayonlari va yo'nalishlari."
      />

      {/* HERO BANNER */}
      <section className="relative pt-32 pb-40 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
          >
            <ShieldCheck size={14} /> {t("admission_season")}{" "}
            {ADMISSION_CONFIG.year}
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-tight uppercase italic">
            {t("hero_title_1") || "KELAJAKNI"} <br />{" "}
            <span className="text-emerald-500 not-italic">
              {t("hero_title_2") || "BIZ BILAN QURING"}
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto mb-12 font-medium italic">
            {t("hero_subtitle")}
          </p>
        </div>
      </section>

      {/* STAT CARDS */}
      <div className="container mx-auto px-6 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={<Calendar />}
            label={t("start_date")}
            value={ADMISSION_CONFIG.startDate}
            color="emerald"
          />
          <StatCard
            icon={<Clock />}
            label={t("end_date")}
            value={ADMISSION_CONFIG.endDate}
            color="rose"
          />
          <StatCard
            icon={<Phone />}
            label={t("contact_center")}
            value={ADMISSION_CONFIG.phone}
            color="blue"
          />
        </div>
      </div>

      {/* DIRECTIONS */}
      <section id="directions" className="container mx-auto px-6 py-32">
        <div className="text-center mb-20 text-white">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
            {t("available_directions_1")}{" "}
            <span className="text-emerald-500">
              {t("available_directions_2")}
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {DIRECTIONS.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-[#1e293b] p-8 rounded-[2.5rem] border border-slate-800 shadow-xl flex flex-col h-full text-white hover:border-emerald-500/50 transition-all"
            >
              <div className="w-16 h-16 bg-slate-800 rounded-3xl flex items-center justify-center mb-6 text-emerald-500 border border-white/5">
                <GraduationCap size={32} />
              </div>
              <h3 className="text-xl font-black mb-4 italic uppercase">
                {item.title}
              </h3>
              <div className="space-y-3 pt-6 border-t border-slate-700 mt-auto mb-6">
                <DataRow label={t("quota")} value={`${item.quota} ta`} />
                <DataRow label={t("language")} value={item.lang} />
                <DataRow label={t("type")} value={item.type} highlight />
              </div>
              <button
                onClick={() => setSelectedDir(item)}
                className="w-full py-4 bg-white/5 hover:bg-emerald-500 hover:text-white border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
              >
                {t("read_more")}
              </button>
            </motion.div>
          ))}
        </div>
      </section>
      {/* DOCUMENTS SECTION */}
      <section className="container mx-auto px-6 py-20 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* CHAP TOMON: Hujjatlar ro'yxati */}
          <div className="space-y-8 text-white">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter"
            >
              {t("required_docs_1")}{" "}
              <span className="text-emerald-500">{t("required_docs_2")}</span>
            </motion.h2>

            {/* Har bir hujjat ketma-ket chiqishi uchun konteyner */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1, // Hujjatlar orasidagi kechikish
                  },
                },
              }}
              className="grid gap-4"
            >
              {DOCUMENT_KEYS.map((key) => (
                <motion.div
                  key={key}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                  whileHover={{
                    x: 10,
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                  }}
                  className="flex items-center gap-6 p-6 bg-[#1e293b] rounded-3xl border border-slate-800 group transition-all"
                >
                  <div className="bg-emerald-500/20 text-emerald-400 p-3 rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-lg shadow-emerald-500/10">
                    <CheckCircle2 size={24} />
                  </div>
                  <span className="font-bold text-sm tracking-wide uppercase italic">
                    {t(key)}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* O'NG TOMON: "Apply Now" Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-emerald-600 p-12 rounded-[4rem] text-white flex flex-col gap-8 justify-center items-center text-center shadow-2xl shadow-emerald-900/40 relative overflow-hidden group"
          >
            {/* Dekorativ nur effekti */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-[80px] group-hover:scale-110 transition-transform duration-700"></div>

            <BookOpen size={80} className="relative z-10" />
            <h3 className="text-3xl font-black uppercase italic relative z-10">
              {t("ready_to_apply") || "ONLINE QABULGA TAYYORMISIZ?"}
            </h3>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/apply"
              className="relative z-10 bg-white text-emerald-600 px-12 py-5 rounded-full font-black uppercase tracking-widest hover:shadow-xl transition-all"
            >
              {t("apply_now") || "HOZIROQ TOPSHIRISH"}
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* DETAILED MODAL (To'g'irlangan qism) */}
      <AnimatePresence>
        {selectedDir && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDir(null)}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6 bg-[#0a1128]/95 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1e293b] w-full max-w-4xl rounded-[2.5rem] p-8 md:p-16 relative border border-white/10 text-white shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedDir(null)}
                className="absolute top-6 right-6 p-3 bg-white/5 rounded-full hover:bg-rose-500/20 hover:text-rose-500 transition-all text-slate-400"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col gap-10">
                <div className="flex items-center gap-6 border-b border-white/10 pb-10">
                  <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                    <GraduationCap size={40} />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-5xl font-black uppercase italic leading-none mb-3">
                      {selectedDir.title}
                    </h2>
                    <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-black uppercase tracking-widest text-[10px]">
                      KOD: {selectedDir.code}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                      <Wrench size={14} />{" "}
                      {t("modal_learn_title") || "NIMALARNI O'RGANASIZ?"}
                    </h4>
                    <p className="text-slate-300 font-medium leading-relaxed italic text-lg">
                      {selectedDir.learn}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-500 flex items-center gap-2">
                      <Target size={14} />{" "}
                      {t("modal_work_title") || "QAYERDA ISHLAYSIZ?"}
                    </h4>
                    <p className="text-slate-300 font-medium leading-relaxed italic text-lg">
                      {selectedDir.work}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-10 border-t border-white/10">
                  {selectedDir.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-5 py-2.5 bg-white/5 text-slate-400 text-[10px] font-black uppercase rounded-2xl border border-white/5 italic"
                    >
                      #{skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Yordamchi komponentlar (o'zgarishsiz)
const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-[#1e293b] p-8 rounded-[2.5rem] border border-slate-800 flex items-center gap-6 text-white group hover:scale-105 transition-all">
    <div
      className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white ${
        color === "emerald"
          ? "bg-emerald-500"
          : color === "rose"
            ? "bg-rose-500"
            : "bg-blue-500 shadow-blue-500/20 shadow-lg"
      }`}
    >
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
        {label}
      </p>
      <h4 className="text-2xl font-black tracking-tighter">{value}</h4>
    </div>
  </div>
);

const DataRow = ({ label, value, highlight }) => (
  <div className="flex justify-between items-center text-xs">
    <span className="text-slate-400 font-bold uppercase tracking-widest">
      {label}
    </span>
    <span
      className={`font-black ${highlight ? "text-emerald-500" : "text-white"}`}
    >
      {value}
    </span>
  </div>
);

export default Admission;
