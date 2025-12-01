package com.restaurante.reservamesa.service

import com.restaurante.reservamesa.dto.ReservaDTO
import com.restaurante.reservamesa.model.Reserva
import com.restaurante.reservamesa.repository.ReservaRepository
import com.restaurante.reservamesa.repository.RestauranteRepository
import com.restaurante.reservamesa.repository.UsuarioRepository
import org.springframework.stereotype.Service

@Service
class ReservaService(
    private val repository: ReservaRepository,
    private val restauranteRepository: RestauranteRepository,
    private val usuarioRepository: UsuarioRepository
) {

    fun listar() = repository.findAll()

    fun listarPorUsuario(usuarioId: Long): List<Reserva> =
        repository.findByUsuarioId(usuarioId)

    fun salvarReserva(dto: ReservaDTO): Reserva {
        val restaurante = restauranteRepository.findById(dto.restauranteId)
            .orElseThrow { IllegalArgumentException("Restaurante não encontrado") }

        val usuario = usuarioRepository.findById(dto.usuarioId)
            .orElseThrow { IllegalArgumentException("Usuário não encontrado") }

        val reserva = Reserva(dto.nomeCliente, dto.telefone, dto.dataHora, restaurante, usuario)
        return repository.save(reserva)
    }

    fun excluir(id: Long) = repository.deleteById(id)
}
