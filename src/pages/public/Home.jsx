import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

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
          // Barcha ehtimoliy API javob qavatlarini tekshiramiz
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
        console.error("Data fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
          <p className="text-slate-500 font-bold uppercase text-xs animate-pulse">
            {t("loading")}...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-white flex flex-col min-h-screen font-sans overflow-x-hidden">
      <Hero />

      {/* newsList'ni uzatish */}
      <NewsSection newsList={newsList} />

      <VideoSection />

      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 text-center mb-16 relative z-10">
          <span className="text-emerald-600 font-black text-xs uppercase tracking-[0.3em] mb-3 block">
            {t("useful_links")}
          </span>
          <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full mb-12"></div>
          <QuickLinks />
        </div>
      </section>

      <div className="relative bg-slate-50">
        <InfoSection bgImage={footerBg} />
        <div className="h-32 bg-transparent flex items-center justify-center">
          <div className="w-px h-full bg-gradient-to-b from-slate-200 via-emerald-400 to-transparent"></div>
        </div>
        <StatsSection stats={stats} bgImage={footerBg} />
      </div>

      <Partners />
      <Footer />
    </main>
  );
};

export default Home;
