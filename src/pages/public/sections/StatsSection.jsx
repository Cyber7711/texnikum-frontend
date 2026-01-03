import React from "react";
import CountUp from "react-countup";
import { Library, Users, BookOpen, Handshake } from "lucide-react";
import { useTranslation } from "react-i18next";

const StatsSection = ({ stats, bgImage }) => {
  const { t } = useTranslation();

  // Agar stats null yoki undefined bo'lsa, xavfsiz obyekt yaratamiz
  const safeStats = {
    students: stats?.students || 0,
    teachers: stats?.teachers || 0,
    graduates: stats?.graduates || 0,
  };

  const statItems = [
    {
      label: t("stats_directions"),
      value: 12, // Static raqam
      icon: <Library size={28} />,
    },
    {
      label: t("stats_students"),
      value: safeStats.students,
      icon: <Users size={28} />,
    },
    {
      label: t("stats_teachers"),
      value: safeStats.teachers,
      icon: <BookOpen size={28} />,
    },
    {
      label: t("stats_partners"),
      value: 8, // Static raqam
      icon: <Handshake size={28} />,
    },
  ];

  return (
    <div
      className="relative bg-fixed bg-center bg-cover py-20"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-sm"></div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-white/10 text-center">
          {statItems.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 group">
              <div className="text-gray-300 group-hover:text-emerald-400 transition-colors duration-300 transform group-hover:scale-110 mb-2">
                {item.icon}
              </div>

              <div className="text-3xl md:text-5xl font-black text-white">
                {/* Agar qiymat 0 bo'lsa yoki yuklanayotgan bo'lsa, shunchaki 0 ko'rsatish */}
                <CountUp
                  start={0}
                  end={item.value ? Number(item.value) : 0}
                  duration={3}
                  separator=" "
                  enableScrollSpy={true}
                  scrollSpyOnce={true}
                />
              </div>

              <div className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-gray-200 transition-colors mt-1">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
