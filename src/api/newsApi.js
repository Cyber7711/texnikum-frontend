import axiosClient from "./axiosClient";

const newsApi = {
  getAll: () => {
    return axiosClient.get("/news");
  },

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
