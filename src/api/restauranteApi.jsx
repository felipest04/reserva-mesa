// restauranteApi.jsx — rotas organizadas
import { mockRestaurantes } from "../mocks/MockRestaurantes";

// GET /restaurantes (mock para desenvolvimento)
export const getRestaurantes = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRestaurantes); // retorna o array direto
    }, 300); // simula atraso da rede
  });
};

// As outras rotas podem continuar apontando para o backend
import api from "./api";

// GET /restaurantes/{id}
export const getRestauranteById = (id) => api.get(`/restaurantes/${id}`);

// POST /reservas
export const createReserva = (payload) => api.post("/reservas", payload);

// GET /reservas/minhas
export const getMinhasReservas = () => api.get("/reservas/minhas");
