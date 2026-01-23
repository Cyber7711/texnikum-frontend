import { useState, useEffect } from "react";
import { Play, X, CheckCircle, Zap, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const VideoSection = () => {
  const [showVideo, setShowVideo] = useState(false);
  const { t } = useTranslation();

  // Escape tugmasi bosilganda modalni yopish
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setShowVideo(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Modal ochilganda scrollni to'xtatib turish
  useEffect(() => {
    if (showVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showVideo]);

  return (
    <section className="py-32 bg-[#0a1128] relative overflow-hidden border-y border-white/5">
      {/* Orqa fon bezaklari */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] -ml-40 -mb-40 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          {/* 1. CHAP TOMON: Matn va Statistika */}
          <div className="flex-1 text-white text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
            >
              <Zap size={14} fill="currentColor" />{" "}
              {t("about_us_badge") || "BIZ HAQIMIZDA"}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black mb-8 leading-[1.1] tracking-tighter uppercase italic"
            >
              {t("video_title_1") || "ZAMONAVIY TA'LIM"} <br />
              <span className="text-emerald-500 not-italic">
                {t("video_title_2") || "YUKSAK SALOHIYAT"}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-lg mb-10 leading-relaxed font-medium italic"
            >
              {t("video_description") ||
                "Bizning texnikumimizda nazariya va amaliyot uyg'unlashgan zamonaviy muhit yaratilgan."}
            </motion.p>

            <div className="grid gap-5 mb-12">
              <FeatureItem text={t("feature_1") || "XALQARO DIPLOM"} />
              <FeatureItem text={t("feature_2") || "AMALIY KO'NIKMALAR"} />
              <FeatureItem text={t("feature_3") || "ZAMONAVIY LABORATORIYA"} />
            </div>

            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/10">
              <StatBox
                number="15+"
                label={t("stat_experience") || "YILLIK TAJRIBA"}
              />
              <StatBox
                number="2.5k+"
                label={t("stat_graduates") || "BITIRUVCHILAR"}
              />
              <StatBox
                number="98%"
                label={t("stat_employment") || "ISH BILAN TA'MINLASH"}
              />
            </div>
          </div>

          {/* 2. O'NG TOMON: Video Player Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 w-full relative group"
          >
            <div
              className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 cursor-pointer aspect-video bg-slate-800"
              onClick={() => setShowVideo(true)}
            >
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070"
                alt="Video Thumbnail"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-[#0a1128]/40 group-hover:bg-[#0a1128]/20 transition-all duration-500 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/30 rounded-full animate-ping"></div>
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-all duration-500">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-2xl pl-1 shadow-emerald-500/50">
                      <Play fill="currentColor" size={28} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3. MODAL QISMI */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVideo(false)} // Orqa fonni bosganda yopish
            className="fixed inset-0 z-[10000] bg-[#0a1128]/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10"
          >
            {/* Yopish tugmasi */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Klik modalga o'tib ketmasligi uchun
                setShowVideo(false);
              }}
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-all bg-white/5 p-4 rounded-full hover:rotate-90 z-[10001]"
            >
              <X size={32} />
            </button>

            {/* Video ramkasi */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()} // Videoni o'zini bosganda yopilmasligi uchun
              className="w-full max-w-5xl aspect-video rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(16,185,129,0.2)] border border-white/10 bg-black"
            >
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/c_PRdzw4sMI?autoplay=1&rel=0"
                title="3-sonli texnikum video sayohat"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const FeatureItem = ({ text }) => (
  <motion.div
    whileHover={{ x: 10 }}
    className="flex items-center gap-4 text-slate-300 group cursor-default"
  >
    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
      <CheckCircle size={18} />
    </div>
    <span className="text-sm font-bold uppercase tracking-wide group-hover:text-white transition-colors italic">
      {text}
    </span>
  </motion.div>
);

const StatBox = ({ number, label }) => (
  <div className="group">
    <h4 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tighter italic group-hover:text-emerald-500 transition-colors">
      {number}
    </h4>
    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] leading-tight group-hover:text-slate-300 transition-colors">
      {label}
    </p>
  </div>
);

export default VideoSection;
