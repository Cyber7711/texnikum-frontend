// src/api/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // https://.../api
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

axiosClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    const status = err.response?.status;
    const original = err.config;

    if (!original) return Promise.reject(err);

    const url = original.url || "";
    const isAuth =
      url.includes("/auth/login") ||
      url.includes("/auth/refresh-token") ||
      url.includes("/auth/logout") ||
      url.includes("/auth/me");

    // 401 bo‘lsa, faqat auth bo‘lmagan requestlarda refresh qilamiz
    if (status === 401 && !original._retry && !isAuth) {
      original._retry = true;
      try {
        await axiosClient.post("/auth/refresh-token");
        return axiosClient(original);
      } catch (e) {
        // refresh ham yiqilsa: login
        window.location.href = "/login";
        return Promise.reject(e);
      }
    }

    return Promise.reject(err);
  },
);

export default axiosClient;
