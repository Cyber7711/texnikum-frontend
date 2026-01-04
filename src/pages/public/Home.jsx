import { useEffect, useState, useCallback } from "react";
import axiosClient from "../../api/axiosClient";
import { Loader2, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

// Qismlarni import qilish
import Hero from "./sections/Hero";
import NewsSection from "./sections/NewsSection";
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

  // Ma'lumotlarni yuklash funksiyasini useCallback ichiga olamiz
  const fetchData = useCallback(async () => {
    try {
      // API so'rovlariga timeout qo'shish tavsiya etiladi
      const [newsResult, statsResult] = await Promise.allSettled([
        axiosClient.get("/news"),
        axiosClient.get("/statistics"),
      ]);

      if (newsResult.status === "fulfilled") {
        const rawData =
          newsResult.value.data?.data ||
          newsResult.value.data?.result ||
          newsResult.value.data ||
          [];
        setNewsList(Array.isArray(rawData) ? rawData : []);
      }

      if (statsResult.status === "fulfilled") {
        const statData =
          statsResult.value.data?.data ||
          statsResult.value.data?.result ||
          statsResult.value.data;
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
      // Ma'lumotlar kelgan zahoti loaderni yopamiz
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
          <NewsSection newsList={newsList} loading={loading} />
          <VideoSection />

          {/* Interaktiv Xizmatlar */}
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

          {/* Info va Stats Section */}
          <div className="relative">
            <InfoSection bgImage={footerBg} />
            <div className="bg-white py-12 flex flex-col items-center justify-center relative">
              <div className="w-px h-12 bg-gradient-to-b from-slate-200 to-transparent"></div>
              <div className="mt-6 w-10 h-10 bg-white border border-slate-100 rounded-full flex items-center justify-center text-emerald-500 shadow-lg">
                <Zap size={16} fill="currentColor" className="animate-pulse" />
              </div>
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
