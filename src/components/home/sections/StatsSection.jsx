import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { Library, Users, BookOpen, Handshake, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

const StatsSection = ({ stats, bgImage }) => {
  const { t } = useTranslation();

  const safeStats = {
    students: stats?.students || 0,
    teachers: stats?.teachers || 0,
    graduates: stats?.graduates || 0,
  };

  const statItems = [
    { label: t("stats_directions"), value: 12, icon: <Library size={32} /> },
    {
      label: t("stats_students"),
      value: safeStats.students,
      icon: <Users size={32} />,
    },
    {
      label: t("stats_teachers"),
      value: safeStats.teachers,
      icon: <BookOpen size={32} />,
    },
    { label: t("stats_partners"), value: 8, icon: <Handshake size={32} /> },
  ];

  return (
    <div
      className="relative bg-fixed bg-center bg-cover py-24 border-y border-white/5"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Orqa fon qatlami (Siz so'ragandek o'zgarmadi) */}
      <div className="absolute inset-0 bg-black/70 backdrop-[2px]"></div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Sarlavha qismi - Premium ko'rinish beradi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
            <Zap size={14} fill="currentColor" />{" "}
            {t("stats_badge") || "Natijalar"}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
            Bizning{" "}
            <span className="text-emerald-500 not-italic">Statistikamiz</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
          {statItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col items-center gap-4 p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:bg-white/10 transition-all duration-500"
            >
              <div className="text-emerald-400 group-hover:text-white transition-colors duration-500 transform group-hover:scale-110 mb-2 p-4 bg-white/5 rounded-2xl group-hover:bg-emerald-600 shadow-xl">
                {item.icon}
              </div>

              <div className="text-4xl md:text-6xl font-black text-white tracking-tighter flex items-baseline gap-1">
                <CountUp
                  end={item.value ? Number(item.value) : 0}
                  duration={3}
                  enableScrollSpy
                  scrollSpyOnce
                />
                <span className="text-emerald-500 text-2xl">+</span>
              </div>

              <div className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em] group-hover:text-white transition-colors text-center italic">
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
