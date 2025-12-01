package com.restaurante.reservamesa.repository

import com.restaurante.reservamesa.model.Restaurante
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import org.springframework.web.bind.annotation.RestController
import java.util.*

@Repository
interface RestauranteRepository : JpaRepository<Restaurante, Long> {

    // Buscar restaurantes cujo nome contenha determinada string, ignorando maiúsculas/minúsculas
    fun findByNomeContainingIgnoreCase(nome: String): List<Restaurante>

    // Buscar apenas restaurantes disponíveis
    fun findByDisponivelTrue(): List<Restaurante>

    // Buscar por ID e já garantir que seja disponível (útil para reservas)
    override fun findById(id: Long): Optional<Restaurante>
}
