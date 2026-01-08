import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Zap,
  User,
  X,
  Award,
  GraduationCap,
  ArrowRight,
  Briefcase,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionHeader from "../../components/ui/SectionHeader";
import Modal from "../../components/ui/Modal";

// 1. LeaderCard komponentini asosiy komponentdan tashqariga chiqaramiz
const LeaderCard = ({ leader, isMain, isStaff, onOpen, t }) => {
  if (!leader) return null;

  return (
    <div
      className={`
        ${
          isMain
            ? "max-w-3xl px-12 py-10"
            : isStaff
            ? "max-w-md p-8"
            : "w-full p-10"
        } 
        bg-white rounded-[4rem] border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] 
        relative group transition-all duration-700 hover:shadow-[0_30px_60px_-15px_rgba(59,130,246,0.15)]
        hover:border-blue-100 hover:-translate-y-3 flex flex-col items-center text-center mx-auto
      `}
    >
      <div className="relative mb-8">
        <div
          className={`
          ${isMain ? "w-48 h-48" : isStaff ? "w-24 h-24" : "w-32 h-32"} 
          bg-slate-50 rounded-[3rem] flex items-center justify-center text-slate-200 
          group-hover:bg-blue-600 group-hover:text-white transition-all duration-700 
          shadow-inner relative z-10 group-hover:rotate-[5deg]
        `}
        >
          <User size={isMain ? 80 : 40} strokeWidth={1} />
        </div>
        <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-4 block italic">
        {leader.position}
      </span>
      <h3
        className={`
        ${isMain ? "text-4xl" : "text-2xl"} 
        font-black text-slate-900 uppercase italic tracking-tighter leading-none mb-6 
        group-hover:text-blue-600 transition-colors
      `}
      >
        {leader.name}
      </h3>

      <button
        onClick={onOpen}
        className="flex items-center gap-3 py-4 px-8 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 font-black text-[10px] uppercase tracking-widest italic"
      >
        {t("read_more_details") || "Batafsil"}{" "}
        <ChevronRight
          size={14}
          className="group-hover:translate-x-1 transition-transform"
        />
      </button>
    </div>
  );
};

// 2. Ma'lumotlarni alohida obyekt qilib chiqaramiz (xatolikni oldini olish uchun)
const getManagementData = (t) => ({
  director: {
    id: "dir_1",
    name: "Falonchiyev Pismonchi",
    position: t("dir_title") || "Texnikum Direktori",
    reception: "Dushanba - Chorshanba, 09:00 - 12:00",
    phone: "+998 71 123 45 67",
    email: "director@texnikum.uz",
    bio: t("dir_bio") || "Ko'p yillik tajribaga ega rahbar...",
    education: "O'zbekiston Milliy Universiteti (PhD)",
    experience: "25 yil",
  },
  deputies: [
    {
      id: "dep_1",
      name: "Eshmatov Toshmat",
      position: t("deputy_edu") || "O'quv ishlari bo'yicha o'rinbosar",
      reception: "Seshanba - Payshanba, 14:00 - 17:00",
      phone: "+998 71 123 45 68",
      email: "deputy_edu@texnikum.uz",
      bio: "Ta'lim sifati bo'yicha mutaxassis.",
      education: "Toshkent Davlat Texnika Universiteti",
      experience: "18 yil",
    },
    {
      id: "dep_2",
      name: "Abdukarimov Ali",
      position:
        t("deputy_spiritual") || "Ma'naviy-ma'rifiy ishlar bo'yicha o'rinbosar",
      reception: "Har kuni, 09:00 - 11:00",
      phone: "+998 71 123 45 69",
      email: "spiritual@texnikum.uz",
      bio: "Yoshlar bilan ishlash bo'yicha ekspert.",
      education: "Samarqand Davlat Universiteti",
      experience: "12 yil",
    },
  ],
  staff: [
    {
      id: "staff_1",
      name: "Karimov Sherzod",
      position: t("staff_hr") || "Kadrlar bo'limi boshlig'i",
      reception: "Dushanba - Juma, 09:00 - 18:00",
      phone: "+998 71 123 45 10",
      email: "hr@texnikum.uz",
      education: "Yuridik Universiteti",
      experience: "10 yil",
      bio: "Mehnat qonunchiligi mutaxassisi.",
    },
  ],
});

