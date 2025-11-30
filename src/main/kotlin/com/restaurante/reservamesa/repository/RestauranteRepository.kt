package com.restaurante.reservamesa.repository

import com.restaurante.reservamesa.model.Restaurante
import org.springframework.data.jpa.repository.JpaRepository

interface RestauranteRepository : JpaRepository<Restaurante, Long> {
    fun findByNomeContainingIgnoreCase(nome: String): List<Restaurante>
    fun findByDisponivelTrue(): List<Restaurante>
}
