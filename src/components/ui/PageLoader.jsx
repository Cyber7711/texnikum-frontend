import { useTranslation } from "react-i18next";

const PageLoader = () => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0a1930] flex flex-col items-center justify-center font-sans overflow-hidden">
      {/* Orqa fondagi yengil nur (Glow) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-900/20 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Markaziy animatsiya konteyneri */}
      <div className="relative flex items-center justify-center">
        {/* Tashqi aylanuvchi nafis xalqa (Ko'k) */}
        <div className="absolute w-32 h-32 border-2 border-white/5 border-t-blue-500 rounded-full animate-spin [animation-duration:1.5s]"></div>

        {/* Ichki aylanuvchi nafis xalqa (Tilla) */}
        <div className="absolute w-24 h-24 border-2 border-white/5 border-b-amber-400 rounded-full animate-spin [animation-duration:2s] [animation-direction:reverse]"></div>

        {/* Markazda Yangi Rasmiy Logotip Belgisi */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-14 h-14 bg-gradient-to-b from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/50 border border-blue-400/30 overflow-hidden">
            {/* Tilla rangli nozik nur effekti */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-amber-400" />
            <span className="text-white font-extrabold text-3xl tracking-tighter mt-1">
              3
            </span>
          </div>
        </div>
      </div>

      {/* Yuklanish matni va statusi */}
      <div className="mt-16 flex flex-col items-center relative z-10">
        {/* Muassasa qisqa nomi */}
        <h1 className="text-white font-extrabold text-lg tracking-widest mb-1 uppercase">
          POLITEXNIKUM
        </h1>
        <div className="w-10 h-0.5 bg-amber-400 rounded-full mb-6"></div>

        {/* Yuklanmoqda matni */}
        <h2 className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.3em] animate-pulse flex items-center gap-2">
          {t("loading", "TIZIM YUKLANMOQDA")}

          {/* Silliq yonib-o'chuvchi nuqtalar */}
          <span className="flex gap-0.5">
            <span className="animate-[ping_1.5s_infinite_0ms] bg-blue-400 w-1 h-1 rounded-full"></span>
            <span className="animate-[ping_1.5s_infinite_300ms] bg-blue-400 w-1 h-1 rounded-full"></span>
            <span className="animate-[ping_1.5s_infinite_600ms] bg-blue-400 w-1 h-1 rounded-full"></span>
          </span>
        </h2>
      </div>

      {/* Pastki qismdagi dekoratsiya (Muassasa manzili va yili) */}
      <div className="absolute bottom-10 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em]">
          <span className="w-4 h-[1px] bg-slate-600"></span>
          Samarqand viloyati, Pastdarg'om
          <span className="w-4 h-[1px] bg-slate-600"></span>
        </div>
        <span className="text-[8px] text-slate-600 font-extrabold tracking-widest">
          © {new Date().getFullYear()}
        </span>
      </div>
    </div>
  );
};

export default PageLoader;
