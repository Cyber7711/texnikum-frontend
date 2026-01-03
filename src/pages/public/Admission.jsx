import { motion } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  GraduationCap,
  ArrowRight,
  Phone,
  Download,
  AlertCircle,
  Clock,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const Admission = () => {
  const { t } = useTranslation();

  const ADMISSION_INFO = {
    year: "2025-2026",
    startDate: "20 Iyun",
    endDate: "25 Avgust",
    phone: "+998 71 123 45 67",
    myGov: "https://my.gov.uz",
  };

  const DIRECTIONS = [
    {
      id: 1,
      title: "Kompyuter injiniringi",
      code: "5330200",
      quota: 60,
      lang: "O'zbek / Rus",
      contract: "7.5 mln",
    },
    {
      id: 2,
      title: "Agro-Logistika",
      code: "5410500",
      quota: 45,
      lang: "O'zbek",
      contract: "6.8 mln",
    },
    {
      id: 3,
      title: "Buxgalteriya hisobi",
      code: "5230900",
      quota: 30,
      lang: "O'zbek",
      contract: "7.0 mln",
    },
    {
      id: 4,
      title: "Qishloq xo'jaligini mexanizatsiyalash",
      code: "5410100",
      quota: 50,
      lang: "O'zbek",
      contract: "6.5 mln",
    },
  ];

  const DOCUMENTS = [
    "Pasport nusxasi (asli ko'rsatiladi)",
    "Umumiy o'rta ta'lim (11-sinf) shahodatnomasi",
    "3.5 x 4.5 hajmdagi 6 dona rangli fotosurat",
    "086-U shaklidagi tibbiy ma'lumotnoma",
    "Ariza (qabul komissiyasida to'ldiriladi)",
  ];

  return (
    <div className="bg-white min-h-screen pb-20 font-sans overflow-x-hidden">
      {/* 1. HERO BANNER - Modern Skew & Glow */}
      <section className="relative bg-[#0a1128] pt-32 pb-40 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -mr-40 -mt-40 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -ml-20 -mb-20"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
          >
            <ShieldCheck size={14} /> Qabul {ADMISSION_INFO.year}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9] uppercase italic"
          >
            Kelajagingizni <br />
            <span className="text-emerald-500 not-italic">
              Biz bilan quring
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto mb-12 font-medium leading-relaxed"
          >
            Zamonaviy texnologiyalar va Agro-soha mutaxassisligi bo'yicha
            hujjatlar qabuli davom etmoqda.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a
              href="/apply"
              className="w-full sm:w-auto px-12 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all shadow-2xl shadow-emerald-900/40 flex items-center justify-center gap-3 active:scale-95 italic"
            >
              Hujjat topshirish <ArrowRight size={18} />
            </a>
            <a
              href="#directions"
              className="w-full sm:w-auto px-12 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-md rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all italic"
            >
              Yo'nalishlar
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. IMPORTANT INFO CARDS */}
      <div className="container mx-auto px-6 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          <StatCard
            icon={<Calendar />}
            label="Boshlanish"
            value={ADMISSION_INFO.startDate}
            color="emerald"
            delay={0.1}
          />
          <StatCard
            icon={<Clock />}
            label="Tugash"
            value={ADMISSION_INFO.endDate}
            color="rose"
            delay={0.2}
          />
          <StatCard
            icon={<Phone />}
            label="Aloqa"
            value={ADMISSION_INFO.phone}
            color="blue"
            delay={0.3}
          />
        </div>
      </div>

      {/* 3. DIRECTIONS SECTION */}
      <section id="directions" className="container mx-auto px-6 py-32">
        <div className="flex flex-col items-center text-center mb-20">
          <span className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4">
            Mutaxassisliklar
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase italic tracking-tighter">
            Mavjud <span className="text-emerald-500">Yo'nalishlar</span>
          </h2>
          <div className="w-24 h-2 bg-slate-900 mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {DIRECTIONS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 shadow-inner">
                <GraduationCap size={32} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4 leading-tight italic uppercase group-hover:text-emerald-600">
                {item.title}
              </h3>

              <div className="space-y-4 pt-4 border-t border-slate-50">
                <DataRow label="Kvota" value={`${item.quota} ta`} bold />
                <DataRow label="Til" value={item.lang} />
                <DataRow label="Kontrakt" value={item.contract} highlight />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. DOCUMENTS & PROCESS - Split Layout */}
      <section className="bg-slate-900 py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-500 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            {/* Documents List */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
                Talab Etiladigan <br />
                <span className="text-emerald-500">Hujjatlar</span>
              </h2>
              <div className="space-y-4">
                {DOCUMENTS.map((doc, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-5 bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 group transition-all"
                  >
                    <div className="bg-emerald-500/20 text-emerald-400 p-3 rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all">
                      <CheckCircle2 size={24} />
                    </div>
                    <span className="text-slate-300 font-bold text-sm tracking-wide">
                      {doc}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Process Steps */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[4rem] p-10 md:p-16 shadow-2xl relative"
            >
              <div className="absolute top-10 right-10 text-slate-100 hidden md:block">
                <ExternalLink size={120} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-12 uppercase italic tracking-tighter">
                Qabul <span className="text-emerald-500">Bosqichlari</span>
              </h3>

              <div className="space-y-12">
                <StepItem
                  num="01"
                  title="Ariza topshirish"
                  desc="Online (my.gov.uz) yoki texnikum binosida."
                />
                <StepItem
                  num="02"
                  title="Imtihon jarayoni"
                  desc="Davlat test markazi tomonidan o'tkaziladi."
                />
                <StepItem
                  num="03"
                  title="Natijalar (Mandat)"
                  desc="Belgilangan sanada natijalarni tekshiring."
                />
                <StepItem
                  num="04"
                  title="Talabalikka qabul"
                  desc="Shartnoma to'lovini amalga oshiring."
                />
              </div>

              <button className="w-full mt-12 py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 italic">
                <Download size={18} /> Nizomni Yuklab Olish (PDF)
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const StatCard = ({ icon, label, value, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-50 flex items-center gap-6 group hover:scale-105 transition-all duration-500"
  >
    <div
      className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl transition-transform group-hover:rotate-12 ${
        color === "emerald"
          ? "bg-emerald-500 shadow-emerald-200"
          : color === "rose"
          ? "bg-rose-500 shadow-rose-200"
          : "bg-blue-500 shadow-blue-200"
      }`}
    >
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
        {label}
      </p>
      <h4 className="text-2xl font-black text-slate-800 tracking-tighter">
        {value}
      </h4>
    </div>
  </motion.div>
);

const DataRow = ({ label, value, bold, highlight }) => (
  <div className="flex justify-between items-center text-xs">
    <span className="text-slate-400 font-bold uppercase tracking-widest">
      {label}
    </span>
    <span
      className={`tracking-tight ${
        bold ? "font-black text-slate-800" : "font-bold text-slate-600"
      } ${highlight ? "text-emerald-600" : ""}`}
    >
      {value}
    </span>
  </div>
);

const StepItem = ({ num, title, desc }) => (
  <div className="flex gap-6 group">
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white font-black flex items-center justify-center text-lg group-hover:bg-emerald-500 transition-colors">
        {num}
      </div>
      <div className="w-1 h-full bg-slate-100 my-2 rounded-full"></div>
    </div>
    <div className="pb-4">
      <h4 className="font-black text-slate-800 text-lg uppercase italic tracking-tight mb-1">
        {title}
      </h4>
      <p className="text-slate-500 text-sm font-medium leading-relaxed">
        {desc}
      </p>
    </div>
  </div>
);

export default Admission;
