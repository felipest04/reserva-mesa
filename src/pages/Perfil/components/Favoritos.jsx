import React, { useEffect, useState } from "react";
import api from "../../../api/usuarioApi";
import { useAuth } from "../../../context/AuthContext";
import "../style/PerfilFavoritos.css";

export default function Favoritos() {
  const { usuario } = useAuth();
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoritos = async () => {
      if (!usuario) return; // evita erro se usuário não carregou
      try {
        const res = await api.get(`/usuarios/${usuario.id}/favoritos`);
        setFavoritos(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavoritos();
  }, [usuario]);

  const refazerReserva = (restauranteId) => {
    // Aqui você pode colocar a lógica de refazer reserva
    console.log("Refazer reserva para restaurante ID:", restauranteId);
    // Exemplo: redirecionar para página de reserva
    // navigate(`/reserva/${restauranteId}`);
  };

  if (!usuario) return <p>Carregando usuário... tem que por também Felipe</p>;

  return (
    <div className="perfil-section">
      <h3>Favoritos</h3>
      {loading ? (
        <p>Carregando favoritos...</p>
      ) : favoritos.length === 0 ? (
        <p>Nenhum favorito.</p>
      ) : (
        <ul>
          {favoritos.map(f => (
            <li key={f.id} className="favorito-item">
              <span>{f.nome}</span>
              <button 
                className="btn-refazer" 
                onClick={() => refazerReserva(f.id)}
              >
                Refazer Reserva
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
