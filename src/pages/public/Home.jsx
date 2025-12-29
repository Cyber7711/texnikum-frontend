import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

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

        // MUHIM O'ZGARISH: Promise.all o'rniga Promise.allSettled ishlatamiz.
        // Bu agar bitta so'rov xato bersa (masalan News), ikkinchisi (Stats)
        // ishlashiga xalaqit bermasligini ta'minlaydi.
        const [newsResult, statsResult] = await Promise.allSettled([
          axiosClient.get("/news"),
          axiosClient.get("/statistics"),
        ]);

        // 1. YANGILIKLARNI TEKSHIRISH
        if (newsResult.status === "fulfilled") {
          const res = newsResult.value;
          // Backenddan keladigan turli formatlarni inobatga olamiz
          const newsData = res.data.result || res.data.data || res.data || [];
          setNewsList(Array.isArray(newsData) ? newsData : []);
        } else {
          console.error("Yangiliklarni yuklashda xato:", newsResult.reason);
        }

        // 2. STATISTIKANI TEKSHIRISH
        if (statsResult.status === "fulfilled") {
          const res = statsResult.value;
          const statRaw = res.data.data || res.data.result || res.data;

          console.log("Kelgan Statistika:", statRaw); // Debug uchun

          // Agar backenddan massiv kelsa [0] ni olamiz, object kelsa o'zini
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
        }
      } catch (error) {
        console.error("Umumiy tizim xatoligi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="bg-gray-50 flex flex-col min-h-screen">
      <Hero />

      {/* Yangiliklar bo'limi */}
      <NewsSection newsList={newsList} loading={loading} />

      <VideoSection />

      {/* Interaktiv xizmatlar */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 text-center mb-16">
          <h2 className="text-3xl font-black text-gray-800 uppercase tracking-tight">
            Interaktiv Xizmatlar
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          <QuickLinks />
        </div>
      </section>

      <div>
        <InfoSection bgImage={footerBg} />

        {/* Ajratuvchi chiziq */}
        <div className="h-24 md:h-32 bg-gray-50 flex items-center justify-center">
          <div className="w-px h-full bg-gradient-to-b from-gray-200 to-transparent"></div>
        </div>

        {/* Statistika bo'limi */}
        <StatsSection stats={stats} bgImage={footerBg} />
      </div>

      <Partners />
      <Footer />
    </main>
  );
};

export default Home;
