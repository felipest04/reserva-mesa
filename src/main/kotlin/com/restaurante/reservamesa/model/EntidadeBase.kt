package com.restaurante.reservamesa.model

import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.MappedSuperclass

@MappedSuperclass
open class EntidadeBase(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    open val id: Long? = null
)
