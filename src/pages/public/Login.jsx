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
  Landmark,
  Loader2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { motion, AnimatePresence } from "framer-motion";
import axiosClient from "../../api/axiosClient";

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Client-side Xavfsizlik: Brute-Force himoyasi
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
    if (lockTime > 0 || loading) return;

    // Kiritilgan ma'lumotlarni tekshirish (Basic Validation)
    if (formData.username.length < 3 || formData.password.length < 6) {
      setError("Login yoki parol formati noto'g'ri.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (!executeRecaptcha) {
        throw new Error("Xavfsizlik tizimi yuklanmadi. Internetni tekshiring.");
      }

      // reCAPTCHA Token olish
      const captchaToken = await executeRecaptcha("login");

      // Backend so'rov (Xavfsiz HTTP-Only cookie orqali boshqariladi)
      await axiosClient.post("/auth/login", {
        username: formData.username,
        password: formData.password,
        captchaToken,
      });

      // Muvaffaqiyatli kirish
      setAttempts(0);
      navigate("/admin", { replace: true });
    } catch (err) {
      // Xato urinishlarni sanash
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 5) {
        setLockTime(60); // 5 ta xatodan so'ng 60 soniyaga bloklash
        setAttempts(0);
        setFormData({ username: "", password: "" }); // Formalarni tozalash
        setError(
          "Juda ko'p xato urinish! 60 soniyadan keyin qayta urinib ko'ring.",
        );
      } else {
        const apiMsg = err?.response?.data?.message;
        setError(apiMsg || "Login yoki parol noto'g'ri. Qayta urinib ko'ring.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-blue-900/20 w-full max-w-[420px] relative z-10 border border-slate-100 my-8"
    >
      <div className="text-center mb-10">
        <div className="bg-slate-50 w-20 h-20 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-inner border border-slate-100">
          <ShieldCheck className="text-blue-600 w-10 h-10" strokeWidth={1.5} />
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0a1930] tracking-tight uppercase">
          TIZIMGA <span className="text-blue-600">KIRISH</span>
        </h2>
        <div className="w-12 h-1 bg-amber-400 mx-auto mt-4 rounded-full" />
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            className="overflow-hidden"
          >
            <div className="bg-rose-50 text-rose-600 p-4 rounded-xl flex items-center mb-6 text-xs font-bold border border-rose-200">
              <AlertCircle className="w-4 h-4 mr-3 shrink-0" />
              <span>{error}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* USERNAME */}
        <div>
          <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-2 ml-1">
            {t("login_username_label", "Foydalanuvchi logini")}
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
              <User size={18} />
            </div>
            <input
              type="text"
              name="username"
              required
              disabled={loading || lockTime > 0}
              autoComplete="username"
              className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm font-bold text-[#0a1930] disabled:opacity-60 disabled:cursor-not-allowed placeholder:font-medium placeholder:text-slate-400"
              placeholder="Admin login"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-2 ml-1">
            {t("login_password_label", "Maxfiy parol")}
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
              <Lock size={18} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              disabled={loading || lockTime > 0}
              autoComplete="current-password"
              className="block w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm font-extrabold tracking-widest text-[#0a1930] disabled:opacity-60 disabled:cursor-not-allowed placeholder:font-medium placeholder:text-slate-400 placeholder:tracking-normal"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              disabled={loading || lockTime > 0}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-600 transition-colors disabled:opacity-50"
              onClick={() => setShowPassword((p) => !p)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading || lockTime > 0}
          className={`w-full flex justify-center items-center py-4 rounded-xl transition-all font-bold uppercase tracking-widest text-xs
            ${
              lockTime > 0
                ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                : "bg-[#0a1930] hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-700/30 active:scale-[0.98]"
            }`}
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : lockTime > 0 ? (
            `TIZIM BLOKLANDI (${lockTime}S)`
          ) : (
            <>
              {t("login_btn_submit", "TIZIMGA KIRISH")}{" "}
              <ArrowRight className="ml-2 w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

const Login = () => {
  const { t } = useTranslation();
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    console.error("🚨 .env faylida VITE_RECAPTCHA_SITE_KEY topilmadi!");
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey || "dummy-key"}
      scriptProps={{ async: true, defer: true, appendTo: "head" }}
    >
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Rasmiy Orqa fon dizayni */}
        <div className="absolute top-0 left-0 w-full h-[45%] bg-[#0a1930] z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-[#0a1930] to-[#0a1930]" />
        </div>

        {/* Home tugmasi */}
        <Link
          to="/"
          className="absolute top-6 left-6 md:top-10 md:left-10 z-20 flex items-center gap-2 text-white/70 hover:text-amber-400 transition-colors font-bold text-xs tracking-widest uppercase bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10"
        >
          <Home size={16} /> {t("nav_home", "BOSH SAHIFA")}
        </Link>

        {/* Tizim Logotipi (Tepada) */}
        <div className="relative z-10 mb-2 mt-10 md:mt-0 flex flex-col items-center">
          <Landmark
            size={40}
            className="text-amber-400 mb-3"
            strokeWidth={1.5}
          />
        </div>

        <LoginForm />

        {/* Pastki himoya va Mualliflik huquqi */}
        <div className="relative z-10 text-center py-6 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest bg-white px-4 py-1.5 rounded-md border border-slate-200 shadow-sm">
            <ShieldCheck size={14} className="text-blue-600" /> Protected by
            reCAPTCHA v3
          </div>
          <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-extrabold">
            © {new Date().getFullYear()}{" "}
            {t("footer_school_name", "3-SON POLITEXNIKA O'QUV MUASSASASI")}
          </p>
        </div>
      </div>
    </GoogleReCaptchaProvider>
  );
};

export default Login;
