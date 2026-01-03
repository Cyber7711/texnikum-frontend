import { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [newsResult, statsResult] = await Promise.allSettled([
          axiosClient.get("/news"),
          axiosClient.get("/statistics"),
        ]);

        if (newsResult.status === "fulfilled") {
          const res = newsResult.value;
          const rawData = res.data?.data || res.data?.result || res.data || [];
          setNewsList(Array.isArray(rawData) ? rawData : []);
        }

        if (statsResult.status === "fulfilled") {
          const res = statsResult.value;
          const statData = res.data?.data || res.data?.result || res.data;
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
        // Ma'lumotlar kelganidan keyin ozgina sun'iy kechikish (vizual silliqlik uchun)
        setTimeout(() => setLoading(false), 500);
      }
    };
    fetchData();
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loader"
          exit={{ opacity: 0, scale: 1.1 }}
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
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "linear",
                  }}
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
          transition={{ duration: 0.8 }}
          className="bg-white flex flex-col min-h-screen font-sans overflow-x-hidden"
        >
          {/* 1. KIRISH QISMI */}
          <Hero />

          {/* 2. YANGILIKLAR BO'LIMI */}
          <NewsSection newsList={newsList} />

          {/* 3. MEDIA / VIDEO BO'LIMI */}
          <VideoSection />

          {/* 4. FOYDALI LINKLAR - Sarlavhani modernizatsiya qildik */}
          <section className="py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center mb-16"
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-[0.3em] mb-4 italic">
                  <Zap size={14} fill="currentColor" /> {t("useful_links")}
                </span>
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase italic tracking-tighter">
                  Interaktiv{" "}
                  <span className="text-emerald-500 not-italic">Xizmatlar</span>
                </h2>
                <div className="w-24 h-2 bg-slate-900 mt-6 rounded-full"></div>
              </motion.div>
              <QuickLinks />
            </div>
          </section>
          <div className="relative">
            {/* InfoSection - To'q fonli */}
            <InfoSection bgImage={footerBg} />

            {/* BO'LIMLARNI AJRATUVCHI IXCHAM OQ MAYDON */}
            <div className="bg-white py-12 md:py-15 flex flex-col items-center justify-center relative overflow-hidden">
              {/* 1. Harakatlanuvchi Vertikal Chiziq */}
              <div className="relative w-px h-12 bg-slate-100 overflow-hidden">
                <motion.div
                  animate={{ y: [-48, 48] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-transparent via-emerald-500 to-transparent"
                />
              </div>

              {/* 2. Markaziy Animatsiyalangan Blok */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="mt-6 relative group"
              >
                {/* Tashqi aylanuvchi va urib turuvchi xalqalar */}
                <div className="absolute inset-0 border border-emerald-500/20 rounded-full scale-[1.8] animate-ping opacity-30"></div>

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                  className="absolute inset-0 border-2 border-dashed border-emerald-500/10 rounded-full scale-150"
                />

                {/* Asosiy Doira */}
                <div className="relative w-12 h-12 bg-white border border-slate-100 rounded-full flex items-center justify-center text-emerald-500 shadow-xl shadow-slate-200 z-10 transition-transform group-hover:scale-110">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.7, 1],
                    }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Zap size={18} fill="currentColor" />
                  </motion.div>
                </div>
              </motion.div>

              {/* 3. Pastki xira matn (faqat visual uchun) */}
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.05 }}
                className="absolute bottom-4 text-[40px] font-black uppercase tracking-[1em] pointer-events-none select-none italic"
              ></motion.span>
            </div>

            {/* StatsSection - To'q fonli */}
            <StatsSection stats={stats} bgImage={footerBg} />
          </div>

          {/* 6. HAMKORLAR VA FOOTER */}
          <Partners />
          <Footer />
        </motion.main>
      )}
    </AnimatePresence>
  );
};

export default Home;
