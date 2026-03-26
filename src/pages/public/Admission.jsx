import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  GraduationCap,
  Phone,
  Clock,
  ShieldCheck,
  X,
  Target,
  Wrench,
  BookOpen,
  Landmark,
  ArrowRight,
  Tractor,
  Scissors,
  Settings,
  Droplet,
  ChefHat,
  Cpu,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SEO from "../../components/common/SEO";

const Admission = () => {
  const { t } = useTranslation();
  const [selectedDir, setSelectedDir] = useState(null);

  useEffect(() => {
    if (selectedDir) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedDir]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const ADMISSION_CONFIG = {
    year: "2025/2026",
    startDate: "20.06.2025",
    endDate: "25.08.2025",
    phone: "+998 66 123 45 67",
  };

  // AGRO-SANOAT VA KASB-HUNAR YONALISHLARI (9-sinf bazasida, Bepul)
  const DIRECTIONS = [
    {
      id: "agronomy",
      title: "Agro-Sanoat va Fermerlik",
      code: "5410100",
      duration: "2 yil",
      type: "Davlat granti (Bepul)",
      learn:
        "Zamonaviy qishloq xo'jaligi texnologiyalari, ekinlarni parvarishlash, agrotexnika qoidalari va fermer xo'jaligini yuritish asoslari.",
      work: "Agro-klasterlar, yirik fermer xo'jaliklari va qishloq xo'jaligi bo'limlarida mutaxassis sifatida.",
      skills: ["Agrotexnika", "Chorvachilik", "Yer tuzish"],
      icon: <Tractor size={32} strokeWidth={1.5} />,
    },
    {
      id: "sewing",
      title: "Tikuvchilik va Dizayn",
      code: "5320900",
      duration: "2 yil",
      type: "Davlat granti (Bepul)",
      learn:
        "Kiyimlarni modellashtirish, bichish va tikish texnologiyalari, zamonaviy tikuv mashinalarida ishlash sirlari.",
      work: "Tekstil fabrikalarida, moda uylarida dizayner-tikuvchi bo'lish yoki xususiy tikuvchilik sexini ochish.",
      skills: ["Bichish-tikish", "Modellashtirish", "Dizayn"],
      icon: <Scissors size={32} strokeWidth={1.5} />,
    },
    {
      id: "mechanic",
      title: "Avtomobillarga xizmat ko'rsatish",
      code: "5310600",
      duration: "2 yil",
      type: "Davlat granti (Bepul)",
      learn:
        "Avtomobil dvigatellari, yurish qismlari, elektronikasini ta'mirlash hamda zamonaviy diagnostika uskunalarida ishlash.",
      work: "Avtoservislar, dilerlik markazlari va transport korxonalarida malakali avtomexanik bo'lib ishlash.",
      skills: ["Avtodiagnostika", "Dvigatel ta'mirlash", "Elektronika"],
      icon: <Settings size={32} strokeWidth={1.5} />,
    },
    {
      id: "plumbing",
      title: "Santexnika va Payvandlash",
      code: "5340200",
      duration: "2 yil",
      type: "Davlat granti (Bepul)",
      learn:
        "Isitish, sovitish va suv ta'minoti tizimlarini o'rnatish, turli metallarni qirqish va payvandlash sirlari.",
      work: "Qurilish kompaniyalarida, kommunal xizmat idoralarida mutaxassis bo'lish yoki xususiy usta sifatida.",
      skills: ["Payvandlash", "Isitish tizimlari", "Santexnika"],
      icon: <Droplet size={32} strokeWidth={1.5} />,
    },
    {
      id: "cook",
      title: "Oshpazlik va Qandolatchilik",
      code: "5321000",
      duration: "2 yil",
      type: "Davlat granti (Bepul)",
      learn:
        "Milliy va Yevropa taomlari tayyorlash texnologiyasi, qandolatchilik pishiriqlari, gigiyena va xizmat ko'rsatish madaniyati.",
      work: "Nufuzli restoranlar, ijtimoiy soha muassasalari oshxonalarida bosh oshpaz yoki qandolatchi bo'lib ishlash.",
      skills: ["Milliy taomlar", "Qandolatchilik", "Servirovka"],
      icon: <ChefHat size={32} strokeWidth={1.5} />,
    },
    {
      id: "it",
      title: "Kompyuter texnologiyalari",
      code: "5330200",
      duration: "2 yil",
      type: "Davlat granti (Bepul)",
      learn:
        "Kompyuter arxitekturasi, ofis dasturlarida ishlash, axborot xavfsizligi va dasturlashning boshlang'ich asoslari.",
      work: "Davlat va xususiy korxonalarda kompyuter operatori, tarmoq administratori bo'lib ishlash imkoniyati.",
      skills: ["Ofis dasturlari", "Tarmoq sozlash", "Kompyuter ta'mirlash"],
      icon: <Cpu size={32} strokeWidth={1.5} />,
    },
  ];

  // 9-SINF UCHUN HUJJATLAR RO'YXATI
  const DOCUMENT_KEYS = [
    {
      key: "Tug'ilganlik haqida guvohnoma yoki ID karta",
      desc: "Asli ko'rsatiladi va nusxasi topshiriladi",
    },
    {
      key: "Umumiy o'rta ta'lim shahodatnomasi",
      desc: "9-sinfni tugatganlik haqida (Asli)",
    },
    { key: "3x4 o'lchamdagi rasm", desc: "6 dona rangli fotosurat" },
    { key: "Tibbiy ma'lumotnoma", desc: "086-U shaklidagi ma'lumotnoma" },
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20 font-sans overflow-x-hidden">
      <SEO
        title="Qabul 2025 - 9-sinf bitiruvchilari uchun"
        description="3-sonli politexnika o'quv muassasasiga qabul jarayonlari va bepul ta'lim yo'nalishlari."
      />

      {/* RASMIY HERO BANNER */}
      <section className="relative pt-32 pb-40 bg-[#0a1930] overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/50 via-[#0a1930] to-[#0a1930] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold uppercase tracking-widest mb-8 backdrop-blur-md shadow-lg"
          >
            <ShieldCheck size={14} />
            9-SINF BITIRUVCHILARI UCHUN QABUL — {ADMISSION_CONFIG.year}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.1] uppercase"
          >
            100% BEPUL <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 drop-shadow-lg">
              KASB-HUNAR TA'LIMI
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto font-medium leading-relaxed"
          >
            Umumiy o'rta ta'lim maktablarining 9-sinfini tamomlagan yoshlarni
            Davlat granti asosida (mutlaqo bepul) zamonaviy kasblarga o'qishga
            taklif etamiz. O'qishni tamomlagach davlat namunasidagi diplom
            beriladi.
          </motion.p>
        </div>
      </section>

      {/* STAT CARDS */}
      <div className="container mx-auto px-6 -mt-20 relative z-20 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={<Calendar />}
            label="Qabul boshlanishi"
            value={ADMISSION_CONFIG.startDate}
            color="emerald"
          />
          <StatCard
            icon={<Clock />}
            label="Qabul tugashi"
            value={ADMISSION_CONFIG.endDate}
            color="amber"
          />
          <StatCard
            icon={<Phone />}
            label="Qabul komissiyasi"
            value={ADMISSION_CONFIG.phone}
            color="blue"
          />
        </div>
      </div>

      {/* DIRECTIONS SECTION */}
      <section
        id="directions"
        className="container mx-auto px-6 py-24 max-w-7xl"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-[#0a1930] mb-4">
            Mavjud <span className="text-blue-600">Yo'nalishlar</span>
          </h2>
          <div className="w-20 h-1.5 bg-amber-400 mx-auto rounded-full"></div>
          <p className="mt-6 text-slate-500 font-bold max-w-2xl mx-auto uppercase tracking-widest text-xs">
            Barcha yo'nalishlarda o'qish mutlaqo bepul va darslar o'zbek tilida
            olib boriladi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {DIRECTIONS.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col h-full hover:shadow-[0_20px_40px_rgb(10,25,48,0.08)] hover:border-blue-200 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10" />

              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-extrabold text-[#0a1930] mb-4 leading-tight">
                {item.title}
              </h3>

              {/* TO'G'RILANDI: Kvota olib tashlandi, Faqat muddat va grant */}
              <div className="space-y-3 pt-6 border-t border-slate-100 mt-auto mb-8">
                <DataRow label="O'quv muddati" value={item.duration} />
                <DataRow label="Ta'lim tili" value="O'zbek tili" />
                <DataRow label="Ta'lim shakli" value={item.type} highlight />
              </div>

              <button
                onClick={() => setSelectedDir(item)}
                className="w-full py-4 bg-slate-50 text-slate-500 hover:bg-blue-600 hover:text-white border border-slate-200 hover:border-blue-600 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
              >
                Batafsil ma'lumot
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DOCUMENTS & CTA SECTION */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-white rounded-[3rem] border border-slate-200 p-8 md:p-16 shadow-lg flex flex-col lg:flex-row gap-16 items-center max-w-7xl mx-auto">
          {/* CHAP TOMON: Hujjatlar ro'yxati (9-SINF UCHUN) */}
          <div className="w-full lg:w-1/2 space-y-8">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#0a1930]"
            >
              Qabul uchun{" "}
              <span className="text-blue-600">Kerakli Hujjatlar</span>
            </motion.h2>
            <p className="text-slate-500 font-medium">
              Hujjatlar 9-sinf bitiruvchilari tomonidan qabul komissiyasiga
              shaxsan taqdim etiladi yoki elektron shaklda yuboriladi.
            </p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="grid gap-4"
            >
              {DOCUMENT_KEYS.map((doc, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="flex items-center gap-5 p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-colors"
                >
                  <div className="bg-white text-emerald-500 p-2.5 rounded-xl shadow-sm border border-slate-100 shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <span className="block font-bold text-[#0a1930] text-sm">
                      {doc.key}
                    </span>
                    <span className="block text-xs text-slate-500 font-medium mt-0.5">
                      {doc.desc}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* O'NG TOMON: "Apply Now" Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 bg-[#0a1930] p-10 md:p-14 rounded-[2.5rem] text-white flex flex-col gap-6 justify-center items-center text-center shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none" />

            <BookOpen
              size={64}
              className="text-amber-400 relative z-10 mb-2"
              strokeWidth={1.5}
            />
            <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight relative z-10 leading-snug">
              Kasb o'rganishga <br /> tayyormisiz?
            </h3>
            <p className="text-slate-400 text-sm font-medium relative z-10 mb-4">
              Uydan chiqmasdan, hoziroq onlayn shaklda ariza yuboring va o'z
              joyingizni band qiling.
            </p>

            <Link
              to="/apply"
              className="relative z-10 bg-blue-600 text-white px-10 py-5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-500 shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-3 active:scale-95"
            >
              ARIZA TOPSHIRISH <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* DETAILED MODAL */}
      <AnimatePresence>
        {selectedDir && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDir(null)}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6 bg-[#0a1930]/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-3xl rounded-[2.5rem] p-8 md:p-12 relative shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedDir(null)}
                className="absolute top-6 right-6 p-2.5 bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col gap-10">
                <div className="flex items-center gap-6 border-b border-slate-100 pb-8 pr-12">
                  <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0 border border-blue-100">
                    {selectedDir.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#0a1930] uppercase tracking-tight leading-tight mb-3 whitespace-normal [text-wrap:balance]">
                      {selectedDir.title}
                    </h2>
                    <span className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-md font-bold uppercase tracking-widest text-[10px]">
                      {selectedDir.type}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-3">
                      <Wrench size={14} className="text-blue-600" /> Nimalarni
                      o'rganasiz?
                    </h4>
                    <p className="text-slate-700 font-medium leading-relaxed text-sm">
                      {selectedDir.learn}
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-3">
                      <Target size={14} className="text-amber-500" /> Karyera
                      imkoniyati
                    </h4>
                    <p className="text-slate-700 font-medium leading-relaxed text-sm">
                      {selectedDir.work}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100">
                  {selectedDir.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-white text-slate-500 text-[10px] font-bold uppercase rounded-lg border border-slate-200"
                    >
                      #{skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => {
  const colors = {
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    blue: "bg-blue-50 text-blue-600",
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 flex items-center gap-6 group hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${colors[color]} border border-slate-100 group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
          {label}
        </p>
        <h4 className="text-xl md:text-2xl font-extrabold text-[#0a1930] tracking-tight">
          {value}
        </h4>
      </div>
    </div>
  );
};

const DataRow = ({ label, value, highlight }) => (
  <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0 last:pb-0">
    <span className="text-slate-500 font-bold text-xs">{label}</span>
    <span
      className={`font-extrabold text-xs ${highlight ? "text-emerald-600 bg-emerald-50 px-2 py-1 rounded" : "text-[#0a1930]"}`}
    >
      {value}
    </span>
  </div>
);

export default Admission;
