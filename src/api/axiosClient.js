import axios from "axios";

const axiosClient = axios.create({
  // MUHIM: Oxiriga /api qo'shilishi shart, chunki Backend hamma narsani /api/... kutmoqda
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 1. REQUEST INTERCEPTOR
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. RESPONSE INTERCEPTOR
axiosClient.interceptors.response.use(
  (response) => {
    // Agar response.data ichida yana data bo'lsa, o'shani qaytaramiz (Backend formatiga qarab)
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Avtorizatsiyadan o'tmagan bo'lsa tokenni tozalash (ixtiyoriy)
      // localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
