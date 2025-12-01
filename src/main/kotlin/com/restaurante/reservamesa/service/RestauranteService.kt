package com.restaurante.reservamesa.service

import com.restaurante.reservamesa.model.Restaurante
import com.restaurante.reservamesa.repository.RestauranteRepository
import org.springframework.stereotype.Service

@Service
class RestauranteService(
    private val repository: RestauranteRepository
) {

    fun listarTodos() = repository.findAll()

    fun buscarPorId(id: Long) = repository.findById(id).orElseThrow {
        RuntimeException("Restaurante não encontrado com ID $id")
    }

    fun buscarPorNome(nome: String) = repository.findByNomeContainingIgnoreCase(nome)

    fun listarDisponiveis() = repository.findByDisponivelTrue()

    fun salvar(restaurante: Restaurante): Restaurante {
        return repository.save(restaurante)
    }

    fun atualizar(id: Long, novo: Restaurante): Restaurante {
        val existente = buscarPorId(id)

        // Usando o método copy do data class para criar uma nova instância com os dados atualizados.
        val atualizado = existente.copy(
            nome = novo.nome,
            endereco = novo.endereco,
            disponivel = novo.disponivel,
            urlImagem = novo.urlImagem,
            horariosFuncionamento = novo.horariosFuncionamento
        )
        return repository.save(atualizado)
    }

    fun excluir(id: Long) = repository.deleteById(id)
}