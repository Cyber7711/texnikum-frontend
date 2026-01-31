import axiosClient from "./axiosClient";

export const authApi = {
  csrf: () => axiosClient.get("/auth/csrf"),
  me: () => axiosClient.get("/auth/me"),
  login: (body) => axiosClient.post("/auth/login", body),
  logout: () => axiosClient.post("/auth/logout"),
  refresh: () => axiosClient.post("/auth/refresh-token"),
};
