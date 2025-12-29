import { useState } from "react";
import { Play, X, CheckCircle, ArrowRight } from "lucide-react";

const VideoSection = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Orqa fon bezaklari */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-blue-600/5 -skew-x-12 transform origin-top-right pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* 1. CHAP TOMON: Matn va Statistika */}
          <div className="flex-1 text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              Biz haqimizda
            </div>

            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-[1.1]">
              Zamonaviy bilim va <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                Amaliy tajriba
              </span>
            </h2>

            <p className="text-slate-300 text-lg mb-8 leading-relaxed font-light">
              Bizning texnikumda siz nafaqat nazariy bilimlar, balki real
              loyihalar ustida ishlash imkoniyatiga ega bo'lasiz. Bizning
              maqsadimiz - O'zbekiston kelajagi uchun yetuk kadrlar tayyorlash.
            </p>

            {/* Qisqa ro'yxat */}
            <div className="space-y-4 mb-10">
              <FeatureItem text="Xalqaro darajadagi diplom" />
              <FeatureItem text="Zamonaviy o'quv laboratoriyalari" />
              <FeatureItem text="IT kompaniyalarda amaliyot" />
            </div>

            {/* Statistika */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <StatBox number="15+" label="Yillik tajriba" />
              <StatBox number="2.5k+" label="Bitiruvchilar" />
              <StatBox number="98%" label="Ishga joylashish" />
            </div>
          </div>

          {/* 2. O'NG TOMON: Video Player (Preview) */}
          <div className="flex-1 w-full relative group">
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 cursor-pointer aspect-video transform group-hover:scale-[1.02] transition-all duration-500"
              onClick={() => setShowVideo(true)}
            >
              {/* Preview Rasm */}
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070"
                alt="Video Thumbnail"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Qoraytirish */}
              <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/30 transition-all flex items-center justify-center">
                {/* Play Tugmasi */}
                <div className="relative">
                  <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-lg pl-1">
                      <Play fill="currentColor" size={28} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Videoni davomiyligi */}
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-white">
                02:45
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. VIDEO MODAL (Bosilganda chiqadi) */}
      {showVideo && (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white hover:rotate-90 transition-all"
          >
            <X size={40} />
          </button>

          <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

// Yordamchi komponentlar
const FeatureItem = ({ text }) => (
  <div className="flex items-center gap-3 text-slate-300">
    <CheckCircle size={20} className="text-emerald-400 shrink-0" />
    <span>{text}</span>
  </div>
);

const StatBox = ({ number, label }) => (
  <div>
    <h4 className="text-3xl font-black text-white mb-1">{number}</h4>
    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
      {label}
    </p>
  </div>
);

export default VideoSection;
