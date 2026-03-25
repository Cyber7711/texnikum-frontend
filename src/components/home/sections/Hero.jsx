import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  GraduationCap,
  Landmark,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Hero = () => {
  const { t } = useTranslation();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section ref={ref} className="relative min-h-[100dvh] flex items-center">
      {/* 1. PARALLAX BACKGROUND IMAGE (Rasmiy Bino) */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
        {/* Rasmiy to'q ko'k (Navy Blue) gradient overlay */}
        <div className="absolute inset-0 bg-[#0a1930]/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1930] via-[#0a1930]/80" />

        {/* Kollej/Universitet Binosi Rasmi */}
        <img
          src="https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=2070&auto=format&fit=crop"
          alt="Texnikum binosi"
          className="w-full h-full object-cover grayscale-[20%]"
        />
      </motion.div>

      {/* 2. ASOSIY KONTENT */}
      <div className="container mx-auto px-6 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* CHAP TOMON (Matn va Tugmalar) */}
          <motion.div
            style={{ y: contentY, opacity: contentOpacity }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 relative z-20"
          >
            {/* Rasmiy Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/10 border border-white/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest">
                <Landmark size={14} className="text-amber-400" />
                {t("hero_badge", "O'ZBEKISTON RESPUBLIKASI TA'LIM VAZIRLIGI")}
              </div>
            </motion.div>

            {/* Sarlavha (Salobatli tipografiya) */}
            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] uppercase">
                {t("hero_title_1", "ZAMONAVIY")}{" "}
                <span className="text-amber-400 block mt-2">
                  {t("hero_title_2", "TEXNIKUM")}
                </span>
                <span className="text-slate-300 block mt-2">
                  {t("hero_title_3", "TA'LIMI")}
                </span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-10">
              <p className="text-base md:text-lg text-slate-300 font-medium max-w-xl leading-relaxed border-l-4 border-amber-400 pl-6">
                {t(
                  "hero_description",
                  "Nazariy bilimlar va amaliy ko'nikmalarni o'zida jamlagan, xalqaro ta'lim standartlari asosidagi davlat ta'lim muassasasi.",
                )}
              </p>
            </motion.div>

            {/* Tugmalar (Jiddiy va rasmiy) */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/apply"
                className="inline-flex items-center justify-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-lg font-bold text-xs uppercase tracking-widest transition-all hover:bg-emerald-700 shadow-lg active:scale-95"
              >
                <GraduationCap size={18} />
                {t("hero_btn_apply", "QABULGA YOZILISH")}
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg bg-transparent border border-white/30 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95"
              >
                {t("hero_video_btn", "BATAFSIL MA'LUMOT")}
                <ChevronRight size={16} />
              </Link>
            </motion.div>
          </motion.div>

          {/* O'NG TOMON (Rasmiy Informatsion Kartalar) */}
          <motion.div
            style={{ y: contentY, opacity: contentOpacity }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="lg:col-span-5 flex flex-col gap-6 mt-8 lg:mt-0 relative z-20"
          >
            {/* Karta 1 */}
            <div className="bg-[#0f2341]/80 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl flex items-start gap-5 transform transition-transform hover:-translate-y-1">
              <div className="w-14 h-14 shrink-0 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30">
                <Landmark className="text-emerald-400 w-7 h-7" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2 uppercase tracking-wide">
                  Davlat Namunasidagi Diplom
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Bitiruvchilarga O'zbekiston Respublikasi hududida to'liq tan
                  olinadigan rasmiy hujjat beriladi.
                </p>
              </div>
            </div>

            {/* Karta 2 */}
            <div className="bg-[#0f2341]/80 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl flex items-start gap-5 transform transition-transform hover:-translate-y-1">
              <div className="w-14 h-14 shrink-0 bg-amber-500/20 rounded-xl flex items-center justify-center border border-amber-500/30">
                <BookOpen className="text-amber-400 w-7 h-7" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2 uppercase tracking-wide">
                  Zamonaviy O'quv Dasturlari
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Bozor talablariga moslashtirilgan o'quv reja va amaliyotga
                  asoslangan ta'lim tizimi.
                </p>
              </div>
            </div>

            {/* Karta 3 (Kichikroq Statistika) */}
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="bg-[#0f2341]/60 backdrop-blur-sm border border-white/5 p-5 rounded-xl text-center">
                <div className="text-2xl font-black text-white mb-1">15+</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                  Mutaxassisliklar
                </div>
              </div>
              <div className="bg-[#0f2341]/60 backdrop-blur-sm border border-white/5 p-5 rounded-xl text-center">
                <div className="text-2xl font-black text-white mb-1">100%</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                  Amaliy Ta'lim
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
