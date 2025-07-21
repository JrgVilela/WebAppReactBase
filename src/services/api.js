import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ajuste conforme seu backend
});

// Interceptor para adicionar o token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // ou do contexto
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      window.location.href = "/login_expired";
    } else if ([403, 404, 500].includes(status)) {
      const message =
        status === 403
          ? "Acesso negado."
          : status === 404
          ? "Página não encontrada."
          : "Erro interno do servidor.";

      window.location.href = `/error?code=${status}&message=${encodeURIComponent(
        message
      )}`;
    }
    return Promise.reject(error);
  }
);

export default api;
