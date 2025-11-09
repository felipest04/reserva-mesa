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

    fun buscarPorEmail(email: String) = repository.findByEmail(email)
        ?: throw RuntimeException("Usuário não encontrado com email $email")

    fun buscarPorNome(nome: String) = repository.findByNomeContainingIgnoreCase(nome)

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
