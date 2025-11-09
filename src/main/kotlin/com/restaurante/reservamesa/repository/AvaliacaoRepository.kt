package com.restaurante.reservamesa.repository

import com.restaurante.reservamesa.model.Avaliacao
import com.restaurante.reservamesa.model.Restaurante
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface AvaliacaoRepository : JpaRepository<Avaliacao, Long> {

    fun findByRestaurante(restaurante: Restaurante): List<Avaliacao>
    fun findByRestauranteId(restauranteId: Long): List<Avaliacao>
}
