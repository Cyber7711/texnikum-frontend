import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Clock,
  User,
  ChevronRight,
  Briefcase,
  GraduationCap,
  Award,
  Users,
  Building2,
  FileText,
  BadgeCheck,
  X,
  Zap,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionHeader from "../../components/ui/SectionHeader";

// --- 1. OQIMLI CHIZIQ KOMPONENTI (PREMIUM LINE) ---
// Bu chiziq ichida "nur" oqib o'tadi
const FlowLine = ({ d, delay = 0 }) => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0">
    {/* Orqa fon (Yo'lak) */}
    <motion.path
      d={d}
      fill="transparent"
      stroke="#e2e8f0" // Slate-200 (juda och kulrang)
      strokeWidth="3"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay }}
    />

    {/* Harakatlanuvchi NUR (Tok oqimi) */}
    <motion.path
      d={d}
      fill="transparent"
      stroke="url(#flowGradient)"
      strokeWidth="3"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{
        pathDashoffset: [0, -100],
        pathLength: [0.05, 0.3, 0.05], // Nur uzayib-qisqaradi
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay + 1,
      }}
    />
    <defs>
      <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
        <stop offset="50%" stopColor="#10b981" stopOpacity="1" />{" "}
        {/* Emerald Green */}
        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

// --- 2. MA'LUMOTLAR ---
const getManagementData = (t) => ({
  director: {
    id: "dir_1",
    name: "Axmedov Jasur Ilhomovich",
    position: t("pos_director") || "Texnikum Direktori",
    role: "director",
    phone: "+998 71 200-00-01",
    email: "director@texnikum.uz",
    reception: "Dushanba - Juma, 08:00 - 11:00",
    bio: "Texnika fanlari nomzodi, Dotsent. Ta'lim tizimida 22 yillik tajriba. Xalqaro ta'lim grantlari g'olibi.",
    education: "Toshkent Davlat Texnika Universiteti (PhD)",
    experience: "22 yil",
  },
  deputies: [
    {
      id: "dep_1",
      name: "Rahimov Nodirbek",
      position: t("pos_deputy_edu") || "O'quv ishlari bo'yicha o'rinbosar",
      role: "deputy",
      phone: "+998 71 200-00-02",
      reception: "Har kuni, 14:00 - 17:00",
      bio: "O'quv jarayonini raqamlashtirish bo'yicha ekspert.",
      education: "O'zMU (Magistratura)",
      experience: "15 yil",
    },
    {
      id: "dep_2",
      name: "Karimova Dilnoza",
      position: t("pos_deputy_spirit") || "Yoshlar ishlari bo'yicha o'rinbosar",
      role: "deputy",
      phone: "+998 71 200-00-03",
      reception: "Seshanba - Payshanba, 10:00 - 16:00",
      bio: "Yoshlar psixologiyasi va ijtimoiy loyihalar bo'yicha mutaxassis.",
      education: "TDPU",
      experience: "12 yil",
    },
    {
      id: "dep_3",
      name: "Tursunov Bekzod",
      position: t("pos_deputy_inno") || "Innovatsiyalar bo'yicha o'rinbosar",
      role: "deputy",
      phone: "+998 71 200-00-04",
      reception: "Chorshanba - Juma, 15:00 - 17:00",
      bio: "IT Park rezidenti, startap loyihalar koordinatori.",
      education: "TATU",
      experience: "8 yil",
    },
  ],
  heads: [
    {
      id: "h1",
      name: "Ismoilova Nargiza",
      position: t("pos_hr") || "Kadrlar bo'limi",
      icon: Users,
    },
    {
      id: "h2",
      name: "Abdullayev Rustam",
      position: t("pos_accountant") || "Bosh hisobchi",
      icon: Building2,
    },
    {
      id: "h3",
      name: "Sodiqov Alisher",
      position: t("pos_lawyer") || "Yuriskonsult",
      icon: BadgeCheck,
    },
    {
      id: "h4",
      name: "Yusupova Malika",
      position: t("pos_press") || "Matbuot kotibi",
      icon: FileText,
    },
  ],
});

