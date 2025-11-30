package com.restaurante.reservamesa.controller

import com.restaurante.reservamesa.model.Avaliacao
import com.restaurante.reservamesa.service.AvaliacaoService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/avaliacoes")
class AvaliacaoController(private val service: AvaliacaoService) {

    @GetMapping
    fun listarTodas() = ResponseEntity.ok(service.listarTodas())

    @GetMapping("/restaurante/{id}")
    fun listarPorRestaurante(@PathVariable id: Long) = ResponseEntity.ok(service.listarPorRestaurante(id))

    @PostMapping
    fun salvar(@RequestBody avaliacao: Avaliacao) = ResponseEntity.ok(service.salvar(avaliacao))

    @DeleteMapping("/{id}")
    fun excluir(@PathVariable id: Long): ResponseEntity<Void> {
        service.excluir(id)
        return ResponseEntity.noContent().build()
    }
}
