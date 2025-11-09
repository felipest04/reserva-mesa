package com.restaurante.reservamesa.service

import com.restaurante.reservamesa.model.Avaliacao
import com.restaurante.reservamesa.repository.AvaliacaoRepository
import org.springframework.stereotype.Service

@Service
class AvaliacaoService(private val repository: AvaliacaoRepository) {

    fun listarTodas() = repository.findAll()

    fun buscarPorId(id: Long) = repository.findById(id).orElseThrow {
        RuntimeException("Avaliação não encontrada com ID $id")
    }

    fun listarPorRestaurante(restauranteId: Long) = repository.findByRestauranteId(restauranteId)

    fun salvar(avaliacao: Avaliacao) = repository.save(avaliacao)

    fun atualizar(id: Long, nova: Avaliacao): Avaliacao {
        val existente = buscarPorId(id)
        val atualizada = existente.copy(
            nota = nova.nota,
            comentario = nova.comentario,
            restaurante = nova.restaurante,
            usuario = nova.usuario
        )
        return repository.save(atualizada)
    }

    fun excluir(id: Long) = repository.deleteById(id)
}
