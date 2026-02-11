import axiosClient from "./axiosClient";

const managementApi = {
  getPublic: () => axiosClient.get("/management"),
  getAll: () => axiosClient.get("/management/all"), // admin
  create: (formData) =>
    axiosClient.post("/management", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id, formData) =>
    axiosClient.patch(`/management/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  remove: (id) => axiosClient.delete(`/management/${id}`),
};

export default managementApi;
