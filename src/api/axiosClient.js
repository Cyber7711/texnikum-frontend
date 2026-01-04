import axios from "axios";

const axiosClient = axios.create({
  // baseURL ni tekshiring: u oxiri "/" bilan tugamasligi kerak
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // 1. TIMEOUT QO'SHISH (Sayt qotib qolishining oldini oladi)
  timeout: 15000, // 15 soniyadan keyin so'rovni bekor qiladi
});

// Interceptorlar
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Xatolarni tutish
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 2. TIMEOUT YOKI NETWORK XATOLIGINI TEKSHIRISH
    if (error.code === "ECONNABORTED") {
      console.error("Server javob berishi juda uzoq davom etmoqda...");
    }

    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      // window.location.href = '/login';
    }

    // 3. Xatoni throw qilish o'rniga Promise.reject ishlatish tavsiya etiladi
    return Promise.reject(error);
  }
);

export default axiosClient;
