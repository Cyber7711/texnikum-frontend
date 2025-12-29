import React from "react";
import CountUp from "react-countup";
import { Library, Users, BookOpen, Handshake } from "lucide-react";

const StatsSection = ({ stats, bgImage }) => {
  // 1. Ma'lumotlarni xavfsiz qabul qilish
  // Agar backenddan ma'lumot kelmasa, 0 deb olamiz
  const safeStats = {
    students: stats?.students || 0,
    teachers: stats?.teachers || 0,
    graduates: stats?.graduates || 0,
  };

  // 2. Ko'rsatiladigan ma'lumotlar ro'yxati
  const statItems = [
    {
      label: "Yo'nalishlar",
      value: 12, // Bu statik qiymat (o'zgarmas)
      icon: <Library size={28} />,
    },
    {
      label: "Talabalar",
      value: safeStats.students, // Backenddan kelgan raqam
      icon: <Users size={28} />,
    },
    {
      label: "Ustozlar",
      value: safeStats.teachers, // Backenddan kelgan raqam
      icon: <BookOpen size={28} />,
    },
    {
      label: "Hamkorlar",
      value: 8, // Bu statik qiymat
      icon: <Handshake size={28} />,
    },
  ];

  return (
    <div
      className="relative bg-fixed bg-center bg-cover py-20"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Qora parda (Overlay) */}
      <div className="absolute inset-0 bg-black/60 backdrop -sm"></div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Grid tizimi: Mobilga 2 ta, Katta ekranga 4 ta ustun */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-white/10 text-center">
          {statItems.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 group">
              {/* Ikonka */}
              <div className="text-gray-300 group-hover:text-blue-400 transition-colors duration-300 transform group-hover:scale-110 mb-2">
                {item.icon}
              </div>

              {/* Sanaladigan raqam */}
              <div className="text-3xl md:text-5xl font-black text-white">
                <CountUp
                  start={0}
                  end={Number(item.value)} // Har doim raqam formatiga o'tkazamiz
                  duration={3} // Sanash davomiyligi (sekund)
                  separator=" " // Mingliklarni ajratish (masalan: 1 200)
                  enableScrollSpy={true} // Faqat ekranda ko'ringanda ishlaydi
                  scrollSpyOnce={true} // Faqat bir marta ishlaydi
                />
              </div>

              {/* Matn (Label) */}
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
