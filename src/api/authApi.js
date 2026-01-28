// src/api/authApi.js
import axiosClient from "./axiosClient";

export const authApi = {
  login: (payload) => axiosClient.post("/auth/login", payload),
  logout: () => axiosClient.post("/auth/logout"),
  me: () => axiosClient.get("/auth/me"),
  refresh: () => axiosClient.post("/auth/refresh-token"),
};
