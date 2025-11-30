package com.restaurante.reservamesa.controller

import com.restaurante.reservamesa.model.Restaurante
import com.restaurante.reservamesa.service.RestauranteService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/restaurantes")
class RestauranteController(private val service: RestauranteService) {

    @GetMapping
    fun listarTodos() = ResponseEntity.ok(service.listarTodos())

    @GetMapping("/{id}")
    fun buscarPorId(@PathVariable id: Long) = ResponseEntity.ok(service.buscarPorId(id))

    @GetMapping("/buscar")
    fun buscarPorNome(@RequestParam nome: String) = ResponseEntity.ok(service.buscarPorNome(nome))

    @GetMapping("/disponiveis")
    fun listarDisponiveis() = ResponseEntity.ok(service.listarDisponiveis())

    @PostMapping
    fun salvar(@RequestBody restaurante: Restaurante) = ResponseEntity.ok(service.salvar(restaurante))

    @PutMapping("/{id}")
    fun atualizar(@PathVariable id: Long, @RequestBody novo: Restaurante) =
        ResponseEntity.ok(service.atualizar(id, novo))

    @DeleteMapping("/{id}")
    fun excluir(@PathVariable id: Long): ResponseEntity<Void> {
        service.excluir(id)
        return ResponseEntity.noContent().build()
    }
}
