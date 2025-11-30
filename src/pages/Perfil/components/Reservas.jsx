import React, { useEffect, useState } from "react";
import api from "../../../api/usuarioApi";
import { useAuth } from "../../../context/AuthContext";
import "../style/PerfilReservas.css";

export default function Reservas() {
  const { usuario } = useAuth();
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservas = async () => {
      if (!usuario) return; // evita erro se usuário ainda não carregou
      try {
        const res = await api.get(`/usuarios/${usuario.id}/reservas`);
        setReservas(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReservas();
  }, [usuario]);

  if (!usuario) return <p>Carregando usuário...</p>;

  return (
    <div className="perfil-section">
      <h3>Minhas Reservas</h3>
      {loading ? (
        <p>Carregando reservas...</p>
      ) : reservas.length === 0 ? (
        <p>Nenhuma reserva encontrada.</p>
      ) : (
        <ul>
          {reservas.map(r => (
            <li key={r.id}>
              {r.restauranteNome} - {r.data} - {r.horario}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
