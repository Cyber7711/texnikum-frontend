import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import {
  Phone,
  Clock,
  User,
  ChevronRight,
  GraduationCap,
  Award,
  Users,
  Building2,
  FileText,
  BadgeCheck,
  X,
  Loader2,
  Mail,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import axiosClient from "../../api/axiosClient";
import SectionHeader from "../../components/ui/SectionHeader";

const ICON_MAP = { Users, Building2, BadgeCheck, FileText };

// 3D Tilt Card Component
const TiltCard = ({ children, className, onClick }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  };

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]), {
    stiffness: 150,
    damping: 20,
  });

  return (
    <motion.div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative group cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Tree Connectors
const OrgConnector = ({ type }) => {
  if (type === "vertical") {
    return (
      <div className="flex justify-center h-24 relative z-0">
        <div className="w-px h-full bg-gradient-to-b from-emerald-500 via-emerald-400 to-slate-200 opacity-50" />
      </div>
    );
  }
  if (type === "branch") {
    return (
      <div className="hidden lg:block relative h-16 w-full -mt-1 mb-8 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-slate-200" />
        <div className="absolute top-8 left-[16%] right-[16%] h-px bg-slate-200" />
        <div className="absolute top-8 left-[16%] w-px h-8 bg-gradient-to-b from-slate-200 to-transparent" />
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-slate-200 to-transparent" />
        <div className="absolute top-8 right-[16%] w-px h-8 bg-gradient-to-b from-slate-200 to-transparent" />
      </div>
    );
  }
  return null;
};

// Leader Card UI
const LeaderCard = ({ leader, variant = "standard", t, onOpen }) => {
  const isMain = variant === "director";
  const isSmall = variant === "head";

  const imageSrc = leader?.imageUrl || null;
  const Icon = leader?.iconKey ? ICON_MAP[leader.iconKey] || User : User;

  return (
    <TiltCard
      onClick={onOpen}
      className={`
        bg-white/95 backdrop-blur-xl border border-white/60 shadow-xl overflow-hidden flex flex-col items-center text-center transition-all duration-300
        ${
          isMain
            ? "rounded-[3rem] p-10 md:p-14 w-full max-w-2xl mx-auto z-20 hover:shadow-emerald-500/30 border-t-emerald-100"
            : isSmall
              ? "rounded-[2rem] p-6 hover:border-emerald-300 hover:shadow-lg h-full"
              : "rounded-[2.5rem] p-8 h-full justify-between hover:border-emerald-400 hover:shadow-2xl"
        }
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-slate-50/50 opacity-50" />

      {/* Avatar */}
      <div className="relative mb-6 group-hover:scale-105 transition-transform duration-500">
        <div
          className={`
            relative overflow-hidden flex items-center justify-center bg-slate-50
            ${
              isMain
                ? "w-48 h-48 shadow-2xl shadow-emerald-900/10 ring-8 ring-white rounded-[2rem]"
                : isSmall
                  ? "w-24 h-24 shadow-lg ring-4 ring-white rounded-[1.2rem]"
                  : "w-36 h-36 shadow-xl ring-4 ring-white rounded-[1.5rem]"
            }
          `}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={leader?.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <Icon
              className="text-slate-300"
              size={isMain ? 60 : isSmall ? 32 : 48}
            />
          )}
        </div>
      </div>

      {/* Text Info */}
      <div className="relative z-10 w-full">
        <span
          className={`block font-black uppercase tracking-widest mb-2 truncate px-2 ${
            isMain ? "text-emerald-600 text-sm" : "text-emerald-500 text-[10px]"
          }`}
        >
          {leader?.position || "Lavozim"}
        </span>

        <h3
          className={`
            font-black text-slate-900 leading-tight mb-6 line-clamp-2
            ${isMain ? "text-4xl md:text-5xl" : isSmall ? "text-lg" : "text-xl"}
          `}
        >
          {leader?.name || "Ism Familya"}
        </h3>

        {/* Action Button */}
        <div className="inline-flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
          <span
            className={`
              font-black text-[10px] uppercase tracking-widest italic
              ${
                isMain
                  ? "px-8 py-4 bg-slate-900 text-white rounded-[1.5rem] hover:bg-emerald-600 transition-colors shadow-lg"
                  : "text-slate-500 group-hover:text-emerald-600"
              }
            `}
          >
            {t("view_profile") || "Profilni ko‘rish"}
          </span>
          {!isMain && (
            <ChevronRight
              size={14}
              className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          )}
        </div>
      </div>
    </TiltCard>
  );
};

// Advanced Profile Modal
const ProfileModal = ({ leader, onClose }) => {
  if (!leader) return null;
  const imageSrc = leader?.imageUrl || null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl h-[90vh] md:h-[80vh] bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row relative"
      >
        {/* Left Side: Photo Cover */}
        <div className="relative w-full md:w-5/12 h-64 md:h-full bg-slate-100 group">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={leader?.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 bg-slate-50">
              <User size={80} strokeWidth={1.5} />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 text-white z-10">
            <div className="inline-block px-4 py-1.5 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 rounded-full text-emerald-300 text-[10px] font-black uppercase tracking-widest mb-4">
              {leader?.position || "Lavozim"}
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase italic leading-tight drop-shadow-lg">
              {leader?.name || "—"}
            </h2>
          </div>
        </div>

        {/* Right Side: Information */}
        <div className="flex-1 h-full bg-white flex flex-col relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-full transition-colors z-20"
          >
            <X size={20} />
          </button>

          <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-10 pt-20 md:pt-12 scrollbar-hide">
            {/* Bio Section */}
            <div>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <FileText size={16} className="text-emerald-500" /> Biografiya
              </h4>
              <p className="text-base text-slate-700 leading-[1.8] font-medium text-justify">
                {leader?.bio ||
                  "Ushbu rahbar haqida qisqacha ma'lumot kiritilmoqda..."}
              </p>
            </div>

            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-slate-50 rounded-[1.5rem] border border-transparent hover:border-emerald-200 transition-colors group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl group-hover:scale-110 transition-transform">
                    <Phone size={18} />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    Telefon raqam
                  </span>
                </div>
                <p className="text-lg font-bold text-slate-800">
                  {leader?.phone || "Kiritilmagan"}
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-[1.5rem] border border-transparent hover:border-blue-200 transition-colors group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                    <Clock size={18} />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    Qabul vaqti
                  </span>
                </div>
                <p className="text-lg font-bold text-slate-800">
                  {leader?.reception || "Kiritilmagan"}
                </p>
              </div>
            </div>

            {/* Detailed Info */}
            <div className="pt-8 border-t border-slate-100 space-y-8">
              <div className="flex gap-5">
                <div className="mt-1 p-3 bg-slate-50 rounded-2xl text-slate-400">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Ma’lumoti
                  </p>
                  <p className="text-lg font-bold text-slate-800 leading-snug">
                    {leader?.education || "Kiritilmagan"}
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="mt-1 p-3 bg-slate-50 rounded-2xl text-slate-400">
                  <Award size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Tajribasi
                  </p>
                  <p className="text-lg font-bold text-slate-800 leading-snug">
                    {leader?.experience
                      ? `${leader.experience} yil`
                      : "Kiritilmagan"}
                  </p>
                </div>
              </div>

              {leader?.email && (
                <div className="flex gap-5">
                  <div className="mt-1 p-3 bg-slate-50 rounded-2xl text-slate-400">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Email manzil
                    </p>
                    <p className="text-lg font-bold text-slate-800 leading-snug">
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

// Main Page Component
const Management = () => {
  const { t } = useTranslation();
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [data, setData] = useState({ director: null, deputies: [], heads: [] });
  const [loading, setLoading] = useState(true);

  const { scrollY } = useScroll();
  const yGlow = useTransform(scrollY, [0, 600], [0, 220]);

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
      <div className="min-h-screen flex items-center justify-center bg-[#fafbfc]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-emerald-500" size={48} />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            Jamoa yuklanmoqda...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fafbfc] min-h-screen pb-40 relative overflow-hidden">
      {/* Dynamic Background */}
      <section className="relative pt-40 pb-64 bg-[#0a1128] overflow-hidden">
        <motion.div
          style={{ y: yGlow }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"
        />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <SectionHeader
            badge={t("management_badge") || "RAHBARIYAT"}
            titlePart1={t("management_title_1") || "BIZNING"}
            titlePart2={t("management_title_2") || "JAMOAMIZ"}
            center
            variant="blue"
          />
        </div>
      </section>

      <div className="container mx-auto px-6 -mt-48 relative z-10">
        {/* Level 1: Director */}
        {data.director && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div className="w-full">
              <LeaderCard
                leader={data.director}
                variant="director"
                t={t}
                onOpen={() => setSelectedLeader(data.director)}
              />
            </div>
            {(data.deputies.length > 0 || data.heads.length > 0) && (
              <OrgConnector type="vertical" />
            )}
          </motion.div>
        )}

        {/* Level 2: Deputies */}
        {data.deputies.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            <OrgConnector type="branch" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {data.deputies.map((dep) => (
                <motion.div
                  key={dep._id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <LeaderCard
                    leader={dep}
                    variant="standard"
                    t={t}
                    onOpen={() => setSelectedLeader(dep)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Level 3: Department Heads */}
        {data.heads.length > 0 && (
          <>
            <div className="py-24 flex items-center justify-center opacity-60">
              <div className="h-px w-16 bg-slate-300" />
              <span className="mx-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 text-center">
                {t("heads_of_departments") || "Bo‘lim boshliqlari"}
              </span>
              <div className="h-px w-16 bg-slate-300" />
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {data.heads.map((head) => (
                <motion.div
                  key={head._id}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                >
                  <LeaderCard
                    leader={head}
                    variant="head"
                    t={t}
                    onOpen={() => setSelectedLeader(head)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>

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
