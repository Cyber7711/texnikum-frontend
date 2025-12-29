import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Newspaper,
  Users,
  FileText,
  Link2,
  BarChart3,
  LogOut,
  FileQuestion, // <--- Arizalar uchun yangi ikonka
} from "lucide-react";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      path: "/admin",
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      path: "/admin/applicants",
      name: "Arizalar (Qabul)",
      icon: <FileQuestion size={20} />,
    },
    {
      path: "/admin/news",
      name: "Yangiliklar",
      icon: <Newspaper size={20} />,
    },
    {
      path: "/admin/teachers",
      name: "O'qituvchilar",
      icon: <Users size={20} />,
    },
    {
      path: "/admin/statistics",
      name: "Statistika",
      icon: <BarChart3 size={20} />,
    },
    {
      path: "/admin/documents",
      name: "Hujjatlar",
      icon: <FileText size={20} />,
    },
    {
      path: "/admin/quicklinks", // App.js dagi path bilan bir xil bo'lishi shart
      name: "Tezkor havolalar",
      icon: <Link2 size={20} />,
    },
  ];

  const handleLogout = () => {
    if (window.confirm("Tizimdan chiqmoqchimisiz?")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-2xl z-20">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">
            T
          </div>
          <h1 className="text-xl font-bold tracking-wider text-white">
            ADMIN PANEL
          </h1>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white shadow-lg translate-x-1"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full text-red-400 hover:bg-red-500/10 rounded-xl transition"
          >
            <LogOut size={20} />
            <span className="font-medium">Chiqish</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10">
          <h2 className="text-lg font-bold text-gray-800 uppercase tracking-tight">
            {menuItems.find((m) => m.path === location.pathname)?.name ||
              "Boshqaruv"}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="text-right hidden md:block">
              <div className="text-sm font-bold text-gray-800">Admin User</div>
              <div className="text-xs text-gray-500">Super Administrator</div>
            </div>
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white font-bold shadow-md border-2 border-white">
              A
            </div>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;
