import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-3 select-none">
      {/* Belgi qismi */}
      <div className="w-11 h-11 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 rotate-3 group-hover:rotate-0 transition-transform">
        <span className="text-white font-black text-2xl italic -rotate-3">
          3
        </span>
      </div>

      {/* Matn qismi */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className="text-xl font-black tracking-tighter text-white">
            POLITEXNIKUM
          </span>
          <span className="text-xl font-black text-emerald-400">3</span>
        </div>
        <div className="h-[2px] w-full bg-gradient-to-r from-emerald-500 to-transparent rounded-full" />
        <span className="text-[9px] font-bold text-emerald-100/60 uppercase tracking-[0.25em] mt-1">
          Agro-Texnologiyalar
        </span>
      </div>
    </div>
  );
};

export default Logo;
