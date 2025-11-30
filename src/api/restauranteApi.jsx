import api from "./Api";

// GET /restaurantes
export const getRestaurantes = () => {
  console.log("Chamando GET /restaurantes...");
  return api.get("/restaurantes");
};

// GET /restaurantes/{id}
export const getRestauranteById = (id) => api.get(`/restaurantes/${id}`);

// POST /reservas
export const createReserva = (payload) => api.post("/reservas", payload);

// GET /reservas/minhas
export const getMinhasReservas = () => api.get("/reservas-minhas");
