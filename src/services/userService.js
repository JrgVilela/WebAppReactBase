import api from "./api";

const userService = {
  getAll: async () => {
    const response = await api.get("/users");
    return response.data;
  },

  getUsersPaginated: async (page, limit, searchText) => {
    let response = null;
    if (searchText)
      response = await api.get(
        `/users/search?s=${searchText}&page=${page}&limit=${limit}`
      );
    else response = await api.get(`/users?page=${page}&limit=${limit}`);

    if (response) return response.data;
    else throw new Error("Erro ao buscar usuários");
  },

  // para os próximos passos
  getById: (id) => api.get(`/users/${id}`),
  create: (data) => api.post("/users", data),
  update: (id, data) => api.put(`/users/${id}`, data),
  remove: (id) => api.delete(`/users/${id}`),
};

export default userService;
