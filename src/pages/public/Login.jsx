import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, Eye, EyeOff, AlertCircle, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next"; // i18n hook
import axiosClient from "../../api/axiosClient";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

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
      const response = await axiosClient.post("/auth/login", formData);
      if (response.token) {
        localStorage.setItem("token", response.token);
        navigate("/admin");
      }
    } catch (err) {
      console.error("Login xatosi:", err);
      // Xatolik xabarini ham tarjima qilish mumkin yoki backenddan kelganini ko'rsatish
      setError(err.response?.data?.message || t("login_error_default"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dizayn bezagi */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[#0a1128] skew-y-3 transform -translate-y-20 z-0"></div>

      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md relative z-10 border border-slate-100">
        <div className="text-center mb-8">
          <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-blue-50">
            <User className="text-[#0a1128] w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-[#0a1128]">
            {t("login_welcome")}
          </h2>
          <p className="text-slate-500 mt-2 font-medium">
            {t("login_subtitle")}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center mb-6 text-sm border border-red-100 animate-in fade-in zoom-in duration-300">
            <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
              {t("login_username_label")}
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition" />
              </div>
              <input
                type="text"
                name="username"
                required
                className="block w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-slate-50 focus:bg-white font-medium"
                placeholder={t("login_username_placeholder")}
                value={formData.username}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
              {t("login_password_label")}
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="block w-full pl-12 pr-12 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-slate-50 focus:bg-white font-medium"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center py-4 px-6 rounded-xl shadow-lg shadow-blue-900/20 text-white bg-[#0a1128] hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all transform hover:scale-[1.01] active:scale-95 font-bold uppercase tracking-widest ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {t("login_btn_checking")}
              </span>
            ) : (
              <span className="flex items-center">
                {t("login_btn_submit")} <ArrowRight className="ml-2 w-5 h-5" />
              </span>
            )}
          </button>
        </form>
      </div>

      <div className="absolute bottom-6 text-center w-full text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold">
        © 2025 {t("footer_school_name")}. {t("login_protected_system")}
      </div>
    </div>
  );
};

export default Login;
