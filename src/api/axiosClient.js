import axios from "axios";

const axiosClient = axios.create({
  // MUHIM: .env dagi manzilga "/api" ni shu yerda qo'shamiz
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptorlar (Tokenni avtomatik qo'shish uchun)
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Xatolarni tutish
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      // window.location.href = '/login'; // Kerak bo'lsa yoqib qo'ying
    }
    throw error;
  }
);

export default axiosClient;
