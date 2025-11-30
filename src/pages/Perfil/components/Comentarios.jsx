import React, { useEffect, useState } from "react";
import api from "../../../api/usuarioApi";
import { useAuth } from "../../../context/AuthContext";
import "../style/PerfilComentarios.css";

export default function Comentarios() {
  const { usuario } = useAuth();
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComentarios = async () => {
      if (!usuario) return; // se usuário não carregou, não faz nada
      try {
        const res = await api.get(`/usuarios/${usuario.id}/comentarios`);
        setComentarios(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchComentarios();
  }, [usuario]);

  if (!usuario) return <p>Carregando usuário... tem que por Felipe</p>;

  return (
    <div className="perfil-section">
      <h3>Meus Comentários</h3>
      {loading ? (
        <p>Carregando comentários...</p>
      ) : comentarios.length === 0 ? (
        <p>Nenhum comentário feito.</p>
      ) : (
        <ul>
          {comentarios.map(c => (
            <li key={c.id}>
              <strong>{c.restauranteNome}:</strong> {c.texto} - {c.avaliacao}⭐
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
