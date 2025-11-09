package com.restaurante.reservamesa.repository

import com.restaurante.reservamesa.model.HorarioFuncionamento
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.time.DayOfWeek

@Repository
interface HorarioFuncionamentoRepository : JpaRepository<HorarioFuncionamento, Long> {

    fun findByRestauranteId(restauranteId: Long): List<HorarioFuncionamento>

    fun findByRestauranteIdAndDiaSemana(
        restauranteId: Long,
        diaSemana: DayOfWeek
    ): HorarioFuncionamento?
}
