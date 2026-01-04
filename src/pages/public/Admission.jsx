import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  GraduationCap,
  ArrowRight,
  Phone,
  Download,
  Clock,
  ShieldCheck,
  Globe,
  Award,
  BookOpen,
  X,
  Target,
  Wrench,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const Admission = () => {
  const { t } = useTranslation();
  const [selectedDir, setSelectedDir] = useState(null); // Batafsil ma'lumot uchun modal state

  const ADMISSION_CONFIG = {
    year: "2025-2026",
    startDate: "20.06.2026",
    endDate: "25.08.2026",
    phone: "+998 ## ### ## ##",
    applyLink: "https://my.uzbmb.uz",
    regulationFile: "/assets/docs/qabul_nizomi.pdf",
  };

  const DIRECTIONS = [
    {
      id: "software",
      title: t("dir_software"),
      code: "5330200",
      quota: 60,
      duration: "2 yil",
      lang: t("lang_uz_ru"),
      type: t("edu_type_grant"),
      learn: t("dir_software_learn"),
      work: t("dir_software_work"),
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
      {/* HERO BANNER */}
      <section className="relative pt-32 pb-40 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
          >
            <ShieldCheck size={14} /> {t("admission_season")}{" "}
            {ADMISSION_CONFIG.year}
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-tight uppercase italic">
            {t("hero_title_1")} <br />{" "}
            <span className="text-emerald-500 not-italic">
              {t("hero_title_2")}
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto mb-12 font-medium">
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

      {/* DIRECTIONS SECTION */}
      <section id="directions" className="container mx-auto px-6 py-32">
        <div className="flex flex-col items-center text-center mb-20 text-white">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
            {t("available_directions_1")}{" "}
            <span className="text-emerald-500">
              {t("available_directions_2")}
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {DIRECTIONS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#1e293b] p-8 rounded-[2.5rem] border border-slate-800 shadow-xl flex flex-col h-full text-white"
            >
              <div className="w-16 h-16 bg-slate-800 rounded-3xl flex items-center justify-center mb-6 text-emerald-500 shadow-inner">
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
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8 text-white">
            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">
              {t("required_docs_1")}{" "}
              <span className="text-emerald-500">{t("required_docs_2")}</span>
            </h2>
            <div className="grid gap-4">
              {DOCUMENT_KEYS.map((key) => (
                <div
                  key={key}
                  className="flex items-center gap-6 p-6 bg-[#1e293b] rounded-3xl border border-slate-800 group hover:border-emerald-500 transition-all"
                >
                  <div className="bg-emerald-500/20 text-emerald-400 p-3 rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    <CheckCircle2 size={24} />
                  </div>
                  <span className="font-bold text-sm tracking-wide uppercase">
                    {t(key)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-600 p-12 rounded-[4rem] text-white flex flex-col gap-8 justify-center items-center text-center shadow-2xl shadow-emerald-900/40">
            <BookOpen size={80} />
            <h3 className="text-3xl font-black uppercase italic">
              {t("ready_to_apply")}
            </h3>

            <a
              href="/apply"
              target="_blank"
              rel="noreferrer"
              className="bg-white text-emerald-600 px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-slate-100 transition-all"
            >
              {t("apply_now")}
            </a>
          </div>
        </div>
      </section>

      {/* DETAILED MODAL */}
      <AnimatePresence>
        {selectedDir && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-white w-full max-w-4xl rounded-[3rem] p-8 md:p-16 relative"
            >
              <button
                onClick={() => setSelectedDir(null)}
                className="absolute top-8 right-8 p-3 bg-slate-100 rounded-full hover:bg-rose-50 hover:text-rose-500 transition-all"
              >
                <X size={24} />
              </button>
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-6 border-b pb-8">
                  <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center text-white shadow-xl">
                    <GraduationCap size={40} />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase italic leading-none">
                      {selectedDir.title}
                    </h2>
                    <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs mt-2 block">
                      KOD: {selectedDir.code}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                      <Wrench size={14} /> {t("modal_learn_title")}
                    </h4>
                    <p className="text-slate-600 font-medium leading-relaxed italic">
                      {selectedDir.learn}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-500 flex items-center gap-2">
                      <Target size={14} /> {t("modal_work_title")}
                    </h4>
                    <p className="text-slate-600 font-medium leading-relaxed italic">
                      {selectedDir.work}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-8">
                  {selectedDir.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-slate-50 text-slate-400 text-[10px] font-black uppercase rounded-xl border border-slate-100"
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

// Yordamchi komponentlar
const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-[#1e293b] p-8 rounded-[2.5rem] border border-slate-800 flex items-center gap-6 text-white group hover:scale-105 transition-all">
    <div
      className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center ${
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
