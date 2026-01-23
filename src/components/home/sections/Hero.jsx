import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Play, Code2, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Hero = () => {
  const { t } = useTranslation();
  const ref = useRef(null);

  // Scroll faqat shu seksiya bo'yicha hisoblanadi
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Animatsiya qiymatlari (sekinroq va silliqroq qilindi)
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Animatsiya variantlari
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const textRevealVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-slate-950 pt-20 pb-20 md:py-0"
    >
      {/* 1. PARALLAX BACKGROUND */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-900/60 z-10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent z-20" />
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
          alt="University Campus"
          className="w-full h-full object-cover scale-105"
        />
      </motion.div>

      {/* 2. ASOSIY KONTENT */}
      <div className="container mx-auto px-6 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* CHAP TOMON */}
          <motion.div
            style={{ y: contentY, opacity: contentOpacity }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7"
          >
            <div className="mb-8 overflow-hidden">
              <motion.div variants={textRevealVariants}>
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] shadow-lg">
                  <Sparkles size={14} className="animate-pulse" />
                  {t("hero_badge") || "KELAJAK KASBLARI"}
                </div>
              </motion.div>
            </div>

            <div className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.9] uppercase italic tracking-tighter">
              <div className="overflow-hidden">
                <motion.div variants={textRevealVariants}>
                  {t("hero_title_1") || "ZAMONAVIY"}
                </motion.div>
              </div>
              <div className="overflow-hidden text-emerald-500">
                <motion.div
                  variants={textRevealVariants}
                  className="flex items-center gap-4"
                >
                  {t("hero_title_2") || "TEXNIKUM"}
                  <div className="h-2 w-16 md:w-32 bg-emerald-500 rounded-full hidden sm:block" />
                </motion.div>
              </div>
              <div className="overflow-hidden text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500">
                <motion.div variants={textRevealVariants}>
                  {t("hero_title_3") || "TA'LIMI"}
                </motion.div>
              </div>
            </div>

            <motion.p
              variants={textRevealVariants}
              className="text-lg md:text-xl text-slate-300 font-medium max-w-xl leading-relaxed border-l-2 border-emerald-500/50 pl-6"
            >
              {t("hero_description") ||
                "Amaliy ko'nikmalar va xalqaro darajadagi mutaxassislar tayyorlash maskani."}
            </motion.p>
          </motion.div>

          {/* O'NG TOMON (Icon va Tugmalar) */}
          <motion.div
            style={{ y: contentY, opacity: contentOpacity }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="lg:col-span-5 flex flex-col items-center lg:items-end gap-12"
          >
            {/* 3D Icon Container */}
            <div className="relative w-full h-[300px] flex items-center justify-center lg:justify-end pr-0 lg:pr-10">
              <div className="relative flex items-center justify-center w-32 h-32">
                <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-[60px] animate-pulse" />
                <div className="relative z-10 w-28 h-28 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] flex items-center justify-center shadow-2xl">
                  <Globe className="text-emerald-400 w-12 h-12 animate-pulse" />
                </div>
              </div>

              {/* Orbitallar */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute w-[320px] h-[320px] border border-white/5 rounded-full border-dashed"
                style={{ top: "50%", left: "50%", x: "-50%", y: "-50%" }} // Markazlashtirish
              />

              {/* Floating Code Icon */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-0 right-10 bg-slate-800/80 p-5 rounded-3xl border border-white/5 backdrop-blur-md shadow-xl"
              >
                <Code2 className="text-blue-400 w-8 h-8" />
              </motion.div>
            </div>

            {/* Tugmalar */}
            <div className="flex flex-col gap-5 w-full sm:w-auto items-center lg:items-end pr-0 lg:pr-10">
              <Link
                to="/apply"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-3 bg-emerald-600 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:bg-emerald-500 shadow-xl shadow-emerald-900/20 active:scale-95 italic min-w-[280px]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t("hero_btn_apply") || "QABULGA YOZILISH"}{" "}
                  <ArrowRight size={18} />
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </Link>

              <Link
                to="/video-tour"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-white font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95 group italic min-w-[280px]"
              >
                <div className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play size={12} fill="currentColor" />
                </div>
                {t("hero_video_btn") || "VIDEO SAYOHAT"}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity: contentOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-4"
      >
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em] writing-vertical">
          SCROLL
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-emerald-500 to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
