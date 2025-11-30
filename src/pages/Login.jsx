import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/usuarioApi";
import FormInput from "../components/FormInput.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get("/"); // busca todos os usuários
      const usuario = response.data.find(u => u.email === email && u.senha === senha);

      if (usuario) {
        login(usuario); // atualiza contexto
        navigate("/home"); // redireciona para a home
      } else {
        setMensagem("Email ou senha inválidos");
      }
    } catch (err) {
      setMensagem("Erro ao fazer login: " + err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <FormInput label="Email" value={email} onChange={setEmail} type="email" />
          <FormInput label="Senha" value={senha} onChange={setSenha} type="password" />
          <button type="submit">Entrar</button>
        </form>
        {mensagem && <p>{mensagem}</p>}
        <div className="link">
          <p>Não tem conta? <a href="/cadastro">Cadastre-se</a></p>
        </div>
      </div>
    </div>
  );
}
