import axiosClient from "./axiosClient"; // Biz oldinroq yasagan, cookielarni taniyidgan axios

const newsApi = {
  // 1. Barcha yangiliklarni olib kelish
  getAll: () => {
    // Nega '/news'? Chunki backendda route shunday nomlangan.
    return axiosClient.get("/news");
  },

  // 2. Yangi yangilik yaratish (Eng muhim joyi!)
  create: (data) => {
    // Nega 'post'? Chunki ma'lumot jo'natyapmiz.
    // 'data' - bu FormData obyekti bo'ladi (rasm borligi uchun).
    // Backendga "Men senga oddiy JSON emas, fayl (multipart) yuboryapman" deb aytishimiz shart.
    return axiosClient.post("/news", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // 3. O'chirish
  delete: (id) => {
    // Qaysi yangilikni o'chirishni ID orqali bilamiz
    return axiosClient.delete(`/news/${id}`);
  },
};

export default newsApi;
