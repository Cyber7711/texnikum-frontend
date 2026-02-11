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
  Briefcase,
  GraduationCap,
  Award,
  Users,
  Building2,
  FileText,
  BadgeCheck,
  X,
  Loader2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import axiosClient from "../../api/axiosClient";
import SectionHeader from "../../components/ui/SectionHeader";

// --- 1. CONFIG ---
const ICON_MAP = { Users, Building2, BadgeCheck, FileText };

const resolveImage = (leader) => {
  if (!leader) return null;
  if (leader.imagePreview) return leader.imagePreview;
  if (leader.imageUrl) return leader.imageUrl;
  if (leader.image && !leader.image.includes("/")) {
    return `https://ucarecdn.com/${leader.image}/-/preview/1000x1000/-/quality/smart/-/format/auto/`;
  }
  return null;
};

// --- 2. COMPONENTS ---

// 3D Tilt Card (O'zgarmadi)
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

// Connecting Lines
const OrgConnector = ({ type }) => {
  if (type === "vertical") {
    return (
      <div className="flex justify-center h-20 relative z-0">
        <div className="w-px h-full bg-gradient-to-b from-emerald-500/50 via-emerald-500 to-slate-300" />
      </div>
    );
  }
  if (type === "branch") {
    return (
      <div className="hidden lg:block relative h-16 w-full -mt-1 mb-8 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-slate-300" />
        <div className="absolute top-8 left-[16%] right-[16%] h-px bg-slate-300 border-t border-slate-300" />
        <div className="absolute top-8 left-[16%] w-px h-8 bg-gradient-to-b from-slate-300 to-transparent" />
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-slate-300 to-transparent" />
        <div className="absolute top-8 right-[16%] w-px h-8 bg-gradient-to-b from-slate-300 to-transparent" />
      </div>
    );
  }
  return null;
};

