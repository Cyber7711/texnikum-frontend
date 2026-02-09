import axiosClient from "./axiosClient";

export const authApi = {
  login: (payload) => axiosClient.post("/auth/login", payload),
  refresh: () => axiosClient.post("/auth/refresh-token"),
  logout: () => axiosClient.post("/auth/logout"),
  me: () => axiosClient.get("/auth/me"),
};
