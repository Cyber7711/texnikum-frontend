import { useNavigate } from "react-router-dom";
import {
  HelpCircle,
  GraduationCap,
  FileText,
  Monitor,
  CreditCard,
  Briefcase,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next"; // i18n hook

const InfoSection = ({ bgImage }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div
      className="relative bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-sm"></div>

      <div className="relative z-10 container mx-auto px-6 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* ABITURIYENTLARGA BLOKI */}
          <div className="space-y-10">
            <div className="inline-block">
              <h3 className="text-3xl font-black text-white uppercase tracking-wider border-l-4 border-blue-600 pl-6">
                {t("info_applicants_title")}
              </h3>
              <p className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.4em] mt-2 ml-7">
                {t("info_applicants_sub")}
              </p>
            </div>

            <div className="grid gap-6">
              <InfoItem
                icon={<HelpCircle size={32} />}
                title={t("info_faq_title")}
                desc={t("info_faq_desc")}
                accentColor="blue"
                onClick={() => navigate("/info?tab=faq")}
              />
              <InfoItem
                icon={<GraduationCap size={32} />}
                title={t("info_directions_title")}
                desc={t("info_directions_desc")}
                accentColor="blue"
                onClick={() => navigate("/info?tab=directions")}
              />
              <InfoItem
                icon={<FileText size={32} />}
                title={t("info_rules_title")}
                desc={t("info_rules_desc")}
                accentColor="blue"
                onClick={() => navigate("/info?tab=docs")}
              />
            </div>
          </div>

          {/* TALABALARGA BLOKI */}
          <div className="space-y-10">
            <div className="inline-block">
              <h3 className="text-3xl font-black text-white uppercase tracking-wider border-l-4 border-amber-500 pl-6">
                {t("info_students_title")}
              </h3>
              <p className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.4em] mt-2 ml-7">
                {t("info_students_sub")}
              </p>
            </div>

            <div className="grid gap-6">
              <InfoItem
                icon={<Monitor size={32} />}
                title={t("info_lms_title")}
                desc={t("info_lms_desc")}
                accentColor="amber"
                onClick={() => navigate("/info?tab=lms")}
              />
              <InfoItem
                icon={<CreditCard size={32} />}
                title={t("info_finance_title")}
                desc={t("info_finance_desc")}
                accentColor="amber"
                onClick={() => navigate("/info?tab=finance")}
              />
              <InfoItem
                icon={<Briefcase size={32} />}
                title={t("info_career_title")}
                desc={t("info_career_desc")}
                accentColor="amber"
                onClick={() => navigate("/info?tab=career")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, title, desc, accentColor, onClick }) => {
  const isBlue = accentColor === "blue";

  return (
    <motion.div
      whileHover={{ x: 10 }}
      onClick={onClick}
      className="group relative flex items-center justify-between p-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div
        className={`absolute inset-y-0 left-0 w-1 transition-all duration-500 ${
          isBlue ? "bg-blue-600" : "bg-amber-500"
        } group-hover:w-full opacity-0 group-hover:opacity-5`}
      />

      <div className="flex gap-6 items-center relative z-10">
        <div
          className={`p-4 rounded-xl transition-all duration-500 shadow-xl ${
            isBlue
              ? "bg-blue-600/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white"
              : "bg-amber-500/20 text-amber-500 group-hover:bg-amber-500 group-hover:text-white"
          }`}
        >
          {icon}
        </div>

        <div>
          <h4 className="font-bold text-white text-lg mb-0.5 group-hover:text-white transition-colors">
            {title}
          </h4>
          <p className="text-gray-400 text-xs leading-relaxed max-w-[220px] group-hover:text-gray-200 transition-colors">
            {desc}
          </p>
        </div>
      </div>

      <div className="p-2 rounded-full border border-white/10 text-white/20 group-hover:text-white group-hover:border-white/30 transition-all duration-500">
        <ArrowUpRight size={18} />
      </div>
    </motion.div>
  );
};

export default InfoSection;
