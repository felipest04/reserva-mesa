package com.restaurante.reservamesa.controller

import com.restaurante.reservamesa.model.Usuario
import com.restaurante.reservamesa.service.UsuarioService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/usuarios")
class UsuarioController(private val service: UsuarioService) {

    @GetMapping
    fun listarTodos() = ResponseEntity.ok(service.listarTodos())

    @GetMapping("/{id}")
    fun buscarPorId(@PathVariable id: Long) = ResponseEntity.ok(service.buscarPorId(id))

    @PostMapping
    fun salvar(@RequestBody usuario: Usuario) = ResponseEntity.ok(service.salvar(usuario))

    @PutMapping("/{id}")
    fun atualizar(@PathVariable id: Long, @RequestBody usuario: Usuario) =
        ResponseEntity.ok(service.atualizar(id, usuario))

    @DeleteMapping("/{id}")
    fun excluir(@PathVariable id: Long): ResponseEntity<Void> {
        service.excluir(id)
        return ResponseEntity.noContent().build()
    }
}
