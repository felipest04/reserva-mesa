import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true, // ✅ envia cookies/sessão se houver
  headers: {
    "Content-Type": "application/json", // define o tipo de conteúdo padrão
    Accept: "application/json" // indica que espera receber JSON do backend
  }
});

export default api;
