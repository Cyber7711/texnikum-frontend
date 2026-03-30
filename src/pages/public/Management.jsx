import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Phone,
  Clock,
  User,
  ArrowRight,
  GraduationCap,
  Award,
  Users,
  Building2,
  FileText,
  BadgeCheck,
  X,
  Loader2,
  Mail,
  Landmark,
  Briefcase,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import axiosClient from "../../api/axiosClient";

const ICON_MAP = { Users, Building2, BadgeCheck, FileText, Briefcase };

// UNIVERSAL IMAGE HELPER
const getLeaderImage = (leader) => {
  if (!leader) return null;
  const url =
    leader.imageUrl || leader.photoUrl || leader.image || leader.photo;
  if (url && url.includes("http")) return url;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    leader.name || "User",
  )}&background=0f172a&color=ffffff&size=512`;
};

// --- LEADER CARD (Gorizontal Direktor va Ixcham O'rinbosarlar) ---
const LeaderCard = ({ leader, variant = "standard", t, onOpen }) => {
  const isMain = variant === "director";
  const imageSrc = getLeaderImage(leader);
  const Icon = leader?.iconKey ? ICON_MAP[leader.iconKey] || User : User;

  // DIREKTOR UCHUN MAXSUS GORIZONTAL KARTA (Yon tomonlar ochiq qolmasligi uchun)
  if (isMain) {
    return (
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-5xl mx-auto bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(10,25,48,0.08)] flex flex-col md:flex-row cursor-pointer group relative z-10"
        onClick={onOpen}
      >
        <div className="absolute top-0 left-0 w-full md:w-1.5 h-1.5 md:h-full bg-amber-400 z-20" />

        {/* Rasm qismi (Gorizontal kartaning chap qismi) */}
        <div className="w-full md:w-2/5 aspect-[4/5] md:aspect-auto relative bg-slate-100 overflow-hidden shrink-0">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={leader?.name}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate-300 bg-slate-100">
              <Icon size={64} strokeWidth={1} />
            </div>
          )}
        </div>

        {/* Ma'lumot qismi (Gorizontal kartaning o'ng qismi) */}
        <div className="p-8 md:p-12 flex flex-col justify-center flex-grow bg-white relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-bold uppercase tracking-widest mb-4 w-max">
            <Award size={14} /> {leader?.position || "Tashkilot Rahbari"}
          </div>

          <h3 className="font-extrabold text-[#0a1930] text-3xl md:text-4xl leading-tight mb-6">
            {leader?.name || "Ism Familiya"}
          </h3>

          {leader?.bio && (
            <p className="text-slate-500 font-medium leading-relaxed line-clamp-3 mb-8">
              {leader.bio}
            </p>
          )}

          <div className="mt-auto inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#0a1930] group-hover:text-amber-500 transition-colors w-max">
            {t("view_profile", "Batafsil ma'lumotni ko'rish")}
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-amber-50 transition-colors">
              <ArrowRight
                size={16}
                className="transition-transform transform group-hover:translate-x-1"
              />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // O'RINBOSAR VA BO'LIM BOSHLIQLARI UCHUN IXCHAM VERTIKAL KARTA
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white border border-slate-100 rounded-[1.25rem] overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(10,25,48,0.08)] flex flex-col h-full group cursor-pointer relative z-10 w-full"
      onClick={onOpen}
    >
      <div className="absolute top-0 left-0 w-full h-1 z-20 transition-all duration-500 bg-blue-600 scale-x-0 group-hover:scale-x-100 origin-left" />

      <div className="relative bg-slate-100/50 aspect-[3/4] overflow-hidden p-3 pb-0">
        <div className="w-full h-full rounded-t-xl overflow-hidden relative border border-slate-200/50 border-b-0">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={leader?.name}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate-300 bg-slate-100">
              <Icon size={48} strokeWidth={1.5} />
            </div>
          )}
          {/* Gradient qoldiramiz (faqat ism o'qilishi uchun), lekin ism va lavozimni pastga oq fonga oldik */}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow bg-white relative z-10">
        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest leading-relaxed line-clamp-2 mb-2">
          {leader?.position || "Lavozim"}
        </p>
        <h3 className="font-extrabold text-[#0a1930] text-base leading-snug line-clamp-2 mb-4">
          {leader?.name || "Ism Familiya"}
        </h3>

        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors">
            {t("view_profile", "Batafsil")}
          </span>
          <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
            <ArrowRight
              size={14}
              className="text-slate-400 group-hover:text-blue-600 transition-transform transform group-hover:translate-x-0.5"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- PROFILE MODAL (Rasmlarni yopib qo'ymaydigan toza CV ko'rinishida) ---
const ProfileModal = ({ leader, onClose }) => {
  if (!leader) return null;
  const imageSrc = getLeaderImage(leader);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-[#0a1930]/60 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative max-h-[90vh] border border-white/20"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 rounded-full transition-colors z-20"
        >
          <X size={20} />
        </button>

        {/* CHAP TOMON: FAQAT RASM (Yozuvlarsiz) */}
        <div className="w-full md:w-2/5 h-72 md:h-auto bg-slate-50 relative shrink-0 p-4 md:p-6 pb-0 md:pb-6">
          <div className="w-full h-full rounded-2xl overflow-hidden relative shadow-inner border border-slate-200/50">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={leader?.name}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-100">
                <User size={80} strokeWidth={1} />
              </div>
            )}
          </div>
        </div>

        {/* O'NG TOMON: BARCHA MA'LUMOTLAR (Oq fonda, toshib ketmaydi) */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-white">
          <div className="mb-8 border-b border-slate-100 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-bold uppercase tracking-widest mb-4">
              {leader?.position || "Lavozim"}
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1930] leading-tight">
              {leader?.name || "—"}
            </h2>
          </div>

          <div className="space-y-8">
            <div>
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <FileText size={16} className="text-blue-600" /> Biografiya
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed font-medium whitespace-pre-wrap">
                {leader?.bio ||
                  "Ushbu xodim haqida qo'shimcha ma'lumot kiritilmagan."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <Phone size={14} className="text-slate-400" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Telefon
                  </span>
                </div>
                <p className="text-sm font-bold text-[#0a1930]">
                  {leader?.phone || "Kiritilmagan"}
                </p>
              </div>
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={14} className="text-amber-500" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Qabul vaqti
                  </span>
                </div>
                <p className="text-sm font-bold text-[#0a1930]">
                  {leader?.reception || "Kiritilmagan"}
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-start gap-4 hover:bg-slate-50 p-2 -ml-2 rounded-xl transition-colors">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                    Ma'lumoti
                  </p>
                  <p className="text-sm font-bold text-slate-900 leading-snug">
                    {leader?.education || "Kiritilmagan"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 hover:bg-slate-50 p-2 -ml-2 rounded-xl transition-colors">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                  <Award size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                    Mehnat tajribasi
                  </p>
                  <p className="text-sm font-bold text-slate-900 leading-snug">
                    {leader?.experience
                      ? `${leader.experience} yil`
                      : "Kiritilmagan"}
                  </p>
                </div>
              </div>
              {leader?.email && (
                <div className="flex items-start gap-4 hover:bg-slate-50 p-2 -ml-2 rounded-xl transition-colors">
                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                    <Mail size={20} />
                  </div>
                  <div className="w-full overflow-hidden">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                      Elektron pochta
                    </p>
                    <p className="text-sm font-bold text-slate-900 leading-snug truncate">
                      {leader.email}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- MAIN PAGE ---
const Management = () => {
  const { t } = useTranslation();
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [data, setData] = useState({ director: null, deputies: [], heads: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get("/management");
        if (!alive) return;
        const doc = res.data?.data;
        setData({
          director: doc?.director || null,
          deputies: Array.isArray(doc?.deputies) ? doc.deputies : [],
          heads: Array.isArray(doc?.heads) ? doc.heads : [],
        });
      } catch (err) {
        if (!alive) return;
        setData({ director: null, deputies: [], heads: [] });
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-blue-600" size={40} />
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Yuklanmoqda...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-32 font-sans">
      {/* Rasmiy va Kinematografik Header Section */}
      <section className="bg-[#0a1930] pt-32 pb-32 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-[#0a1930] to-[#0a1930] pointer-events-none" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest mb-8 backdrop-blur-sm"
          >
            <Landmark size={14} className="text-amber-400" />
            Samarqand viloyati, Pastdarg'om tumaniga qarashli
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tight leading-tight"
          >
            3-SON TEXNIKUMI O'QUV MUASSASASI <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
              RAHBARIYATI
            </span>
          </motion.h1>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 80, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
            className="h-1.5 bg-blue-600 mx-auto mt-10 rounded-full"
          />
        </div>
      </section>

      {/* Content Section */}
      <div className="container mx-auto px-6 -mt-16 relative z-20">
        {/* RAHBAR (Direktor) */}
        {data.director && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-24"
          >
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest text-center mb-8 flex items-center justify-center gap-4">
              <span className="w-12 h-px bg-slate-300"></span> Tashkilot Rahbari{" "}
              <span className="w-12 h-px bg-slate-300"></span>
            </h2>
            <LeaderCard
              leader={data.director}
              variant="director"
              t={t}
              onOpen={() => setSelectedLeader(data.director)}
            />
          </motion.div>
        )}

        {/* O'RINBOSARLAR */}
        {data.deputies.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-24"
          >
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest text-center mb-8 flex items-center justify-center gap-4">
              <span className="w-12 h-px bg-slate-300"></span> Direktor
              O'rinbosarlari <span className="w-12 h-px bg-slate-300"></span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center max-w-7xl mx-auto">
              {data.deputies.map((dep) => (
                <LeaderCard
                  key={dep._id}
                  leader={dep}
                  variant="standard"
                  t={t}
                  onOpen={() => setSelectedLeader(dep)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* BO'LIM BOSHLIQLARI */}
        {data.heads.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest text-center mb-8 flex items-center justify-center gap-4">
              <span className="w-12 h-px bg-slate-300"></span> Bo'lim va Markaz
              Boshliqlari <span className="w-12 h-px bg-slate-300"></span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 max-w-7xl mx-auto">
              {data.heads.map((head) => (
                <LeaderCard
                  key={head._id}
                  leader={head}
                  variant="head"
                  t={t}
                  onOpen={() => setSelectedLeader(head)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedLeader && (
          <ProfileModal
            leader={selectedLeader}
            onClose={() => setSelectedLeader(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Management;
