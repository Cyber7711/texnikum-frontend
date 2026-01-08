import { useEffect, useState, useCallback } from "react";
import axiosClient from "../../api/axiosClient";
import { Loader2, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

// Qismlarni import qilish
import Hero from "../../components/home/sections/Hero";
import NewsSection from "../../components/home/sections/NewsSection";
import GlobalNews from "../../components/home/sections/GlobalNews";
import StatsSection from "../../components/home/sections/StatsSection";
import InfoSection from "../../components/home/sections/InfoSection";
import QuickLinks from "../../components/home/QuickLinks";
import Partners from "../../components/home/Partners";
import VideoSection from "../../components/home/VideoSection";
import Footer from "../../components/home/Footer";
import footerBg from "../../assets/images/university.jpg";

// --- YORDAMCHI ANIMATSIYA KOMPONENTI ---
// Bu komponent har bir seksiyani "o'rab" oladi va scroll qilganda chiroyli paydo bo'lishini ta'minlaydi
const AnimatedSection = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 60, scale: 0.98 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-100px" }} // Ekranning 100px qismiga kirganda ishlaydi
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }} // "Apple-style" easing
    className={className}
  >
    {children}
  </motion.div>
);

const Home = () => {
  const { t } = useTranslation();
  const [newsList, setNewsList] = useState([]);
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    graduates: 0,
  });
  const [loading, setLoading] = useState(true);

  // Scroll effektlari uchun
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]); // Parallax fon

  // Server holati
  const [isTakingLong, setIsTakingLong] = useState(false);
  const [loadingText, setLoadingText] = useState(t("loading") || "YUKLANMOQDA");

  const fetchData = useCallback(async () => {
    const longLoadTimer = setTimeout(() => {
      setIsTakingLong(true);
      setLoadingText("SERVER UYG'ONMOQDA, ILTIMOS KUTING...");
    }, 5000);

    const veryLongLoadTimer = setTimeout(() => {
      setLoadingText("MA'LUMOTLAR YUKLANISHI DAVOM ETMOQDA...");
    }, 15000);

    try {
      const [newsResult, statsResult] = await Promise.allSettled([
        axiosClient.get("/news"),
        axiosClient.get("/statistics"),
      ]);

      if (newsResult.status === "fulfilled") {
        const rawData =
          newsResult.value.data?.data || newsResult.value.data || [];
        setNewsList(Array.isArray(rawData) ? rawData : []);
      }

      if (statsResult.status === "fulfilled") {
        const statData = statsResult.value.data?.data || statsResult.value.data;
        const finalStats = Array.isArray(statData) ? statData[0] : statData;
        if (finalStats) {
          setStats({
            students: finalStats.students || 0,
            teachers: finalStats.teachers || 0,
            graduates: finalStats.graduates || 0,
          });
        }
      }
    } catch (error) {
      console.error("Home Data Fetch Error:", error);
    } finally {
      clearTimeout(longLoadTimer);
      clearTimeout(veryLongLoadTimer);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{
            y: -50,
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" },
          }} // Parda kabi ko'tarilib ketadi
          className="flex items-center justify-center min-h-screen bg-white fixed inset-0 z-[9999]"
        >
          {/* Loader kontenti (o'zgarishsiz) */}
          <div className="flex flex-col items-center gap-6 px-6 text-center">
            <div className="relative">
              <div
                className={`absolute inset-0 ${
                  isTakingLong ? "bg-amber-500/20" : "bg-emerald-500/20"
                } blur-2xl rounded-full animate-pulse`}
              ></div>
              <Loader2
                className={`w-16 h-16 ${
                  isTakingLong ? "text-amber-600" : "text-emerald-600"
                } animate-spin relative z-10 transition-colors duration-500`}
              />
              {isTakingLong && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-amber-100 p-1 rounded-full text-amber-600 z-20 border-2 border-white"
                >
                  <Zap size={14} fill="currentColor" />
                </motion.div>
              )}
            </div>
            <div className="flex flex-col items-center gap-3">
              <motion.span
                key={loadingText}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${
                  isTakingLong ? "text-amber-800" : "text-slate-900"
                } font-black italic uppercase tracking-[0.2em] text-[10px] md:text-xs max-w-xs transition-colors duration-500`}
              >
                {loadingText}
              </motion.span>
              <div className="w-32 h-1 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                  className={`w-full h-full ${
                    isTakingLong ? "bg-amber-500" : "bg-emerald-500"
                  } transition-colors duration-500`}
                />
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.main
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-white flex flex-col min-h-screen font-sans overflow-x-hidden relative"
        >
          {/* --- ORQA FON DEKORATSIYASI (Parallax Blob) --- */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <motion.div
              style={{ y: backgroundY }}
              className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px]"
            />
            <motion.div
              style={{ y: backgroundY }}
              className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px]"
            />
          </div>

          {/* Asosiy Kontent (z-index orqali fondan ajratamiz) */}
          <div className="relative z-10">
            <Hero />

            <AnimatedSection delay={0.1}>
              <NewsSection newsList={newsList} loading={loading} />
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <GlobalNews />
            </AnimatedSection>

            <AnimatedSection>
              <VideoSection />
            </AnimatedSection>

            {/* Interaktiv Xizmatlar */}
            <section className="py-24 relative overflow-hidden">
              <div className="container mx-auto px-6 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center mb-16"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-[0.3em] mb-4 italic border border-emerald-100">
                    <Zap size={14} fill="currentColor" /> {t("useful_links")}
                  </span>

                  {/* Sarlavha Animatsiyasi (Letter by Letter o'rniga Word by Word ishonchliroq) */}
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter">
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      Interaktiv{" "}
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="text-emerald-500 not-italic"
                    >
                      Xizmatlar
                    </motion.span>
                  </h2>
                </motion.div>

                <AnimatedSection>
                  <QuickLinks />
                </AnimatedSection>
              </div>
            </section>

            {/* Separator va Stats */}
            <div className="relative">
              <AnimatedSection>
                <InfoSection bgImage={footerBg} />
              </AnimatedSection>

              <div className="bg-white py-16 flex flex-col items-center justify-center relative overflow-hidden">
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  whileInView={{ height: 80, opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 1 }}
                  className="w-[2px] bg-gradient-to-b from-emerald-500 via-slate-200 to-transparent"
                />

                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className="relative mt-4"
                >
                  <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-emerald-500 shadow-[0_20px_50px_rgba(16,185,129,0.2)] z-10 relative">
                    <motion.div
                      animate={{
                        opacity: [1, 0.5, 1],
                        scale: [1, 1.1, 1],
                        filter: [
                          "drop-shadow(0 0 0px #10b981)",
                          "drop-shadow(0 0 5px #10b981)",
                          "drop-shadow(0 0 0px #10b981)",
                        ],
                      }}
                      transition={{ repeat: Infinity, duration: 2.5 }}
                    >
                      <Zap size={24} fill="currentColor" />
                    </motion.div>
                  </div>
                  {/* Pulse Effect */}
                  <motion.div
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute inset-0 bg-emerald-500/20 rounded-2xl -z-10"
                  />
                </motion.div>

                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: 40 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="w-[2px] bg-gradient-to-t from-slate-200 to-transparent mt-4"
                />
              </div>

              <AnimatedSection>
                <StatsSection stats={stats} bgImage={footerBg} />
              </AnimatedSection>
            </div>

            <AnimatedSection>
              <Partners />
            </AnimatedSection>

            <Footer />
          </div>
        </motion.main>
      )}
    </AnimatePresence>
  );
};

export default Home;
