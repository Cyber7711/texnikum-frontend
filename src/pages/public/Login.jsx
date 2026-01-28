import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
  Home,
  ShieldCheck,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import axiosClient from "../../api/axiosClient";

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // simple client-side lock
  const [attempts, setAttempts] = useState(0);
  const [lockTime, setLockTime] = useState(0);

  useEffect(() => {
    if (lockTime <= 0) return;
    const timer = setInterval(() => setLockTime((p) => p - 1), 1000);
    return () => clearInterval(timer);
  }, [lockTime]);

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (lockTime > 0) return;

    setLoading(true);
    setError(null);

    try {
      if (!executeRecaptcha) {
        throw new Error("Xavfsizlik tizimi yuklanmadi. Internetni tekshiring.");
      }

      // Action backend bilan bir xil bo‘lsin: "login"
      const captchaToken = await executeRecaptcha("login");

      // ✅ login -> backend cookie set qiladi (HttpOnly)
      await axiosClient.post("/auth/login", {
        username: formData.username,
        password: formData.password,
        captchaToken,
      });

      // ✅ redirect
      navigate("/admin", { replace: true });
    } catch (err) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 5) {
        setLockTime(60);
        setAttempts(0);
        setError(
          "Juda ko'p xato urinish! 60 soniyadan keyin qayta urinib ko‘ring.",
        );
      } else {
        const apiMsg = err?.response?.data?.message;
        const msg =
          apiMsg ||
          err?.message ||
          "Login yoki parol noto'g'ri. Qayta urinib ko‘ring.";
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md relative z-10 border border-slate-100 my-10">
      <div className="text-center mb-10">
        <div className="bg-emerald-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3 shadow-inner">
          <User className="text-emerald-600 w-10 h-10 -rotate-3" />
        </div>

        <h2 className="text-3xl font-black text-[#0a1128] tracking-tighter uppercase italic">
          Admin <span className="text-emerald-500">Panel</span>
        </h2>

        <p className="text-slate-400 mt-2 font-medium">
          {t("login_subtitle") || "Tizimga kirish uchun ma'lumotlarni kiriting"}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center mb-6 text-sm border border-red-100">
          <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
          <span className="font-bold">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* USERNAME */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
            {t("login_username_label") || "Login"}
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300">
              <User size={20} />
            </div>
            <input
              type="text"
              name="username"
              required
              disabled={loading || lockTime > 0}
              className="block w-full pl-14 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Admin login"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
            {t("login_password_label") || "Parol"}
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300">
              <Lock size={20} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              disabled={loading || lockTime > 0}
              className="block w-full pl-14 pr-14 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              disabled={loading || lockTime > 0}
              className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-300 hover:text-emerald-600 transition-colors"
              onClick={() => setShowPassword((p) => !p)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading || lockTime > 0}
          className={`w-full flex justify-center items-center py-5 rounded-2xl shadow-xl transition-all font-black uppercase tracking-widest text-sm italic
            ${
              lockTime > 0
                ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                : "bg-emerald-600 hover:bg-emerald-700 text-white active:scale-[0.98]"
            }`}
        >
          {loading ? (
            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
          ) : lockTime > 0 ? (
            `BLOKLANDI (${lockTime}s)`
          ) : (
            <>
              {t("login_btn_submit") || "Kirish"}{" "}
              <ArrowRight className="ml-2 w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

const Login = () => {
  const { t } = useTranslation();
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    console.error("🚨 .env da VITE_RECAPTCHA_SITE_KEY yo‘q!");
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{ async: true, defer: true, appendTo: "head" }}
    >
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-x-hidden font-sans">
        <div className="absolute top-0 left-0 w-full h-[60%] bg-[#0a1128] -skew-y-3 transform -translate-y-24 z-0" />

        <Link
          to="/"
          className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white/70 hover:text-white transition-colors font-bold text-sm tracking-widest uppercase"
        >
          <Home size={18} /> {t("nav_home")}
        </Link>

        <LoginForm />

        <div className="relative z-10 text-center py-4 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest bg-white/50 px-3 py-1 rounded-full border border-slate-200">
            <ShieldCheck size={14} className="text-emerald-500" /> Protected by
            reCAPTCHA v3
          </div>
          <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-black opacity-80">
            © 2026 {t("footer_school_name") || "3-SONLI TEXNIKUM"}
          </p>
        </div>
      </div>
    </GoogleReCaptchaProvider>
  );
};

export default Login;
