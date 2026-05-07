import React, { useState, useEffect } from "react";
import axios from "axios"; // yoki o'zingizning axiosInstance
import CountUp from "react-countup";
import { motion } from "framer-motion";
import {
  Library,
  Users,
  BookOpen,
  Handshake,
  BarChart3,
  Loader2,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const StatsSection = ({ bgImage }) => {
  const { t } = useTranslation();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("/api/v1/stats"); // API manzili
        setStats(response.data.data);
      } catch (err) {
        console.error("Statistika yuklanmadi:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Ma'lumotlar kelguncha ko'rsatiladigan statik xarita
  const statItems = [
    {
      label: t("stats_directions", "TA'LIM YO'NALISHLARI"),
      value: stats?.directions || 0,
      icon: <Library size={28} />,
    },
    {
      label: t("stats_students", "TALABALAR"),
      value: stats?.students || 0,
      icon: <Users size={28} />,
    },
    {
      label: t("stats_teachers", "O'QITUVCHILAR"),
      value: stats?.teachers || 0,
      icon: <BookOpen size={28} />,
    },
    {
      label: t("stats_partners", "HAMKORLAR"),
      value: stats?.partners || 0,
      icon: <Handshake size={28} />,
    },
  ];

  if (loading) {
    return (
      <div className="py-28 bg-[#0a1930] flex justify-center items-center">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  return (
    <div
      className="relative bg-fixed bg-center bg-cover py-28 border-y border-slate-800 font-sans"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]"></div>

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        {/* Sarlavha qismi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[3px] mb-6">
            <BarChart3 size={14} />
            {t("stats_badge", "REALLIK RAQAMLARDA")}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white">
            BIZNING <span className="text-blue-500">NATIJALAR</span>
          </h2>
          <div className="w-12 h-1 bg-amber-400 mt-6 rounded-full mx-auto"></div>
        </motion.div>

        {/* Grid qismi */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {statItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all duration-500 overflow-hidden text-center"
            >
              {/* Ikonka */}
              <div className="mb-6 inline-flex p-4 rounded-2xl bg-blue-600/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                {item.icon}
              </div>

              {/* Raqam */}
              <div className="text-4xl md:text-5xl font-black text-white mb-2 flex justify-center items-baseline gap-1">
                <CountUp end={item.value} duration={3} enableScrollSpy />
                <span className="text-amber-400 text-2xl">+</span>
              </div>

              {/* Matn */}
              <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest group-hover:text-slate-300">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
