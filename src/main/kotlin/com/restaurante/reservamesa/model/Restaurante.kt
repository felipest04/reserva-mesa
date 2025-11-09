package com.restaurante.reservamesa.model

import jakarta.persistence.Entity

@Entity
data class Restaurante(
    val nome: String,
    val endereco: String,
    val latitude: Double,
    val longitude: Double,
    val disponivel: Boolean
) : EntidadeBase()
