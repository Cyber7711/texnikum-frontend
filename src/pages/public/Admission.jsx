import {
  Calendar,
  CheckCircle2,
  FileText,
  GraduationCap,
  ArrowRight,
  Phone,
  Download,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const Admission = () => {
  // Bu ma'lumotlarni shu yerni o'zidan o'zgartirasiz (Yilda 1 marta)
  const ADMISSION_INFO = {
    year: "2025-2026",
    startDate: "20 Iyun",
    endDate: "25 Avgust",
    phone: "+998 71 123 45 67",
    telegramBot: "https://t.me/texnikum_qabul_bot", // Ariza topshirish uchun
    myGov: "https://my.gov.uz/uz/service/...", // Yoki my.gov.uz linki
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
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      {/* 1. HERO BANNER */}
      <div className="bg-[#0f172a] text-white relative overflow-hidden py-20 lg:py-28">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-bold uppercase tracking-wider mb-4 animate-pulse">
            Qabul Jarayoni Boshlandi
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
            {ADMISSION_INFO.year} o'quv yili uchun <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
              Qabul Davom Etmoqda
            </span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
            Kelajagingizni biz bilan quring. Zamonaviy kasblar va
            Agro-texnologiyalar olamiga xush kelibsiz!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/apply"
              target="_blank"
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/30 transition-all flex items-center gap-2"
            >
              Hujjat topshirish <ArrowRight size={20} />
            </a>
            <a
              href="#directions"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-xl font-bold transition-all"
            >
              Yo'nalishlar bilan tanishish
            </a>
          </div>
        </div>
      </div>

      {/* 2. MUHIM SANALAR (Cards) */}
      <div className="container mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<Calendar size={32} />}
            title="Qabul Boshlanishi"
            value={ADMISSION_INFO.startDate}
            desc="Hujjatlar qabuli start oladi"
            color="bg-blue-500"
          />
          <InfoCard
            icon={<AlertCircle size={32} />}
            title="Qabul Tugashi"
            value={ADMISSION_INFO.endDate}
            desc="So'nggi muddatni o'tkazib yubormang"
            color="bg-red-500"
          />
          <InfoCard
            icon={<Phone size={32} />}
            title="Aloqa Markazi"
            value={ADMISSION_INFO.phone}
            desc="Dushanba - Shanba (09:00 - 18:00)"
            color="bg-emerald-500"
          />
        </div>
      </div>

      {/* 3. YO'NALISHLAR (Grid) */}
      <div id="directions" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Mavjud Yo'nalishlar
          </h2>
          <div className="w-20 h-1.5 bg-emerald-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DIRECTIONS.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all group"
            >
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-50 transition-colors">
                <GraduationCap
                  className="text-slate-600 group-hover:text-emerald-600"
                  size={24}
                />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight min-h-[50px]">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 font-mono mb-4">
                Kod: {item.code}
              </p>

              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span>Kvota:</span>
                  <span className="font-bold text-emerald-600">
                    {item.quota} ta
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span>Til:</span>
                  <span className="font-bold">{item.lang}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>Kontrakt:</span>
                  <span className="font-bold text-blue-600">
                    {item.contract}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. HUJJATLAR VA TARTIB */}
      <div className="bg-white py-20 border-y border-slate-200">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Hujjatlar ro'yxati */}
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">
                Talab Etiladigan Hujjatlar
              </h2>
              <p className="text-slate-500 mb-8">
                Qabul komissiyasiga quyidagi hujjatlarning asl nusxasi va
                elektron shakli (PDF) taqdim etilishi shart.
              </p>
              <ul className="space-y-4">
                {DOCUMENTS.map((doc, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100"
                  >
                    <CheckCircle2
                      className="text-emerald-500 flex-shrink-0 mt-0.5"
                      size={20}
                    />
                    <span className="text-slate-700 font-medium">{doc}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
                <AlertCircle className="text-blue-600 flex-shrink-0 mt-1" />
                <p className="text-sm text-blue-800">
                  Eslatma: Hujjatlar <strong>my.gov.uz</strong> portali orqali
                  yoki bevosita texnikum binosida qabul qilinadi.
                </p>
              </div>
            </div>

            {/* Qabul jarayoni (Step) */}
            <div className="relative">
              {/* Background dekoratsiya */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 rounded-3xl transform rotate-3"></div>

              <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                <h3 className="text-2xl font-bold text-slate-800 mb-8">
                  Qabul Jarayoni
                </h3>
                <div className="space-y-8">
                  <StepItem
                    number="01"
                    title="Ariza topshirish"
                    desc="Online yoki offline shaklda hujjatlarni taqdim eting."
                  />
                  <StepItem
                    number="02"
                    title="Imtihon / Suhbat"
                    desc="Belgilangan sanada kirish imtihonlarida qatnashing."
                  />
                  <StepItem
                    number="03"
                    title="Natijalar"
                    desc="Mandat natijalari e'lon qilinishini kuting."
                  />
                  <StepItem
                    number="04"
                    title="Shartnoma"
                    desc="Qabul qilinganlik to'g'risida shartnoma imzolang."
                  />
                </div>

                <a
                  href={ADMISSION_INFO.myGov}
                  target="_blank"
                  className="mt-8 w-full py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition"
                >
                  <Download size={20} />
                  Nizomni Yuklab Olish (PDF)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Yordamchi Komponentlar ---
const InfoCard = ({ icon, title, value, desc, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 flex items-center gap-5">
    <div
      className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-slate-200`}
    >
      {icon}
    </div>
    <div>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
        {title}
      </p>
      <h4 className="text-xl font-black text-slate-800 mt-1">{value}</h4>
      <p className="text-xs text-slate-500 mt-1">{desc}</p>
    </div>
  </div>
);

const StepItem = ({ number, title, desc }) => (
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-lg">
        {number}
      </div>
      <div className="w-0.5 h-full bg-slate-100 mt-2 last:hidden"></div>
    </div>
    <div className="pb-8">
      <h4 className="font-bold text-slate-800 text-lg">{title}</h4>
      <p className="text-slate-500 text-sm mt-1">{desc}</p>
    </div>
  </div>
);

export default Admission;
