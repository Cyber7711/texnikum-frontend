import { useNavigate } from "react-router-dom";
import {
  HelpCircle,
  GraduationCap,
  FileText,
  Monitor,
  CreditCard,
  Briefcase,
  ArrowUpRight,
  Landmark,
  Info,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const InfoSection = ({ bgImage }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div
      className="relative bg-fixed bg-center bg-cover py-32 overflow-hidden font-sans border-t border-slate-800"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Orqa fon qatlami (Siz aytgandek o'zgarmadi) */}
      <div className="absolute inset-0 bg-black/75"></div>

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24"
        >
          {/* 1. ABITURIYENTLARGA BLOKI (TILLA RANG) */}
          <div className="space-y-10">
            <motion.div variants={fadeInUp} className="inline-block relative">
              <span className="flex items-center gap-2 text-amber-400 text-[10px] font-extrabold uppercase tracking-[0.3em] mb-4 bg-amber-400/10 inline-flex px-3 py-1.5 rounded-md border border-amber-400/20 shadow-sm">
                <Landmark size={14} />
                {t("info_applicants_sub", "Abituriyentlar uchun")}
              </span>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight border-l-4 border-amber-400 pl-6 leading-tight">
                {t("info_applicants_title", "QABUL 2026")}
              </h3>
            </motion.div>

            <div className="grid gap-4">
              <InfoItem
                icon={<HelpCircle size={24} />}
                title={t("info_faq_title", "Ko'p beriladigan savollar")}
                desc={t("info_faq_desc", "Qabul jarayoni haqida ma'lumot")}
                accentColor="amber"
                onClick={() => navigate("/info?tab=faq")}
              />
              <InfoItem
                icon={<GraduationCap size={24} />}
                title={t("info_directions_title", "Ta'lim yo'nalishlari")}
                desc={t("info_directions_desc", "Mavjud kasb-hunar dasturlari")}
                accentColor="amber"
                onClick={() => navigate("/info?tab=directions")}
              />
              <InfoItem
                icon={<FileText size={24} />}
                title={t("info_rules_title", "Qabul hujjatlari")}
                desc={t("info_rules_desc", "Kerakli hujjatlar ro'yxati")}
                accentColor="amber"
                onClick={() => navigate("/info?tab=docs")}
              />
            </div>
          </div>

          {/* 2. TALABALARGA BLOKI (KO'K RANG) */}
          <div className="space-y-10 lg:pt-16">
            <motion.div variants={fadeInUp} className="inline-block relative">
              <span className="flex items-center gap-2 text-blue-400 text-[10px] font-extrabold uppercase tracking-[0.3em] mb-4 bg-blue-500/10 inline-flex px-3 py-1.5 rounded-md border border-blue-500/20 shadow-sm">
                <Info size={14} />
                {t("info_students_sub", "Talabalar uchun")}
              </span>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight border-l-4 border-blue-500 pl-6 leading-tight">
                {t("info_students_title", "O'QUV JARAYONI")}
              </h3>
            </motion.div>

            <div className="grid gap-4">
              <InfoItem
                icon={<Monitor size={24} />}
                title={t("info_lms_title", "Elektron ta'lim")}
                desc={t("info_lms_desc", "LMS platformasiga kirish")}
                accentColor="blue"
                onClick={() => navigate("/info?tab=lms")}
              />
              <InfoItem
                icon={<CreditCard size={24} />}
                title={t("info_finance_title", "To'lov-shartnoma")}
                desc={t(
                  "info_finance_desc",
                  "Kontrakt narxlari va rekvizitlar",
                )}
                accentColor="blue"
                onClick={() => navigate("/info?tab=finance")}
              />
              <InfoItem
                icon={<Briefcase size={24} />}
                title={t("info_career_title", "Karyera markazi")}
                desc={t("info_career_desc", "Amaliyot va ish o'rinlari")}
                accentColor="blue"
                onClick={() => navigate("/info?tab=career")}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Kartochka komponenti
const InfoItem = ({ icon, title, desc, accentColor, onClick }) => {
  const isAmber = accentColor === "amber";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="group relative flex items-center justify-between p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="flex gap-5 items-center relative z-10">
        {/* Ikonka bloki */}
        <div
          className={`p-3.5 rounded-xl transition-all duration-300 shadow-inner border border-white/5 ${
            isAmber
              ? "bg-amber-400/10 text-amber-400 group-hover:bg-amber-400 group-hover:text-[#0a1930]"
              : "bg-blue-500/10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white"
          }`}
        >
          {icon}
        </div>

        {/* Matn qismi */}
        <div>
          <h4
            className={`font-bold text-white text-base md:text-lg tracking-wide mb-1 transition-colors ${
              isAmber
                ? "group-hover:text-amber-400"
                : "group-hover:text-blue-400"
            }`}
          >
            {title}
          </h4>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest leading-relaxed max-w-[240px] transition-colors">
            {desc}
          </p>
        </div>
      </div>

      {/* O'ng tomondagi tugmacha */}
      <div className="p-2.5 rounded-lg border border-white/10 text-white/30 group-hover:text-white group-hover:border-white/30 transition-all duration-300 bg-white/5 shrink-0 ml-4">
        <ArrowUpRight size={18} strokeWidth={2.5} />
      </div>
    </motion.div>
  );
};

export default InfoSection;
