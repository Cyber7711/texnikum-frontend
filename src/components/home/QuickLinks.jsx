import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import * as LucideIcons from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const QuickLinks = () => {
  const { t } = useTranslation();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get("/quicklinks");
        const incomingData = res.data?.data || res.data;

        if (Array.isArray(incomingData)) {
          setLinks(incomingData);
        } else {
          setLinks([]);
        }
      } catch (err) {
        console.error("Xatolik:", err);
        setLinks([]);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    // DIQQAT: -mt-16 va -mt-24 orqali Hero sectionning ustiga qisman chiqib turadi
    <section className="relative z-40 -mt-16 md:-mt-24 pb-12 font-sans">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {loading ? (
          /* YUKLANISH SKELETONI (Rasmiy) */
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-white rounded-xl h-32 md:h-40 animate-pulse border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center p-6"
              >
                <div className="w-12 h-12 bg-slate-100 rounded-full mb-4"></div>
                <div className="w-24 h-3 bg-slate-100 rounded-full"></div>
              </div>
            ))}
          </div>
        ) : Array.isArray(links) && links.length > 0 ? (
          /* ASOSIY LINKLAR GRIDI */
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {links.map((link, index) => {
              const IconComponent = LucideIcons[link.icon] || LucideIcons.Link;

              return (
                <motion.a
                  key={link._id}
                  href={link.url}
                  target={link.isExternal ? "_blank" : "_self"}
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  className="group relative flex flex-col items-center justify-center text-center p-6 md:p-8 bg-white rounded-xl border border-slate-100/80 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-10px_rgba(10,25,48,0.12)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  {/* Tilla va Ko'k rangli tepa chiziq effekti */}
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-blue-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />

                  {/* Ikonka qismi */}
                  <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mb-4 md:mb-5 rounded-full bg-slate-50 border border-slate-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <IconComponent
                      size={24}
                      className="md:w-7 md:h-7"
                      strokeWidth={2}
                    />
                  </div>

                  {/* Sarlavha qismi */}
                  <h3 className="text-xs md:text-sm font-bold text-[#0a1930] uppercase tracking-wide group-hover:text-blue-700 transition-colors duration-300 leading-snug">
                    {link.title}
                  </h3>
                </motion.a>
              );
            })}
          </div>
        ) : (
          /* BO'SH HOLAT */
          <div className="col-span-full flex flex-col items-center justify-center text-center p-12 bg-white rounded-xl border border-slate-100 shadow-lg">
            <LucideIcons.Link className="w-10 h-10 mb-3 text-slate-300" />
            <p className="uppercase tracking-widest text-[10px] md:text-xs font-bold text-slate-400">
              {t("no_links_available", "Tezkor havolalar mavjud emas")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default QuickLinks;
