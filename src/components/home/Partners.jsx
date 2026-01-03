import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight, Handshake } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

// Swiper stillarini import qilish
import "swiper/css";
import "swiper/css/navigation";

const Partners = () => {
  const { t } = useTranslation();

  // O'zbekistonning asosiy hamkor tashkilotlari
  const partners = [
    {
      name: "Oliy ta'lim, fan va innovatsiyalar vazirligi",
      logo: "https://mininnovation.uz/media/logo/logo_uz_K0nK8lT.svg",
    },
    {
      name: "IT Park Uzbekistan",
      logo: "https://it-park.uz/storage/images/it-park-logo.svg",
    },
    {
      name: "Raqamli texnologiyalar vazirligi",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Emblem_of_Uzbekistan.svg/512px-Emblem_of_Uzbekistan.svg.png",
    },
    {
      name: "Yoshlar ishlari agentligi",
      logo: "https://yoshlar.uz/images/logo-dark.png",
    },
    {
      name: "Zamin Foundation",
      logo: "https://zaminfoundation.uz/img/logo.png",
    },
    {
      name: "EPAM Uzbekistan",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/EPAM_Systems_logo.svg/2560px-EPAM_Systems_logo.svg.png",
    },
  ];

  return (
    <div className="py-24 bg-white border-y border-slate-50 relative overflow-hidden">
      {/* Orqa fon bezagi - xira nur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/[0.02] via-transparent to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 relative group">
        {/* Sarlavha qismi - Premium Style */}
        <div className="flex flex-col items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4 italic"
          >
            <Handshake size={14} className="text-emerald-500" />{" "}
            {t("our_partners") || "ISHONCHLI HAMKORLARIMIZ"}
          </motion.div>
          <div className="w-12 h-1 bg-emerald-500 rounded-full"></div>
        </div>

        {/* Swiper Karusel */}
        <div className="relative flex items-center px-4 md:px-12">
          {/* Chap strelka */}
          <button className="prev-btn absolute left-0 z-10 w-12 h-12 flex items-center justify-center bg-white shadow-xl shadow-slate-200/50 rounded-2xl border border-slate-50 text-slate-400 hover:text-emerald-500 hover:border-emerald-500 transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0">
            <ChevronLeft size={24} />
          </button>

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={50}
            slidesPerView={2}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            navigation={{
              prevEl: ".prev-btn",
              nextEl: ".next-btn",
            }}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
            className="w-full"
          >
            {partners.map((partner, index) => (
              <SwiperSlide
                key={index}
                className="flex items-center justify-center py-6"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-full h-20 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-pointer p-4 rounded-3xl hover:bg-slate-50/50"
                  title={partner.name}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain filter drop-shadow-sm"
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* O'ng strelka */}
          <button className="next-btn absolute right-0 z-10 w-12 h-12 flex items-center justify-center bg-white shadow-xl shadow-slate-200/50 rounded-2xl border border-slate-50 text-slate-400 hover:text-emerald-500 hover:border-emerald-500 transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Partners;
