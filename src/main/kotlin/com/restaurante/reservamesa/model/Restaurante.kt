package com.restaurante.reservamesa.model

import jakarta.persistence.Column
import jakarta.persistence.Entity

@Entity
data class Restaurante(
    val nome: String,

    val endereco: String,

    val disponivel: Boolean,

    @Column(name = "url_imagem", length = 1000)
    val urlImagem: String?,

    @Column(columnDefinition = "Text")
    val horariosFuncionamento: String? = null
) : EntidadeBase()
