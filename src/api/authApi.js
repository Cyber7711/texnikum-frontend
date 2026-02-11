import axiosClient from "./axiosClient";

export const authApi = {
  csrf: () => axiosClient.get("/auth/csrf"),
  login: (payload) => axiosClient.post("/auth/login", payload),
  me: () => axiosClient.get("/auth/me"),
  logout: () => axiosClient.post("/auth/logout"),
};
