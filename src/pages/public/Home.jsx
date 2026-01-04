import { useEffect, useState, useCallback } from "react";
import axiosClient from "../../api/axiosClient";
import { Loader2, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

// Qismlarni import qilish
import Hero from "./sections/Hero";
import NewsSection from "./sections/NewsSection";
import GlobalNews from "./sections/GlobalNews";
import StatsSection from "./sections/StatsSection";
import InfoSection from "./sections/InfoSection";
import QuickLinks from "../../components/home/QuickLinks";
import Partners from "../../components/home/Partners";
import VideoSection from "../../components/home/VideoSection";
import Footer from "../../components/home/Footer";
import footerBg from "../../assets/images/university.jpg";

const Home = () => {
  const { t } = useTranslation();
  const [newsList, setNewsList] = useState([]);
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    graduates: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
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
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="flex items-center justify-center min-h-screen bg-white fixed inset-0 z-[9999]"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full animate-pulse"></div>
              <Loader2 className="w-16 h-16 text-emerald-600 animate-spin relative z-10" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-slate-900 font-black italic uppercase tracking-[0.4em] text-xs">
                {t("loading") || "YUKLANMOQDA"}
              </span>
              <div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-full h-full bg-emerald-500"
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
          transition={{ duration: 0.6 }}
          className="bg-white flex flex-col min-h-screen font-sans overflow-x-hidden"
        >
          <Hero />

          {/* Mahalliy va Global yangiliklar ketma-ketligi */}
          <NewsSection newsList={newsList} loading={loading} />
          <GlobalNews />

          <VideoSection />

          <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center mb-16"
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-[0.3em] mb-4 italic">
                  <Zap size={14} fill="currentColor" /> {t("useful_links")}
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter">
                  Interaktiv{" "}
                  <span className="text-emerald-500 not-italic">Xizmatlar</span>
                </h2>
              </motion.div>
              <QuickLinks />
            </div>
          </section>

          {/* Info va Stats Section + Interaktiv Separator */}
          <div className="relative">
            <InfoSection bgImage={footerBg} />

            {/* Mukammallashtirilgan Separator */}
            <div className="bg-white py-16 flex flex-col items-center justify-center relative overflow-hidden">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                whileInView={{ height: 80, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1 }}
                className="w-[2px] bg-gradient-to-b from-emerald-500 via-slate-200 to-transparent"
              />

              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                className="relative mt-4"
              >
                <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-emerald-500 shadow-[0_20px_50px_rgba(16,185,129,0.15)] z-10 relative">
                  <motion.div
                    animate={{
                      opacity: [1, 0.5, 1],
                      filter: [
                        "drop-shadow(0 0 0px #10b981)",
                        "drop-shadow(0 0 8px #10b981)",
                        "drop-shadow(0 0 0px #10b981)",
                      ],
                    }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Zap size={24} fill="currentColor" />
                  </motion.div>
                </div>

                {/* Atrofdagi aylanma effekt */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                  className="absolute inset-0 -m-4 border border-dashed border-slate-200 rounded-full opacity-50"
                />
              </motion.div>

              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: 40 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="w-[2px] bg-gradient-to-t from-slate-200 to-transparent mt-4"
              />
            </div>

            <StatsSection stats={stats} bgImage={footerBg} />
          </div>

          <Partners />
          <Footer />
        </motion.main>
      )}
    </AnimatePresence>
  );
};

export default Home;
