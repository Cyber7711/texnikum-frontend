import { ArrowRight } from "lucide-react";

const Hero = () => (
  <section className="relative bg-slate-900 h-[650px] flex items-center overflow-hidden">
    <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
    <img
      src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1986"
      alt="University Building"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="container mx-auto px-6 relative z-20">
      <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <h1 className="text-4xl md:text-7xl font-black text-white mb-6 leading-[1.1] uppercase italic">
          Kelajak <span className="text-yellow-400 not-italic">shu yerdan</span>{" "}
          boshlanadi
        </h1>
        <p className="text-lg md:text-2xl text-slate-200 mb-10 font-light border-l-4 border-yellow-400 pl-6">
          Zamonaviy texnologiyalar, xalqaro standartlar va professional ta'lim
          muhiti.
        </p>
        <a
          href="/apply"
          className="inline-flex items-center gap-3 bg-[#0a1128] hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-blue-900/50"
        >
          Hujjat topshirish <ArrowRight size={24} />
        </a>
      </div>
    </div>
  </section>
);

export default Hero;
