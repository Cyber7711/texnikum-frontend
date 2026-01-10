import { useEffect, useState, useCallback, useMemo } from "react";
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
import SEO from "../../components/common/SEO";
import footerBg from "../../assets/images/university.jpg";

// --- 1. OPTIMALLASHTIRILGAN ANIMATSIYA KOMPONENTI ---
const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: isMobile ? "-5%" : "-15%" }}
      transition={{
        duration: isMobile ? 0.6 : 1.2,
        delay: isMobile ? 0 : delay,
        ease: [0.16, 1, 0.3, 1], // Quintic Out easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const { t } = useTranslation();
  const [newsList, setNewsList] = useState([]);
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    graduates: 0,
  });
  const [loading, setLoading] = useState(true);

  // Server holati uchun statelar
  const [isTakingLong, setIsTakingLong] = useState(false);
  const [loadingText, setLoadingText] = useState(t("loading") || "YUKLANMOQDA");

  // Parallax Blobs uchun scroll hisoblagichi
  const { scrollYProgress } = useScroll();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const backgroundY1 = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0%", "0%"] : ["0%", "15%"]
  );
  const backgroundY2 = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0%", "0%"] : ["0%", "-15%"]
  );

  const fetchData = useCallback(async () => {
    const longLoadTimer = setTimeout(() => {
      setIsTakingLong(true);
      setLoadingText("SERVER UYG'ONMOQDA, ILTIMOS KUTING...");
    }, 5000);

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
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {/* SEO doim eng tepada va AnimatePresence tashqarisida bo'lishi kerak */}
      <SEO
        title="Bosh sahifa - Kelajak kasblari maskani"
        description="Texnikumimizda zamonaviy IT, muhandislik va texnologiya yo'nalishlarida sifatli ta'lim oling."
        keywords="texnikum, ta'lim, o'qish, IT, muhandislik, diplom"
      />

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="flex items-center justify-center min-h-screen bg-white fixed inset-0 z-[9999]"
          >
            <div className="flex flex-col items-center gap-6 text-center px-6">
              <div className="relative">
                <div
                  className={`absolute inset-0 ${
                    isTakingLong ? "bg-amber-500/20" : "bg-emerald-500/20"
                  } blur-2xl rounded-full animate-pulse`}
                />
                <Loader2
                  className={`w-16 h-16 ${
                    isTakingLong ? "text-amber-600" : "text-emerald-600"
                  } animate-spin relative z-10`}
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-black uppercase tracking-[0.2em] text-[10px] italic"
                >
                  {loadingText}
                </motion.span>
                <div className="w-32 h-1 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className={`w-full h-full ${
                      isTakingLong ? "bg-amber-500" : "bg-emerald-500"
                    }`}
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
            transition={{ duration: 0.8 }}
            className="bg-white flex flex-col min-h-screen font-sans overflow-x-hidden relative"
          >
            {/* --- ORQA FON DEKORATSIYASI (Parallax Blobs) --- */}
            {!isMobile && (
              <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <motion.div
                  style={{ y: backgroundY1 }}
                  className="absolute top-[-5%] right-[-5%] w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px]"
                />
                <motion.div
                  style={{ y: backgroundY2 }}
                  className="absolute bottom-[-5%] left-[-5%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px]"
                />
              </div>
            )}

            <div className="relative z-10">
              <Hero />

              <AnimatedSection delay={0.1}>
                <NewsSection newsList={newsList} loading={loading} />
              </AnimatedSection>

              <AnimatedSection>
                <GlobalNews />
              </AnimatedSection>

              <AnimatedSection>
                <VideoSection />
              </AnimatedSection>

              {/* Interaktiv Xizmatlar */}
              <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-6 text-center">
                  <AnimatedSection>
                    <div className="flex flex-col items-center mb-16">
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-[0.3em] mb-4 italic border border-emerald-100">
                        <Zap size={14} fill="currentColor" />{" "}
                        {t("useful_links")}
                      </span>
                      <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter">
                        Interaktiv{" "}
                        <span className="text-emerald-500 not-italic">
                          Xizmatlar
                        </span>
                      </h2>
                    </div>
                  </AnimatedSection>
                  <AnimatedSection delay={0.2}>
                    <QuickLinks />
                  </AnimatedSection>
                </div>
              </section>

              {/* Info va Stats + Silliq Separator */}
              <div className="relative">
                <AnimatedSection>
                  <InfoSection bgImage={footerBg} />
                </AnimatedSection>

                {/* --- SMOOTH SEPARATOR --- */}
                <div className="bg-white py-16 flex flex-col items-center justify-center relative overflow-hidden">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: isMobile ? 50 : 80 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="w-[1px] bg-gradient-to-b from-emerald-500 via-slate-200 to-rgba(255,255,255,0)"
                  />
                  <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-emerald-500 shadow-xl z-10 relative mt-4">
                    <Zap
                      size={24}
                      fill="currentColor"
                      className="animate-pulse"
                    />
                  </div>
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: 40 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="w-[1px] bg-gradient-to-t from-slate-200 to-rgba(255,255,255,0) mt-4"
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
    </>
  );
};

export default Home;
