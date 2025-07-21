import api from "./api";

const userService = {
  getAll: async () => {
    const response = await api.get("/users");
    return response.data;
  },

  // para os próximos passos
  getById: (id) => api.get(`/users/${id}`),
  create: (data) => api.post("/users", data),
  update: (id, data) => api.put(`/users/${id}`, data),
  remove: (id) => api.delete(`/users/${id}`),
};

export default userService;
