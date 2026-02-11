import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 4000,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
  withCredentials: true,
});

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
};

axiosClient.interceptors.request.use((config) => {
  const csrf = getCookie("csrf_token");
  if (csrf) config.headers["X-CSRF-Token"] = csrf;
  return config;
});

axiosClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config || {};
    const status = error.response?.status;
    const url = originalRequest?.url || "";

    const isAuthCall =
      url.includes("/auth/login") ||
      url.includes("/auth/refresh-token") ||
      url.includes("/auth/logout") ||
      url.includes("/auth/csrf") ||
      url.includes("/auth/me");

    if (status === 401 && !originalRequest._retry && !isAuthCall) {
      originalRequest._retry = true;
      try {
        await axiosClient.post("/auth/refresh-token");
        return axiosClient(originalRequest);
      } catch (e) {
        // hard reload/loop yo‘q
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
