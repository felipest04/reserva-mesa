package com.restaurante.reservamesa.dto

import com.fasterxml.jackson.annotation.JsonFormat
import java.time.LocalDateTime

data class ReservaDTO(
    val nomeCliente: String,

    val telefone: String,

    val dataHora: LocalDateTime,

    val restauranteId: Long,

    val usuarioId: Long
)
