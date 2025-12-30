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
  Leaf, // Logo uchun
  ChevronRight,
} from "lucide-react";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      path: "/admin",
      name: "Dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      path: "/admin/applicants",
      name: "Arizalar (Qabul)",
      icon: <FileQuestion size={18} />,
    },
    {
      path: "/admin/news",
      name: "Yangiliklar",
      icon: <Newspaper size={18} />,
    },
    {
      path: "/admin/teachers",
      name: "O'qituvchilar",
      icon: <Users size={18} />,
    },
    {
      path: "/admin/statistics",
      name: "Statistika",
      icon: <BarChart3 size={18} />,
    },
    {
      path: "/admin/documents",
      name: "Hujjatlar",
      icon: <FileText size={18} />,
    },
    {
      path: "/admin/quicklinks",
      name: "Tezkor havolalar",
      icon: <Link2 size={18} />,
    },
  ];

  const handleLogout = () => {
    if (window.confirm("Tizimdan chiqmoqchimisiz?")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#0f172a] text-white flex flex-col shadow-2xl z-20 border-r border-emerald-900/20">
        {/* Logo qismi */}
        <div className="p-6 border-b border-slate-800/50 flex items-center gap-3 bg-[#0a1128]">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Leaf className="text-[#0f172a] w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-black tracking-tighter leading-none">
              ADMIN <span className="text-emerald-400">PANEL</span>
            </h1>
            <span className="text-[10px] text-emerald-200/40 uppercase tracking-widest mt-1">
              v1.0.2 Beta
            </span>
          </div>
        </div>

        {/* Menu Navigatsiya */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5 custom-scrollbar">
          <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">
            Asosiy Menyu
          </p>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 translate-x-1"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`${
                      isActive
                        ? "text-white"
                        : "text-emerald-500/70 group-hover:text-emerald-400"
                    } transition-colors`}
                  >
                    {item.icon}
                  </span>
                  <span className="font-semibold text-[14px]">{item.name}</span>
                </div>
                {isActive && <ChevronRight size={14} className="opacity-50" />}
              </Link>
            );
          })}
        </nav>

        {/* Logout qismi */}
        <div className="p-4 border-t border-slate-800/50 bg-[#0a1128]/50">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3.5 w-full text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all duration-300 font-bold text-sm group"
          >
            <LogOut
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>Tizimdan chiqish</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#f8fafc]">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
              {menuItems.find((m) => m.path === location.pathname)?.name ||
                "Boshqaruv"}
            </h2>
          </div>

          <div className="flex items-center space-x-6">
            <div className="h-8 w-[1px] bg-slate-200 hidden md:block"></div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <div className="text-sm font-bold text-slate-800 leading-none">
                  Super Admin
                </div>
                <div className="text-[11px] text-emerald-600 font-medium mt-1 uppercase tracking-wider">
                  Online
                </div>
              </div>
              <div className="relative group cursor-pointer">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-emerald-600 font-black border-2 border-white shadow-sm group-hover:border-emerald-500 transition-all duration-300 overflow-hidden">
                  <img
                    src="https://ui-avatars.com/api/?name=Admin&background=10b981&color=fff"
                    alt="Avatar"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Sahifa mazmuni */}
        <section className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-[1600px] mx-auto animate-in fade-in duration-500">
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;
