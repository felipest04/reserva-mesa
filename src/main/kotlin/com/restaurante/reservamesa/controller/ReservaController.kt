package com.restaurante.reservamesa.controller

import com.restaurante.reservamesa.dto.ReservaDTO
import com.restaurante.reservamesa.model.Reserva
import com.restaurante.reservamesa.service.ReservaService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/reservas")
class ReservaController(
    private val service: ReservaService,
) {

    @GetMapping
    fun listar(): ResponseEntity<List<Reserva>> =
        ResponseEntity.ok(service.listar())

    @GetMapping("/minhas")
    fun listarMinhasReservas(@RequestParam usuarioId: Long): ResponseEntity<List<Reserva>> {
        val reservas = service.listarPorUsuario(usuarioId)
        return ResponseEntity.ok(reservas)
    }

    @PostMapping
    fun salvar(@RequestBody dto: ReservaDTO): ResponseEntity<Reserva> =
        ResponseEntity.ok(service.salvarReserva(dto))

    @DeleteMapping("/{id}")
    fun excluir(@PathVariable id: Long): ResponseEntity<Void> {
        service.excluir(id)
        return ResponseEntity.noContent().build()
    }
}
