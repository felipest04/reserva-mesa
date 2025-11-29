
// Importa o Axios, biblioteca usada para requisições HTTP
import axios from "axios";

// Cria uma instância configurada do Axios
const api = axios.create({
  // URL base de todas as requisições
  // Pega do arquivo .env caso exista (VITE_API_BASE)
  // ou usa http://localhost:8080/api como padrão
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:8080/api/restaurantes",

  // Tempo máximo de espera para a requisição (10s)
  timeout: 10000,
});

// Exporta para ser usado nos outros arquivos de API
export default api;