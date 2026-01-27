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
  async (error) => {
    const originalRequest = error.config;

    const status = error.response?.status;

    // Refresh endpointning o‘zi bo‘lsa, loop qilmaymiz
    const isRefreshCall =
      originalRequest?.url?.includes("/auth/refresh-token") ||
      originalRequest?.url?.includes("/api/auth/refresh-token");

    if (status === 401 && !originalRequest._retry && !isRefreshCall) {
      originalRequest._retry = true;

      try {
        await axiosClient.post("/auth/refresh-token"); // baseURL /api bo‘lsa
        return axiosClient(originalRequest);
      } catch (e) {
        // refresh ham ishlamadi -> logout flow
        window.location.href = "/login";
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
