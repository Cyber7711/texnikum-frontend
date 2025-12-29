import { useState, useEffect } from "react";
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
import PageWrapper from "../../components/layout/PageWrapper";

const InfoPortal = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "faq";

  // Guruhlarni aniqlaymiz
  const studentTabs = ["lms", "finance", "career"];
  const isStudentGroup = studentTabs.includes(activeTab);

  const tabs = [
    { id: "faq", label: "FAQ", icon: <HelpCircle size={18} />, group: "abi" },
    {
      id: "directions",
      label: "Yo'nalishlar",
      icon: <GraduationCap size={18} />,
      group: "abi",
    },
    {
      id: "docs",
      label: "Nizomlar",
      icon: <FileText size={18} />,
      group: "abi",
    },
    {
      id: "lms",
      label: "LMS Portal",
      icon: <Monitor size={18} />,
      group: "talaba",
    },
    {
      id: "finance",
      label: "Moliya",
      icon: <CreditCard size={18} />,
      group: "talaba",
    },
    {
      id: "career",
      label: "Karyera",
      icon: <Briefcase size={18} />,
      group: "talaba",
    },
  ];

  // Ranglar sxemasi guruhga qarab
  const themeClass = isStudentGroup
    ? {
        bg: "bg-amber-600",
        text: "text-amber-600",
        lightBg: "bg-amber-50",
        border: "border-amber-100",
      }
    : {
        bg: "bg-blue-600",
        text: "text-blue-600",
        lightBg: "bg-blue-50",
        border: "border-blue-100",
      };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          {/* Sahifa Sarlavhasi (Dinamik) */}
          <div className="text-center mb-12">
            <motion.h1
              key={isStudentGroup}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight"
            >
              {isStudentGroup ? "Talabalar" : "Abituriyentlar"}{" "}
              <span className={themeClass.text}>Markazi</span>
            </motion.h1>
            <p className="text-gray-500 mt-4 font-medium uppercase tracking-widest text-xs">
              {isStudentGroup
                ? "Akademik faoliyat va resurslar"
                : "Qabul jarayoni va ma'lumotlar"}
            </p>
          </div>

          {/* Tablar Menyusi */}
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

          {/* Kontent Konteyneri */}
          <div
            className={`max-w-4xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border ${themeClass.border}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "faq" && <FAQContent />}
                {activeTab === "directions" && <DirectionsContent />}
                {activeTab === "docs" && <DocsContent />}
                {activeTab === "lms" && (
                  <PlaceholderContent
                    title="LMS Platforma"
                    icon={<Monitor size={48} />}
                    color={themeClass.text}
                  />
                )}
                {activeTab === "finance" && (
                  <PlaceholderContent
                    title="Stipendiyalar"
                    icon={<CreditCard size={48} />}
                    color={themeClass.text}
                  />
                )}
                {activeTab === "career" && (
                  <PlaceholderContent
                    title="Karyera"
                    icon={<Briefcase size={48} />}
                    color={themeClass.text}
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

// --- YORDAMCHI KONTENT KOMPONENTLARI ---

const FAQContent = () => {
  const [open, setOpen] = useState(null);
  const data = [
    {
      q: "Hujjatlar qabul qilish muddati?",
      a: "Qabul odatda 15-iyundan 25-avgustgacha davom etadi.",
    },
    {
      q: "Sirtqi bo'lim mavjudmi?",
      a: "Ha, deyarli barcha yo'nalishlarda sirtqi ta'lim shakli mavjud.",
    },
  ];
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-black mb-8 text-slate-800">
        KO'P BERILADIGAN SAVOLLAR
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

const DirectionsContent = () => (
  <div>
    <h2 className="text-2xl font-black mb-8 text-slate-800">YO'NALISHLAR</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {["Dasturiy injiniring", "Buxgalteriya", "Logistika", "Bank ishi"].map(
        (d) => (
          <div
            key={d}
            className="p-4 bg-gray-50 rounded-2xl font-bold text-slate-700 flex items-center gap-3"
          >
            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" /> {d}
          </div>
        )
      )}
    </div>
  </div>
);

const DocsContent = () => {
  const documents = [
    { id: 1, name: "Politexnikum Ustavi", size: "1.2 MB", type: "PDF" },
    {
      id: 2,
      name: "Qabul qilish tartibi va nizomi (2025/2026)",
      size: "850 KB",
      type: "PDF",
    },
    {
      id: 3,
      name: "Talabalar odob-axloq kodeksi",
      size: "450 KB",
      type: "DOCX",
    },
    {
      id: 4,
      name: "Stipendiya ajratish tartibi to'g'risida nizom",
      size: "620 KB",
      type: "PDF",
    },
    { id: 5, name: "Ichki tartib-qoidalar", size: "1.1 MB", type: "PDF" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
          Me'yoriy <span className="text-blue-600">Hujjatlar</span>
        </h2>
        <span className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full uppercase">
          Jami: {documents.length} ta
        </span>
      </div>

      <div className="grid gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="group flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-transparent hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-300"
          >
            <div className="flex items-center gap-5">
              <div className="p-3 bg-white rounded-xl text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                <FileTextIcon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-700 group-hover:text-blue-700 transition-colors">
                  {doc.name}
                </h4>
                <div className="flex gap-3 mt-1">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    {doc.type}
                  </span>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    {doc.size}
                  </span>
                </div>
              </div>
            </div>

            <button
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-xl font-bold text-sm shadow-sm border border-gray-100 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all active:scale-95"
              onClick={() => window.open("#", "_blank")} // Fayl yo'li qo'yiladi
            >
              <Download size={16} />
              <span>YUKLASH</span>
            </button>
          </div>
        ))}
      </div>

      {/* Ma'lumot: Agar kerakli hujjat topilmasa */}
      <div className="mt-10 p-6 bg-slate-900 rounded-3xl flex items-center gap-5">
        <div className="p-3 bg-blue-600/20 text-blue-400 rounded-2xl">
          <HelpCircle size={24} />
        </div>
        <p className="text-sm text-gray-300 italic leading-relaxed">
          Siz qidirayotgan hujjat ro'yxatda mavjud bo'lmasa, iltimos texnikum
          qabul bo'limiga murojaat qiling.
        </p>
      </div>
    </div>
  );
};

const PlaceholderContent = ({ title, icon, color, desc }) => (
  <div className="text-center py-10 flex flex-col items-center">
    <div className={`${color} mb-6 opacity-20`}>{icon}</div>
    <h2 className="text-2xl font-black text-slate-800 uppercase mb-2">
      {title}
    </h2>
    <p className="text-gray-400">
      Ushbu bo'lim ma'lumotlari tez orada yangilanadi.
    </p>
  </div>
);

export default InfoPortal;
