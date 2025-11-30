import React, { useState } from "react";
import api from "../../../api/usuarioApi";
import { useAuth } from "../../../context/AuthContext";
import "../style/PerfilInformacoes.css";

export default function Informacoes() {
  const { usuario, atualizarUsuario } = useAuth();

  // fallback para teste sem back
  const usuarioTeste = usuario || {
    id: 1,
    nome: "Usuário Teste",
    email: "teste@email.com",
    telefone: "44999999999"
  };

  const [nome, setNome] = useState(usuarioTeste.nome);
  const [email, setEmail] = useState(usuarioTeste.email);
  const [telefone, setTelefone] = useState(usuarioTeste.telefone || "");
  const [mensagem, setMensagem] = useState("");

  const handleSalvar = async () => {
    try {
      if (usuario) {
        const response = await api.put(`/usuarios/${usuario.id}`, { nome, email, telefone });
        atualizarUsuario(response.data);
        setMensagem("Dados atualizados com sucesso!");
      } else {
        setMensagem("Modo teste: alterações não salvas no back-end.");
      }
    } catch (err) {
      setMensagem("Erro ao atualizar: " + err.message);
    }
  };

  return (
    <div className="perfil-section">
      <h3>Informações Pessoais</h3>
      <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome" />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="text" value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="Telefone" />
      <button onClick={handleSalvar}>Salvar</button>
      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
}
