import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { Loader2 } from "lucide-react";

// Bo'lingan qismlarni import qilish
import Hero from "./sections/Hero";
import NewsSection from "./sections/NewsSection";
import StatsSection from "./sections/StatsSection";
import InfoSection from "./sections/InfoSection";

// Umumiy komponentlarni import qilish
import QuickLinks from "../../components/home/QuickLinks";
import Partners from "../../components/home/Partners";
import VideoSection from "../../components/home/VideoSection";
// Eslatma: Agar Footer MainLayout da bo'lsa, bu yerdan olib tashlash mumkin.
// Lekin so'raganingizdek to'liq qoldirdim.
import Footer from "../../components/home/Footer";

// Rasmlar
import footerBg from "../../assets/images/university.jpg";

const Home = () => {
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

        // API so'rovlarini parallel yuborish
        const [newsResult, statsResult] = await Promise.allSettled([
          axiosClient.get("/news"),
          axiosClient.get("/statistics"),
        ]);

        // 1. YANGILIKLARNI O'QISH
        if (newsResult.status === "fulfilled") {
          const res = newsResult.value;
          // Backenddan keladigan har xil formatlarni inobatga olamiz
          const newsData = res.data.data || res.data.result || res.data || [];
          setNewsList(Array.isArray(newsData) ? newsData : []);
        } else {
          console.error("Yangiliklarni yuklashda xato:", newsResult.reason);
        }

        // 2. STATISTIKANI O'QISH
        if (statsResult.status === "fulfilled") {
          const res = statsResult.value;
          const statRaw = res.data.data || res.data.result || res.data;

          // Agar massiv kelsa 1-elementni, bo'lmasa o'zini olamiz
          const statData = Array.isArray(statRaw) ? statRaw[0] : statRaw;

          if (statData) {
            setStats({
              students: statData.students || 0,
              teachers: statData.teachers || 0,
              graduates: statData.graduates || 0,
            });
          }
        } else {
          console.error("Statistikani yuklashda xato:", statsResult.reason);
          // Fallback (Agar API ishlamasa, 0 ko'rinmasligi uchun soxta raqamlar)
          // setStats({ students: 1200, teachers: 85, graduates: 4500 });
        }
      } catch (error) {
        console.error("Umumiy tizim xatoligi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Agar sahifa to'liq yuklanmagan bo'lsa, chiroyli loader ko'rsatamiz
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
          <p className="text-slate-500 font-medium animate-pulse">
            Yuklanmoqda...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-slate-50 flex flex-col min-h-screen font-sans">
      {/* 1. HERO SECTION (Bosh sahifa banneri) */}
      <Hero />

      {/* 2. YANGILIKLAR BO'LIMI */}
      <NewsSection newsList={newsList} loading={loading} />

      {/* 3. VIDEO TANISHUV */}
      <VideoSection />

      {/* 4. INTERAKTIV XIZMATLAR (Quick Links) */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Orqa fon bezagi */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl -z-10"></div>

        <div className="container mx-auto px-6 text-center mb-16 relative z-10">
          <span className="text-emerald-600 font-bold text-sm uppercase tracking-widest mb-2 block">
            Foydali Havolalar
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 uppercase tracking-tight mb-6">
            Interaktiv Xizmatlar
          </h2>
          <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full mb-10"></div>

          <QuickLinks />
        </div>
      </section>

      {/* 5. INFO VA STATISTIKA (Birlashtirilgan blok) */}
      <div className="relative">
        <InfoSection bgImage={footerBg} />

        {/* Chiroyli ajratuvchi chiziq (Gradient) */}
        <div className="h-24 md:h-32 bg-slate-50 flex items-center justify-center overflow-hidden">
          <div className="w-px h-full bg-gradient-to-b from-slate-200 via-emerald-300 to-transparent"></div>
        </div>

        <StatsSection stats={stats} bgImage={footerBg} />
      </div>

      {/* 6. HAMKORLAR */}
      <Partners />

      {/* 7. FOOTER */}
      {/* Agar MainLayout da Footer bo'lsa, bu yerni olib tashlang */}
      <Footer />
    </main>
  );
};

export default Home;
