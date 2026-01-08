import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Play, Code2, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Hero = () => {
  const { t } = useTranslation();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const textRevealVariants = {
    hidden: { y: "100%", opacity: 0, rotate: 2 },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-slate-950 pt-32 pb-40 md:py-0"
    >
      {/* 1. PARALLAX BACKGROUND */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-900/50 z-10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent z-20" />
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
          alt="University Campus"
          className="w-full h-full object-cover scale-110"
        />
      </motion.div>

      {/* 2. ASOSIY KONTENT */}
      <div className="container mx-auto px-6 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* --- CHAP TOMON: FAQAT MATNLAR --- */}
          <motion.div
            style={{ y: contentY, opacity: contentOpacity }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7"
          >
            <motion.div variants={fadeUpVariants} className="mb-8">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] shadow-lg">
                <Sparkles size={14} className="animate-pulse" />
                {t("hero_badge") || "KELAJAK KASBLARI MASKANI"}
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.9] uppercase italic tracking-tighter">
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
            </h1>

            <motion.p
              variants={fadeUpVariants}
              className="text-lg md:text-xl text-slate-300 font-medium max-w-xl leading-relaxed border-l-2 border-emerald-500/50 pl-6"
            >
              {t("hero_description") ||
                "Amaliy ko'nikmalar, zamonaviy laboratoriyalar va xalqaro darajadagi mutaxassislar tayyorlash maskani."}
            </motion.p>
          </motion.div>

          {/* --- O'NG TOMON: ANIMATSIYA + TUGMALAR --- */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            style={{ y: contentY, opacity: contentOpacity }}
            className="lg:col-span-5 flex flex-col items-center lg:items-end gap-12"
          >
            {/* Texno Animatsiya Konteyneri */}
            <div className="relative w-full h-[300px] flex items-center justify-center lg:justify-end">
              <div className="absolute w-40 h-40 bg-emerald-500 rounded-full blur-[120px] opacity-30 animate-pulse lg:right-0" />

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute w-[350px] h-[350px] border border-white/5 rounded-full border-dashed"
              />

              <div className="relative z-10 w-28 h-28 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] flex items-center justify-center shadow-2xl mr-0 lg:mr-10">
                <Globe className="text-emerald-400 w-12 h-12 animate-pulse" />
              </div>

              <motion.div
                animate={{ y: [-15, 15, -15] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-0 right-10 bg-slate-800/80 p-5 rounded-3xl border border-white/5 backdrop-blur-md shadow-xl"
              >
                <Code2 className="text-blue-400 w-8 h-8" />
              </motion.div>
            </div>

            {/* TUGMALAR (O'NG TOMONDA) */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-5 w-full sm:w-auto items-center lg:items-end pr-0 lg:pr-10"
            >
              <Link
                to="/apply"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-3 bg-emerald-600 text-white px-10 py-5 md:px-12 md:py-6 rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest transition-all hover:bg-emerald-500 shadow-xl shadow-emerald-900/20 active:scale-95 italic min-w-[280px]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t("hero_btn_apply") || "QABULGA YOZILISH"}{" "}
                  <ArrowRight size={18} />
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </Link>

              <Link
                to="/video-tour"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 md:px-12 md:py-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-white font-black text-xs md:text-sm uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95 group italic min-w-[280px]"
              >
                <div className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play size={12} fill="currentColor" />
                </div>
                {t("hero_video_btn") || "VIDEO SAYOHAT"}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{ opacity: contentOpacity }}
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
// import { motion } from "framer-motion";
// import { ArrowRight, GraduationCap, Sparkles } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import { Link } from "react-router-dom";

// const Hero = () => {
//   const { t } = useTranslation();

//   // Matnlar uchun stagger (ketma-ket chiqish) animatsiyasi
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.3,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.8, ease: "easeOut" },
//     },
//   };

//   return (
//     <section className="relative bg-slate-900 h-[700px] md:h-screen flex items-center overflow-hidden">
//       {/* 1. Dinamik Orqa Fon */}
//       <motion.div
//         initial={{ scale: 1.1 }}
//         animate={{ scale: 1 }}
//         transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
//         className="absolute inset-0 z-0"
//       >
//         <img
//           src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1986"
//           alt="Technical School Building"
//           className="w-full h-full object-cover"
//         />
//       </motion.div>

//       {/* 2. Gradient Qatlamlar (Dizayn chuqurligi uchun) */}
//       <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
//       <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

//       {/* 3. Dekorativ Element (Aylanuvchi nur) */}
//       <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-500/20 blur-[120px] rounded-full z-10 animate-pulse"></div>

//       <div className="container mx-auto px-6 relative z-20">
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="max-w-4xl"
//         >
//           {/* Badge: Suvda suzgandek animatsiya */}
//           <motion.div
//             variants={itemVariants}
//             className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-[0.2em] mb-8 backdrop-blur-md shadow-lg shadow-emerald-500/5"
//           >
//             <Sparkles size={14} className="animate-pulse" />
//             {t("hero_badge") || "Kelajak kasblari maskani"}
//           </motion.div>

//           {/* Asosiy Sarlavha: Har bir qism alohida chiqadi */}
//           <motion.h1
//             variants={itemVariants}
//             className="text-5xl md:text-8xl font-black text-white mb-8 leading-[0.95] uppercase italic tracking-tighter"
//           >
//             {t("hero_title_1")}{" "}
//             <span className="text-emerald-500 not-italic relative">
//               {t("hero_title_2")}
//               {/* Sarlavha ostidagi chiziqcha */}
//               <motion.span
//                 initial={{ width: 0 }}
//                 animate={{ width: "100%" }}
//                 transition={{ delay: 1, duration: 1 }}
//                 className="absolute -bottom-2 left-0 h-2 bg-emerald-500/30 rounded-full"
//               ></motion.span>
//             </span>{" "}
//             <br className="hidden md:block" />
//             {t("hero_title_3")}
//           </motion.h1>

//           {/* Tavsif: Chapdan chiziq bilan */}
//           <motion.p
//             variants={itemVariants}
//             className="text-lg md:text-2xl text-slate-300 mb-12 font-medium border-l-4 border-emerald-500 pl-8 max-w-2xl leading-relaxed"
//           >
//             {t("hero_description")}
//           </motion.p>

//           {/* Tugmalar: Hover effektlari bilan */}
//           <motion.div
//             variants={itemVariants}
//             className="flex flex-col sm:flex-row gap-5"
//           >
//             <Link
//               to="/apply"
//               className="relative overflow-hidden inline-flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-2xl shadow-emerald-500/20 group italic"
//             >
//               <span className="relative z-10 flex items-center gap-2">
//                 {t("hero_btn_apply")}
//                 <ArrowRight
//                   size={20}
//                   className="group-hover:translate-x-2 transition-transform duration-300"
//                 />
//               </span>
//               {/* Tugma ichidagi nur effekti */}
//               <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//             </Link>

//             <Link
//               to="/news"
//               className="inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-xl text-white border border-white/10 px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:border-emerald-500/50 italic"
//             >
//               {t("hero_btn_news")}
//             </Link>
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* 4. Pastga ishora (Scroll Indicator) */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 2, duration: 1 }}
//         className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:block"
//       >
//         <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
//           <motion.div
//             animate={{ y: [0, 15, 0] }}
//             transition={{ repeat: Infinity, duration: 1.5 }}
//             className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
//           />
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default Hero;