const Management = () => {
  const { t } = useTranslation();
  const [selectedLeader, setSelectedLeader] = useState(null);
  const managementData = getManagementData(t);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-[#fafbfc] min-h-screen pb-40">
      {/* HERO */}
      <section className="relative bg-[#0a1128] pt-40 pb-60 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <SectionHeader
            badge={t("management_badge") || "ADMINISTRATIV TUZILMA"}
            titlePart1={t("management_title_1") || "Tashkiliy"}
            titlePart2={t("management_title_2") || "Tuzilma"}
            center={true}
            variant="blue"
          />
        </div>
      </section>

      {/* CONTENT */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-6 -mt-32 relative z-20"
      >
        {/* DIREKTOR */}
        <div className="flex justify-center mb-32">
          <LeaderCard
            leader={managementData.director}
            isMain={true}
            onOpen={() => setSelectedLeader(managementData.director)}
            t={t}
          />
        </div>

        {/* O'RINBOSARLAR */}
        <div className="flex flex-col items-center mb-20">
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: 80 }}
            className="w-0.5 bg-gradient-to-b from-blue-500 via-blue-200 to-transparent mb-6"
          />
          <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.5em] mb-12 italic">
            {t("deputies_title") || "DIREKTOR O'RINBOSARLARI"}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full mx-auto">
            {managementData.deputies?.map((dep) => (
              <motion.div key={dep.id} variants={itemVariants}>
                <LeaderCard
                  leader={dep}
                  onOpen={() => setSelectedLeader(dep)}
                  t={t}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* MAS'UL XODIMLAR */}
        <div className="flex flex-col items-center mt-32 mb-20">
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: 60 }}
            className="w-0.5 bg-gradient-to-b from-slate-200 to-transparent mb-6"
          />
          <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.5em] mb-12 italic">
            {t("staff_title") || "MAS'UL XODIMLAR"}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {managementData.staff?.map((s) => (
              <motion.div key={s.id} variants={itemVariants}>
                <LeaderCard
                  leader={s}
                  isStaff={true}
                  onOpen={() => setSelectedLeader(s)}
                  t={t}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* MODAL */}
      <Modal isOpen={!!selectedLeader} onClose={() => setSelectedLeader(null)}>
        {selectedLeader && (
          <div className="flex flex-col md:flex-row w-full">
            <div className="md:w-2/5 bg-slate-50 p-12 flex flex-col items-center justify-center border-r border-slate-100 text-center">
              <div className="w-40 h-40 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center text-slate-200 mb-6">
                <User size={80} strokeWidth={1} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 uppercase italic leading-tight mb-2 italic">
                {selectedLeader.name}
              </h3>
              <span className="px-4 py-1 bg-blue-600 text-white rounded-full text-[9px] font-black uppercase tracking-widest">
                {selectedLeader.position}
              </span>
            </div>
            <div className="md:w-3/5 p-12 space-y-8">
              <section>
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">
                  Biografiya
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed italic">
                  {selectedLeader.bio}
                </p>
              </section>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1">
                    Ma'lumoti
                  </p>
                  <p className="text-xs font-bold text-slate-800">
                    {selectedLeader.education}
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1">
                    Tajriba
                  </p>
                  <p className="text-xs font-bold text-slate-800">
                    {selectedLeader.experience}
                  </p>
                </div>
              </div>
              <section className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                <div className="flex items-center gap-4 mb-3">
                  <Phone size={14} className="text-blue-500" />
                  <span className="text-xs font-bold text-slate-700">
                    {selectedLeader.phone}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail size={14} className="text-blue-500" />
                  <span className="text-xs font-bold text-slate-700">
                    {selectedLeader.email}
                  </span>
                </div>
              </section>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Management;
