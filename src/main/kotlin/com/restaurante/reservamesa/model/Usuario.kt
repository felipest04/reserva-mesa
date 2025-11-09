package com.restaurante.reservamesa.model

import jakarta.persistence.Column
import jakarta.persistence.Entity

@Entity
data class Usuario(
    @Column(nullable = false)
    val nome: String,

    @Column(unique = true, nullable = false)
    val email: String,

    @Column(nullable = false)
    val senha: String,

    @Column(nullable = false)
    val telefone: String

) : EntidadeBase()
