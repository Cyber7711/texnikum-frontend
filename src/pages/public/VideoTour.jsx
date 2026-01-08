import { motion } from "framer-motion";
import {
  Play,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Monitor,
  Globe,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import PageWrapper from "../../components/layout/PageWrapper";

const VideoTour = () => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);

  // Video ma'lumotlari (Buni YouTube ID bilan almashtirishingiz mumkin)
  const videoId = "dQw4w9WgXcQ"; // Namuna uchun

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#0a1128] relative overflow-hidden flex flex-col items-center justify-center pt-20">
        {/* --- 1. BACKGROUND DECOR --- */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a1128]/80 to-[#0a1128] z-10" />
          <img
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070"
            className="w-full h-full object-cover opacity-30 grayscale"
            alt="Background"
          />
        </div>

        {/* --- 2. FLOATING ELEMENTS (Kichik texno animatsiyalar) --- */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute top-[20%] left-[10%] text-emerald-500/20"
          >
            <Monitor size={100} />
          </motion.div>
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="absolute bottom-[20%] right-[10%] text-blue-500/20"
          >
            <Globe size={120} />
          </motion.div>
        </div>

        {/* --- 3. CONTENT --- */}
        <div className="container mx-auto px-6 relative z-20 text-center">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 uppercase text-[10px] font-black tracking-widest italic group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />{" "}
            {t("nav_home")}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
              <Sparkles size={14} className="animate-pulse" />{" "}
              {t("video_badge") || "VIRTUALLIKKA XUSH KELIBSIZ"}
            </span>

            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[0.9] uppercase italic tracking-tighter">
              Texnikum <br />
              <span className="text-emerald-500 not-italic">
                Video Sayohati
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 mb-16 max-w-2xl mx-auto italic font-medium">
              {t("video_desc") ||
                "O'quv xonalari, laboratoriyalar va talabalar hayoti bilan bir daqiqada tanishing."}
            </p>

            {/* --- BIG VIDEO PLAY BUTTON --- */}
            <div className="relative inline-block group">
              {/* Outer Ripples */}
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-emerald-500 rounded-full blur-xl"
              />

              <button
                onClick={() => setIsPlaying(true)}
                className="relative z-10 w-24 h-24 md:w-32 md:h-32 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center transition-all shadow-2xl shadow-emerald-900/40 hover:scale-110 active:scale-95"
              >
                <Play size={40} fill="currentColor" className="ml-2" />
              </button>
            </div>

            {/* Features Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
              <VideoFeature
                icon={<ShieldCheck className="text-emerald-500" />}
                title="Zamonaviy IT"
                desc="So'nggi rusmdagi kompyuterlar"
              />
              <VideoFeature
                icon={<Award className="text-blue-500" />}
                title="Sifatli ta'lim"
                desc="Xalqaro darajadagi ustozlar"
              />
              <VideoFeature
                icon={<Monitor className="text-indigo-500" />}
                title="Amaliyot"
                desc="IT Park bilan hamkorlik"
              />
            </div>
          </motion.div>
        </div>

        {/* --- VIDEO MODAL (YouTube Player) --- */}
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10"
          >
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors"
            >
              <ArrowLeft size={40} />
            </button>

            <div className="w-full max-w-6xl aspect-video rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-black">
              <iframe
                width="100%"
                height="100%"
                src={`//www.youtube.com/embed/c_PRdzw4sMI?si=yZrOQ9zM9-IXSWQ6`}
                title="Video tour"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        )}
      </div>
    </PageWrapper>
  );
};

const VideoFeature = ({ icon, title, desc }) => (
  <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/5 rounded-[2.5rem] text-left hover:bg-white/10 transition-all">
    <div className="mb-4">{icon}</div>
    <h4 className="text-white font-black uppercase italic text-sm mb-1">
      {title}
    </h4>
    <p className="text-slate-500 text-xs font-medium italic">{desc}</p>
  </div>
);

export default VideoTour;
