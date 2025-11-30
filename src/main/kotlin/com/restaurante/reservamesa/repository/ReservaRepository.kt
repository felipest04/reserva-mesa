package com.restaurante.reservamesa.repository

import com.restaurante.reservamesa.model.Reserva
import org.springframework.data.jpa.repository.JpaRepository

interface ReservaRepository : JpaRepository<Reserva, Long>
