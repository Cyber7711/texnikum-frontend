import { ArrowRight, GraduationCap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative bg-slate-900 h-[650px] md:h-[80vh] flex items-center overflow-hidden">
      {/* 1. Orqa fon qatlamlari */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent"></div>
      <img
        src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1986"
        alt="Technical School Building"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {/* Badge yozuvi */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
            <GraduationCap size={16} />
            {t("hero_badge")}
          </div>

          {/* Asosiy Sarlavha */}
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 leading-[1.1] uppercase italic">
            {t("hero_title_1")}{" "}
            <span className="text-emerald-500 not-italic">
              {t("hero_title_2")}
            </span>{" "}
            {t("hero_title_3")}
          </h1>

          {/* Tavsif matni */}
          <p className="text-lg md:text-2xl text-slate-200 mb-10 font-light border-l-4 border-emerald-500 pl-6">
            {t("hero_description")}
          </p>

          {/* Harakat tugmasi */}
          <div className="flex flex-wrap gap-4">
            <Link
              to="/apply"
              className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-emerald-900/30 group"
            >
              {t("hero_btn_apply")}
              <ArrowRight
                size={24}
                className="group-hover:translate-x-2 transition-transform"
              />
            </Link>

            <Link
              to="/news"
              className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/10 px-10 py-4 rounded-xl font-bold text-lg transition-all"
            >
              {t("hero_btn_news")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