// --- 3. KARTA KOMPONENTI (Yangi va Katta) ---
const LeaderCard = ({ leader, isMain, isSmall, onOpen, t }) => {
  const Icon = leader.icon || User;

  return (
    <motion.div
      whileHover={{ y: -10 }}
      onClick={onOpen}
      className={`
        relative bg-white border border-slate-100 transition-all duration-500 cursor-pointer group overflow-hidden flex flex-col items-center text-center
        ${
          isMain
            ? "rounded-[3.5rem] p-12 shadow-[0_20px_50px_-12px_rgba(16,185,129,0.15)] max-w-2xl w-full mx-auto z-30"
            : isSmall
              ? "rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:border-emerald-200 z-10"
              : "rounded-[3rem] p-10 shadow-lg hover:shadow-2xl hover:border-emerald-200 z-20 h-full justify-between"
        }
      `}
    >
      {/* Orqa fon bezagi (Glow) */}
      <div
        className={`absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-emerald-500/10 transition-colors duration-700`}
      />

      {/* Rasm/Icon qismi */}
      <div
        className={`
        relative flex items-center justify-center rounded-[2.5rem] mb-8 transition-all duration-500
        ${
          isMain
            ? "w-40 h-40 bg-emerald-600 text-white shadow-2xl shadow-emerald-200"
            : isSmall
              ? "w-16 h-16 bg-slate-50 text-slate-400 group-hover:bg-emerald-500 group-hover:text-white"
              : "w-24 h-24 bg-slate-50 text-slate-400 group-hover:bg-emerald-600 group-hover:text-white"
        }
      `}
      >
        <Icon size={isMain ? 64 : isSmall ? 28 : 36} strokeWidth={1.5} />
        {isMain && (
          <div className="absolute inset-0 bg-white/20 rounded-[2.5rem] animate-pulse" />
        )}
      </div>

      {/* Lavozim */}
      <span
        className={`font-black uppercase tracking-[0.25em] mb-4 italic ${isMain ? "text-emerald-600 text-xs" : "text-slate-400 text-[9px]"}`}
      >
        {leader.position}
      </span>

      {/* Ism */}
      <h3
        className={`
        font-black text-slate-900 uppercase italic tracking-tighter leading-[0.9] mb-8 group-hover:text-emerald-600 transition-colors
        ${isMain ? "text-4xl md:text-5xl" : isSmall ? "text-lg" : "text-2xl"}
      `}
      >
        {leader.name}
      </h3>

      {/* Tugma */}
      <div
        className={`
        inline-flex items-center gap-2 font-black uppercase tracking-widest transition-all
        ${
          isMain
            ? "px-8 py-4 bg-slate-900 text-white rounded-2xl text-xs hover:bg-emerald-600"
            : "text-[9px] text-slate-400 group-hover:text-emerald-600 border-b border-transparent group-hover:border-emerald-200 pb-1"
        }
      `}
      >
        {t("view_profile") || "Profil"} <ChevronRight size={isMain ? 16 : 12} />
      </div>
    </motion.div>
  );
};

