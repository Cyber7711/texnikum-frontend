import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, Eye, EyeOff, AlertCircle, ArrowRight } from "lucide-react";
import axiosClient from "../../api/axiosClient";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "", // <--- O'ZGARD! Email o'rniga Username
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
      // Backendga username va password yuboramiz
      const response = await axiosClient.post("/auth/login", formData);

      console.log("Login javobi:", response);

      // Backenddan token qaytmoqda
      if (response.token) {
        localStorage.setItem("token", response.token);
        // Admin sahifasiga yo'naltiramiz
        navigate("/admin");
      }
    } catch (err) {
      console.error("Login xatosi:", err);
      // Backenddan kelgan aniq xabarni chiqaramiz
      setError(err.response?.data?.message || "Login yoki parol noto'g'ri!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-tatu-light flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-tatu-blue skew-y-3 transform -translate-y-20 z-0"></div>

      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md relative z-10 border border-gray-100">
        <div className="text-center mb-8">
          <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-blue-100">
            <User className="text-tatu-blue w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-tatu-blue">Xush kelibsiz!</h2>
          <p className="text-gray-500 mt-2">Tizimni boshqarish uchun kiring</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center mb-6 text-sm border border-red-200 animate-pulse">
            <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400 group-focus-within:text-tatu-blue transition" />
              </div>
              <input
                type="text"
                name="username"
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tatu-blue focus:border-transparent outline-none transition bg-gray-50 focus:bg-white"
                placeholder="admin"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Parol
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-tatu-blue transition" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tatu-blue focus:border-transparent outline-none transition bg-gray-50 focus:bg-white"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-white bg-tatu-blue hover:bg-tatu-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tatu-blue transition-all transform hover:scale-[1.02] active:scale-95 font-bold ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <span className="flex items-center">Checking...</span>
            ) : (
              <span className="flex items-center">
                TIZIMGA KIRISH <ArrowRight className="ml-2 w-5 h-5" />
              </span>
            )}
          </button>
        </form>
      </div>

      <div className="absolute bottom-4 text-center w-full text-xs text-gray-400">
        © 2025 Texnikum. Himoyalangan tizim.
      </div>
    </div>
  );
};

export default Login;
