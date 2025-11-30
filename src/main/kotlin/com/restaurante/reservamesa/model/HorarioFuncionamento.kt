package com.restaurante.reservamesa.model

import jakarta.persistence.Entity
import jakarta.persistence.ManyToOne
import jakarta.persistence.Column
import java.time.DayOfWeek
import java.time.LocalTime

@Entity
data class HorarioFuncionamento(

    @ManyToOne
    val restaurante: Restaurante,

    @Column(nullable = false)
    val diaSemana: DayOfWeek,

    @Column(nullable = false)
    val abertura: LocalTime,

    @Column(nullable = false)
    val fechamento: LocalTime
) : EntidadeBase()