// --- 4. ASOSIY SAHIFA ---
const Management = () => {
  const { t } = useTranslation();
  const [selectedLeader, setSelectedLeader] = useState(null);
  const data = getManagementData(t);

  return (
    <div className="bg-[#fafbfc] min-h-screen pb-40">
      {/* HEADER */}
      <section className="relative bg-[#0a1128] pt-40 pb-52 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <SectionHeader
            badge={t("management_badge")}
            titlePart1={t("management_title_1")}
            titlePart2={t("management_title_2")}
            center
            variant="blue"
          />
        </div>
      </section>

      {/* CONTENT BLOCK */}
      <div className="container mx-auto px-6 -mt-32 relative z-20">
        {/* 1-QAVAT: DIREKTOR */}
        <div className="flex justify-center mb-0 relative z-30">
          <LeaderCard
            leader={data.director}
            isMain
            onOpen={() => setSelectedLeader(data.director)}
            t={t}
          />
        </div>

        {/* --- ANIMATSIYALI "OQIM" CHIZIQLARI (Desktop) --- */}
        <div className="hidden lg:block relative h-40 w-full -mt-10 mb-[-20px] z-10">
          {/* Direktordan pastga tushuvchi magistral */}
          <FlowLine d="M 50% 0 L 50% 50" delay={0.5} />
          {/* Gorizontal taqsimlovchi */}
          <FlowLine d="M 16.6% 50 L 83.4% 50" delay={1.2} />
          {/* 3 ta o'rinbosarga tushuvchi chiziqlar */}
          <FlowLine d="M 16.6% 50 L 16.6% 100" delay={2} />
          <FlowLine d="M 50% 50 L 50% 100" delay={2} />
          <FlowLine d="M 83.4% 50 L 83.4% 100" delay={2} />
        </div>

        {/* 2-QAVAT: O'RINBOSARLAR */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32 pt-10 md:pt-0">
          {data.deputies.map((dep, idx) => (
            <motion.div
              key={dep.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
            >
              <LeaderCard
                leader={dep}
                onOpen={() => setSelectedLeader(dep)}
                t={t}
              />
            </motion.div>
          ))}
        </div>

        {/* Separator */}
        <div className="flex flex-col items-center mb-16 opacity-80">
          <div className="h-16 w-px bg-gradient-to-b from-slate-200 to-transparent"></div>
          <span className="bg-slate-50 px-6 py-2 rounded-full border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] italic">
            {t("heads_of_departments") || "BO'LIM BOSHLIQLARI"}
          </span>
        </div>

        {/* 3-QAVAT: BO'LIMLAR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {data.heads.map((head, idx) => (
            <motion.div
              key={head.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <LeaderCard
                leader={head}
                isSmall
                onOpen={() => setSelectedLeader(head)}
                t={t}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL (PROFILE DETAILS) */}
      <AnimatePresence>
        {selectedLeader && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-[#0a1128]/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-4xl rounded-[3rem] overflow-hidden relative shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedLeader(null)}
                className="absolute top-6 right-6 p-3 bg-slate-100 rounded-full hover:bg-rose-500 hover:text-white transition-all z-50"
              >
                <X size={20} />
              </button>

              {/* Chap Tomon: Info */}
              <div className="md:w-2/5 bg-slate-50 p-12 flex flex-col items-center justify-center text-center border-r border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-blue-500"></div>
                <div className="w-32 h-32 bg-white rounded-[2rem] shadow-xl flex items-center justify-center text-emerald-600 mb-8 transform hover:scale-105 transition-transform duration-500">
                  <User size={64} strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 uppercase italic leading-none mb-3">
                  {selectedLeader.name}
                </h2>
                <div className="px-5 py-2 bg-emerald-100 text-emerald-700 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-200">
                  {selectedLeader.position}
                </div>
              </div>

              {/* O'ng Tomon: Details */}
              <div className="md:w-3/5 p-12 space-y-8 bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100">
                    <Phone className="text-emerald-500 mb-2" size={20} />
                    <p className="text-[9px] font-black text-slate-400 uppercase">
                      Telefon
                    </p>
                    <p className="text-xs font-bold text-slate-800">
                      {selectedLeader.phone || "—"}
                    </p>
                  </div>
                  <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100">
                    <Clock className="text-blue-500 mb-2" size={20} />
                    <p className="text-[9px] font-black text-slate-400 uppercase">
                      Qabul
                    </p>
                    <p className="text-xs font-bold text-slate-800">
                      {selectedLeader.reception || "—"}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 text-[10px] font-black text-slate-900 uppercase tracking-widest mb-4">
                    <Briefcase size={14} className="text-emerald-500" />{" "}
                    Professional Bio
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium italic">
                    {selectedLeader.bio || "Ma'lumotlar yangilanmoqda..."}
                  </p>
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                      <GraduationCap size={16} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase">
                        Ma'lumoti
                      </p>
                      <p className="text-sm font-bold text-slate-800">
                        {selectedLeader.education || "Oliy"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                      <Award size={16} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase">
                        Tajriba
                      </p>
                      <p className="text-sm font-bold text-slate-800">
                        {selectedLeader.experience || "—"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Management;
