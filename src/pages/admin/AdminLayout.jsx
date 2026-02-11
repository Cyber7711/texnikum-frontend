import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Newspaper,
  Users,
  FileText,
  Link2,
  BarChart3,
  LogOut,
  FileQuestion,
  ChevronRight,
  Menu,
  Users2,
  X,
} from "lucide-react";
import Logo from "../../components/Logo";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobil sidebar holati

  const menuItems = [
    { path: "/admin", name: "Dashboard", icon: <LayoutDashboard size={18} /> },
    {
      path: "/admin/applicants",
      name: "Arizalar",
      icon: <FileQuestion size={18} />,
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

  const handleLogout = async () => {
    if (!window.confirm("Tizimdan chiqmoqchimisiz?")) return;
    try {
      await axiosClient.post("/auth/logout");
    } finally {
      navigate("/");
    }
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden relative">
      {/* 1. MOBIL OVERLAY (Sidebar ochiqligida orqa fonni qorong'u qilish) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 2. SIDEBAR */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-40 w-72 bg-[#0f172a] text-white flex flex-col shadow-2xl transition-transform duration-300 border-r border-emerald-900/10
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }
      `}
      >
        {/* Logo qismi */}
        <div className="p-6 h-24 border-b border-slate-800/50 flex items-center justify-between bg-[#0a1128]">
          <Logo />
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 text-slate-400"
          >
            <X size={24} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)} // Bosilganda yopish
                className={`flex items-center justify-between px-4 py-4 rounded-2xl transition-all ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                    : "text-slate-400 hover:bg-slate-800/40"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={isActive ? "text-white" : "text-emerald-500"}
                  >
                    {item.icon}
                  </span>
                  <span className="text-sm font-bold">{item.name}</span>
                </div>
                {isActive && <ChevronRight size={14} />}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-6 border-t border-slate-800/50">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center space-x-3 px-4 py-4 w-full bg-rose-500/5 text-rose-500 border border-rose-500/20 rounded-2xl font-bold text-sm"
          >
            <LogOut size={18} />
            <span>Chiqish</span>
          </button>
        </div>
      </aside>

      {/* 3. MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Header (Mobil uchun tugma qo'shilgan) */}
        <header className="h-20 lg:h-24 bg-white/80 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-4 lg:px-10 z-10">
          <div className="flex items-center gap-4">
            {/* MOBIL HAMBURGER TUGMASI */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 bg-slate-100 rounded-xl text-slate-600"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg lg:text-2xl font-black text-slate-800 tracking-tight truncate">
              {menuItems.find((m) => m.path === location.pathname)?.name ||
                "Boshqaruv"}
            </h2>
          </div>

          {/* User Info (Mobil uchun qisqartirilgan) */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right text-xs font-bold text-slate-400 uppercase">
              Admin
            </div>
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-center overflow-hidden">
              <img
                src="https://ui-avatars.com/api/?name=Admin&background=0a1128&color=10b981"
                alt="avatar"
              />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <section className="flex-1 overflow-y-auto p-4 lg:p-10 bg-[#f8fafc]">
          <div className="max-w-full lg:max-w-[1400px] mx-auto">
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;
