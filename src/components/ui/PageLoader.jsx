import { useTranslation } from "react-i18next";
import Logo from "../Logo"; // Logo komponentini import qilamiz

const PageLoader = () => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0a1128] flex flex-col items-center justify-center">
      {/* Markaziy animatsiya konteyneri */}
      <div className="relative flex items-center justify-center scale-125">
        {/* Tashqi aylanuvchi zamonaviy xalqa */}
        <div className="absolute w-32 h-32 border-[3px] border-emerald-500/10 border-t-emerald-500 rounded-[2.5rem] animate-spin [animation-duration:1.5s]"></div>

        {/* O'rtadagi pulsatsiyalanuvchi xalqa */}
        <div className="absolute w-24 h-24 border border-emerald-500/20 rounded-[1.5rem] animate-pulse"></div>

        {/* Markazda bizning logotip (faqat belgi qismi) */}
        <div className="relative z-10 flex flex-col items-center animate-bounce [animation-duration:2s]">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/40 rotate-3">
            <span className="text-white font-black text-3xl italic -rotate-3">
              3
            </span>
          </div>
        </div>
      </div>

      {/* Yuklanish matni va statusi */}
      <div className="mt-16 flex flex-col items-center">
        {/* Brend nomi */}
        <div className="flex items-center gap-1.5 mb-3">
          <span className="text-white font-black tracking-widest text-sm uppercase">
            Texnikum
          </span>
          <span className="text-emerald-500 font-black text-sm uppercase">
            3
          </span>
        </div>

        {/* Yuklanmoqda matni */}
        <h2 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">
          {t("loading")}
        </h2>

        {/* Yuklanish nuqtalari */}
        <div className="flex gap-1.5 mt-4">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></div>
        </div>
      </div>

      {/* Pastki qismdagi dekoratsiya (ixtiyoriy) */}
      <div className="absolute bottom-10 text-[9px] text-slate-600 font-bold uppercase tracking-[0.2em]">
        Agro-Technology Educational System
      </div>
    </div>
  );
};

export default PageLoader;
