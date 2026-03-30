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

  const partners = [
    {
      name: "Oliy ta'lim vazirligi",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Emblem_of_Uzbekistan.svg/1024px-Emblem_of_Uzbekistan.svg.png",
    },
    {
      name: "IT Park Uzbekistan",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/IT_Park_Uzbekistan_Logo.png",
    },
    {
      name: "Raqamli texnologiyalar vazirligi",
      logo: "https://digital.uz/assets/images/logo.png",
    },
    {
      name: "Yoshlar ishlari agentligi",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Emblem_of_Uzbekistan.svg/1024px-Emblem_of_Uzbekistan.svg.png",
    },
    {
      name: "OneID",
      logo: "https://id.egov.uz/assets/images/logo.svg",
    },
    {
      name: "EPAM Uzbekistan",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/EPAM_Logo.svg/2560px-EPAM_Logo.svg.png",
    },
  ];

  return (
    <div className="py-24 bg-white border-y border-slate-200 relative overflow-hidden font-sans">
      {/* Orqa fon bezagi (Juda yengil ko'k nur) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/[0.02] via-transparent to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative group">
        {/* Sarlavha qismi */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-extrabold uppercase tracking-widest mb-6 shadow-sm"
          >
            <Handshake size={14} className="text-blue-600" />
            {t("our_partners", "ISHONCHLI HAMKORLARIMIZ")}
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1930] uppercase tracking-tight mb-6">
            HAMKOR <span className="text-blue-600">TASHKILOTLAR</span>
          </h2>

          <div className="w-16 h-1.5 bg-amber-400 rounded-full"></div>
        </div>

        {/* Swiper Karusel */}
        <div className="relative flex items-center px-4 md:px-12">
          {/* Chap tugma */}
          <button className="prev-btn absolute left-0 z-10 w-12 h-12 flex items-center justify-center bg-white shadow-md rounded-full border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-600 hover:shadow-lg transition-all opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 cursor-pointer">
            <ChevronLeft size={24} />
          </button>

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={2}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation={{
              prevEl: ".prev-btn",
              nextEl: ".next-btn",
            }}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
            className="w-full py-6"
          >
            {partners.map((partner, index) => (
              <SwiperSlide
                key={index}
                className="flex items-center justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="w-full h-28 flex items-center justify-center p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 cursor-pointer group/logo"
                  title={partner.name}
                >
                  {/* Rasmiy Grayscale (Oq-qora) dan rangliga o'tish effekti */}
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain filter grayscale opacity-50 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 transition-all duration-500"
                    loading="lazy"
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* O'ng tugma */}
          <button className="next-btn absolute right-0 z-10 w-12 h-12 flex items-center justify-center bg-white shadow-md rounded-full border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-600 hover:shadow-lg transition-all opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 cursor-pointer">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Partners;
