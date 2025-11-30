package com.restaurante.reservamesa.service

import com.restaurante.reservamesa.model.Reserva
import com.restaurante.reservamesa.repository.ReservaRepository
import org.springframework.stereotype.Service

@Service
class ReservaService(private val repository: ReservaRepository) {
    fun listar() = repository.findAll()
    fun salvar(reserva: Reserva) = repository.save(reserva)
    fun excluir(id: Long) = repository.deleteById(id)
}
