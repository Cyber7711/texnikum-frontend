import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-3.5 select-none group cursor-pointer">
      {/* Belgi qismi (Rasmiy, toza va qat'iy shakl) */}
      <div className="relative w-11 h-11 md:w-12 md:h-12 bg-gradient-to-b from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-md border border-blue-400/30 group-hover:shadow-blue-500/20 transition-all duration-500 overflow-hidden shrink-0">
        {/* Tilla rangli nozik nur effekti */}
        <div className="absolute top-0 left-0 w-full h-1 bg-amber-400/80" />
        <span className="text-white font-extrabold text-2xl md:text-3xl tracking-tighter mt-1">
          3
        </span>
      </div>

      {/* Matn qismi (Premium tipografiya) */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline gap-1.5">
          <span className="text-lg md:text-xl font-extrabold tracking-tight text-white group-hover:text-amber-400 transition-colors duration-300">
            POLITEXNIKUM
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
