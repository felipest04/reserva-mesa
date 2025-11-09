package com.restaurante.reservamesa.service

import com.restaurante.reservamesa.model.HorarioFuncionamento
import com.restaurante.reservamesa.repository.HorarioFuncionamentoRepository
import org.springframework.stereotype.Service
import java.time.DayOfWeek

@Service
class HorarioFuncionamentoService(private val repository: HorarioFuncionamentoRepository) {

    fun listarTodos() = repository.findAll()

    fun buscarPorId(id: Long) = repository.findById(id).orElseThrow {
        RuntimeException("Horário de funcionamento não encontrado com ID $id")
    }

    fun listarPorRestaurante(restauranteId: Long) = repository.findByRestauranteId(restauranteId)

    fun buscarPorDia(restauranteId: Long, diaSemana: DayOfWeek) =
        repository.findByRestauranteIdAndDiaSemana(restauranteId, diaSemana)

    fun salvar(horario: HorarioFuncionamento) = repository.save(horario)

    fun atualizar(id: Long, novo: HorarioFuncionamento): HorarioFuncionamento {
        val existente = buscarPorId(id)
        val atualizado = existente.copy(
            diaSemana = novo.diaSemana,
            abertura = novo.abertura,
            fechamento = novo.fechamento,
            restaurante = novo.restaurante
        )
        return repository.save(atualizado)
    }

    fun excluir(id: Long) = repository.deleteById(id)
}
