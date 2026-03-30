import { useState, useEffect } from "react";
import { Play, X, ShieldCheck, Landmark } from "lucide-react";
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
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [showVideo]);

  return (
    <section className="py-24 md:py-32 bg-[#0a1930] relative overflow-hidden border-y border-white/5 font-sans">
      {/* Orqa fon rasmiy gradiyenti */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-[#0a1930] to-[#0a1930] pointer-events-none" />

      {/* Orqa fon rasmi (xira qilingan) */}
      <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086"
          className="w-full h-full object-cover grayscale"
          alt="Background"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* 1. CHAP TOMON: Matn va Statistika */}
          <div className="flex-1 text-white text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-[10px] font-extrabold uppercase tracking-widest mb-8 backdrop-blur-md shadow-lg"
            >
              <Landmark size={14} className="text-amber-400" />
              {t("about_us_badge", "BIZ HAQIMIZDA")}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-[1.1] tracking-tight uppercase"
            >
              {t("video_title_1", "ZAMONAVIY TA'LIM")}{" "}
              <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 drop-shadow-lg">
                {t("video_title_2", "YUKSAK SALOHIYAT")}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-base md:text-lg mb-12 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed"
            >
              {t(
                "video_description",
                "Bizning ta'lim muassasamizda nazariya va amaliyot uyg'unlashgan, davlat standartlariga to'liq javob beradigan zamonaviy muhit yaratilgan.",
              )}
            </motion.p>

            {/* Xususiyatlar */}
            <div className="flex flex-col gap-5 mb-14 max-w-md mx-auto lg:mx-0 text-left">
              <FeatureItem
                text={t("feature_1", "DAVLAT NAMUNASIDAGI DIPLOM")}
              />
              <FeatureItem
                text={t("feature_2", "CHUQURLASHTIRILGAN AMALIYOT")}
              />
              <FeatureItem
                text={t("feature_3", "ZAMONAVIY USTAXONA VA LABORATORIYALAR")}
              />
            </div>

            {/* Statistika */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/10 text-left">
              <StatBox
                number="15+"
                label={t("stat_experience", "YILLIK TAJRIBA")}
              />
              <StatBox
                number="2.5k+"
                label={t("stat_graduates", "BITIRUVCHILAR")}
              />
              <StatBox
                number="98%"
                label={t("stat_employment", "ISH BILAN TA'MINLASH")}
              />
            </div>
          </div>

          {/* 2. O'NG TOMON: Video Player Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 w-full relative group"
          >
            <div
              className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 cursor-pointer aspect-video bg-[#0a1930]"
              onClick={() => setShowVideo(true)}
            >
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070"
                alt="Video Thumbnail"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-[#0a1930]/40 group-hover:bg-[#0a1930]/20 transition-all duration-500 flex items-center justify-center">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-300 shadow-xl">
                  <Play
                    fill="currentColor"
                    size={32}
                    className="text-white ml-1.5"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3. VIDEO MODAL QISMI (TO'LIQ MARKAZLASHTIRILGAN) */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVideo(false)}
            className="fixed top-0 left-0 h-screen w-screen z-[99999] bg-[#0a1930]/95 backdrop-blur-lg flex items-center justify-center p-4 md:p-8"
          >
            {/* Yopish tugmasi */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowVideo(false);
              }}
              className="absolute top-6 right-6 md:top-8 md:right-8 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-[100000] backdrop-blur-sm"
            >
              <X size={28} />
            </button>

            {/* Video ramkasi */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-black mx-auto relative z-[99999]"
            >
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/SY6ulNbKtus?si=Z0_6vhZt4vX5D_lo"
                title="Texnikum video sayohat"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Rasmiy Xususiyatlar Ro'yxati
const FeatureItem = ({ text }) => (
  <div className="flex items-center gap-4 text-slate-300 group cursor-default">
    <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors border border-blue-500/20">
      <ShieldCheck size={20} />
    </div>
    <span className="text-sm font-extrabold uppercase tracking-wide group-hover:text-white transition-colors">
      {text}
    </span>
  </div>
);

// Statistika Qutisi (Chiziq bilan ajratilgan)
const StatBox = ({ number, label }) => (
  <div className="group border-l-2 border-white/10 pl-4 hover:border-amber-400 transition-colors">
    <h4 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight group-hover:text-amber-400 transition-colors">
      {number}
    </h4>
    <p className="text-slate-400 text-[9px] md:text-[10px] font-bold uppercase tracking-widest leading-relaxed group-hover:text-slate-300 transition-colors pr-2">
      {label}
    </p>
  </div>
);

export default VideoSection;
