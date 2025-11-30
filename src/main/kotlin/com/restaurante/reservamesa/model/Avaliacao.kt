package com.restaurante.reservamesa.model

import jakarta.persistence.Entity
import jakarta.persistence.ManyToOne
import jakarta.persistence.Column

@Entity
data class Avaliacao(

    @ManyToOne
    val usuario: Usuario,

    @ManyToOne
    val restaurante: Restaurante,

    @Column(nullable = false)
    val nota: Int, // ex: 1 a 5

    val comentario: String? = null
) : EntidadeBase()
