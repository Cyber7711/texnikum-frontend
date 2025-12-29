import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import {
  Newspaper,
  Users,
  ShieldCheck,
  GraduationCap,
  Activity,
  Calendar,
  AlertCircle,
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

const DashboardHome = () => {
  const [stats, setStats] = useState({
    news: 0,
    teachers: 0,
    students: 0,
    admins: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Vaqtni yangilab turish
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // Statistikani olish
        const res = await axiosClient.get("/statistics");

        // Backenddan kelgan ma'lumotni tozalash (Array yoki Object kelishini inobatga olish)
        const rawData = res.data.data || res.data.result || res.data;
        const data = Array.isArray(rawData) ? rawData[0] : rawData;

        if (data) {
          setStats({
            news: data.news || 0,
            teachers: data.teachers || 0,
            students: data.students || 0,
            admins: data.admins || 0, // Agar backendda admins bo'lsa
          });
        }
      } catch (err) {
        console.error("Statistika yuklanmadi", err);
        setError("Server bilan bog'lanishda xatolik yuz berdi.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Chart uchun ma'lumot tayyorlash
  const chartData = [
    { name: "Yangiliklar", count: stats.news, color: "#3B82F6" },
    { name: "O'qituvchilar", count: stats.teachers, color: "#22C55E" },
    { name: "Talabalar", count: stats.students, color: "#F97316" },
    { name: "Adminlar", count: stats.admins || 2, color: "#A855F7" }, // Default 2 deb oldim chiroyli turishi uchun
  ];

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-red-50 rounded-3xl border border-red-100 p-8 text-center">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h3 className="text-xl font-bold text-red-700 mb-2">
          Xatolik yuz berdi
        </h3>
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
        >
          Sahifani yangilash
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Qismi */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end bg-gradient-to-r from-blue-600 to-blue-800 p-8 rounded-3xl text-white shadow-xl shadow-blue-200">
        <div>
          <h2 className="text-3xl font-black mb-2 tracking-tight">
            Xush kelibsiz, Admin! 👋
          </h2>
          <p className="text-blue-100 opacity-90">
            Bugungi kun uchun tizim ko'rsatkichlari va statistika.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
          <Calendar size={18} className="mr-2 text-blue-200" />
          <span className="font-mono font-medium">
            {currentTime.toLocaleDateString("uz-UZ", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Jami Yangiliklar"
          count={stats.news}
          icon={<Newspaper size={24} />}
          color="bg-blue-500"
          loading={loading}
          trend="+12% bu oy"
        />
        <StatCard
          title="O'qituvchilar"
          count={stats.teachers}
          icon={<Users size={24} />}
          color="bg-green-500"
          loading={loading}
          trend="Faol tarkib"
        />
        <StatCard
          title="Talabalar"
          count={stats.students}
          icon={<GraduationCap size={24} />}
          color="bg-orange-500"
          loading={loading}
          trend="2024-2025"
        />
        <StatCard
          title="Administratorlar"
          count={stats.admins || "2"}
          icon={<ShieldCheck size={24} />}
          color="bg-purple-500"
          loading={loading}
          trend="Tizim boshqaruvi"
        />
      </div>

      {/* Charts & System Status Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chap taraf - Grafika */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <Activity size={20} className="mr-2 text-blue-600" />
              Tizim Statistikasi
            </h3>
          </div>

          <div className="h-80 w-full">
            {loading ? (
              <div className="h-full w-full bg-gray-100 animate-pulse rounded-xl"></div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E5E7EB"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                  />
                  <Tooltip
                    cursor={{ fill: "#F3F4F6" }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
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
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Tizim Holati
            </h3>

            <div className="space-y-4">
              <StatusItem label="Ma'lumotlar bazasi" status="online" />
              <StatusItem label="API Server" status="online" />
              <StatusItem label="Fayl serveri (Uploadcare)" status="online" />
              <StatusItem label="Email xizmati" status="idle" />
            </div>
          </div>

          <div className="mt-8 bg-blue-50 p-5 rounded-2xl border border-blue-100">
            <p className="text-sm text-blue-800 font-medium">
              Oxirgi yangilanish:
            </p>
            <p className="text-xs text-blue-600 mt-1">
              {currentTime.toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Yordamchi Komponentlar ---

// 1. StatCard (Skeleton bilan)
const StatCard = ({ title, count, icon, color, loading, trend }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
    <div className="flex items-start justify-between mb-4">
      <div
        className={`p-3.5 rounded-2xl shadow-lg text-white ${color} group-hover:scale-110 transition-transform`}
      >
        {icon}
      </div>
      {loading ? (
        <div className="h-4 w-12 bg-gray-200 rounded-full animate-pulse"></div>
      ) : (
        <span className="text-xs font-bold px-2 py-1 bg-gray-50 text-gray-500 rounded-lg border border-gray-100">
          {trend}
        </span>
      )}
    </div>

    <div>
      <h3 className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-1">
        {title}
      </h3>
      {loading ? (
        <div className="h-8 w-24 bg-gray-200 rounded-lg animate-pulse mt-1"></div>
      ) : (
        <p className="text-3xl font-black text-gray-800">{count}</p>
      )}
    </div>
  </div>
);

// 2. Status Item
const StatusItem = ({ label, status }) => {
  const getStatusColor = () => {
    if (status === "online") return "bg-green-500";
    if (status === "offline") return "bg-red-500";
    return "bg-yellow-500";
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
      <span className="text-sm font-semibold text-gray-700">{label}</span>
      <div className="flex items-center space-x-2">
        <span className="text-xs font-bold uppercase text-gray-400">
          {status}
        </span>
        <span
          className={`w-2.5 h-2.5 rounded-full ${getStatusColor()} shadow-[0_0_8px_rgba(0,0,0,0.2)]`}
        ></span>
      </div>
    </div>
  );
};

export default DashboardHome;
