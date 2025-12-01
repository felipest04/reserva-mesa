package com.restaurante.reservamesa.service

import com.restaurante.reservamesa.model.Usuario
import com.restaurante.reservamesa.repository.UsuarioRepository
import org.springframework.stereotype.Service

@Service
class UsuarioService(private val repository: UsuarioRepository) {

    fun listarTodos() = repository.findAll()

    fun buscarPorId(id: Long) = repository.findById(id).orElseThrow {
        RuntimeException("Usuário não encontrado com ID $id")
    }

    fun autenticar(email: String, senha: String): Usuario? {
        return repository.findByEmailAndSenha(email, senha)
    }

    fun salvar(usuario: Usuario) = repository.save(usuario)

    fun atualizar(id: Long, novo: Usuario): Usuario {
        val existente = buscarPorId(id)
        val atualizado = existente.copy(
            nome = novo.nome,
            email = novo.email,
            telefone = novo.telefone
        )
        return repository.save(atualizado)
    }

    fun excluir(id: Long) = repository.deleteById(id)
}
