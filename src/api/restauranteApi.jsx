import api from "./Api";

export const getRestaurantes = () => {
  console.log("Chamando GET /restaurantes...");
  return api.get("/restaurantes");
};

export const getRestauranteById = (id) =>
    // Remova o '/api' daqui
    api.get(`/restaurantes/${id}`);

export const criarReserva = (payload) =>
    api.post("/reservas", payload);

export const getMinhasReservas = (usuarioId) =>
    api.get(`/reservas/minhas?usuarioId=${usuarioId}`);