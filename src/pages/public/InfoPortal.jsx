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
  FileTextIcon,
  Download,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next"; // i18n hook
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

  const themeClass = isStudentGroup
    ? { text: "text-amber-600", bg: "bg-amber-600", border: "border-amber-100" }
    : { text: "text-blue-600", bg: "bg-blue-600", border: "border-blue-100" };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h1
              key={isStudentGroup}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight"
            >
              {isStudentGroup
                ? t("info_students_title")
                : t("info_applicants_title")}{" "}
              <span className={themeClass.text}>{t("center")}</span>
            </motion.h1>
            <p className="text-gray-500 mt-4 font-medium uppercase tracking-widest text-xs">
              {isStudentGroup
                ? t("info_students_sub")
                : t("info_applicants_sub")}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSearchParams({ tab: tab.id })}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                  activeTab === tab.id
                    ? `${themeClass.bg} text-white shadow-xl scale-105`
                    : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-100"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          <div
            className={`max-w-4xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border ${themeClass.border}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                {activeTab === "faq" && <FAQContent t={t} />}
                {activeTab === "directions" && <DirectionsContent t={t} />}
                {activeTab === "docs" && <DocsContent t={t} />}
                {activeTab === "lms" && (
                  <PlaceholderContent
                    title={t("info_lms_tab")}
                    icon={<Monitor size={48} />}
                    color={themeClass.text}
                    t={t}
                  />
                )}
                {activeTab === "finance" && (
                  <PlaceholderContent
                    title={t("info_finance_tab")}
                    icon={<CreditCard size={48} />}
                    color={themeClass.text}
                    t={t}
                  />
                )}
                {activeTab === "career" && (
                  <PlaceholderContent
                    title={t("info_career_tab")}
                    icon={<Briefcase size={48} />}
                    color={themeClass.text}
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

// --- YORDAMCHI KOMPONENTLAR TARJIMALAR BILAN ---

const FAQContent = ({ t }) => {
  const [open, setOpen] = useState(null);
  const data = [
    { q: t("faq_q1"), a: t("faq_a1") },
    { q: t("faq_q2"), a: t("faq_a2") },
  ];
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-black mb-8 text-slate-800 uppercase">
        {t("info_faq_title")}
      </h2>
      {data.map((item, i) => (
        <div key={i} className="border-b border-gray-100 pb-4">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex justify-between items-center font-bold text-left py-2 hover:text-blue-600 transition"
          >
            {item.q}{" "}
            <ChevronDown
              className={open === i ? "rotate-180 text-blue-600" : ""}
            />
          </button>
          {open === i && (
            <p className="text-gray-500 mt-2 text-sm leading-relaxed">
              {item.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

const DirectionsContent = ({ t }) => (
  <div>
    <h2 className="text-2xl font-black mb-8 text-slate-800 uppercase">
      {t("info_directions_title")}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        t("dir_software"),
        t("dir_accounting"),
        t("dir_logistics"),
        t("dir_banking"),
      ].map((d) => (
        <div
          key={d}
          className="p-4 bg-gray-50 rounded-2xl font-bold text-slate-700 flex items-center gap-3"
        >
          <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" /> {d}
        </div>
      ))}
    </div>
  </div>
);

const DocsContent = ({ t }) => {
  const documents = [
    { id: 1, name: t("doc_charter"), size: "1.2 MB", type: "PDF" },
    { id: 2, name: t("doc_admission_rules"), size: "850 KB", type: "PDF" },
    { id: 3, name: t("doc_ethics"), size: "450 KB", type: "DOCX" },
  ];
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-slate-800 uppercase">
        {t("info_docs_tab")}
      </h2>
      <div className="grid gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-all"
          >
            <div className="flex items-center gap-5">
              <FileTextIcon className="text-blue-600" size={24} />
              <div>
                <h4 className="font-bold text-slate-700">{doc.name}</h4>
                <span className="text-[10px] text-gray-400 font-bold uppercase">
                  {doc.type} | {doc.size}
                </span>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-xl font-bold text-sm border hover:bg-blue-600 hover:text-white transition-all">
              <Download size={16} /> {t("download")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const PlaceholderContent = ({ title, icon, color, t }) => (
  <div className="text-center py-10 flex flex-col items-center">
    <div className={`${color} mb-6 opacity-20`}>{icon}</div>
    <h2 className="text-2xl font-black text-slate-800 uppercase mb-2">
      {title}
    </h2>
    <p className="text-gray-400">{t("coming_soon_desc")}</p>
  </div>
);

export default InfoPortal;
