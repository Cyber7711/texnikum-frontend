// src/api/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ .../api
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
  withCredentials: true, // ✅ cookie yuboriladi
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const status = error.response?.status;
    const url = original?.url || "";

    const isAuthCall =
      url.includes("/auth/login") ||
      url.includes("/auth/refresh-token") ||
      url.includes("/auth/logout") ||
      url.includes("/auth/me");

    // ✅ Auth endpointlarda refresh yo'q
    if (status === 401 && !original._retry && !isAuthCall) {
      original._retry = true;
      try {
        await axiosClient.post("/auth/refresh-token");
        return axiosClient(original);
      } catch (e) {
        // refresh ham bo'lmasa -> login
        window.location.href = "/login";
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
