import { Loader2 } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#0a1128] flex flex-col items-center justify-center">
      {/* Markaziy animatsiya */}
      <div className="relative flex items-center justify-center">
        {/* Tashqi aylanuvchi xalqa */}
        <div className="w-24 h-24 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>

        {/* Ichki logotip yoki matn */}
        <div className="absolute flex flex-col items-center">
          <span className="text-white font-black text-xl tracking-tighter">
            TEX
          </span>
          <div className="w-8 h-1 bg-yellow-400 rounded-full mt-1 animate-pulse"></div>
        </div>
      </div>

      {/* Yuklanish matni */}
      <div className="mt-8 flex flex-col items-center">
        <h2 className="text-gray-400 text-xs font-bold uppercase tracking-[0.5em] animate-pulse">
          Yuklanmoqda
        </h2>
        <div className="flex gap-1 mt-2">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
