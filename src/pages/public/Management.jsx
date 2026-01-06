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
} from "lucide-react";
import { useTranslation } from "react-i18next";

const Management = () => {
  const { t } = useTranslation();
  const [selectedLeader, setSelectedLeader] = useState(null);

  const managementData = {
    director: {
      id: "dir_1",
      name: "Falonchiyev Pismonchi",
      position: t("dir_title") || "Politexnikum Direktori",
      image: null,
      reception: "Dushanba - Chorshanba, 09:00 - 12:00",
      phone: "+998 71 123 45 67",
      email: "director@texnikum.uz",
      bio: t("dir_bio") || "Ko'p yillik tajribaga ega ta'lim boshqaruvchisi...",
      education: "O'zbekiston Milliy Universiteti (PhD)",
      experience: "25 yil",
    },
    deputies: [
      {
        id: "dep_1",
        name: "Eshmatov Toshmat",
        position: t("deputy_edu") || "O'quv ishlari bo'yicha o'rinbosar",
        image: null,
        reception: "Seshanba - Payshanba, 14:00 - 17:00",
        phone: "+998 71 123 45 68",
        email: "deputy_edu@texnikum.uz",
        bio: "O'quv metodikasi bo'yicha mutaxassis...",
        education: "Toshkent Davlat Texnika Universiteti",
        experience: "18 yil",
      },
      {
        id: "dep_2",
        name: "Abdukarimov Ali",
        position:
          t("deputy_spiritual") ||
          "Ma'naviy-ma'rifiy ishlar bo'yicha o'rinbosar",
        image: null,
        reception: "Har kuni, 09:00 - 11:00",
        phone: "+998 71 123 45 69",
        email: "spiritual@texnikum.uz",
        bio: "Yoshlar bilan ishlash bo'yicha ekspert...",
        education: "Samarqand Davlat Universiteti",
        experience: "12 yil",
      },
    ],
    staff: [
      {
        id: "staff_1",
        name: "Karimov Sherzod",
        position: "Kadrlar bo'limi boshlig'i",
        reception: "Dushanba - Juma, 09:00 - 18:00",
        phone: "+998 71 123 45 10",
        email: "hr@texnikum.uz",
        bio: "Xodimlarni boshqarish va mehnat qonunchiligi bo'yicha mutaxassis.",
        education: "Toshkent Davlat Yuridik Universiteti",
        experience: "10 yil",
      },
      {
        id: "staff_2",
        name: "Sultonova Malika",
        position: "Bosh hisobchi",
        reception: "Chorshanba - Juma, 10:00 - 16:00",
        phone: "+998 71 123 45 11",
        email: "finance@texnikum.uz",
        bio: "Moliya va buxgalteriya hisobi bo'yicha katta tajribaga ega.",
        education: "Toshkent Davlat Iqtisodiyot Universiteti",
        experience: "15 yil",
      },
      {
        id: "staff_3",
        name: "Nasimov Bekzod",
        position: "Xo'jalik ishlari mudiri",
        reception: "Har kuni, 08:00 - 17:00",
        phone: "+998 71 123 45 12",
        email: "supply@texnikum.uz",
        bio: "Texnikum moddiy-texnik bazasini ta'minlash bo'yicha mas'ul.",
        education: "Samarqand Iqtisodiyot va Servis Instituti",
        experience: "20 yil",
      },
    ],
  };

  return (
    <div className="bg-[#fafbfc] min-h-screen pb-32">
      {/* 1. DARK HERO SECTION */}
      <section className="relative bg-[#0a1128] pt-32 pb-48 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -mr-40 -mt-40"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
          >
            <ShieldCheck size={14} fill="currentColor" />{" "}
            {t("management_badge")}
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase italic tracking-tighter leading-tight">
            Tashkiliy <span className="text-blue-500 not-italic">Tuzilma</span>
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-6 -mt-24 relative z-20">
        {/* --- DIREKTOR BLOKI --- */}
        <div className="flex justify-center mb-24">
          <LeaderCard
            leader={managementData.director}
            isMain={true}
            onOpen={() => setSelectedLeader(managementData.director)}
          />
        </div>

        {/* --- O'RINBOSARLAR BLOKI --- */}
        <div className="flex flex-col items-center mb-16">
          <div className="w-px h-16 bg-gradient-to-b from-blue-500 to-transparent"></div>
          <div className="px-6 py-2 rounded-full border border-slate-200 bg-white text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] shadow-sm">
            Direktor o'rinbosarlari
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-32">
          {managementData.deputies.map((dep) => (
            <LeaderCard
              key={dep.id}
              leader={dep}
              onOpen={() => setSelectedLeader(dep)}
            />
          ))}
        </div>

        {/* --- MAS'UL XODIMLAR BLOKI --- */}
        <div className="flex flex-col items-center mb-16">
          <div className="w-px h-16 bg-gradient-to-b from-slate-200 to-transparent"></div>
          <div className="px-6 py-2 rounded-full border border-slate-200 bg-white text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] shadow-sm">
            Mas'ul xodimlar
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {managementData.staff.map((s) => (
            <LeaderCard
              key={s.id}
              leader={s}
              isStaff={true}
              onOpen={() => setSelectedLeader(s)}
            />
          ))}
        </div>
      </div>

      {/* --- MODAL OYNA --- */}
      <AnimatePresence>
        {selectedLeader && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-5xl rounded-[3rem] overflow-hidden relative shadow-2xl flex flex-col md:flex-row"
            >
              <button
                onClick={() => setSelectedLeader(null)}
                className="absolute top-6 right-6 p-3 bg-slate-100 rounded-full hover:bg-rose-50 hover:text-rose-500 transition-all z-10 text-slate-500"
              >
                <X size={24} />
              </button>

              {/* Modal Chap tomon (Rasm va Ism) */}
              <div className="md:w-2/5 bg-slate-50 p-12 flex flex-col items-center justify-center border-r border-slate-100">
                <div className="w-48 h-48 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center text-slate-200 mb-6 border border-slate-100">
                  <User size={100} strokeWidth={1} />
                </div>
                <h3 className="text-3xl font-black text-slate-900 text-center uppercase italic leading-tight mb-2 tracking-tighter">
                  {selectedLeader.name}
                </h3>
                <span className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-[9px] font-black uppercase tracking-widest">
                  {selectedLeader.position}
                </span>
              </div>

              {/* Modal O'ng tomon (Ma'lumotlar) */}
              <div className="md:w-3/5 p-12 overflow-y-auto max-h-[80vh]">
                <div className="space-y-10">
                  <section>
                    <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 italic">
                      <Award size={14} className="text-blue-500" /> Biografiya
                      va faoliyat
                    </h4>
                    <p className="text-slate-600 leading-relaxed italic text-sm">
                      {selectedLeader.bio}
                    </p>
                  </section>

                  <div className="grid grid-cols-2 gap-4">
                    <InfoBox
                      icon={<GraduationCap size={16} />}
                      label="Ma'lumoti"
                      value={selectedLeader.education}
                    />
                    <InfoBox
                      icon={<Zap size={16} />}
                      label="Ish staji"
                      value={selectedLeader.experience}
                    />
                  </div>

                  <section className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 italic">
                      Bog'lanish ma'lumotlari
                    </h4>
                    <ContactRow
                      icon={<Clock size={16} />}
                      label="Qabul vaqti"
                      value={selectedLeader.reception}
                    />
                    <ContactRow
                      icon={<Phone size={16} />}
                      label="Telefon"
                      value={selectedLeader.phone}
                    />
                    <ContactRow
                      icon={<Mail size={16} />}
                      label="Elektron pochta"
                      value={selectedLeader.email}
                    />
                  </section>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- YORDAMCHI KOMPONENTLAR ---

const LeaderCard = ({ leader, isMain, isStaff, onOpen }) => (
  <motion.div
    whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
    className={`${
      isMain ? "max-w-xl" : isStaff ? "max-w-md" : "w-full"
    } bg-white p-8 rounded-[3.5rem] border border-slate-100 shadow-lg relative group transition-all duration-500`}
  >
    <div
      className={`flex flex-col ${
        isStaff ? "items-center text-center" : "md:flex-row items-center"
      } gap-6`}
    >
      <div
        className={`${
          isMain ? "w-36 h-36" : isStaff ? "w-24 h-24" : "w-28 h-28"
        } bg-slate-50 rounded-[2.5rem] flex-shrink-0 flex items-center justify-center text-slate-200 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500`}
      >
        <User size={isMain ? 60 : 40} strokeWidth={1} />
      </div>
      <div
        className={`flex-grow ${
          isStaff ? "text-center" : "text-center md:text-left"
        }`}
      >
        <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.2em] mb-2 block">
          {leader.position}
        </span>
        <h3
          className={`${
            isMain ? "text-3xl" : "text-xl"
          } font-black text-slate-900 uppercase italic tracking-tighter leading-none mb-4`}
        >
          {leader.name}
        </h3>
        <button
          onClick={onOpen}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-black text-[10px] uppercase tracking-widest transition-all italic"
        >
          Batafsil ma'lumot <ArrowRight size={14} />
        </button>
      </div>
    </div>
  </motion.div>
);

const InfoBox = ({ icon, label, value }) => (
  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-colors">
    <div className="text-blue-500 mb-3">{icon}</div>
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
      {label}
    </p>
    <p className="text-xs font-bold text-slate-800 leading-tight">{value}</p>
  </div>
);

const ContactRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-4">
    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-blue-500 shadow-sm">
      {icon}
    </div>
    <div>
      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
        {label}
      </p>
      <p className="text-xs font-bold text-slate-700">{value}</p>
    </div>
  </div>
);

export default Management;
