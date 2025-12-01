package com.restaurante.reservamesa.model

import com.fasterxml.jackson.annotation.JsonFormat
import jakarta.persistence.Entity
import jakarta.persistence.ManyToOne
import java.time.LocalDateTime

@Entity
data class Reserva(
    val nomeCliente: String,

    val telefone: String,

    val dataHora: LocalDateTime,

    @ManyToOne
    val restaurante: Restaurante,

    @ManyToOne
    val usuario: Usuario
) : EntidadeBase()
