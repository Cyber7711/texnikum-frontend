import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Swiper stillarini import qilish
import "swiper/css";
import "swiper/css/navigation";

const Partners = () => {
  const partners = [
    {
      name: "Oliy Ta'lim Vazirligi",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Emblem_of_Uzbekistan.svg/1024px-Emblem_of_Uzbekistan.svg.png",
    },
    {
      name: "IT Park",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/92/IT_Park_Uzbekistan_Logo.png",
    },
    {
      name: "Cambridge",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/University_of_Cambridge_logo.svg/2560px-University_of_Cambridge_logo.svg.png",
    },
    {
      name: "Coursera",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/97/Coursera-Logo_600x600.svg",
    },
    {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    },
    {
      name: "EPAM",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Epam_Systems_logo.svg",
    },
    {
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
  ];

  return (
    <div className="py-12 bg-white border-y border-gray-50">
      <div className="container mx-auto px-6 relative group">
        <h2 className="text-xl font-bold text-center text-gray-800 mb-10 uppercase tracking-[0.2em]">
          Bizning Hamkorlar
        </h2>

        {/* Swiper Karusel */}
        <div className="relative flex items-center">
          {/* Chap strelka */}
          <button className="prev-btn absolute -left-4 z-10 p-2 bg-white shadow-md rounded-full border border-gray-100 text-gray-400 hover:text-blue-600 transition-all opacity-0 group-hover:opacity-100">
            <ChevronLeft size={24} />
          </button>

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={40}
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
            className="w-full flex items-center"
          >
            {partners.map((partner, index) => (
              <SwiperSlide
                key={index}
                className="flex items-center justify-center py-4"
              >
                <div
                  className="group w-full h-16 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
                  title={partner.name}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain transform group-hover:scale-105 transition-transform"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* O'ng strelka */}
          <button className="next-btn absolute -right-4 z-10 p-2 bg-white shadow-md rounded-full border border-gray-100 text-gray-400 hover:text-blue-600 transition-all opacity-0 group-hover:opacity-100">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Partners;
