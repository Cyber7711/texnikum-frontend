import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ .../api bo‘lsin
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
  withCredentials: true, // ✅ cookie yuboriladi
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const url = originalRequest?.url || "";

    const isAuthCall =
      url.includes("/auth/login") ||
      url.includes("/auth/refresh-token") ||
      url.includes("/auth/logout");

    // ✅ Auth endpointlarda refresh qilmaymiz
    if (status === 401 && !originalRequest._retry && !isAuthCall) {
      originalRequest._retry = true;

      try {
        await axiosClient.post("/auth/refresh-token");
        return axiosClient(originalRequest);
      } catch (e) {
        window.location.href = "/login";
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
