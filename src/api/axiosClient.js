import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
  // 🛡️ HACKER MODE: ON 🛡️
  // Bu juda muhim! Cookie-larni har bir so'rovga avtomatik biriktiradi.
  // JS tokenga tega olmaydi, lekin server uni qabul qiladi.
  withCredentials: true,
});

// Interceptorlar
axiosClient.interceptors.request.use(
  (config) => {
    // ❌ LocalStorage.getItem("token") - O'CHIRILDI!
    // Nega? Chunki XSS orqali o'g'irlanishi mumkin.
    // Endi token HttpOnly Cookie-da xavfsiz saqlanadi.

    // Agar serveringiz CSRF himoyasini talab qilsa,
    // tokenni bu yerda header'ga qo'shish mumkin:
    // config.headers['X-CSRF-TOKEN'] = getCookie('csrf_token');

    return config;
  },
  (error) => Promise.reject(error),
);

// Xatolarni tutish
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // 🛡️ SESSANI YANGILASH (REFRESH TOKEN)
    // Agar 401 (Unauthorized) bo'lsa va bu birinchi urinish bo'lsa
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Bu yerda backend'dagi /refresh-token endpointiga murojaat qilinadi.
      // Refresh token ham Cookie'da bo'lishi shart!
      return axiosClient
        .post("/auth/refresh-token")
        .then(() => axiosClient(originalRequest)) // So'rovni qayta yuborish
        .catch(() => {
          // Agar refresh ham xato bo'lsa - majburiy Logout
          window.location.href = "/login";
          return Promise.reject(error);
        });
    }

    // Xavfsizlik uchun xatolarni filtrlash
    if (error.code === "ECONNABORTED") {
      console.warn("⚠️ DDoS yoki Network lag aniqlandi.");
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
