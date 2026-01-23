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

// Importlar
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

// --- ANIMATSIYA KOMPONENTI ---
const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.5,
        delay: isMobile ? 0 : delay,
        ease: "easeOut",
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
  const [isTakingLong, setIsTakingLong] = useState(false);
  const [loadingText, setLoadingText] = useState(t("loading") || "YUKLANMOQDA");

  // Parallax faqat kompyuterda orqa fon uchun
  const { scrollYProgress } = useScroll();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const backgroundY1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const backgroundY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  const fetchData = useCallback(async () => {
    const longLoadTimer = setTimeout(() => {
      setIsTakingLong(true);
      setLoadingText("SERVER UYG'ONMOQDA...");
    }, 4000);

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
      console.error("Fetch Error:", error);
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
      <SEO
        title="Bosh sahifa"
        description="3-sonli texnikumning rasmiy sayti. Zamonaviy agro-texnologiyalar, o'quv dasturlari va so'nggi yangiliklar."
        keywords="3-son texnikum, agro-texnologiya, o'qish, ta'lim"
      />

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="flex items-center justify-center min-h-screen bg-white fixed inset-0 z-[9999]"
          >
            <div className="flex flex-col items-center gap-6 text-center px-6">
              <Loader2
                className={`w-16 h-16 ${isTakingLong ? "text-amber-600" : "text-emerald-600"} animate-spin`}
              />
              <span className="font-bold text-xs tracking-widest uppercase text-slate-500">
                {loadingText}
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.main
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-950 flex flex-col min-h-screen font-sans overflow-x-hidden relative"
          >
            {/* 1. HERO SECTION (Alohida va Z-index past) */}
            <div className="relative z-0">
              <Hero />
            </div>

            {/* 2. QOLGAN BARCHA QISMLAR (Oq fon va Z-index baland) */}
            {/* Bu div 'parda' vazifasini bajaradi va Hero ustidan yopiladi */}
            <div className="relative z-10 bg-white rounded-t-[2rem] md:rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.2)] -mt-10 md:-mt-20 pt-10 md:pt-20">
              {/* --- ORQA FON BEZAKLARI (Faqat shu oq qism ichida) --- */}
              {!isMobile && (
                <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                  <motion.div
                    style={{ y: backgroundY1 }}
                    className="absolute top-[5%] right-[-5%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px]"
                  />
                  <motion.div
                    style={{ y: backgroundY2 }}
                    className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[80px]"
                  />
                </div>
              )}

              {/* Kontentlar */}
              <div className="relative z-10">
                <AnimatedSection>
                  <NewsSection newsList={newsList} loading={loading} />
                </AnimatedSection>

                <AnimatedSection>
                  <GlobalNews />
                </AnimatedSection>

                <AnimatedSection>
                  <VideoSection />
                </AnimatedSection>

                {/* Interaktiv Xizmatlar */}
                <section className="py-20 relative overflow-hidden">
                  <div className="container mx-auto px-6 text-center">
                    <AnimatedSection>
                      <div className="flex flex-col items-center mb-12">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-emerald-100">
                          <Zap size={12} fill="currentColor" />{" "}
                          {t("useful_links")}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter">
                          Interaktiv{" "}
                          <span className="text-emerald-500 not-italic">
                            Xizmatlar
                          </span>
                        </h2>
                      </div>
                    </AnimatedSection>
                    <AnimatedSection delay={0.1}>
                      <QuickLinks />
                    </AnimatedSection>
                  </div>
                </section>

                {/* Info va Stats */}
                <div className="relative">
                  <AnimatedSection>
                    <InfoSection bgImage={footerBg} />
                  </AnimatedSection>

                  {/* Silliq Separator */}
                  <div className="bg-white py-12 flex flex-col items-center justify-center relative overflow-hidden">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: 60 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="w-[1px] bg-gradient-to-b from-emerald-500 via-slate-200 to-rgba(255,255,255,0)"
                    />
                    <div className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-emerald-500 shadow-lg z-10 relative mt-2">
                      <Zap
                        size={20}
                        fill="currentColor"
                        className="animate-pulse"
                      />
                    </div>
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: 30 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="w-[1px] bg-gradient-to-t from-slate-200 to-rgba(255,255,255,0) mt-2"
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
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
};

export default Home;
