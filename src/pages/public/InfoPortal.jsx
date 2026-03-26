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
  FileTextIcon,
  Clock,
  Wrench,
  CheckCircle2,
  Cpu,
  Tractor,
  Scissors,
  ChefHat,
  Droplet,
  Settings,
  Landmark,
  UserCheck,
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
      label: t("info_faq_tab", "F.A.Q (Savollar)"),
      icon: <HelpCircle size={18} />,
    },
    {
      id: "directions",
      label: t("info_directions_tab", "Ta'lim yo'nalishlari"),
      icon: <GraduationCap size={18} />,
    },
    {
      id: "docs",
      label: t("info_docs_tab", "Me'yoriy hujjatlar"),
      icon: <FileText size={18} />,
    },
    {
      id: "lms",
      label: t("info_lms_tab", "Elektron ta'lim"),
      icon: <Monitor size={18} />,
    },
    {
      id: "finance",
      label: t("info_finance_tab", "Moliyaviy bo'lim"),
      icon: <CreditCard size={18} />,
    },
    {
      id: "career",
      label: t("info_career_tab", "Karyera markazi"),
      icon: <Briefcase size={18} />,
    },
  ];

  // Rasmiy ranglar: Abituriyentlar (Ko'k) va Talabalar (Yashil/Tilla)
  const theme = isStudentGroup
    ? {
        text: "text-emerald-600",
        bg: "bg-emerald-600",
        border: "border-emerald-100",
        lightBg: "bg-emerald-50",
        hoverBg: "hover:bg-emerald-50",
        badgeText: "text-emerald-700",
      }
    : {
        text: "text-blue-600",
        bg: "bg-[#0a1930]", // Rasmiy to'q ko'k
        border: "border-blue-100",
        lightBg: "bg-blue-50",
        hoverBg: "hover:bg-blue-50",
        badgeText: "text-blue-700",
      };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#f8fafc] py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          {/* --- 1. RASMIY HEADER SECTION --- */}
          <div className="text-center mb-16 relative">
            <motion.div
              key={isStudentGroup ? "student" : "applicant"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <span
                className={`flex items-center gap-2 ${theme.badgeText} text-[10px] font-bold uppercase tracking-widest mb-6 ${theme.lightBg} px-4 py-2 rounded-lg border ${theme.border} shadow-sm`}
              >
                {isStudentGroup ? (
                  <UserCheck size={14} />
                ) : (
                  <Landmark size={14} />
                )}
                {isStudentGroup
                  ? t("info_students_sub", "Talabalar va O'quvchilar uchun")
                  : t(
                      "info_applicants_sub",
                      "Abituriyentlar va Ota-onalar uchun",
                    )}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#0a1930] uppercase tracking-tight leading-tight text-center">
                {isStudentGroup
                  ? t("info_students_title", "TALABA")
                  : t("info_applicants_title", "ABITURIYENT")}{" "}
                <br className="hidden sm:block" />
                <span className={theme.text}>
                  {t("center", "MA'LUMOTLAR PORTALI")}
                </span>
              </h1>
              <div className={`w-20 h-1.5 ${theme.bg} mt-6 rounded-full`} />
            </motion.div>
          </div>

          {/* --- 2. TAB NAVIGATION (Corporate Style) --- */}
          <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-4xl mx-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSearchParams({ tab: tab.id })}
                className={`flex items-center gap-2.5 px-6 py-4 rounded-xl font-bold uppercase text-[11px] tracking-wide transition-all duration-300 shadow-sm ${
                  activeTab === tab.id
                    ? `${theme.bg} text-white shadow-md transform scale-[1.02] border-transparent`
                    : `bg-white text-slate-500 hover:text-slate-800 ${theme.hoverBg} border border-slate-200`
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* --- 3. MAIN CONTENT WRAPPER --- */}
          <div
            className={`max-w-6xl mx-auto bg-white rounded-3xl p-6 md:p-12 lg:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden`}
          >
            {/* Sokin fonga oid chiziq (Tepadan tushuvchi) */}
            <div className={`absolute top-0 left-0 w-full h-1.5 ${theme.bg}`} />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
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
   SUB-COMPONENTS (CONTENT)
   ========================================================================== */

// --- FAQ CONTENT (Rasmiy Savollar) ---
const FAQContent = ({ t, theme }) => {
  const [open, setOpen] = useState(0); // Birinchisi doim ochiq turadi

  const data = [
    {
      q: "Politexnikumda ta'lim olish pullikmi yoki bepul?",
      a: "Texnikumimiz davlat muassasasi bo'lib, o'quvchilar qabul kvitasiyasiga ko'ra Davlat granti (bepul) yoki To'lov-shartnoma asosida o'qishga qabul qilinadilar. Kasb-hunar o'rganish istagida bo'lgan yoshlar uchun davlat tomonidan keng imtiyozlar yaratilgan.",
    },
    {
      q: "O'qishga kirish uchun qanday hujjatlar kerak bo'ladi?",
      a: "Qabul uchun asosan quyidagi hujjatlar talab etiladi: Pasport (ID karta) nusxasi, umumiy o'rta ta'lim (11-sinf) shahodatnomasi yoki diplom, 3x4 o'lchamdagi 6 ta rasm hamda tibbiy ma'lumotnoma (086-U shakl). Hujjatlar onlayn my.uzbmb.uz orqali ham qabul qilinadi.",
    },
    {
      q: "Texnikumni bitirgach qanday imtiyozlar beriladi?",
      a: "Politexnikumni muvaffaqiyatli tamomlagan bitiruvchilarga O'zbekiston Respublikasida tan olinadigan davlat namunasidagi Diplom beriladi. Ushbu diplom bilan siz o'z sohangiz bo'yicha ishlashingiz yoki Oliy ta'lim muassasalarida o'qishni davom ettirishingiz mumkin.",
    },
    {
      q: "Uzoqdan kelgan o'quvchilar uchun yotoqxona bormi?",
      a: "Ha, uzoq tumanlar va viloyatlardan kelib tahsil oluvchi o'quvchilarimiz uchun barcha sharoitlarga ega bo'lgan zamonaviy Talabalar turar joyi (yotoqxona) mavjud. Yotoqxonaga joylashish ariza asosida ko'rib chiqiladi.",
    },
    {
      q: "Amaliyot darslari qanday olib boriladi?",
      a: "Bizning texnikumda ta'limning asosiy qismi amaliyotga qaratilgan. Talabalarimiz o'z yo'nalishlari bo'yicha tuman va viloyatdagi yirik korxonalar, fermer xo'jaliklari, fabrikalar va ishlab chiqarish sexlarida bevosita amaliyot o'taydilar.",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="mb-10 border-b border-slate-100 pb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0a1930] uppercase tracking-wide mb-3">
          Ko'p beriladigan savollar
        </h2>
        <p className="text-slate-500 font-medium text-sm">
          Abituriyentlar va ota-onalar tomonidan qabul jarayoni bo'yicha
          beriladigan eng muhim savollarga javoblar.
        </p>
      </div>
      <div className="grid gap-4">
        {data.map((item, i) => (
          <div
            key={i}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              open === i
                ? `border-blue-200 bg-blue-50/30`
                : "border-slate-200 bg-white hover:border-blue-100"
            }`}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex justify-between items-center font-bold text-[#0a1930] text-left p-5 md:p-6 cursor-pointer outline-none"
            >
              <span className="max-w-[90%] text-sm md:text-base leading-snug">
                {item.q}
              </span>
              <div
                className={`p-2 rounded-lg transition-all shrink-0 ${
                  open === i
                    ? `${theme.bg} text-white`
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    open === i ? "rotate-180" : ""
                  }`}
                  size={16}
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
                  <p className="px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed font-medium">
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

// --- DIRECTIONS CONTENT (Agro-Sanoat va Kasb-hunarga moslangan) ---
const DirectionsContent = ({ t, theme }) => {
  const directions = [
    {
      id: "agronomy",
      title: "Agro-Sanoat va Fermerlik",
      duration: "2 yil",
      icon: <Tractor size={32} strokeWidth={1.5} />,
      learn:
        "Zamonaviy qishloq xo'jaligi texnologiyalari, ekinlarni parvarishlash, agrotexnika qoidalari va fermer xo'jaligini yuritish asoslari.",
      gives:
        "Agro-klasterlar, yirik fermer xo'jaliklari va qishloq xo'jaligi bo'limlarida agronom yoki texnolog sifatida ishlash imkoniyati.",
      skills: ["Agrotexnika", "Chorvachilik", "Yer tuzish"],
    },
    {
      id: "sewing",
      title: "Tikuvchilik va Dizayn",
      duration: "1.5 yil",
      icon: <Scissors size={32} strokeWidth={1.5} />,
      learn:
        "Kiyimlarni modellashtirish, bichish va tikish texnologiyalari, zamonaviy tikuv mashinalarida ishlash sirlari.",
      gives:
        "Tekstil fabrikalarida, moda uylarida dizayner-tikuvchi bo'lish yoki xususiy tikuvchilik sexini ochish imkoniyati.",
      skills: ["Bichish-tikish", "Modellashtirish", "Dizayn"],
    },
    {
      id: "mechanic",
      title: "Avtomobillarga xizmat ko'rsatish",
      duration: "2 yil",
      icon: <Settings size={32} strokeWidth={1.5} />,
      learn:
        "Avtomobil dvigatellari, yurish qismlari, elektronikasini ta'mirlash hamda zamonaviy diagnostika uskunalarida ishlash.",
      gives:
        "Avtoservislar, dilerlik markazlari (UzAuto) va yirik transport korxonalarida malakali avtomexanik bo'lib ishlash.",
      skills: ["Avtodiagnostika", "Dvigatel ta'mirlash", "Elektronika"],
    },
    {
      id: "plumbing",
      title: "Santexnika va Payvandlash",
      duration: "1.5 yil",
      icon: <Droplet size={32} strokeWidth={1.5} />,
      learn:
        "Isitish, sovitish va suv ta'minoti tizimlarini o'rnatish, turli metallarni payvandlash sirlari.",
      gives:
        "Qurilish kompaniyalarida, kommunal xizmat ko'rsatish idoralarida mutaxassis bo'lish yoki xususiy usta sifatida faoliyat yuritish.",
      skills: ["Payvandlash", "Isitish tizimlari", "Santexnika"],
    },
    {
      id: "cook",
      title: "Oshpazlik va Qandolatchilik",
      duration: "1.5 yil",
      icon: <ChefHat size={32} strokeWidth={1.5} />,
      learn:
        "Milliy va Yevropa taomlari tayyorlash texnologiyasi, qandolatchilik pishiriqlari, gigiyena va xizmat ko'rsatish madaniyati.",
      gives:
        "Nufuzli restoranlar, mehmonxonalar, ijtimoiy soha muassasalari oshxonalarida bosh oshpaz bo'lib ishlash.",
      skills: ["Milliy taomlar", "Qandolatchilik", "Servirovka"],
    },
    {
      id: "it",
      title: "Kompyuter texnologiyalari",
      duration: "2 yil",
      icon: <Cpu size={32} strokeWidth={1.5} />,
      learn:
        "Kompyuter arxitekturasi, ofis dasturlarida ishlash, tarmoq xavfsizligi va dasturlashning boshlang'ich asoslari.",
      gives:
        "Har qanday davlat va xususiy korxonalarda IT operatori, tarmoq administratori bo'lib ishlash imkoniyati.",
      skills: ["Ofis dasturlari", "Tarmoq sozlash", "Kompyuter ta'mirlash"],
    },
  ];

  return (
    <div className="space-y-12">
      <div className="mb-10 border-b border-slate-100 pb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0a1930] uppercase tracking-wide mb-3">
          O'quv Yo'nalishlari va Kasblar
        </h2>
        <p className="text-slate-500 font-medium text-sm max-w-3xl leading-relaxed">
          Texnikumimiz viloyatdagi eng talabgir va daromadli kasblarga
          tayyorlaydi. O'qish davomida asosiy e'tibor amaliy ko'nikmalarni
          shakllantirishga qaratiladi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {directions.map((dir, index) => (
          <motion.div
            key={dir.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group relative bg-white border border-slate-200 rounded-[1.5rem] p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-300 flex flex-col h-full"
          >
            <div className="flex items-start gap-4 mb-6 border-b border-slate-100 pb-4">
              <div
                className={`w-14 h-14 shrink-0 rounded-xl bg-slate-50 border border-slate-100 ${theme.text} flex items-center justify-center group-hover:${theme.bg} group-hover:text-white transition-colors duration-300`}
              >
                {dir.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#0a1930] leading-tight mb-1">
                  {dir.title}
                </h3>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Clock size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    {dir.duration} O'QUV MUDDATI
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6 flex-grow">
              <div>
                <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-1.5 mb-1.5">
                  <Wrench size={12} className={theme.text} /> Nimani o'rganasiz?
                </h4>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">
                  {dir.learn}
                </p>
              </div>
              <div>
                <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-1.5 mb-1.5">
                  <CheckCircle2 size={12} className="text-emerald-500" />{" "}
                  Karyera imkoniyati
                </h4>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">
                  {dir.gives}
                </p>
              </div>
            </div>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-50">
              {dir.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-slate-50 text-slate-500 text-[10px] font-bold uppercase rounded-lg border border-slate-100 group-hover:border-blue-100 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- DOCS CONTENT (Rasmiy Hujjatlar) ---
const DocsContent = ({ t, theme }) => {
  const documents = [
    {
      id: 1,
      name: "O'quv muassasasi Nizomi",
      size: "1.2 MB",
      type: "PDF",
      fileUrl: "/assets/docs/ustav.pdf",
    },
    {
      id: 2,
      name: "Qabul va o'qishga o'tkazish tartibi",
      size: "850 KB",
      type: "PDF",
      fileUrl: "/assets/docs/qabul.pdf",
    },
    {
      id: 3,
      name: "Ichki tartib va odob-axloq qoidalari",
      size: "450 KB",
      type: "PDF",
      fileUrl: "/assets/docs/odob.pdf",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="mb-10 border-b border-slate-100 pb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0a1930] uppercase tracking-wide mb-3">
          Asosiy Me'yoriy Hujjatlar
        </h2>
        <p className="text-slate-500 font-medium text-sm">
          Texnikum faoliyatiga oid eng muhim hujjatlar va yo'riqnomalarni yuklab
          olishingiz mumkin. Barcha arxiv hujjatlari "Hujjatlar" menyusida
          joylashgan.
        </p>
      </div>

      <div className="grid gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="group flex flex-col sm:flex-row items-center justify-between p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4 sm:mb-0 w-full sm:w-auto">
              <div className="p-3.5 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors border border-slate-100">
                <FileTextIcon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[#0a1930] text-base leading-snug mb-1 group-hover:text-blue-700 transition-colors">
                  {doc.name}
                </h4>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-600 text-[9px] font-extrabold uppercase tracking-widest">
                    {doc.type}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Hajmi: {doc.size}
                  </span>
                </div>
              </div>
            </div>

            <a
              href={doc.fileUrl}
              download={doc.name}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-slate-50 hover:bg-blue-600 text-[#0a1930] hover:text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-colors border border-slate-200 hover:border-blue-600 cursor-pointer"
            >
              <Download size={16} /> Yuklab olish
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- PLACEHOLDER CONTENT (Tez orada...) ---
const PlaceholderContent = ({ title, icon, theme, t }) => (
  <div className="text-center py-20 flex flex-col items-center border border-slate-100 rounded-3xl bg-slate-50/50">
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      className={`p-8 rounded-2xl bg-white border border-slate-200 text-slate-300 mb-8 shadow-sm`}
    >
      {icon && typeof icon === "object"
        ? { ...icon, props: { ...icon.props, size: 64, strokeWidth: 1.5 } }
        : icon}
    </motion.div>
    <h2 className="text-2xl font-extrabold text-[#0a1930] uppercase tracking-wide mb-3">
      {title}
    </h2>
    <p className="text-slate-500 font-medium text-sm">
      {t(
        "coming_soon_desc",
        "Ushbu bo'lim hozirda ishlab chiqilmoqda va tez orada ishga tushiriladi.",
      )}
    </p>
  </div>
);

export default InfoPortal;
