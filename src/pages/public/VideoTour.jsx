import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  ArrowLeft,
  MonitorPlay,
  X,
  Landmark,
  Building2,
  Wrench,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import PageWrapper from "../../components/layout/PageWrapper";

const VideoTour = () => {
  const { t } = useTranslation();
  const [activeVideo, setActiveVideo] = useState(null);

  // Modal ochiqligida orqadagi fon (scroll) harakatlanishini to'xtatamiz
  useEffect(() => {
    window.scrollTo(0, 0);
    if (activeVideo) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden"; // iOS Safari uchun kerak bo'ladi
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [activeVideo]);

  const VIDEOS = [
    {
      id: "main_tour",
      title: "Texnikum binosi bo'ylab qisqacha sayohat",
      duration: "03:45",
      youtubeId: "c_PRdzw4sMI",
      thumbnail:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070",
      category: "Umumiy tanishuv",
    },
    {
      id: "practice",
      title: "Ustaxona va amaliyot xonalari",
      duration: "05:20",
      youtubeId: "dQw4w9WgXcQ",
      thumbnail:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070",
      category: "Amaliyot",
    },
    {
      id: "dormitory",
      title: "Talabalar turar joyi (Yotoqxona) sharoitlari",
      duration: "02:15",
      youtubeId: "c_PRdzw4sMI",
      thumbnail:
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069",
      category: "Sharoitlar",
    },
  ];

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#f8fafc] pb-32 font-sans relative">
        {/* --- 1. HEADER --- */}
        <section className="relative pt-32 pb-40 bg-[#0a1930] overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/50 via-[#0a1930] to-[#0a1930] pointer-events-none" />

          <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay">
            <img
              src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086"
              className="w-full h-full object-cover grayscale"
              alt="Background"
            />
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <Link
              to="/"
              className="absolute top-0 left-6 md:left-0 inline-flex items-center gap-2 text-white/60 hover:text-amber-400 transition-colors mb-12 uppercase text-[10px] font-bold tracking-widest bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10"
            >
              <ArrowLeft size={14} /> {t("nav_home", "BOSH SAHIFA")}
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-16 md:mt-10 flex flex-col items-center"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-[10px] font-extrabold uppercase tracking-widest mb-8 backdrop-blur-md shadow-lg">
                <Landmark size={14} className="text-amber-400" />
                {t("video_badge", "MULTIMEDIA MARKAZI")}
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 uppercase tracking-tight leading-[1.1]">
                MUASSASA BO'YLAB <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 drop-shadow-lg">
                  VIDEO SAYOHAT
                </span>
              </h1>

              <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed mb-10">
                {t(
                  "video_desc",
                  "Texnikumimiz binosi, zamonaviy ustaxonalar, o'quv xonalari va yotoqxona sharoitlari bilan masofadan turib tanishing.",
                )}
              </p>

              <button
                onClick={() => setActiveVideo(VIDEOS[0])}
                className="inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-blue-500 transition-all shadow-xl hover:shadow-blue-500/30 active:scale-95 group"
              >
                <Play
                  size={18}
                  fill="currentColor"
                  className="group-hover:scale-110 transition-transform"
                />
                {t("video_play_main", "ASOSIY VIDEONI KO'RISH")}
              </button>
            </motion.div>
          </div>
        </section>

        {/* --- 2. XUSUSIYATLAR --- */}
        <div className="container mx-auto px-6 -mt-16 relative z-20 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <VideoFeature
              icon={<Building2 size={28} />}
              title="Zamonaviy Kampus"
              desc="Barcha qulayliklarga ega o'quv binosi"
            />
            <VideoFeature
              icon={<Wrench size={28} />}
              title="Katta Ustaxonalar"
              desc="100% amaliyot uchun maxsus uskunalar"
            />
            <VideoFeature
              icon={<Users size={28} />}
              title="Talabalar Turar Joyi"
              desc="Uzoqdan kelganlar uchun yotoqxona"
            />
          </div>
        </div>

        {/* --- 3. VIDEO GALLEREYA --- */}
        <section className="container mx-auto px-6 py-24 max-w-7xl">
          <div className="mb-12 border-b border-slate-200 pb-6 flex items-end justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0a1930] uppercase tracking-wide mb-2">
                {t("video_playlist_title", "Barcha Videolar")}
              </h2>
              <p className="text-slate-500 font-medium text-sm">
                Tashkilot faoliyatiga doir maxsus tayyorlangan roliklar
                to'plami.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-blue-600 bg-blue-50 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest">
              <MonitorPlay size={16} /> {VIDEOS.length} ta video
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VIDEOS.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveVideo(video)}
                className="group cursor-pointer bg-white rounded-[1.5rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-[0_10px_30px_rgb(10,25,48,0.08)] transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#0a1930]/40 group-hover:bg-[#0a1930]/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform">
                      <Play size={24} fill="currentColor" className="ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-[10px] font-bold tracking-widest">
                    {video.duration}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 mb-2">
                    {video.category}
                  </span>
                  <h3 className="text-[#0a1930] font-bold text-lg leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {video.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- 4. VIDEO MODAL (TUZATILGAN QISM) --- */}
        <AnimatePresence>
          {activeVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              // fixed h-screen w-screen qo'shildi, to'liq oyna qulflanadi
              className="fixed top-0 left-0 h-screen w-screen z-[99999] bg-[#0a1930]/95 backdrop-blur-lg flex items-center justify-center p-4 md:p-8"
              onClick={() => setActiveVideo(null)}
            >
              {/* Yopish tugmasi Modalning to'liq burchagida mustahkamlanadi */}
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-[100000] backdrop-blur-sm"
              >
                <X size={28} />
              </button>

              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-5xl flex flex-col mx-auto"
              >
                {/* Video Info */}
                <div className="mb-4 text-white text-center md:text-left">
                  <div className="inline-block px-3 py-1 bg-blue-600 rounded text-[10px] font-bold uppercase tracking-widest mb-2">
                    {activeVideo.category}
                  </div>
                  <h2 className="text-xl md:text-3xl font-extrabold leading-tight line-clamp-2">
                    {activeVideo.title}
                  </h2>
                </div>

                {/* Player Container */}
                <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                    title={activeVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageWrapper>
  );
};

const VideoFeature = ({ icon, title, desc }) => (
  <div className="p-8 bg-white border border-slate-200 rounded-3xl text-left flex items-start gap-5 hover:-translate-y-1 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group">
    <div className="p-4 bg-slate-50 text-blue-600 rounded-2xl border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="text-[#0a1930] font-extrabold uppercase text-sm md:text-base mb-1.5 leading-snug tracking-wide">
        {title}
      </h4>
      <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed">
        {desc}
      </p>
    </div>
  </div>
);

export default VideoTour;
