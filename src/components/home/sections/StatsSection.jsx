import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { Library, Users, BookOpen, Handshake, BarChart3 } from "lucide-react";
import { useTranslation } from "react-i18next";

const StatsSection = ({ stats, bgImage }) => {
  const { t } = useTranslation();

  const safeStats = {
    students: stats?.students || 0,
    teachers: stats?.teachers || 0,
    graduates: stats?.graduates || 0,
  };

  const statItems = [
    {
      label: t("stats_directions", "TA'LIM YO'NALISHLARI"),
      value: 12,
      icon: <Library size={28} />,
    },
    {
      label: t("stats_students", "TALABALAR"),
      value: safeStats.students,
      icon: <Users size={28} />,
    },
    {
      label: t("stats_teachers", "O'QITUVCHILAR"),
      value: safeStats.teachers,
      icon: <BookOpen size={28} />,
    },
    {
      label: t("stats_partners", "HAMKORLAR"),
      value: 8,
      icon: <Handshake size={28} />,
    },
  ];

  return (
    <div
      className="relative bg-fixed bg-center bg-cover py-28 border-y border-slate-800 font-sans"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Orqa fon qatlami (Siz so'ragandek o'zgarishsiz qoldirildi, xato yozuv to'g'rilandi: backdrop-blur) */}
      <div className="absolute inset-0 bg-black/75"></div>

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        {/* Sarlavha qismi - Premium ko'rinish beradi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 text-[10px] font-extrabold uppercase tracking-widest mb-6 shadow-sm">
            <BarChart3 size={14} />
            {t("stats_badge", "NATIJALAR VA RAQAMLAR")}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight leading-tight">
            MUASSASA{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              STATISTIKASI
            </span>
          </h2>
          <div className="w-16 h-1.5 bg-amber-400 mt-6 rounded-full mx-auto"></div>
        </motion.div>

        {/* Kartochkalar (Grid) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {statItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col items-center justify-center gap-5 p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 relative overflow-hidden"
            >
              {/* Tepadan tushadigan ingichka ko'k chiziq (Premium effekt) */}
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />

              {/* Ikonka bloki */}
              <div className="text-blue-400 group-hover:text-white transition-colors duration-300 mb-2 p-4 bg-blue-500/10 rounded-xl group-hover:bg-blue-600 border border-white/5 shadow-inner">
                {item.icon}
              </div>

              {/* Raqamlar (CountUp) */}
              <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-baseline gap-1">
                <CountUp
                  end={item.value ? Number(item.value) : 0}
                  duration={2.5}
                  enableScrollSpy
                  scrollSpyOnce
                />
                <span className="text-amber-400 text-3xl font-black">+</span>
              </div>

              {/* Matn (Label) */}
              <div className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-200 transition-colors text-center mt-1">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
