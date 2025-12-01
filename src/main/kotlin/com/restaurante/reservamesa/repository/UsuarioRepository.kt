package com.restaurante.reservamesa.repository

import com.restaurante.reservamesa.model.Usuario
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface UsuarioRepository : JpaRepository<Usuario, Long> {


    fun findByEmailAndSenha(email: String, senha: String): Usuario?

    // Buscar por ID
    override fun findById(id: Long): Optional<Usuario>
}
