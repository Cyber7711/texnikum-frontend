import { useNavigate } from "react-router-dom";
import {
  HelpCircle,
  GraduationCap,
  FileText,
  Monitor,
  CreditCard,
  Briefcase,
  ArrowUpRight,
  Sparkles,
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
      className="relative bg-fixed bg-center bg-cover py-32 overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Orqa fon qatlami (O'zgarmadi) */}
      <div className="absolute inset-0 bg-black/75 backdrop--[2px]"></div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32"
        >
          {/* ABITURIYENTLARGA BLOKI */}
          <div className="space-y-12">
            <motion.div variants={fadeInUp} className="inline-block relative">
              <span className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4">
                <Sparkles size={14} className="animate-pulse" />{" "}
                {t("info_applicants_sub") || "Abituriyentlar uchun"}
              </span>
              <h3 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter border-l-8 border-emerald-500 pl-8">
                {t("info_applicants_title")}
              </h3>
            </motion.div>

            <div className="grid gap-5">
              <InfoItem
                icon={<HelpCircle size={28} />}
                title={t("info_faq_title")}
                desc={t("info_faq_desc")}
                accentColor="emerald"
                onClick={() => navigate("/info?tab=faq")}
              />
              <InfoItem
                icon={<GraduationCap size={28} />}
                title={t("info_directions_title")}
                desc={t("info_directions_desc")}
                accentColor="emerald"
                onClick={() => navigate("/info?tab=directions")}
              />
              <InfoItem
                icon={<FileText size={28} />}
                title={t("info_rules_title")}
                desc={t("info_rules_desc")}
                accentColor="emerald"
                onClick={() => navigate("/info?tab=docs")}
              />
            </div>
          </div>

          {/* TALABALARGA BLOKI */}
          <div className="space-y-12 lg:pt-16">
            <motion.div variants={fadeInUp} className="inline-block relative">
              <span className="flex items-center gap-2 text-sky-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4">
                <Info size={14} /> {t("info_students_sub") || "Talabalar uchun"}
              </span>
              <h3 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter border-l-8 border-sky-500 pl-8">
                {t("info_students_title")}
              </h3>
            </motion.div>

            <div className="grid gap-5">
              <InfoItem
                icon={<Monitor size={28} />}
                title={t("info_lms_title")}
                desc={t("info_lms_desc")}
                accentColor="sky"
                onClick={() => navigate("/info?tab=lms")}
              />
              <InfoItem
                icon={<CreditCard size={28} />}
                title={t("info_finance_title")}
                desc={t("info_finance_desc")}
                accentColor="sky"
                onClick={() => navigate("/info?tab=finance")}
              />
              <InfoItem
                icon={<Briefcase size={28} />}
                title={t("info_career_title")}
                desc={t("info_career_desc")}
                accentColor="sky"
                onClick={() => navigate("/info?tab=career")}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, title, desc, accentColor, onClick }) => {
  const isEmerald = accentColor === "emerald";

  return (
    <motion.div
      whileHover={{ x: 12, scale: 1.02 }}
      onClick={onClick}
      className="group relative flex items-center justify-between p-6 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[2rem] hover:bg-white/10 transition-all duration-500 cursor-pointer overflow-hidden"
    >
      <div className="flex gap-6 items-center relative z-10">
        <div
          className={`p-4 rounded-2xl transition-all duration-500 shadow-2xl ${
            isEmerald
              ? "bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white"
              : "bg-sky-500/10 text-sky-400 group-hover:bg-sky-600 group-hover:text-white"
          }`}
        >
          {icon}
        </div>

        <div>
          <h4 className="font-black text-white text-lg tracking-tight mb-1 uppercase italic group-hover:text-emerald-400 transition-colors">
            {title}
          </h4>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest leading-relaxed max-w-[240px] group-hover:text-slate-200 transition-colors">
            {desc}
          </p>
        </div>
      </div>

      <div className="p-3 rounded-xl border border-white/5 text-white/10 group-hover:text-white group-hover:border-white/20 transition-all duration-500 bg-white/5">
        <ArrowUpRight size={20} />
      </div>
    </motion.div>
  );
};

export default InfoSection;
