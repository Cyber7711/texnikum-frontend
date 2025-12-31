import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

// Bo'lingan qismlarni import qilish
import Hero from "./sections/Hero";
import NewsSection from "./sections/NewsSection";
import StatsSection from "./sections/StatsSection";
import InfoSection from "./sections/InfoSection";

// Umumiy komponentlarni import qilish
import QuickLinks from "../../components/home/QuickLinks";
import Partners from "../../components/home/Partners";
import VideoSection from "../../components/home/VideoSection";
import Footer from "../../components/home/Footer";

// Rasmlar
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
        // API so'rovlarini parallel va xavfsiz yuborish
        const [newsResult, statsResult] = await Promise.allSettled([
          axiosClient.get("/news"),
          axiosClient.get("/statistics"),
        ]);

        if (newsResult.status === "fulfilled") {
          const res = newsResult.value;
          const newsData = res.data.data || res.data.result || res.data || [];
          setNewsList(Array.isArray(newsData) ? newsData : []);
        }

        if (statsResult.status === "fulfilled") {
          const res = statsResult.value;
          const statRaw = res.data.data || res.data.result || res.data;
          const statData = Array.isArray(statRaw) ? statRaw[0] : statRaw;

          if (statData) {
            setStats({
              students: statData.students || 0,
              teachers: statData.teachers || 0,
              graduates: statData.graduates || 0,
            });
          }
        }
      } catch (error) {
        console.error("Ma'lumotlarni yuklashda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sahifa yuklanayotgan holat (Suspense bilan uyg'un)
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
          <p className="text-slate-500 font-bold tracking-widest uppercase text-xs animate-pulse">
            {t("loading")}...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-white flex flex-col min-h-screen font-sans overflow-x-hidden">
      {/* 1. ASOSIY BANNER */}
      <Hero />

      {/* 2. YANGILIKLAR (i18n allaqachon ichida sozlangan) */}
      <NewsSection newsList={newsList} loading={loading} />

      {/* 3. VIDEO TANISHUV */}
      <VideoSection />

      {/* 4. INTERAKTIV XIZMATLAR */}
      <section className="py-24 bg-white relative">
        {/* Dekorativ fon elementlari */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] -z-10"></div>

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
          <div className="w-px h-full from-slate-200 via-emerald-400 to-transparent"></div>
        </div>

        <StatsSection stats={stats} bgImage={footerBg} />
      </div>

      <Partners />
      <Footer />
    </main>
  );
};

export default Home;
