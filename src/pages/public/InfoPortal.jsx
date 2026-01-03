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
    { id: "faq", label: t("info_faq_tab"), icon: <HelpCircle size={18} /> },
    {
      id: "directions",
      label: t("info_directions_tab"),
      icon: <GraduationCap size={18} />,
    },
    { id: "docs", label: t("info_docs_tab"), icon: <FileText size={18} /> },
    { id: "lms", label: t("info_lms_tab"), icon: <Monitor size={18} /> },
    {
      id: "finance",
      label: t("info_finance_tab"),
      icon: <CreditCard size={18} />,
    },
    {
      id: "career",
      label: t("info_career_tab"),
      icon: <Briefcase size={18} />,
    },
  ];

  // Ranglar sxemasi - Abituriyent (Emerald) vs Talaba (Indigo)
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
      <div className="min-h-screen bg-[#fafbfc] py-20">
        <div className="container mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div
              key={isStudentGroup ? "student" : "applicant"}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center"
            >
              <span
                className={`flex items-center gap-2 ${theme.text} text-[10px] font-black uppercase tracking-[0.4em] mb-4 bg-white px-6 py-2 rounded-full shadow-sm border border-slate-100`}
              >
                {isStudentGroup ? <Info size={14} /> : <Sparkles size={14} />}
                {isStudentGroup
                  ? t("info_students_sub")
                  : t("info_applicants_sub")}
              </span>
              <h1 className="text-4xl md:text-7xl font-black text-slate-900 uppercase italic tracking-tighter leading-tight">
                {isStudentGroup
                  ? t("info_students_title")
                  : t("info_applicants_title")}{" "}
                <br />
                <span className={theme.text}>{t("center") || "PORTALI"}</span>
              </h1>
            </motion.div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSearchParams({ tab: tab.id })}
                className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] font-black uppercase text-[10px] tracking-widest transition-all duration-500 shadow-sm italic ${
                  activeTab === tab.id
                    ? `${theme.bg} text-white shadow-xl shadow-${
                        isStudentGroup ? "indigo" : "emerald"
                      }-900/20 scale-105`
                    : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div
            className={`max-w-5xl mx-auto bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-slate-200/50 border-t-8 ${
              isStudentGroup ? "border-indigo-600" : "border-emerald-600"
            } relative overflow-hidden`}
          >
            {/* Background Decoration */}
            <div
              className={`absolute top-0 right-0 w-64 h-64 ${theme.lightBg} rounded-full -mr-32 -mt-32 blur-3xl opacity-50`}
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

// --- CONTENT COMPONENTS ---

const FAQContent = ({ t, theme }) => {
  const [open, setOpen] = useState(null);
  const data = [
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
    {
      q: t("faq_q3") || "O'qish davomiyligi qancha?",
      a: t("faq_a3") || "Yo'nalishga qarab 1.5 yildan 2 yilgacha davom etadi.",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-slate-800 uppercase italic tracking-tighter mb-2">
          {t("info_faq_title")}
        </h2>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">
          Tez-tez beriladigan savollarga javoblar
        </p>
      </div>
      <div className="grid gap-4">
        {data.map((item, i) => (
          <div
            key={i}
            className={`rounded-3xl border transition-all duration-300 ${
              open === i
                ? `${theme.border} bg-slate-50/50 shadow-inner`
                : "border-slate-100 hover:border-slate-200"
            }`}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex justify-between items-center font-black text-slate-700 text-left p-6 md:p-8 italic"
            >
              <span className="max-w-[85%]">{item.q}</span>
              <div
                className={`p-2 rounded-xl transition-all ${
                  open === i
                    ? `${theme.bg} text-white`
                    : "bg-slate-100 text-slate-400"
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
                  <p className="px-8 pb-8 text-slate-500 text-sm leading-relaxed font-medium">
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

const DirectionsContent = ({ t, theme }) => (
  <div className="space-y-10">
    <div className="mb-10">
      <h2 className="text-3xl font-black text-slate-800 uppercase italic tracking-tighter mb-2">
        {t("info_directions_title")}
      </h2>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">
        O'quv yo'nalishlari va kvotalar
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        t("dir_software"),
        t("dir_accounting"),
        t("dir_logistics"),
        t("dir_banking"),
      ].map((d) => (
        <motion.div
          key={d}
          whileHover={{ x: 10 }}
          className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-between group cursor-default"
        >
          <div className="flex items-center gap-5">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${theme.bg} text-white shadow-lg`}
            >
              <GraduationCap size={24} />
            </div>
            <span className="font-black text-slate-800 uppercase italic text-sm tracking-tight">
              {d || "Yo'nalish nomi"}
            </span>
          </div>
          <ArrowRight className="text-slate-200 group-hover:text-emerald-500 transition-colors" />
        </motion.div>
      ))}
    </div>
  </div>
);

const DocsContent = ({ t, theme }) => {
  const documents = [
    {
      id: 1,
      name: t("doc_charter") || "Texnikum Ustavi",
      size: "1.2 MB",
      type: "PDF",
    },
    {
      id: 2,
      name: t("doc_admission_rules") || "Qabul Qoidalari",
      size: "850 KB",
      type: "PDF",
    },
    {
      id: 3,
      name: t("doc_ethics") || "Odob-axloq Kodeksi",
      size: "450 KB",
      type: "DOCX",
    },
  ];
  return (
    <div className="space-y-10">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-slate-800 uppercase italic tracking-tighter mb-2">
          {t("info_docs_tab")}
        </h2>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">
          Rasmiy hujjatlar va namunalar
        </p>
      </div>
      <div className="grid gap-5">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="group flex flex-col md:flex-row items-center justify-between p-6 md:p-8 bg-white rounded-3xl border border-slate-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-500"
          >
            <div className="flex items-center gap-6 mb-4 md:mb-0">
              <div
                className={`p-4 rounded-2xl bg-slate-50 group-hover:${theme.lightBg} transition-colors`}
              >
                <FileTextIcon className={theme.text} size={32} />
              </div>
              <div>
                <h4 className="font-black text-slate-800 italic uppercase text-lg tracking-tighter">
                  {doc.name}
                </h4>
                <div className="flex items-center gap-3 mt-1">
                  <span
                    className={`px-3 py-1 rounded-lg ${theme.lightBg} ${theme.text} text-[10px] font-black uppercase tracking-widest`}
                  >
                    {doc.type}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    {doc.size}
                  </span>
                </div>
              </div>
            </div>
            <button
              className={`flex items-center gap-3 px-8 py-4 ${theme.bg} text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all hover:scale-105 active:scale-95 italic shadow-lg shadow-black/10`}
            >
              <Download size={16} /> {t("download") || "YUKLAB OLISH"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const PlaceholderContent = ({ title, icon, theme, t }) => (
  <div className="text-center py-20 flex flex-col items-center">
    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className={`p-10 rounded-[2.5rem] ${theme.lightBg} ${theme.text} mb-8`}
    >
      {icon && typeof icon === "object"
        ? { ...icon, props: { ...icon.props, size: 64 } }
        : icon}
    </motion.div>
    <h2 className="text-4xl font-black text-slate-800 uppercase italic tracking-tighter mb-4">
      {title}
    </h2>
    <div className={`w-16 h-1.5 ${theme.bg} rounded-full mb-6`}></div>
    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.4em]">
      {t("coming_soon_desc") || "USHBU BO'LIM TEZ ORADA ISHGA TUSHURILADI"}
    </p>
  </div>
);

export default InfoPortal;
