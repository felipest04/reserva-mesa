import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/usuarioApi";
import FormInput from "../components/FormInput.jsx";
import "../styles/Cadastro.css";

export default function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nome || !email || !senha) {
            setMensagem("Todos os campos são obrigatórios.");
            return;
        }

        try {
            // POST para o endpoint
            await api.post("", { nome, email, senha, telefone: "" });

            setMensagem("Usuário cadastrado com sucesso!");

            // Limpa os campos
            setNome("");
            setEmail("");
            setSenha("");

            // Redireciona para login após 1.5s
            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (err) {
            // Mensagem de erro mais clara
            const msg = err.response?.data?.message || err.message || "Erro ao cadastrar usuário.";
            setMensagem("Erro: " + msg);
        }
    };

    return (
        <div className="cadastro-container">
            <div className="cadastro-box">
                <h2>Cadastro de Usuário</h2>
                <form onSubmit={handleSubmit}>
                    <FormInput label="Nome" value={nome} onChange={setNome} required />
                    <FormInput label="Email" value={email} onChange={setEmail} type="email" required />
                    <FormInput label="Senha" value={senha} onChange={setSenha} type="password" required />
                    <button type="submit">Cadastrar</button>
                </form>

                {mensagem && <p>{mensagem}</p>}

                <p>
                    Já tem conta? <a href="/login">Faça login</a>
                </p>
            </div>
        </div>
    );
}
