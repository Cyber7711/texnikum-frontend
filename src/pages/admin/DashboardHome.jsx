import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import {
  Newspaper,
  Users,
  FileText, // Hujjatlar uchun
  FileQuestion, // Arizalar uchun
  Calendar,
  Activity,
  Leaf, // Agro bezak uchun
  Sprout,
  ArrowUpRight,
  Database,
  Server,
  Cloud,
  Clock,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState({
    news: 0,
    teachers: 0,
    documents: 0, // Students o'rniga hujjatlar (admin panelga qarab)
    applicants: 0, // Admins o'rniga arizalar
  });
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Vaqtni yangilab turish
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Ma'lumotlarni yuklash
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Barcha kerakli endpointlardan ma'lumot olamiz
        // Agar backendda /statistics bo'lmasa, alohida arraylarni olib sanaymiz
        const [teachersRes, newsRes] = await Promise.all([
          axiosClient.get("/teachers"),
          axiosClient.get("/news"),
          // Kelajakda: axiosClient.get("/documents"),
          // Kelajakda: axiosClient.get("/applicants"),
        ]);

        const teachersData =
          teachersRes.data.data || teachersRes.data.result || [];
        const newsData = newsRes.data.data || newsRes.data.result || [];

        setStats({
          teachers: Array.isArray(teachersData) ? teachersData.length : 0,
          news: Array.isArray(newsData) ? newsData.length : 0,
          documents: 12, // Hozircha statik (mock)
          applicants: 45, // Hozircha statik (mock)
        });
      } catch (err) {
        console.error("Dashboard ma'lumotlari yuklanmadi", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Chart ma'lumotlari (Agro ranglar bilan)
  const chartData = [
    { name: "O'qituvchilar", count: stats.teachers, color: "#10b981" }, // Emerald
    { name: "Yangiliklar", count: stats.news, color: "#3b82f6" }, // Blue
    { name: "Arizalar", count: stats.applicants, color: "#f59e0b" }, // Amber
    { name: "Hujjatlar", count: stats.documents, color: "#6366f1" }, // Indigo
  ];

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500 pb-10">
      {/* 1. HEADER QISMI (Agro-Tech Style) */}
      <div className="relative flex flex-col md:flex-row justify-between items-start md:items-end bg-[#0f172a] p-8 rounded-3xl text-white shadow-xl shadow-slate-900/10 overflow-hidden border border-emerald-900/30">
        {/* Orqa fon bezagi (Leaf) */}
        <Leaf className="absolute -top-6 -right-6 text-emerald-500/10 w-48 h-48 rotate-12" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-1 rounded-lg border border-emerald-500/20">
              AGRO-TECH DASHBOARD
            </span>
          </div>
          <h2 className="text-3xl font-black tracking-tight leading-none">
            Xush kelibsiz, Admin! 👋
          </h2>
          <p className="text-slate-400 mt-2 text-sm max-w-md">
            3-sonli texnikumning raqamli boshqaruv tizimi. Bugungi statistika va
            ko'rsatkichlar.
          </p>
        </div>

        <div className="relative z-10 mt-6 md:mt-0 flex items-center bg-white/5 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/10 hover:bg-white/10 transition">
          <Calendar size={18} className="mr-3 text-emerald-400" />
          <div className="flex flex-col text-right">
            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">
              Bugun
            </span>
            <span className="font-mono font-medium text-white">
              {currentTime.toLocaleDateString("uz-UZ", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* 2. KARTALAR GRID (Agro Colors) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="O'qituvchilar"
          count={stats.teachers}
          icon={<Users size={24} />}
          bgClass="bg-emerald-500"
          shadowClass="shadow-emerald-200"
          loading={loading}
          trend="+3 yangi"
        />
        <StatCard
          title="Yangiliklar"
          count={stats.news}
          icon={<Newspaper size={24} />}
          bgClass="bg-blue-500"
          shadowClass="shadow-blue-200"
          loading={loading}
          trend="Faol"
        />
        <StatCard
          title="Qabul Arizalari"
          count={stats.applicants}
          icon={<FileQuestion size={24} />}
          bgClass="bg-amber-500"
          shadowClass="shadow-amber-200"
          loading={loading}
          trend="+12% oshdi"
        />
        <StatCard
          title="Hujjatlar"
          count={stats.documents}
          icon={<FileText size={24} />}
          bgClass="bg-indigo-500"
          shadowClass="shadow-indigo-200"
          loading={loading}
          trend="Arxiv"
        />
      </div>

      {/* 3. CHART & SYSTEM STATUS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chap taraf - Grafika */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Activity size={20} className="text-emerald-500" />
              Tizim Statistikasi
            </h3>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            </div>
          </div>

          {/* Chart Container - Fixed Height */}
          <div className="h-80 w-full">
            {loading ? (
              <div className="h-full w-full bg-slate-50 animate-pulse rounded-2xl"></div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e2e8f0"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                  />
                  <Tooltip
                    cursor={{ fill: "#f1f5f9" }}
                    contentStyle={{
                      borderRadius: "16px",
                      border: "none",
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                      backgroundColor: "#ffffff",
                      color: "#1e293b",
                    }}
                  />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={50}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* O'ng taraf - Tizim holati */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Sprout size={20} className="text-emerald-500" />
              Tizim Holati
            </h3>

            <div className="space-y-4">
              <StatusItem
                label="MongoDB Baza"
                status="online"
                icon={<Database size={16} />}
              />
              <StatusItem
                label="Backend API"
                status="online"
                icon={<Server size={16} />}
              />
              <StatusItem
                label="Uploadcare CDN"
                status="online"
                icon={<Cloud size={16} />}
              />
              <StatusItem
                label="Email Gateway"
                status="idle"
                icon={<Clock size={16} />}
              />
            </div>
          </div>

          <div className="mt-8 bg-[#0f172a] p-5 rounded-2xl border border-slate-700 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition">
              <Leaf size={40} className="text-white" />
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Oxirgi yangilanish
            </p>
            <p className="text-xl text-emerald-400 font-mono mt-1 font-bold">
              {currentTime.toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Yordamchi Komponentlar ---

const StatCard = ({
  title,
  count,
  icon,
  bgClass,
  shadowClass,
  loading,
  trend,
}) => (
  <div
    className={`bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}
  >
    <div className="flex items-start justify-between mb-4">
      <div
        className={`p-3.5 rounded-2xl shadow-lg text-white ${bgClass} ${shadowClass} group-hover:scale-110 transition-transform`}
      >
        {icon}
      </div>
      {loading ? (
        <div className="h-5 w-12 bg-slate-100 rounded-full animate-pulse"></div>
      ) : (
        <span className="text-[10px] font-bold px-2 py-1 bg-slate-50 text-slate-500 rounded-lg border border-slate-100 flex items-center gap-1">
          {trend} <ArrowUpRight size={10} />
        </span>
      )}
    </div>

    <div>
      <h3 className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-1">
        {title}
      </h3>
      {loading ? (
        <div className="h-8 w-24 bg-slate-100 rounded-lg animate-pulse mt-1"></div>
      ) : (
        <p className="text-3xl font-black text-slate-800">{count}</p>
      )}
    </div>
  </div>
);

const StatusItem = ({ label, status, icon }) => {
  const getStatusColor = () => {
    if (status === "online") return "bg-emerald-500 shadow-emerald-500/50";
    if (status === "offline") return "bg-rose-500 shadow-rose-500/50";
    return "bg-amber-500 shadow-amber-500/50";
  };

  return (
    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition cursor-default">
      <div className="flex items-center gap-3">
        <div className="text-slate-400">{icon}</div>
        <span className="text-sm font-semibold text-slate-700">{label}</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
          {status}
        </span>
        <span
          className={`w-2.5 h-2.5 rounded-full ${getStatusColor()} shadow-lg animate-pulse`}
        ></span>
      </div>
    </div>
  );
};

export default Dashboard;
