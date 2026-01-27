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
  Zap,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import axiosClient from "../../api/axiosClient";

// --- 1. LOGIN FORMASI MANTIQI ---
const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // ReCAPTCHA hookini chaqiramiz
  const { executeRecaptcha } = useGoogleReCaptcha();

  // State'lar
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🛡️ RATE LIMITING (Himoya)
  const [attempts, setAttempts] = useState(0); // Urinishlar soni
  const [lockTime, setLockTime] = useState(0); // Bloklanish vaqti (sekund)

  // Timer: Agar bloklangan bo'lsa, vaqtni kamaytirib boradi
  useEffect(() => {
    let timer;
    if (lockTime > 0) {
      timer = setInterval(() => {
        setLockTime((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [lockTime]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Foydalanuvchi yozishni boshlaganda xatoni o'chiramiz
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Agar vaqtinchalik blokda bo'lsa, so'rov yubormaymiz
    if (lockTime > 0) return;

    setLoading(true);
    setError(null);

    // 🛡️ 1-HIMOYA: ReCAPTCHA Token olish
    if (!executeRecaptcha) {
      setError("Xavfsizlik tizimi yuklanmadi. Internetni tekshiring.");
      setLoading(false);
      return;
    }

    try {
      // Google'dan token so'raymiz ("login_submit" - bu harakat nomi)
      const reCaptchaToken = await executeRecaptcha("login_submit");

      // 🛡️ 2-HIMOYA: Backendga ma'lumot yuborish
      const res = await axiosClient.post("/auth/login", {
        ...formData,
        captchaToken: reCaptchaToken, // Backend buni Google'da tekshiradi
      });

      // Tokenni olish
      const token = res.token || res.data?.token;

      if (token) {
        // Muvaffaqiyatli kirish!
        // Eslatma: Ideal holda backend tokenni HttpOnly Cookie'da yuborishi kerak.
        // Hozircha localStorage ishlatamiz (agar backend cookie-ga o'tmagan bo'lsa)
        localStorage.setItem("token", token);
        navigate("/admin");
      } else {
        throw new Error("Token topilmadi");
      }
    } catch (err) {
      console.error("Login Error:", err);

      // 🛡️ 3-HIMOYA: Urinishlarni sanash (Frontend Rate Limit)
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      // Agar 5 marta xato qilsa, 60 soniyaga bloklaymiz
      if (newAttempts >= 5) {
        setLockTime(60);
        setError("Juda ko'p xato urinish! Tizim 60 soniyaga bloklandi.");
        setAttempts(0); // Hisoblagichni nollaymiz (yoki blokdan keyin nollash mumkin)
      } else {
        // Backenddan kelgan xabarni yoki umumiy xatoni ko'rsatamiz
        const msg = err.response?.data?.message || "Login yoki parol noto'g'ri";
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md relative z-10 border border-slate-100 animate-in fade-in zoom-in duration-500 my-10">
      {/* Header: Logo va Sarlavha */}
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

      {/* Xatolik xabari */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center mb-6 text-sm border border-red-100 animate-shake">
          <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
          <span className="font-bold">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* USERNAME INPUT */}
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
              disabled={loading || lockTime > 0}
              className="block w-full pl-14 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Admin login"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* PASSWORD INPUT */}
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
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading || lockTime > 0}
          className={`w-full flex justify-center items-center py-5 rounded-2xl shadow-xl transition-all font-black uppercase tracking-widest text-sm italic
              ${
                lockTime > 0
                  ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/10 active:scale-[0.98]"
              }`}
        >
          {loading ? (
            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : lockTime > 0 ? (
            // Bloklangan vaqtni ko'rsatish
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

// --- 2. ASOSIY WRAPPER (Provider shu yerda bo'lishi shart) ---
const Login = () => {
  const { t } = useTranslation();

  // .env faylidan kalitni o'qib olamiz
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  // Debug uchun: Agar kalit yo'q bo'lsa xabar beramiz
  if (!siteKey) {
    console.error(
      "🚨 HACKER ALERT: .env faylida VITE_RECAPTCHA_SITE_KEY yo'q!",
    );
  }

  return (
    // GoogleReCaptchaProvider butun login formasini o'rab turishi kerak
    <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-x-hidden font-sans">
        {/* Orqa fon bezagi (Skew) */}
        <div className="absolute top-0 left-0 w-full h-[60%] bg-[#0a1128] -skew-y-3 transform -translate-y-24 z-0"></div>

        {/* Bosh sahifaga qaytish */}
        <Link
          to="/"
          className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white/70 hover:text-white transition-colors font-bold text-sm tracking-widest uppercase"
        >
          <Home size={18} /> {t("nav_home")}
        </Link>

        {/* Asosiy Forma Komponenti */}
        <LoginForm />

        {/* Footer qismi */}
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
