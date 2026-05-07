import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Newspaper,
  Users,
  FileText,
  BarChart3,
  LogOut,
  FileQuestion,
  ChevronRight,
  Menu,
  Users2,
  X,
  Bell,
  Settings,
} from "lucide-react";
import Logo from "../../components/Logo";
import axiosClient from "../../api/axiosClient"; // Axios instance ni chaqiramiz

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Menyular ro'yxati (Statistika qo'shildi)
  const menuItems = [
    { path: "/admin", name: "Dashboard", icon: <LayoutDashboard size={18} /> },
    {
      path: "/admin/applicants",
      name: "Arizalar",
      icon: <FileQuestion size={18} />,
    },
    {
      path: "/admin/statistics",
      name: "Statistika",
      icon: <BarChart3 size={18} />,
    },
    { path: "/admin/news", name: "Yangiliklar", icon: <Newspaper size={18} /> },
    {
      path: "/admin/teachers",
      name: "O'qituvchilar",
      icon: <Users size={18} />,
    },
    {
      path: "/admin/documents",
      name: "Hujjatlar",
      icon: <FileText size={18} />,
    },
    {
      path: "/admin/management",
      name: "Rahbariyat",
      icon: <Users2 size={18} />,
    },
  ];

  // Sahifa sarlavhasini aniqlash
  const currentMenuItem = menuItems.find((item) =>
    item.path === "/admin"
      ? location.pathname === "/admin"
      : location.pathname.startsWith(item.path),
  );

  const handleLogout = async () => {
    if (!window.confirm("Tizimdan chiqmoqchimisiz?")) return;
    try {
      // Backend logouti
      await axiosClient.post("/auth/logout");
    } catch (err) {
      console.error("Logoutda xato:", err);
    } finally {
      // Tokenlarni tozalash
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <div className="flex h-screen bg-[#f1f5f9] overflow-hidden font-sans">
      {/* 1. MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-md transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 2. SIDEBAR */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#0f172a] text-slate-300 flex flex-col transition-all duration-300 ease-in-out border-r border-white/5
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo qismi */}
        <div className="p-8 h-24 flex items-center justify-between border-b border-white/5">
          <div className="scale-90 origin-left">
            <Logo />
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
          <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[2px] mb-4">
            Asosiy Menyu
          </p>

          {menuItems.map((item) => {
            const isActive =
              item.path === "/admin"
                ? location.pathname === "/admin"
                : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`${isActive ? "text-white" : "text-blue-500 group-hover:text-blue-400"}`}
                  >
                    {item.icon}
                  </span>
                  <span className="text-sm font-semibold tracking-wide">
                    {item.name}
                  </span>
                </div>
                {isActive && (
                  <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="p-4 mt-auto border-t border-white/5 bg-[#0a1128]/50">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3.5 w-full bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl font-bold text-sm transition-all duration-300"
          >
            <LogOut size={18} />
            <span>Tizimdan chiqish</span>
          </button>
        </div>
      </aside>

      {/* 3. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2.5 bg-slate-100 rounded-xl text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <Menu size={20} />
            </button>

            <div className="flex flex-col">
              <h2 className="text-xl font-black text-slate-800 tracking-tight leading-none">
                {currentMenuItem?.name || "Boshqaruv"}
              </h2>
              <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">
                Admin Panel / {currentMenuItem?.name || "Asosiy"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            {/* Bildirishnomalar (Ixtiyoriy) */}
            <button className="relative p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-black text-slate-800 uppercase leading-none">
                  Admin
                </p>
                <p className="text-[9px] font-bold text-blue-600 uppercase mt-1"></p>
              </div>
              <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-[2px] shadow-lg shadow-blue-600/20">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center overflow-hidden">
                  <img
                    src="https://ui-avatars.com/api/?name=Admin&background=0f172a&color=fff&bold=true"
                    alt="Admin Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 bg-[#f8fafc] custom-scrollbar">
          <div className="max-w-[1400px] mx-auto">
            {/* Animatsion sahifa o'tishi uchun */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