// Leader Card UI
const LeaderCard = ({ leader, variant = "standard", t }) => {
  const isMain = variant === "director";
  const isSmall = variant === "head";
  const imageSrc = resolveImage(leader);
  const Icon = leader?.iconKey ? ICON_MAP[leader.iconKey] : User;

  return (
    <TiltCard
      className={`
        bg-white/90 backdrop-blur-xl border border-white/50 shadow-xl overflow-hidden flex flex-col items-center text-center transition-all duration-300
        ${
          isMain
            ? "rounded-[3rem] p-10 md:p-14 w-full max-w-2xl mx-auto z-20 hover:shadow-emerald-500/20"
            : isSmall
              ? "rounded-[2rem] p-6 hover:border-emerald-300 hover:shadow-lg h-full"
              : "rounded-[2.5rem] p-8 h-full justify-between hover:border-emerald-400 hover:shadow-2xl"
        }
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-slate-100/50 opacity-50" />
      <div className="relative mb-6 group-hover:scale-105 transition-transform duration-500">
        <div
          className={`
            relative rounded-[2rem] overflow-hidden flex items-center justify-center bg-slate-50
            ${
              isMain
                ? "w-48 h-48 shadow-2xl shadow-emerald-900/10 ring-8 ring-white"
                : isSmall
                  ? "w-20 h-20 shadow-lg ring-4 ring-white rounded-full"
                  : "w-32 h-32 shadow-xl ring-4 ring-white rounded-full"
            }
          `}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={leader.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <Icon
              className="text-slate-300"
              size={isMain ? 60 : isSmall ? 28 : 40}
            />
          )}
        </div>
      </div>
      <div className="relative z-10 w-full">
        <span
          className={`block font-bold uppercase tracking-widest mb-2 truncate px-2 ${
            isMain ? "text-emerald-600 text-sm" : "text-slate-400 text-[10px]"
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
        <div className="inline-flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
          <span
            className={`
              font-bold text-xs uppercase tracking-wider
              ${
                isMain
                  ? "px-8 py-3 bg-slate-900 text-white rounded-full hover:bg-emerald-600 transition-colors"
                  : "text-emerald-600"
              }
            `}
          >
            {t("view_profile") || "Profil"}
          </span>
          {!isMain && <ChevronRight size={14} className="text-emerald-600" />}
        </div>
      </div>
    </TiltCard>
  );
};

// --- MODAL (PRO FULL SCREEN VERSION) ---
const ProfileModal = ({ leader, onClose }) => {
  if (!leader) return null;
  const imageSrc = resolveImage(leader);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-6xl h-[85vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* LEFT: FULL HEIGHT IMAGE */}
        <div className="relative w-full md:w-5/12 h-64 md:h-full bg-slate-100 group">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={leader.name}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 bg-slate-50">
              <User size={80} strokeWidth={1.5} />
            </div>
          )}

          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          {/* Info on Image (Bottom) */}
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white z-10">
            <div className="inline-block px-3 py-1 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 rounded-full text-emerald-300 text-[10px] font-black uppercase tracking-widest mb-4">
              {leader.position}
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase italic leading-none mb-2 drop-shadow-lg">
              {leader.name}
            </h2>
          </div>
        </div>

        {/* RIGHT: SCROLLABLE INFO */}
        <div className="flex-1 h-full bg-white flex flex-col relative">
          {/* Header */}
          <div className="flex items-center justify-end p-6 md:p-8 bg-white/80 backdrop-blur sticky top-0 z-20">
            <button
              onClick={onClose}
              className="p-3 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-8 md:px-12 pb-12 space-y-10">
            {/* Bio Section */}
            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                <FileText size={16} className="text-emerald-500" /> Biografiya
              </h4>
              <p className="text-base text-slate-600 leading-relaxed font-medium text-justify">
                {leader.bio || "Ma'lumotlar kiritilmoqda..."}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-emerald-200 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-xl group-hover:scale-110 transition-transform">
                    <Phone size={20} />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    Aloqa
                  </span>
                </div>
                <p className="text-lg font-bold text-slate-800">
                  {leader.phone || "—"}
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-blue-200 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                    <Clock size={20} />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    Qabul Vaqti
                  </span>
                </div>
                <p className="text-lg font-bold text-slate-800">
                  {leader.reception || "—"}
                </p>
              </div>
            </div>

            {/* Detailed Info */}
            <div className="pt-8 border-t border-slate-100 space-y-6">
              <div className="flex gap-5 group">
                <div className="mt-1 p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:text-emerald-500 group-hover:bg-emerald-50 transition-colors">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Ma'lumoti
                  </p>
                  <p className="text-base font-bold text-slate-800 leading-snug">
                    {leader.education || "—"}
                  </p>
                </div>
              </div>

              <div className="flex gap-5 group">
                <div className="mt-1 p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:text-emerald-500 group-hover:bg-emerald-50 transition-colors">
                  <Award size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Tajriba
                  </p>
                  <p className="text-base font-bold text-slate-800 leading-snug">
                    {leader.experience || "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- 3. MAIN PAGE ---
const Management = () => {
  const { t } = useTranslation();
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [data, setData] = useState({ director: null, deputies: [], heads: [] });
  const [loading, setLoading] = useState(true);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  useEffect(() => {
    let alive = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get("/management");
        if (alive && res.data?.data) {
          const doc = res.data.data;
          setData({
            director: doc.director,
            deputies: Array.isArray(doc.deputies) ? doc.deputies : [],
            heads: Array.isArray(doc.heads) ? doc.heads : [],
          });
        }
      } catch (error) {
        console.error("Error fetching management data:", error);
      } finally {
        if (alive) setLoading(false);
      }
    };
    fetchData();
    return () => {
      alive = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-emerald-500" size={40} />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-40 relative overflow-hidden">
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      <section className="relative pt-40 pb-60 bg-[#0a1128] overflow-hidden">
        <motion.div
          style={{ y: y1 }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px]"
        />
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeader
            badge={t("management_badge") || "RAHBARIYAT"}
            titlePart1={t("management_title_1") || "BIZNING"}
            titlePart2={t("management_title_2") || "JAMOAMIZ"}
            center
            variant="blue"
          />
        </div>
      </section>

      <div className="container mx-auto px-6 -mt-40 relative z-10">
        {data.director ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div
              onClick={() => setSelectedLeader(data.director)}
              className="w-full"
            >
              <LeaderCard leader={data.director} variant="director" t={t} />
            </div>
            {(data.deputies.length > 0 || data.heads.length > 0) && (
              <OrgConnector type="vertical" />
            )}
          </motion.div>
        ) : (
          <div className="text-center text-white/50">Direktor kiritilmagan</div>
        )}

        {data.deputies.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            <OrgConnector type="branch" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {data.deputies.map((dep) => (
                <motion.div
                  key={dep._id || dep.id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="relative"
                >
                  <div
                    onClick={() => setSelectedLeader(dep)}
                    className="h-full"
                  >
                    <LeaderCard leader={dep} variant="standard" t={t} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {data.heads.length > 0 && (
          <>
            <div className="py-20 flex items-center justify-center opacity-60">
              <div className="h-px w-20 bg-slate-300" />
              <span className="mx-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 text-center">
                {t("heads_of_departments") || "Bo'lim Boshliqlari"}
              </span>
              <div className="h-px w-20 bg-slate-300" />
            </div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {data.heads.map((head) => (
                <motion.div
                  key={head._id || head.id}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  onClick={() => setSelectedLeader(head)}
                >
                  <LeaderCard leader={head} variant="head" t={t} />
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
