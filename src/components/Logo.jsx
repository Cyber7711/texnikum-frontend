import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-3.5 select-none group cursor-pointer">
      {/* RASMLI BELGI QISMI */}
      <div className="relative w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center shadow-md border border-blue-400/30 transition-all duration-500 overflow-hidden shrink-0 bg-white">
        <img
          src="/logo/logo.png"
          alt="3-son texnikumi"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* MATN QISMI */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline gap-1.5">
          <span className="text-lg md:text-xl font-extrabold tracking-tight text-white group-hover:text-amber-400 transition-colors duration-300">
            3-SON TEXNIKUMI
          </span>
        </div>

        {/* Silliq animatsiyali chiziq (Premium hover effekt) */}
        <div className="h-[2px] w-8 bg-amber-400 rounded-full mt-0.5 mb-1 transition-all duration-500 ease-out group-hover:w-full" />

        <span className="text-[7px] md:text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-none">
          Samarqand viloyati, Pastdarg'om
        </span>
      </div>
    </div>
  );
};

export default Logo;
