import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
  Home,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import axiosClient from "../../api/axiosClient";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // API so'rovi
      const res = await axiosClient.post("/auth/login", formData);

      // Tokenni har xil javob formatlariga ko'ra qidiramiz
      // 1. Agar axios interceptor res.data ni qaytarsa: res.token
      // 2. Agar standart axios bo'lsa: res.data.token
      const token = res.token || res.data?.token || res.data?.data?.token;

      if (token) {
        localStorage.setItem("token", token);
        // Admin sahifasiga yo'naltirish
        navigate("/admin");
      } else {
        console.error("Token structure error:", res);
        setError("Token topilmadi. Server javobini tekshiring.");
      }
    } catch (err) {
      console.error("Login xatosi:", err);
      // Backenddan kelgan xabarni ko'rsatish
      const errorMessage =
        err.response?.data?.message ||
        t("login_error_default") ||
        "Login yoki parol noto'g'ri";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-x-hidden font-sans">
      {/* 1. Orqa fon dizayni (Skew) */}
      <div className="absolute top-0 left-0 w-full h-[60%] bg-[#0a1128] -skew-y-3 transform -translate-y-24 z-0"></div>

      {/* 2. Bosh sahifaga qaytish */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white/70 hover:text-white transition-colors font-bold text-sm tracking-widest uppercase"
      >
        <Home size={18} /> {t("nav_home")}
      </Link>

      {/* 3. Login kartasi */}
      <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md relative z-10 border border-slate-100 animate-in fade-in zoom-in duration-500 my-10">
        <div className="text-center mb-10">
          <div className="bg-emerald-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3 shadow-inner">
            <User className="text-emerald-600 w-10 h-10 -rotate-3" />
          </div>
          <h2 className="text-3xl font-black text-[#0a1128] tracking-tighter uppercase italic">
            Admin <span className="text-emerald-500">Panel</span>
          </h2>
          <p className="text-slate-400 mt-2 font-medium">
            {t("login_subtitle") ||
              "Tizimga kirish uchun ma'lumotlarni kiriting"}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center mb-6 text-sm border border-red-100 animate-shake">
            <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
            <span className="font-bold">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
              {t("login_username_label") || "Login"}
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-emerald-500 transition-colors">
                <User size={20} />
              </div>
              <input
                type="text"
                name="username"
                required
                className="block w-full pl-14 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-slate-700"
                placeholder={
                  t("login_username_placeholder") || "Admin foydalanuvchi nomi"
                }
                value={formData.username}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
              {t("login_password_label") || "Parol"}
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-emerald-500 transition-colors">
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="block w-full pl-14 pr-14 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-slate-700"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-300 hover:text-emerald-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-5 rounded-2xl shadow-xl shadow-emerald-500/10 text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] transition-all font-black uppercase tracking-widest text-sm italic"
          >
            {loading ? (
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                {t("login_btn_submit") || "Kirish"}{" "}
                <ArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* 4. Footer qismi (Tuzatildi) */}
      <div className="relative z-10 text-center py-4">
        <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-black opacity-80">
          © 2026 {t("footer_school_name") || "3-SONLI TEXNIKUM"}
        </p>
      </div>
    </div>
  );
};

export default Login;
