import { mockRestaurantes } from "./MockRestaurantes";

let reservas = [];
let comentarios = [];
let favoritos = [];

// Simula delay de API
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  getRestaurantes: async () => {
    await wait(300); // simula delay
    return mockRestaurantes;
  },

  favoritar: async (restauranteId, usuarioId) => {
    await wait(100);
    if (!favoritos.find(f => f.restauranteId === restauranteId && f.usuarioId === usuarioId)) {
      favoritos.push({ restauranteId, usuarioId });
    }
    return favoritos.filter(f => f.usuarioId === usuarioId);
  },

  getFavoritos: async (usuarioId) => {
    await wait(100);
    return favoritos
      .filter(f => f.usuarioId === usuarioId)
      .map(f => mockRestaurantes.find(r => r.id === f.restauranteId));
  },

  comentar: async (restauranteId, usuarioId, texto, avaliacao) => {
    await wait(100);
    const comentario = { id: comentarios.length + 1, restauranteId, usuarioId, texto, avaliacao };
    comentarios.push(comentario);
    return comentario;
  },

  getComentarios: async (usuarioId) => {
    await wait(100);
    return comentarios
      .filter(c => c.usuarioId === usuarioId)
      .map(c => ({ 
        ...c, 
        restauranteNome: mockRestaurantes.find(r => r.id === c.restauranteId)?.name 
      }));
  },

  reservar: async (restauranteId, usuarioId, data, horario, pessoas) => {
    await wait(100);
    const reserva = { 
      id: reservas.length + 1, 
      restauranteId, 
      usuarioId, 
      data, 
      horario, 
      quantidadePessoas: pessoas, 
      restauranteNome: mockRestaurantes.find(r => r.id === restauranteId)?.name 
    };
    reservas.push(reserva);
    return reserva;
  },

  getReservas: async (usuarioId) => {
    await wait(100);
    return reservas
      .filter(r => r.usuarioId === usuarioId)
      .map(r => ({
        ...r,
        restauranteNome: mockRestaurantes.find(res => res.id === r.restauranteId)?.name
      }));
  }
};
