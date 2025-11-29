package com.restaurante.reservamesa.model

import jakarta.persistence.*
import java.time.DayOfWeek
import java.time.LocalTime

@Entity
data class HorarioFuncionamento(

    @ManyToOne
    val restaurante: Restaurante,

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    val diaSemana: DayOfWeek,

    @Column(nullable = false)
    val abertura: LocalTime,

    @Column(nullable = false)
    val fechamento: LocalTime
) : EntidadeBase()
