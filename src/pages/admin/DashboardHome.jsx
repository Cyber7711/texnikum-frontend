import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import {
  Newspaper,
  Users,
  FileText,
  FileQuestion,
  Calendar,
  Activity,
  Leaf,
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
    documents: 12, // Mock
    applicants: 45, // Mock
  });
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [teachersRes, newsRes] = await Promise.all([
          axiosClient.get("/teachers"),
          axiosClient.get("/news"),
        ]);

        setStats((prev) => ({
          ...prev,
          teachers: teachersRes.data.data?.length || 0,
          news: newsRes.data.data?.length || 0,
        }));
      } catch (err) {
        console.error("Dashboard error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const chartData = [
    { name: "Ustozlar", count: stats.teachers, color: "#10b981" },
    { name: "Xabarlar", count: stats.news, color: "#3b82f6" },
    { name: "Arizalar", count: stats.applicants, color: "#f59e0b" },
    { name: "Hujjatlar", count: stats.documents, color: "#6366f1" },
  ];

  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500 pb-10">
      {/* 1. HEADER - Mobile Responsive Padding */}
      <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center bg-[#0f172a] p-6 md:p-8 rounded-[2rem] text-white shadow-xl overflow-hidden border border-emerald-900/30">
        <Leaf className="absolute -top-10 -right-10 text-emerald-500/10 w-40 h-40 md:w-60 md:h-60 rotate-12" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest">
              Agro-Tech System
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight">
            Xush kelibsiz, Admin! 👋
          </h2>
          <p className="text-slate-400 mt-2 text-xs md:text-sm max-w-sm leading-relaxed">
            Texnikum raqamli tizimi nazorat paneli. Barcha ko'rsatkichlar
            joyida.
          </p>
        </div>

        <div className="relative z-10 mt-6 md:mt-0 flex items-center bg-white/5 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 w-full md:w-auto justify-center md:justify-start">
          <Calendar size={18} className="mr-3 text-emerald-400" />
          <div className="flex flex-col text-left md:text-right">
            <span className="text-[10px] text-slate-500 uppercase font-black tracking-wider">
              Bugun
            </span>
            <span className="text-sm font-bold text-emerald-50">
              {currentTime.toLocaleDateString("uz-UZ", {
                day: "numeric",
                month: "long",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* 2. STAT CARDS - 2 columns on mobile */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Ustozlar"
          count={stats.teachers}
          icon={<Users size={20} />}
          bg="bg-emerald-500"
          loading={loading}
          trend="+2"
        />
        <StatCard
          title="Yangiliklar"
          count={stats.news}
          icon={<Newspaper size={20} />}
          bg="bg-blue-500"
          loading={loading}
          trend="Faol"
        />
        <StatCard
          title="Arizalar"
          count={stats.applicants}
          icon={<FileQuestion size={20} />}
          bg="bg-amber-500"
          loading={loading}
          trend="+5"
        />
        <StatCard
          title="Hujjatlar"
          count={stats.documents}
          icon={<FileText size={20} />}
          bg="bg-indigo-500"
          loading={loading}
          trend="OK"
        />
      </div>

      {/* 3. CHART & STATUS - Stack on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Grafika */}
        <div className="lg:col-span-2 bg-white p-5 md:p-8 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-md font-black text-slate-800 flex items-center gap-2 uppercase tracking-tight">
              <Activity size={18} className="text-emerald-500" /> Dinamika
            </h3>
          </div>

          <div className="h-[250px] md:h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="count" radius={[10, 10, 10, 10]} barSize={35}>
                  {chartData.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white p-5 md:p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-md font-black text-slate-800 mb-6 flex items-center gap-2 uppercase tracking-tight">
            <Sprout size={18} className="text-emerald-500" /> Resurslar
          </h3>
          <div className="space-y-3 flex-1">
            <StatusItem
              label="Database"
              status="online"
              icon={<Database size={14} />}
            />
            <StatusItem
              label="API Server"
              status="online"
              icon={<Server size={14} />}
            />
            <StatusItem
              label="Storage"
              status="online"
              icon={<Cloud size={14} />}
            />
          </div>

          <div className="mt-8 bg-slate-900 p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute -right-2 -bottom-2 opacity-10 group-hover:scale-110 transition-transform">
              <Leaf size={60} className="text-emerald-500" />
            </div>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
              Server Time
            </p>
            <p className="text-2xl text-emerald-400 font-mono font-bold mt-1">
              {currentTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Minified Stat Card for Mobile ---
const StatCard = ({ title, count, icon, bg, loading, trend }) => (
  <div className="bg-white p-4 md:p-6 rounded-3xl border border-slate-100 hover:shadow-lg transition-all">
    <div className="flex justify-between items-start mb-4">
      <div
        className={`p-2.5 md:p-3 rounded-xl text-white ${bg} shadow-lg shadow-inherit/20`}
      >
        {icon}
      </div>
      <span className="text-[9px] font-black bg-slate-50 text-slate-400 px-2 py-1 rounded-md border border-slate-100">
        {trend}
      </span>
    </div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 truncate">
      {title}
    </p>
    {loading ? (
      <div className="h-6 w-12 bg-slate-50 animate-pulse rounded" />
    ) : (
      <p className="text-xl md:text-2xl font-black text-slate-800">{count}</p>
    )}
  </div>
);

const StatusItem = ({ label, status, icon }) => (
  <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100/50">
    <div className="flex items-center gap-3">
      <div className="text-slate-400">{icon}</div>
      <span className="text-xs font-bold text-slate-600">{label}</span>
    </div>
    <div
      className={`w-2 h-2 rounded-full ${
        status === "online" ? "bg-emerald-500" : "bg-amber-500"
      } animate-pulse shadow-sm`}
    />
  </div>
);

export default Dashboard;
