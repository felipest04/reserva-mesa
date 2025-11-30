import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Informacoes from "./components/Informacoes.jsx";
import Comentarios from "./components/Comentarios.jsx";
import Favoritos from "./components/Favoritos.jsx";
import { mockApi } from "../../mocks/mockService.js"; // USANDO MOCK TEMPORARIAMENTE
// import api from "../../api/usuarioApi"; // API real
import "./Perfil.css";

export default function Perfil() {
  const { usuario } = useAuth();
  const [aba, setAba] = useState("informacoes");

  const [mockFavoritos, setMockFavoritos] = useState([]);
  const [mockComentarios, setMockComentarios] = useState([]);
  const [mockReservas, setMockReservas] = useState([]);

  const navigate = useNavigate();

  const user = usuario || {
    id: 1,
    nome: "João Teste",
    email: "teste@email.com",
    telefone: "44999999999",
  };

  // Inicializa dados mock
useEffect(() => {
  async function testeMock() {
    if (!user.id) return;

    // Evita duplicar
    if (mockFavoritos.length === 0 && mockComentarios.length === 0 && mockReservas.length === 0) {
      await mockApi.favoritar(1, user.id);
      await mockApi.favoritar(2, user.id);

      await mockApi.comentar(1, user.id, "Ótima pizza!", 5);
      await mockApi.comentar(2, user.id, "Hambúrguer muito bom.", 4);

      await mockApi.reservar(1, user.id, "2025-12-01", "19:00", 2);
      await mockApi.reservar(3, user.id, "2025-12-02", "20:00", 4);

      const favs = await mockApi.getFavoritos(user.id);
      const comms = await mockApi.getComentarios(user.id);
      const resvs = await mockApi.getReservas(user.id);

      setMockFavoritos(favs);
      setMockComentarios(comms);
      setMockReservas(resvs);
    }
  }

  testeMock();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <div className="perfil-container">
      <h2>Perfil de {user.nome}</h2>

      <div className="perfil-abas">
        <button onClick={() => setAba("informacoes")}>Informações</button>
        <button onClick={() => navigate("/minhas-reservas")}>Reservas</button>
        <button onClick={() => setAba("comentarios")}>Comentários</button>
        <button onClick={() => setAba("favoritos")}>Favoritos</button>
      </div>

      <div className="perfil-conteudo">
        {aba === "informacoes" && <Informacoes user={user} />}

        {aba === "comentarios" && (
          <div>
            <h3>Meus Comentários (Mock)</h3>
            {mockComentarios.length === 0 ? (
              <p>Nenhum comentário feito.</p>
            ) : (
              <ul>
                {mockComentarios.map(c => (
                  <li key={c.id}>
                    <strong>{c.restauranteNome}:</strong> {c.texto} - {c.avaliacao}⭐
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {aba === "favoritos" && (
          <div>
            <h3>Meus Favoritos (Mock)</h3>
            {mockFavoritos.length === 0 ? (
              <p>Nenhum favorito.</p>
            ) : (
              <ul>
                {mockFavoritos.map(f => (
                  <li key={f.id}>{f.name}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {aba === "reservas" && (
          <div>
            <h3>Minhas Reservas (Mock)</h3>
            {mockReservas.length === 0 ? (
              <p>Nenhuma reserva feita.</p>
            ) : (
              <ul>
                {mockReservas.map(r => (
                  <li key={r.id}>
                    {r.restauranteNome} - {r.data} - {r.horario} - {r.quantidadePessoas} pessoas
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
