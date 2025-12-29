import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  }, // Serveringiz porti (4000 yoki 5000)
  withCredentials: true, // Cookie uchun
});

// 1. REQUEST INTERCEPTOR (So'rov ketishidan oldin ishlaydi)
axiosClient.interceptors.request.use(
  (config) => {
    // LocalStorage dan tokenni olamiz
    const token = localStorage.getItem("token");

    // Agar token bor bo'lsa, uni Headerga qo'shamiz
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 2. RESPONSE INTERCEPTOR (Javob kelganda ishlaydi)
axiosClient.interceptors.response.use(
  (response) => {
    return response.data; // Faqat data qismini qaytaradi
  },
  (error) => {
    // Agar token eskigan bo'lsa (401), foydalanuvchini loginga chiqarib yuborish mumkin
    if (error.response && error.response.status === 401) {
      // localStorage.removeItem('token');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
