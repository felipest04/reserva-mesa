import React, { useState } from "react";
import api from "../api/usuarioApi";
import FormInput from "../components/FormInput.jsx";
import "../styles/Cadastro.css";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/", { nome, email, senha });
      setMensagem("Usuário cadastrado com sucesso!");
      setNome("");
      setEmail("");
      setSenha("");
    } catch (err) {
      setMensagem("Erro ao cadastrar usuário: " + err.message);
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-box">
        <h2>Cadastro de Usuário</h2>
        <form onSubmit={handleSubmit}>
          <FormInput label="Nome" value={nome} onChange={setNome} />
          <FormInput label="Email" value={email} onChange={setEmail} type="email" />
          <FormInput label="Senha" value={senha} onChange={setSenha} type="password" />
          <button type="submit">Cadastrar</button>
        </form>
        {mensagem && <p>{mensagem}</p>}
      </div>
    </div>
  );
}
