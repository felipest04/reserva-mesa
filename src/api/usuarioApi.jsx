import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/usuarios",
  headers: { "Content-Type": "application/json" },
  withCredentials: true // importante para cookies/autenticação
});

export default api;
