import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Navigatsiya uchun
import axiosClient from "../../api/axiosClient";
import { motion } from "framer-motion"; // Animatsiya uchun
import {
  Newspaper,
  Users,
  FileText,
  FileQuestion,
  Calendar,
  Activity,
  Leaf,
  Database,
  Server,
  Cloud,
  RefreshCw,
  Plus,
  ArrowRight,
  Zap,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// --- ANIMATSYA VARIANTS ---
const containerVar = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVar = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

const Dashboard = () => {
  const [stats, setStats] = useState({
    news: 0,
    teachers: 0,
    documents: 0,
    applicants: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Vaqtni yangilab turish
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const [teachersRes, newsRes, appsRes, docsRes] = await Promise.all([
        axiosClient.get("/teachers"),
        axiosClient.get("/news"),
        axiosClient.get("/applicant"),
        axiosClient.get("/doc"),
      ]);

      const getLen = (res) =>
        res.data.data?.length ||
        res.data.result?.length ||
        res.data?.length ||
        0;

      setStats({
        teachers: getLen(teachersRes),
        news: getLen(newsRes),
        applicants: getLen(appsRes),
        documents: getLen(docsRes),
      });
    } catch (err) {
      console.error("Dashboard yuklashda xatolik:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartData = [
    { name: "Ustozlar", count: stats.teachers, color: "#10b981" },
    { name: "Xabarlar", count: stats.news, color: "#3b82f6" },
    { name: "Arizalar", count: stats.applicants, color: "#f59e0b" },
    { name: "Hujjatlar", count: stats.documents, color: "#6366f1" },
  ];

  return (
    <motion.div
      variants={containerVar}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-10"
    >
      {/* 1. HERO HEADER */}
      <motion.div
        variants={itemVar}
        className="relative flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl overflow-hidden border border-slate-800"
      >
        {/* Dekorativ orqa fon elementlari */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-black px-3 py-1.5 rounded-full border border-emerald-500/20 uppercase tracking-widest backdrop-blur-md">
              System v2.0
            </span>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                Online
              </span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter leading-tight mb-2">
            Boshqaruv Paneli
          </h2>
          <p className="text-slate-400 text-sm font-medium leading-relaxed">
            Hozirgi holat barqaror. Tizim to'liq quvvat bilan ishlamoqda.
          </p>
        </div>

        <div className="relative z-10 mt-8 md:mt-0 flex flex-col md:items-end gap-4">
          <div className="flex items-center gap-4 bg-white/5 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/10 shadow-lg">
            <div className="p-3 bg-emerald-500/20 rounded-xl">
              <Calendar size={20} className="text-emerald-400" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
                Vaqt
              </span>
              <span className="text-lg font-bold text-white font-mono">
                {currentTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>

          <button
            onClick={fetchData}
            disabled={refreshing}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest group"
          >
            <RefreshCw
              size={14}
              className={`group-hover:rotate-180 transition-transform duration-500 ${refreshing ? "animate-spin" : ""}`}
            />
            Ma'lumotlarni yangilash
          </button>
        </div>
      </motion.div>

      {/* 2. STAT CARDS (CLICKABLE) */}
      <motion.div
        variants={containerVar}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard
          to="/admin/teachers"
          title="Ustozlar"
          count={stats.teachers}
          icon={<Users size={24} />}
          color="emerald"
          loading={loading}
        />
        <StatCard
          to="/admin/news"
          title="Yangiliklar"
          count={stats.news}
          icon={<Newspaper size={24} />}
          color="blue"
          loading={loading}
        />
        <StatCard
          to="/admin/applicants"
          title="Arizalar"
          count={stats.applicants}
          icon={<FileQuestion size={24} />}
          color="amber"
          loading={loading}
        />
        <StatCard
          to="/admin/documents"
          title="Hujjatlar"
          count={stats.documents}
          icon={<FileText size={24} />}
          color="indigo"
          loading={loading}
        />
      </motion.div>

      {/* 3. MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CHART SECTION */}
        <motion.div
          variants={itemVar}
          className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-3 uppercase tracking-tighter">
                <Activity size={20} className="text-emerald-500" />
                Statistik Dinamika
              </h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1 ml-8">
                Real vaqt rejimidagi ko'rsatkichlar
              </p>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#64748b",
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                  dy={15}
                />
                <Tooltip
                  cursor={{ fill: "#f8fafc", radius: 12 }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white text-xs font-bold py-2 px-4 rounded-xl shadow-xl">
                          {payload[0].payload.name}: {payload[0].value}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="count"
                  radius={[12, 12, 12, 12]}
                  barSize={40}
                  animationDuration={1500}
                >
                  {chartData.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* QUICK ACTIONS & SYSTEM STATUS */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div
            variants={itemVar}
            className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100"
          >
            <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-3 uppercase tracking-tighter">
              <Zap size={20} className="text-amber-500" /> Tezkor Amallar
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <QuickActionLink
                to="/admin/news"
                label="Yangilik Yozish"
                color="bg-blue-50 text-blue-600 hover:bg-blue-100"
              />
              <QuickActionLink
                to="/admin/teachers"
                label="O'qituvchi Qo'shish"
                color="bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
              />
              <QuickActionLink
                to="/admin/documents"
                label="Hujjat Yuklash"
                color="bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
              />
            </div>
          </motion.div>

          {/* System Status (Compact) */}
          <motion.div
            variants={itemVar}
            className="bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100"
          >
            <div className="flex items-center gap-2 mb-4">
              <Database size={16} className="text-slate-400" />
              <span className="text-xs font-black text-slate-500 uppercase tracking-widest">
                Tizim holati
              </span>
            </div>
            <div className="space-y-2">
              <StatusRow
                label="Database"
                value="Connected"
                color="text-emerald-500"
              />
              <StatusRow
                label="API Latency"
                value="24ms"
                color="text-blue-500"
              />
              <StatusRow
                label="Storage"
                value="Optimized"
                color="text-emerald-500"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// --- SUB COMPONENTS ---

const StatCard = ({ title, count, icon, color, loading, to }) => {
  const colorMap = {
    emerald: "bg-emerald-500 shadow-emerald-500/30",
    blue: "bg-blue-500 shadow-blue-500/30",
    amber: "bg-amber-500 shadow-amber-500/30",
    indigo: "bg-indigo-500 shadow-indigo-500/30",
  };

  return (
    <motion.div variants={itemVar}>
      <Link
        to={to}
        className="block bg-white p-6 rounded-[2rem] border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
      >
        <div className="flex justify-between items-start mb-6">
          <div
            className={`p-4 rounded-2xl text-white ${colorMap[color]} shadow-lg transition-transform group-hover:scale-110`}
          >
            {icon}
          </div>
          <div className="p-2 bg-slate-50 rounded-full group-hover:bg-slate-100 transition-colors">
            <ArrowRight
              size={14}
              className="text-slate-400 group-hover:text-slate-600 -rotate-45 group-hover:rotate-0 transition-transform duration-300"
            />
          </div>
        </div>

        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
            {title}
          </p>
          {loading ? (
            <div className="h-8 w-24 bg-slate-100 animate-pulse rounded-lg" />
          ) : (
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">
              {count}
            </h3>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

const QuickActionLink = ({ to, label, color }) => (
  <Link
    to={to}
    className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${color}`}
  >
    <span className="text-xs font-black uppercase tracking-wide flex items-center gap-2">
      <Plus size={14} className="opacity-50" /> {label}
    </span>
    <ArrowRight
      size={14}
      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
    />
  </Link>
);

const StatusRow = ({ label, value, color }) => (
  <div className="flex items-center justify-between py-2 border-b border-slate-200/50 last:border-0">
    <span className="text-xs font-bold text-slate-400">{label}</span>
    <span className={`text-xs font-black uppercase tracking-wider ${color}`}>
      {value}
    </span>
  </div>
);

export default Dashboard;
