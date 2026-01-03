import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  Star,
  GraduationCap,
  Loader2,
  Bookmark,
  Award,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import axiosClient from "../../api/axiosClient";

const Teachers = () => {
  const { t } = useTranslation();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const getImageUrl = (photo, fullname) => {
    const CUSTOM_DOMAIN = "5nezpc68d1.ucarecd.net";
    if (photo && !photo.includes("http") && photo.length > 20) {
      return `https://${CUSTOM_DOMAIN}/${photo}/-/scale_crop/600x600/smart/-/quality/smart/-/format/auto/`;
    }
    if (photo && photo.startsWith("http")) return photo;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      fullname
    )}&background=10b981&color=fff&size=512`;
  };

  return (
    <div className="bg-[#fafbfc] min-h-screen pb-32">
      {/* 1. Header Section - Dark Background Style */}
      <section className="relative bg-[#0a1128] pt-32 pb-48 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -mr-40 -mt-40"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
          >
            <Award size={14} />{" "}
            {t("pedagogical_team_badge") || "Professional Jamoa"}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-7xl font-black text-white mb-6 uppercase italic tracking-tighter"
          >
            Bizning{" "}
            <span className="text-emerald-500 not-italic">Ustozlarimiz</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto font-medium text-lg md:text-xl italic"
          >
            {t("teachers_subtitle") ||
              "O'z ishining ustalari bo'lgan tajribali pedagoglarimiz bilan tanishing."}
          </motion.p>
        </div>
      </section>

      {/* 2. Content Section */}
      <div className="container mx-auto px-6 -mt-24 relative z-20">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-[500px] bg-white rounded-[3rem] animate-pulse border border-slate-100 shadow-sm"
              ></div>
            ))}
          </div>
        ) : teachers.length === 0 ? (
          <div className="text-center py-40 bg-white rounded-[4rem] border-4 border-dashed border-slate-50">
            <GraduationCap size={80} className="mx-auto mb-6 text-slate-200" />
            <h3 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter">
              Hozircha ma'lumot yo'q
            </h3>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
          >
            {teachers.map((teacher) => (
              <motion.div
                key={teacher._id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                className="group bg-white rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 overflow-hidden flex flex-col h-full relative"
              >
                {/* Image Area */}
                <div className="h-80 relative overflow-hidden bg-slate-50">
                  <img
                    src={getImageUrl(teacher.photo, teacher.fullname)}
                    alt={teacher.fullname}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Subject Tag */}
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black px-4 py-2 rounded-2xl shadow-xl uppercase tracking-widest border border-white/50 flex items-center gap-2">
                      <Bookmark size={12} className="text-emerald-500" />
                      {teacher.subject}
                    </span>
                  </div>
                </div>

                {/* Info Area */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tighter italic uppercase group-hover:text-emerald-600 transition-colors">
                    {teacher.fullname}
                  </h3>

                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-8">
                    <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={12} fill="currentColor" />
                      ))}
                    </div>
                    <span>
                      • {teacher.experience}{" "}
                      {t("years_experience") || "YILLIK TAJRIBA"}
                    </span>
                  </div>

                  <div className="mt-auto flex gap-3">
                    <a
                      href={`mailto:${teacher.email}`}
                      title="Email"
                      className="flex-1 bg-slate-50 hover:bg-emerald-600 text-slate-400 hover:text-white h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-inner group/icon"
                    >
                      <Mail
                        size={22}
                        className="group-hover/icon:scale-110 transition-transform"
                      />
                    </a>
                    <a
                      href={`tel:${teacher.phone}`}
                      title="Qo'ng'iroq"
                      className="flex-1 bg-slate-50 hover:bg-[#0a1128] text-slate-400 hover:text-white h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-inner group/icon"
                    >
                      <Phone
                        size={22}
                        className="group-hover/icon:scale-110 transition-transform"
                      />
                    </a>
                    <div className="flex-1 bg-emerald-50 text-emerald-600 h-14 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 cursor-pointer">
                      <ArrowUpRight size={22} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Teachers;
