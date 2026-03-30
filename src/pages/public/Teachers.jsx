import { useEffect, useState, useMemo } from "react";
import {
  Mail,
  Phone,
  GraduationCap,
  Loader2,
  Bookmark,
  Award,
  ArrowRight,
  User,
  FileText,
  X,
  Landmark,
  Briefcase,
  Star,
  Search,
  Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import axiosClient from "../../api/axiosClient";

// UNIVERSAL IMAGE HELPER
const getAvatar = (teacher) => {
  if (!teacher) return null;
  const url =
    teacher.imageUrl || teacher.photoUrl || teacher.image || teacher.photo;
  if (url && url.includes("http")) return url;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    teacher.fullname || "Teacher",
  )}&background=0a1930&color=ffffff&size=512`;
};

// --- TEACHER CARD (Rahbariyat dizayni bilan bir xil, Tezkor aloqa qo'shilgan) ---
const TeacherCard = ({ teacher, t, onOpen }) => {
  const imageSrc = getAvatar(teacher);

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white border border-slate-200 rounded-[1.5rem] overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(10,25,48,0.08)] flex flex-col h-full group relative z-10 w-full"
    >
      {/* Tepa chiziq effekti (Rahbariyat bilan bir xil Blue) */}
      <div className="absolute top-0 left-0 w-full h-1 z-20 transition-all duration-500 bg-blue-600 scale-x-0 group-hover:scale-x-100 origin-left" />

      {/* Rasm qismi (Ixcham 3:4 Portret formati) */}
      <div
        className="relative bg-slate-100/50 aspect-[3/4] overflow-hidden p-3 pb-0 cursor-pointer"
        onClick={() => onOpen(teacher)}
      >
        <div className="w-full h-full rounded-t-xl overflow-hidden relative border border-slate-200/50 border-b-0 bg-slate-100">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={teacher?.fullname}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate-300">
              <User size={64} strokeWidth={1.5} />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1930]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

          {/* Fan nomi rasm ustida chiroyli */}
          <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 text-[#0a1930] rounded-md text-[10px] font-bold uppercase tracking-widest mb-2 shadow-md truncate max-w-[90%]">
              <Bookmark size={12} className="shrink-0" />{" "}
              {teacher?.subject || "Fan o'qituvchisi"}
            </div>
            <h3 className="font-extrabold text-white leading-tight text-lg line-clamp-2 drop-shadow-md">
              {teacher?.fullname || "Ism Familiya"}
            </h3>
          </div>
        </div>
      </div>

      {/* Ma'lumot qismi */}
      <div className="p-5 flex flex-col flex-grow bg-white relative z-10">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
            {teacher?.experience
              ? `${teacher.experience} yillik tajriba`
              : "Toifali o'qituvchi"}
          </p>
          <div className="flex items-center text-amber-400">
            <Star size={12} fill="currentColor" />
          </div>
        </div>

        {/* Tezkor aloqa va Batafsil tugmasi */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex gap-2">
            {teacher?.phone && (
              <a
                href={`tel:${teacher.phone}`}
                className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                title="Qo'ng'iroq qilish"
              >
                <Phone size={12} />
              </a>
            )}
            {teacher?.email && (
              <a
                href={`mailto:${teacher.email}`}
                className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors"
                title="Pochta yozish"
              >
                <Mail size={12} />
              </a>
            )}
          </div>

          <div
            onClick={() => onOpen(teacher)}
            className="inline-flex items-center gap-2 cursor-pointer group/btn"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover/btn:text-blue-600 transition-colors">
              {t("view_profile", "Batafsil")}
            </span>
            <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center group-hover/btn:bg-blue-50 transition-colors">
              <ArrowRight
                size={12}
                className="text-slate-400 group-hover/btn:text-blue-600 transition-transform transform group-hover/btn:translate-x-0.5"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- PROFILE MODAL (Rahbariyatdagi kabi toza CV ko'rinishi) ---
const ProfileModal = ({ teacher, onClose }) => {
  if (!teacher) return null;
  const imageSrc = getAvatar(teacher);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-[#0a1930]/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row relative max-h-[90vh] border border-white/20"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 rounded-full transition-colors z-20 shadow-sm"
        >
          <X size={20} />
        </button>

        {/* CHAP TOMON: Katta rasm */}
        <div className="w-full md:w-2/5 h-80 md:h-auto bg-slate-50 relative shrink-0 p-4 md:p-6 pb-0 md:pb-6">
          <div className="w-full h-full rounded-[2rem] overflow-hidden relative shadow-inner border border-slate-200/50">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={teacher?.fullname}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-100">
                <User size={80} strokeWidth={1} />
              </div>
            )}
          </div>
        </div>

        {/* O'NG TOMON: CV FORMAT */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 bg-white">
          <div className="mb-10 border-b border-slate-100 pb-8 pr-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-400 text-[#0a1930] rounded-lg text-[10px] font-extrabold uppercase tracking-widest mb-4">
              <Bookmark size={14} /> {teacher?.subject || "Fan o'qituvchisi"}
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1930] leading-tight whitespace-normal [text-wrap:balance]">
              {teacher?.fullname || "—"}
            </h2>
          </div>

          <div className="space-y-8">
            <div>
              <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FileText size={16} className="text-blue-600" />
                </div>
                Pedagogik Biografiya
              </h4>
              <p className="text-sm text-slate-700 leading-[1.8] font-medium whitespace-pre-wrap">
                {teacher?.bio ||
                  "Ushbu pedagog haqida qo'shimcha ma'lumot hozircha tizimga kiritilmagan."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {teacher?.phone && (
                <a
                  href={`tel:${teacher.phone}`}
                  className="p-5 bg-slate-50 hover:bg-white rounded-2xl border border-slate-100 hover:border-blue-200 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Phone size={14} className="text-blue-600" />
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                      Aloqa uchun
                    </span>
                  </div>
                  <p className="text-sm font-bold text-[#0a1930]">
                    {teacher.phone}
                  </p>
                </a>
              )}
              {teacher?.email && (
                <a
                  href={`mailto:${teacher.email}`}
                  className="p-5 bg-slate-50 hover:bg-white rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all duration-300 group cursor-pointer overflow-hidden"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Mail size={14} className="text-emerald-600" />
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                      Elektron pochta
                    </span>
                  </div>
                  <p className="text-sm font-bold text-[#0a1930] truncate">
                    {teacher.email}
                  </p>
                </a>
              )}
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors -ml-3">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Ma'lumoti / Toifasi
                  </p>
                  <p className="text-sm font-bold text-slate-900 leading-snug">
                    {teacher?.education || "Oliy"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors -ml-3">
                <div className="p-2.5 bg-amber-50 text-amber-600 rounded-lg shrink-0">
                  <Award size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Mehnat tajribasi
                  </p>
                  <p className="text-sm font-bold text-slate-900 leading-snug">
                    {teacher?.experience
                      ? `${teacher.experience} yillik tajriba`
                      : "Kiritilmagan"}
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

// --- MAIN PAGE ---
const Teachers = () => {
  const { t } = useTranslation();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  // Filter va Qidiruv uchun State'lar
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("Barchasi");

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get("/teachers");
        const data = res.data.data || res.data.result || res.data;
        setTeachers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Xatolik:", err);
        setTeachers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
    window.scrollTo(0, 0);
  }, []);

  // O'qituvchilarni filterlash logikasi
  const subjects = useMemo(() => {
    const allSubjects = teachers.map((t) => t.subject).filter(Boolean);
    return ["Barchasi", ...new Set(allSubjects)];
  }, [teachers]);

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const matchesSearch = (teacher.fullname || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesSubject =
        selectedSubject === "Barchasi" || teacher.subject === selectedSubject;
      return matchesSearch && matchesSubject;
    });
  }, [teachers, searchQuery, selectedSubject]);

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-32 font-sans">
      {/* Rasmiy va Kinematografik Header Section (Rahbariyat bilan bir xil) */}
      <section className="bg-[#0a1930] pt-32 pb-48 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/50 via-[#0a1930] to-[#0a1930] pointer-events-none" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-[10px] font-extrabold uppercase tracking-widest mb-8 backdrop-blur-md shadow-lg"
          >
            <Landmark size={14} className="text-amber-400" />
            Samarqand viloyati, Pastdarg'om tumaniga qarashli
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white uppercase tracking-tight leading-[1.1] mb-6"
          >
            3-SON TEXNIKUMI O'QUV MUASSASASI <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 drop-shadow-lg">
              PROFESSOR-O'QITUVCHILARI
            </span>
          </motion.h1>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 100, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
            className="h-1.5 bg-blue-600 mx-auto mt-10 rounded-full"
          />
        </div>
      </section>

      {/* Content Section */}
      <div className="container mx-auto px-6 -mt-24 relative z-20">
        {/* QIDIRUV VA FILTER BLOKI (Yangi funksionallik) */}
        {!loading && teachers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 rounded-2xl shadow-lg border border-slate-100 flex flex-col md:flex-row gap-4 mb-12 max-w-5xl mx-auto"
          >
            {/* Qidiruv */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="O'qituvchining ismini kiriting..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-[#0a1930] text-sm font-bold rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
            {/* Filter */}
            <div className="md:w-1/3 relative shrink-0">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                <Filter size={18} />
              </div>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-[#0a1930] text-sm font-bold rounded-xl pl-12 pr-10 py-3.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer"
              >
                {subjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        )}

        {loading ? (
          <div className="min-h-[50vh] flex flex-col items-center justify-center bg-white rounded-[2.5rem] shadow-xl border border-slate-100 py-20">
            <Loader2 className="animate-spin text-blue-600 mb-6" size={48} />
            <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-slate-400">
              O'qituvchilar bazasi yuklanmoqda...
            </p>
          </div>
        ) : teachers.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-slate-200 flex flex-col items-center shadow-xl max-w-4xl mx-auto">
            <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-8 text-slate-300 border border-slate-100 shadow-inner">
              <GraduationCap size={40} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-extrabold text-[#0a1930] uppercase tracking-wide px-6 mb-3">
              Hozircha ma'lumot kiritilmagan
            </h3>
            <p className="text-slate-500 text-base font-medium">
              Tez orada pedagoglarimiz haqida to'liq ma'lumotlar sahifaga
              joylanadi.
            </p>
          </div>
        ) : filteredTeachers.length === 0 ? (
          // Qidiruv natija bermasa
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-4xl mx-auto"
          >
            <Search size={40} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-[#0a1930]">
              Hech narsa topilmadi
            </h3>
            <p className="text-sm text-slate-500 mt-2">
              Boshqa so'z bilan qidirib ko'ring yoki filterni tozalang.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            /* Keng Grid saqlab qolindi (lg:grid-cols-3) kartalar kattaroq turishi uchun */
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto"
          >
            {filteredTeachers.map((teacher) => (
              <motion.div
                key={teacher._id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: "easeOut" },
                  },
                }}
              >
                <TeacherCard
                  teacher={teacher}
                  t={t}
                  onOpen={setSelectedTeacher}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedTeacher && (
          <ProfileModal
            teacher={selectedTeacher}
            onClose={() => setSelectedTeacher(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Teachers;
