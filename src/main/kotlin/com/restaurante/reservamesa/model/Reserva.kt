package com.restaurante.reservamesa.model

import jakarta.persistence.Entity
import jakarta.persistence.ManyToOne
import java.time.LocalDateTime

@Entity
data class Reserva(
    val nomeCliente: String,
    val telefone: String,
    val dataHora: LocalDateTime,

    @ManyToOne
    val restaurante: Restaurante
) : EntidadeBase()
