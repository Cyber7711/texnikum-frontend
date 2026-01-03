import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Hero = () => {
  const { t } = useTranslation();

  // Matnlar uchun stagger (ketma-ket chiqish) animatsiyasi
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative bg-slate-900 h-[700px] md:h-screen flex items-center overflow-hidden">
      {/* 1. Dinamik Orqa Fon */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1986"
          alt="Technical School Building"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* 2. Gradient Qatlamlar (Dizayn chuqurligi uchun) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

      {/* 3. Dekorativ Element (Aylanuvchi nur) */}
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-500/20 blur-[120px] rounded-full z-10 animate-pulse"></div>

      <div className="container mx-auto px-6 relative z-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Badge: Suvda suzgandek animatsiya */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-[0.2em] mb-8 backdrop-blur-md shadow-lg shadow-emerald-500/5"
          >
            <Sparkles size={14} className="animate-pulse" />
            {t("hero_badge") || "Kelajak kasblari maskani"}
          </motion.div>

          {/* Asosiy Sarlavha: Har bir qism alohida chiqadi */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-8xl font-black text-white mb-8 leading-[0.95] uppercase italic tracking-tighter"
          >
            {t("hero_title_1")}{" "}
            <span className="text-emerald-500 not-italic relative">
              {t("hero_title_2")}
              {/* Sarlavha ostidagi chiziqcha */}
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute -bottom-2 left-0 h-2 bg-emerald-500/30 rounded-full"
              ></motion.span>
            </span>{" "}
            <br className="hidden md:block" />
            {t("hero_title_3")}
          </motion.h1>

          {/* Tavsif: Chapdan chiziq bilan */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-2xl text-slate-300 mb-12 font-medium border-l-4 border-emerald-500 pl-8 max-w-2xl leading-relaxed"
          >
            {t("hero_description")}
          </motion.p>

          {/* Tugmalar: Hover effektlari bilan */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-5"
          >
            <Link
              to="/apply"
              className="relative overflow-hidden inline-flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-2xl shadow-emerald-500/20 group italic"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t("hero_btn_apply")}
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-2 transition-transform duration-300"
                />
              </span>
              {/* Tugma ichidagi nur effekti */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Link>

            <Link
              to="/news"
              className="inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-xl text-white border border-white/10 px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:border-emerald-500/50 italic"
            >
              {t("hero_btn_news")}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* 4. Pastga ishora (Scroll Indicator) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
