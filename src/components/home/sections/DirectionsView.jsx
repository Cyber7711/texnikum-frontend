import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  HelpCircle,
  GraduationCap,
  FileText,
  Monitor,
  CreditCard,
  Briefcase,
  ChevronDown,
  Download,
  Sparkles,
  Info,
  ArrowRight,
  FileTextIcon,
  CircleDot,
  Clock,
  Wrench,
  CheckCircle2,
  Cpu,
  Globe,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../components/layout/PageWrapper";

const InfoPortal = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "faq";

  const studentTabs = ["lms", "finance", "career"];
  const isStudentGroup = studentTabs.includes(activeTab);

  const tabs = [
    {
      id: "faq",
      label: t("info_faq_tab") || "F.A.Q",
      icon: <HelpCircle size={18} />,
    },
    {
      id: "directions",
      label: t("info_directions_tab") || "Yo'nalishlar",
      icon: <GraduationCap size={18} />,
    },
    {
      id: "docs",
      label: t("info_docs_tab") || "Hujjatlar",
      icon: <FileText size={18} />,
    },
    {
      id: "lms",
      label: t("info_lms_tab") || "LMS",
      icon: <Monitor size={18} />,
    },
    {
      id: "finance",
      label: t("info_finance_tab") || "Moliya",
      icon: <CreditCard size={18} />,
    },
    {
      id: "career",
      label: t("info_career_tab") || "Karyera",
      icon: <Briefcase size={18} />,
    },
  ];

  const theme = isStudentGroup
    ? {
        text: "text-indigo-600",
        bg: "bg-indigo-600",
        border: "border-indigo-100",
        lightBg: "bg-indigo-50/50",
      }
    : {
        text: "text-emerald-600",
        bg: "bg-emerald-600",
        border: "border-emerald-100",
        lightBg: "bg-emerald-50/50",
      };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#fafbfc] py-24">
        <div className="container mx-auto px-6">
          {/* --- HEADER SECTION --- */}
          <div className="text-center mb-16">
            <motion.div
              key={isStudentGroup ? "student" : "applicant"}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center"
            >
              <span
                className={`flex items-center gap-2 ${theme.text} text-[10px] font-black uppercase tracking-[0.4em] mb-6 bg-white px-6 py-2 rounded-full shadow-sm border border-slate-100`}
              >
                {isStudentGroup ? <Info size={14} /> : <Sparkles size={14} />}
                {isStudentGroup
                  ? t("info_students_sub") || "TALABALAR UCHUN"
                  : t("info_applicants_sub") || "ABITURIYENTLAR UCHUN"}
              </span>
              <h1 className="text-4xl md:text-7xl font-black text-slate-900 uppercase italic tracking-tighter leading-tight text-center">
                {isStudentGroup
                  ? t("info_students_title") || "TALABA"
                  : t("info_applicants_title") || "ABITURIYENT"}{" "}
                <br />
                <span className={theme.text}>
                  {t("center") || "MA'LUMOT PORTALI"}
                </span>
              </h1>
            </motion.div>
          </div>

          {/* --- TAB NAVIGATION --- */}
          <div className="flex flex-wrap justify-center gap-3 mb-20">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSearchParams({ tab: tab.id })}
                className={`flex items-center gap-3 px-8 py-5 rounded-[2rem] font-black uppercase text-[10px] tracking-widest transition-all duration-500 shadow-sm italic ${
                  activeTab === tab.id
                    ? `${theme.bg} text-white shadow-xl shadow-emerald-900/10 scale-105`
                    : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* --- MAIN CONTENT AREA --- */}
          <div
            className={`max-w-5xl mx-auto bg-white rounded-[3.5rem] p-8 md:p-16 shadow-2xl shadow-slate-200/50 border-t-8 ${theme.bg.replace(
              "bg-",
              "border-"
            )} relative overflow-hidden`}
          >
            {/* Dekorativ Fon */}
            <div
              className={`absolute top-0 right-0 w-96 h-96 ${theme.lightBg} rounded-full -mr-48 -mt-48 blur-[100px] opacity-60`}
            ></div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="relative z-10"
              >
                {activeTab === "faq" && <FAQContent t={t} theme={theme} />}
                {activeTab === "directions" && (
                  <DirectionsContent t={t} theme={theme} />
                )}
                {activeTab === "docs" && <DocsContent t={t} theme={theme} />}
                {studentTabs.includes(activeTab) && (
                  <PlaceholderContent
                    title={tabs.find((t) => t.id === activeTab).label}
                    icon={tabs.find((t) => t.id === activeTab).icon}
                    theme={theme}
                    t={t}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

/* ==========================================================================
   CONTENT COMPONENTS
   ========================================================================== */

// --- 1. FAQ CONTENT ---
const FAQContent = ({ t, theme }) => {
  const [open, setOpen] = useState(null);
  const data = [
    {
      q: "Politexnikumda o'qish pullikmi?",
      a: "Yo'q, politexnikum davlat muassasasi bo'lib, ta'lim barcha yo'nalishlarda mutlaqo bepul amalga oshiriladi.",
    },
    {
      q: t("faq_q1") || "Texnikumga qabul qachon boshlanadi?",
      a:
        t("faq_a1") ||
        "Hujjatlar qabuli har yili iyun oyidan avgust oyigacha davom etadi.",
    },
    {
      q: t("faq_q2") || "Yotoqxona mavjudmi?",
      a:
        t("faq_a2") ||
        "Ha, uzoq viloyatlardan kelgan talabalar uchun zamonaviy yotoqxona xizmati mavjud.",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="mb-12">
        <h2 className="text-3xl font-black text-slate-800 uppercase italic tracking-tighter mb-3">
          Ko'p beriladigan savollar
        </h2>
        <div className={`w-20 h-2 ${theme.bg} rounded-full`}></div>
      </div>
      <div className="grid gap-5">
        {data.map((item, i) => (
          <div
            key={i}
            className={`rounded-[2rem] border transition-all duration-300 ${
              open === i
                ? `${theme.border} bg-slate-50/50 shadow-inner`
                : "border-slate-100 hover:border-slate-200"
            }`}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex justify-between items-center font-black text-slate-700 text-left p-8 italic"
            >
              <span className="max-w-[85%] text-lg">{item.q}</span>
              <div
                className={`p-3 rounded-2xl transition-all ${
                  open === i
                    ? `${theme.bg} text-white shadow-lg`
                    : "bg-white text-slate-300 border border-slate-100"
                }`}
              >
                <ChevronDown
                  className={`transition-transform duration-500 ${
                    open === i ? "rotate-180" : ""
                  }`}
                  size={20}
                />
              </div>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="px-8 pb-8 text-slate-500 text-sm leading-relaxed font-medium italic">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 2. DIRECTIONS CONTENT (Kengaytirilgan va Professional) ---
const DirectionsContent = ({ t, theme }) => {
  const directions = [
    {
      id: "software",
      title: t("dir_software") || "Dasturiy injiniring",
      duration: "2 yil",
      icon: <Cpu size={32} />,
      learn:
        "Kompyuter savodxonligi, dasturlash asoslari, veb-saytlar yaratish va IT-texnologiyalar bilan ishlash.",
      gives:
        "Zamonaviy IT kompaniyalarda ishlash yoki shaxsiy frilans loyihalarni boshlash imkoniyati.",
      skills: ["Veb-dasturlash", "Kompyuter ta'mirlash", "Ofis dasturlari"],
    },
    {
      id: "accounting",
      title: t("dir_accounting") || "Buxgalteriya hisobi",
      duration: "1.5 yil",
      icon: <Briefcase size={32} />,
      learn:
        "Moliya-hisob ishlari, soliq qoidalari, hisobotlarni yuritish va korxona iqtisodiyotini tahlil qilish.",
      gives:
        "Xohlagan davlat yoki xususiy korxonada hisobchi, kadrlar bo'limi xodimi bo'lib ishlash huquqi.",
      skills: ["Hisob-kitob", "Hujjatlar bilan ishlash", "Soliq bilimlari"],
    },
    {
      id: "logistics",
      title: t("dir_logistics") || "Agro-logistika",
      duration: "1.5 yil",
      icon: <Globe size={32} />,
      learn:
        "Mahsulotlarni yetkazib berish, saqlash, omborxona ishlari va eksport-import asoslari.",
      gives:
        "Logistika markazlari, yirik ishlab chiqarish korxonalari va omborxonalarda tayyor mutaxassis bo'lib ishlash.",
      skills: ["Tashishni tashkil etish", "Ombor nazorati", "Bozor tahlili"],
    },
  ];

  return (
    <div className="space-y-16">
      <div className="mb-12">
        <h2 className="text-3xl font-black text-slate-800 uppercase italic tracking-tighter mb-4">
          O'quv Yo'nalishlari
        </h2>
        <p className="text-slate-500 font-medium italic border-l-4 border-emerald-500 pl-5 leading-relaxed">
          Politexnikumda ta'lim olish mutlaqo bepul. Quyidagi yo'nalishlar
          bo'yicha hujjat topshirib, tayyor kasb egasi bo'lishingiz mumkin.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {directions.map((dir, index) => (
          <motion.div
            key={dir.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative flex flex-col md:flex-row gap-10 items-start p-2"
          >
            {/* Icon Block */}
            <div
              className={`w-24 h-24 shrink-0 rounded-[2.5rem] ${theme.bg} text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500`}
            >
              {dir.icon}
            </div>

            {/* Info Block */}
            <div className="flex-1 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-50 pb-4">
                <h3 className="text-2xl font-black text-slate-800 uppercase italic tracking-tight">
                  {dir.title}
                </h3>
                <div className="flex items-center gap-2 bg-slate-100 px-5 py-2 rounded-full w-fit">
                  <Clock size={14} className={theme.text} />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    {dir.duration} O'QUV MUDDATI
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <h4
                    className={`text-[11px] font-black uppercase tracking-widest ${theme.text} flex items-center gap-2`}
                  >
                    <Wrench size={14} /> Nima o'rganasiz?
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed italic font-medium">
                    {dir.whatYouLearn || dir.learn}
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-indigo-600 flex items-center gap-2">
                    <CheckCircle2 size={14} /> Kelajakda nima beradi?
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed italic font-medium">
                    {dir.whatItGives || dir.gives}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4">
                {dir.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-1.5 bg-slate-50 text-slate-400 text-[9px] font-black uppercase rounded-xl border border-slate-100 italic"
                  >
                    #{skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- 3. DOCS CONTENT ---
const DocsContent = ({ t, theme }) => {
  const documents = [
    { id: 1, name: "Texnikum Ustavi (Nizom)", size: "1.2 MB", type: "PDF" },
    {
      id: 2,
      name: "Qabul qilish tartibi va qoidalari",
      size: "850 KB",
      type: "PDF",
    },
    { id: 3, name: "Odob-axloq kodeksi", size: "450 KB", type: "DOCX" },
  ];
  return (
    <div className="space-y-12">
      <div className="mb-12">
        <h2 className="text-3xl font-black text-slate-800 uppercase italic tracking-tighter mb-3">
          Rasmiy Hujjatlar
        </h2>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">
          Yuklab olish uchun ochiq ma'lumotlar
        </p>
      </div>
      <div className="grid gap-6">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="group flex flex-col md:flex-row items-center justify-between p-8 bg-white rounded-[2.5rem] border border-slate-100 hover:border-emerald-200 hover:shadow-2xl transition-all duration-500"
          >
            <div className="flex items-center gap-8 mb-6 md:mb-0">
              <div
                className={`p-5 rounded-2xl bg-slate-50 group-hover:${theme.lightBg} transition-colors`}
              >
                <FileTextIcon className={theme.text} size={36} />
              </div>
              <div>
                <h4 className="font-black text-slate-800 italic uppercase text-xl tracking-tighter leading-none mb-2">
                  {doc.name}
                </h4>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-lg ${theme.lightBg} ${theme.text} text-[10px] font-black uppercase tracking-widest`}
                  >
                    {doc.type}
                  </span>
                  <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">
                    {doc.size}
                  </span>
                </div>
              </div>
            </div>
            <button
              className={`w-full md:w-auto flex items-center justify-center gap-3 px-10 py-5 ${theme.bg} text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all hover:scale-105 active:scale-95 italic shadow-lg shadow-emerald-900/10`}
            >
              <Download size={18} /> Yuklab olish
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 4. PLACEHOLDER (COMING SOON) CONTENT ---
const PlaceholderContent = ({ title, icon, theme, t }) => (
  <div className="text-center py-24 flex flex-col items-center">
    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className={`p-12 rounded-[3rem] ${theme.lightBg} ${theme.text} mb-10 shadow-inner`}
    >
      {icon && typeof icon === "object"
        ? { ...icon, props: { ...icon.props, size: 80 } }
        : icon}
    </motion.div>
    <h2 className="text-4xl font-black text-slate-800 uppercase italic tracking-tighter mb-4">
      {title}
    </h2>
    <div className={`w-20 h-2 ${theme.bg} rounded-full mb-8`}></div>
    <p className="text-slate-400 font-black uppercase text-[11px] tracking-[0.5em] italic">
      {t("coming_soon_desc") || "Ushbu bo'lim tez orada ishga tushiriladi"}
    </p>
  </div>
);

export default InfoPortal;
